pragma solidity >=0.5.0 <0.6.0;

contract leak0x {
    
    constructor() public {
        leakCount = 0;
    }
    
    struct Leak {
        address account;
        string ipfsHash;
        uint256 timestamp;
        string title;
        uint256 score;
        string mimeType;
    }
    
    struct WhistleBlower {
        address account;
        string pseudonym;
        int256 reputation;
        uint256 leakCount;
        uint256 rank;
        string profilePictureIpfsHash;
        string mimeType;
    }
    
    Leak[] public leaks;
    WhistleBlower[] public whistleBlowers;
    uint256 public leakCount;
    
    mapping (uint256 => address) public leakToWhistleblower;
    mapping (string => uint256) ipfsHashToLeakId;
    mapping (address => uint256[]) public whistleblowerLeakIds;
    mapping (address => WhistleBlower) public addressToWhistleBlower;
    mapping (string => address) pseudonymToWhistleBlowerAddress;
    
    function registerWhistleBlower(string memory _pseudonym, string memory _ipfsHash, string memory _mimeType) public isNewPseudonym(_pseudonym) {
        require(
            (bytes(_pseudonym).length > 0),
            "Pseudonym required for registration but not provided"
        );
        require(
            (addressToWhistleBlower[msg.sender].account != msg.sender),
            "WhistleBlower with this address has already registered"
        );
        string memory profilePictureIpfsHash = "";
        if(bytes(_ipfsHash).length > 0) {
            profilePictureIpfsHash = _ipfsHash;
        }
        string memory profilePictureMimeType = "";
        if(bytes(_mimeType).length > 0) {
            profilePictureMimeType = _mimeType;
        }
        uint256 whistleBlowerCount = whistleBlowers.length;
        whistleBlowers.push(WhistleBlower(msg.sender, _pseudonym, 0, 0, whistleBlowerCount, profilePictureIpfsHash, profilePictureMimeType));
        addressToWhistleBlower[msg.sender] = WhistleBlower(msg.sender, _pseudonym, 0, 0, whistleBlowerCount, profilePictureIpfsHash, profilePictureMimeType);
        pseudonymToWhistleBlowerAddress[_pseudonym] = msg.sender;
    }
    
    function createLeak(string memory _ipfsHash, string memory _title, string memory _mimeType) public {
        require(
            (bytes(_ipfsHash).length > 0),
            "IPFS hash not provided to createLeak."
        );
        uint256 id = leaks.push(Leak(msg.sender, _ipfsHash, now, _title, 0, _mimeType)) - 1;
        leakToWhistleblower[id] = msg.sender;
        whistleblowerLeakIds[msg.sender].push(id);
        ipfsHashToLeakId[_ipfsHash] = id;
        leakCount++;
    }
    
    function getLeak(string memory _ipfsHash) public view isNewLeak(_ipfsHash) returns(address, string memory, uint256, string memory, string memory, uint256) {
        // require(
        //     bytes(_ipfsHash).length > 0,
        //     "IPFS hash not provided to getLeak."
        // );
        // require(
        //     doesLeakExist(_ipfsHash) == true,
        //     "IPFS hash does not exist as a leak"
        // );
        uint256 leakId = getLeakIdFromIpfsHash(_ipfsHash);
        return (leaks[leakId].account,
        leaks[leakId].ipfsHash,
        leaks[leakId].timestamp,
        leaks[leakId].title,
        leaks[leakId].mimeType,
        leaks[leakId].score);
    }
    
    function getLeakIdFromIpfsHash(string memory _ipfsHash) private view returns(uint256) {
        require(
            bytes(_ipfsHash).length > 0,
            "IPFS hash not provided to getLeakIdFromIpfsHash."
        );
        return ipfsHashToLeakId[_ipfsHash];
    }

    function getLeakFromLeakId(uint256 _leakId) public view returns(address, string memory, uint256, string memory, string memory, uint256) {
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
    
    modifier isNewPseudonym(string memory _pseudonym) {
        require(
            (bytes(_pseudonym).length > 0),
            "Pseudonym has not been required, therefore it can't be verified whether or not the Pseudonym is taken"
        );
        require(
            (pseudonymToWhistleBlowerAddress[_pseudonym] == 0x0000000000000000000000000000000000000000),
            "Pseudonym is already taken"
        );
        _;
    }   
    
    function getWhistleblowerLeakIds(address _whistleblowerID) public view returns (uint256[] memory) {
        return (whistleblowerLeakIds[_whistleblowerID]);
    }
    
}