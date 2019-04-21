pragma solidity >=0.5.0 <0.6.0;

contract leak0x {
    
    constructor() public {
        leakCount = 0;
    }
    
    struct Leak {
        address account;
        string ipfsHash;
        uint timestamp;
        string title;
        uint score;
        string mimeType;
    }
    
    Leak[] public leaks;
    uint public leakCount;
    
    mapping (uint => address) public leakToWhistleblower;
    mapping (string => uint) ipfsHashToLeakId;
    mapping (address => uint[]) public whistleblowerLeakIds;
    
    function createLeak(string memory _ipfsHash, string memory _title, string memory _mimeType) public {
        require(
            (bytes(_ipfsHash).length > 0),
            "IPFS hash not provided to createLeak."
        );
        uint id = leaks.push(Leak(msg.sender, _ipfsHash, now, _title, 0, _mimeType)) - 1;
        leakToWhistleblower[id] = msg.sender;
        whistleblowerLeakIds[msg.sender].push(id);
        ipfsHashToLeakId[_ipfsHash] = id;
        leakCount++;
    }
    
    function getLeak(string memory _ipfsHash) public view isNewLeak(_ipfsHash) returns(address, string memory, uint, string memory, string memory, uint) {
        // require(
        //     bytes(_ipfsHash).length > 0,
        //     "IPFS hash not provided to getLeak."
        // );
        // require(
        //     doesLeakExist(_ipfsHash) == true,
        //     "IPFS hash does not exist as a leak"
        // );
        uint leakId = getLeakIdFromIpfsHash(_ipfsHash);
        return (leaks[leakId].account,
        leaks[leakId].ipfsHash,
        leaks[leakId].timestamp,
        leaks[leakId].title,
        leaks[leakId].mimeType,
        leaks[leakId].score);
    }
    
    function getLeakIdFromIpfsHash(string memory _ipfsHash) private view returns(uint) {
        require(
            bytes(_ipfsHash).length > 0,
            "IPFS hash not provided to getLeakIdFromIpfsHash."
        );
        return ipfsHashToLeakId[_ipfsHash];
    }

    function getLeakFromLeakId(uint _leakId) public view returns(address, string memory, uint, string memory, string memory, uint) {
        return (leaks[_leakId].account,
            leaks[_leakId].ipfsHash,
            leaks[_leakId].timestamp,
            leaks[_leakId].title,
            leaks[_leakId].mimeType,
            leaks[_leakId].score);
    }
    
    modifier isNewLeak(string memory _ipfsHash) {
        require(
            bytes(_ipfsHash).length > 0,
            "IPFS hash not provided to isNewLeak."
        );
        require(
            ipfsHashToLeakId[_ipfsHash] >= 0,
            "Leak is not new"
        );
        _;
    }
    
    function getWhistleblowerLeakIds(address _whistleblowerID) public view returns (uint[] memory) {
        return (whistleblowerLeakIds[_whistleblowerID]);
    }
    
}