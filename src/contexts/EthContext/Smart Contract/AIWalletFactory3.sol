// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.4 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC1155//utils/ERC1155Receiver.sol"; 

error Unauthorized();

contract Account2 is ERC1155 {
    address public incentivebank;
    address public ownerAddr;
    address public setownerAddr;
    IERC1155 public parentFLM;
    struct Stake{
        uint256 modelId;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;
    mapping(address => uint256) public stakingTime;
    mapping(address => uint)public balances;

    constructor (address _owner) ERC1155("") payable {
        incentivebank = msg.sender;
        ownerAddr = _owner;
        setownerAddr = _owner;
        parentFLM = IERC1155(address (this));
    }

    function stake(uint256 _modelId, uint256 _amount) public {
        stakes[msg.sender] = Stake(_modelId, _amount, block.timestamp);
        parentFLM.safeTransferFrom(msg.sender, address (this), _modelId, _amount, "0x00");
    }

    function unstake() public {        
        parentFLM.safeTransferFrom(address(this), msg.sender, stakes[msg.sender].modelId, stakes[msg.sender].amount, "0x00");
        stakingTime[msg.sender] = (block.timestamp - stakes[msg.sender].timestamp);
        delete stakes[msg.sender];
        if(stakingTime[msg.sender]>60)
            WithdrawByfactory(balances[incentivebank] * 1/100, false);
    }

    

    function onERC1155Received(
        address operatorp,
        address fromp,
        uint256 idp,
        uint256 valuep,
        bytes calldata datap
    ) external returns (bytes4) {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }
        
    uint256 public mintRate;
    uint256 public minted;
    uint256 public supplies;
    uint256 public id;
    uint256 public amount = 1;
    uint256 public fee;
    string theuri;
    function Deposit() public payable{    
        require(msg.value>=mintRate, "insufficent fee");
        require(supplies>minted, "insufficent supplies");
        if(minted<1)
            setownerAddr = 0x0000000000000000000000000000000000000000;
            _expired4 = totalsecondWeek * 4 + block.timestamp;            
            //whenexpired();   
        fee = msg.value * 5 / 100;
        balances[incentivebank] += fee;
        balances[ownerAddr] = balances[ownerAddr] + msg.value - fee;
        WithdrawByfactory(fee * 500 / 1000, true);
        _mint(msg.sender, id, amount, "");
        minted += 1;
    }

    uint _expired4;
    uint totalsecondWeek = 40;
    uint256 public taken = 4;
    //function whenexpired() internal{
    //    _expired4 = totalsecondWeek * 4 + block.timestamp;
    //}
    
    uint _b;
    function WithdrawByOwner(uint _amount) public {        
        if (msg.sender != ownerAddr)
            revert Unauthorized();
        require(_amount>balances[ownerAddr], "insufficent fund");  
        require(block.timestamp>(_expired4-totalsecondWeek*(taken-1)), "Locking.");
        require(_amount<=(balances[ownerAddr]/taken), "Cannot take > 1/stage.");  
        ab (_amount);
        if (taken > 1)
            taken --;    
    }
    function ab (uint _a) private{
        _b = _a * 5/100;
        (bool sentp,) = incentivebank.call{value: _b}("sent");
        require(sentp, "err to Factory");
        balances[ownerAddr]-=_b;

        _a -= _b;        
        (bool sentToOwnerp,) = ownerAddr.call{value: _a}("sent");
        require(sentToOwnerp, "err to Owner");
        balances[ownerAddr]-=_a;            
    }
    function WithdrawByfactory(uint _amount, bool select) public{
        require (balances[incentivebank]>= _amount, "insufficent fund");
        if (select == true){
            (bool sent,) = incentivebank.call{value: _amount}("sent");
            require(sent, "err");
        }else if (select == false){
            (bool sent,) = msg.sender.call{value: _amount}("sent");
            require(sent, "err");
        }
        balances[incentivebank]-=_amount;
    }
    function getStakingTime_Maxbalances_Incentivebankbalances_Ownerbalances_MintRate_Supplies_URI() public view returns (uint, uint, uint256, uint256, uint, uint, string memory) {
        return (stakingTime[msg.sender], balances[ownerAddr]/taken, balances[incentivebank], balances[ownerAddr], mintRate, supplies, theuri);
    }

    modifier timerOver{
        require(block.timestamp<=_expired4, "Time lock unlocked.");
        _;
    }

    function getTimeLeft_expired4() public timerOver view returns(uint){
        return _expired4-block.timestamp;
    }
    
    function settingMintRate_Supplies_URI(uint rate, uint max, string memory newuri) public {
        if (msg.sender != setownerAddr)
            revert Unauthorized();
        mintRate = rate;
        supplies = max;
        theuri = newuri;
        _setURI(newuri);
    }

    
    
}



contract AIWalletFactory3 {
    address public factory;
    constructor () {
        factory = msg.sender;
    }

    uint public counter;
    Account2[] public myaccounts;
    function createAccount(address _owner) external payable {
        require (msg.value>= 0.05 ether, "insufficent fee");
        Account2 account = new Account2{value: 0}(_owner);
        myaccounts.push(account);
        counter ++;
    }

    receive() external payable {}

    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function sendViaCall(address payable _to,uint _amount) public payable {
        require (factory == msg.sender, "need access");
        (bool sent,) = _to.call{value: _amount}("sent");
        require(sent, "err");
    }
}