// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DecentraCloud is Ownable {
    constructor() Ownable(msg.sender) {}

    struct File {
        string name;
        string fileType;
        uint256 size;
        string ipfsHash;
        uint256 uploadDate;
        bool exists;
    }
    
    // Mapping from user address to their files
    mapping(address => File[]) private userFiles;
    
    // Events
    event FileUploaded(address indexed user, uint256 fileId, string name, string ipfsHash);
    event FileDeleted(address indexed user, uint256 fileId);
    
    /**
     * @dev Upload a file to the decentralized storage
     * @param _name File name
     * @param _fileType File MIME type
     * @param _size File size in bytes
     * @param _ipfsHash IPFS hash where the file is stored
     */
    function uploadFile(string memory _name, string memory _fileType, uint256 _size, string memory _ipfsHash) public {
        File memory newFile = File({
            name: _name,
            fileType: _fileType,
            size: _size,
            ipfsHash: _ipfsHash,
            uploadDate: block.timestamp,
            exists: true
        });
        
        userFiles[msg.sender].push(newFile);
        
        emit FileUploaded(msg.sender, userFiles[msg.sender].length - 1, _name, _ipfsHash);
    }
    
    /**
     * @dev Get the number of files uploaded by the caller
     * @return Number of files
     */
    function getFileCount() public view returns (uint256) {
        return userFiles[msg.sender].length;
    }
    
    /**
     * @dev Get file details by ID
     * @param _fileId File ID
     * @return File details (name, fileType, size, ipfsHash, uploadDate)
     */
    function getFile(uint256 _fileId) public view returns (string memory, string memory, uint256, string memory, uint256) {
        require(_fileId < userFiles[msg.sender].length, "File does not exist");
        require(userFiles[msg.sender][_fileId].exists, "File was deleted");
        
        File memory file = userFiles[msg.sender][_fileId];
        return (file.name, file.fileType, file.size, file.ipfsHash, file.uploadDate);
    }
    
    /**
     * @dev Delete a file by ID
     * @param _fileId File ID
     */
    function deleteFile(uint256 _fileId) public {
        require(_fileId < userFiles[msg.sender].length, "File does not exist");
        require(userFiles[msg.sender][_fileId].exists, "File was already deleted");
        
        userFiles[msg.sender][_fileId].exists = false;
        
        emit FileDeleted(msg.sender, _fileId);
    }
}