import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { hash: string } }
) {
  try {
    const hash = params.hash;
    const fileName = new URL(request.url).searchParams.get('fileName') || 'file';
    
    // Try multiple IPFS gateways
    const gateways = [
      `https://ipfs.io/ipfs/${hash}`,
      `https://cloudflare-ipfs.com/ipfs/${hash}`,
      `https://dweb.link/ipfs/${hash}`,
    ];

    let response = null;
    let error = null;

    // Try each gateway until one works
    for (const gateway of gateways) {
      try {
        response = await fetch(gateway);
        if (response.ok) break;
      } catch (e) {
        error = e;
        continue;
      }
    }

    if (!response?.ok) {
      throw error || new Error('Failed to fetch from all gateways');
    }

    // Get the content type and create response
    const contentType = response.headers.get('content-type');
    const blob = await response.blob();

    // Create response with proper headers
    return new NextResponse(blob, {
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('IPFS proxy error:', error);
    return new NextResponse('Failed to fetch file', { status: 500 });
  }
}
