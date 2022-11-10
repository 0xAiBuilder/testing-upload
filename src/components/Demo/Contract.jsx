import { useRef, useEffect } from "react";

function Contract({ value, useraddress, mainaddressid, spawnaddress, spawnowneraddress, contractInfo, rate, supplymax, supplyuri, minted, mint, readLockingTime, readStakingTime, readMaxWithdrawbalances, readIncentivebankbalances, readOwnerbalances, balanceMinted, staking}) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [value, useraddress, mainaddressid, contractInfo, rate, supplymax, supplyuri, minted, mint, readLockingTime, readStakingTime, readMaxWithdrawbalances, readIncentivebankbalances, readOwnerbalances, balanceMinted, staking]);
/* 
  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [useraddress]);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [mainaddressid]);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [contractInfo]); */

  return (
    <code>

      {`
>get AIWalletFactory owner address:
>`} 

      <span className="secondary-color" ref={spanEle}>
        <strong>{useraddress}</strong>
      </span>

      {`

contract AIWalletFactory {
  address public factory;
  function read() public view returns (uint256) {
  constructor () {
    factory = msg.sender;
  } 

  uint public counter;
  Account2[] public accounts; 

  function createAccount
  (address _owner) external payable {
    require (msg.value>= 0.05 ether, 
    "insufficent value: >= 0.05 ether");
    Account2 account = new Account2{value: 0}
    (_owner);
    accounts.push(account);
    counter ++;
  }

  receive() external payable {}
  fallback() external payable {}
  
  function getBalance() public view returns 
  (uint) {
    return address(this).balance = `}

      <span className="secondary-color" ref={spanEle}>
        <strong>{value}</strong>
      </span>

      {`;
  }

  function sendViaCall(address payable _to,
  uint _amount) 
  public payable {
    require (factory == msg.sender, "need access");
    require (address(this).balance>= _amount,
     "insufficent fund");
    (bool sent,) = _to.call{value: _amount}("");
    require(sent, "err");
  }
}

>get spawn address ID:
>`} 

      <span className="secondary-color" ref={spanEle}>
        <strong>{mainaddressid}</strong>
      </span>

{`

>get spawn address:
>`} 

      <span className="secondary-color" ref={spanEle}>
        <strong>{spawnaddress}</strong>
      </span>

    {`

>check spawned smart contract owner address:
>`} 

      <span className="secondary-color" ref={spanEle}>
        <strong>{contractInfo}</strong>
      </span>

      {`

contract Account2 is ERC1155 {
  address public incentivebank;
  address public ownerAddr;
  address public setownerAddr;
  IERC1155 public parentFLM;

  constructor (address _owner) ERC1155("") payable {
      incentivebank = msg.sender;
      ownerAddr = _owner;
      setownerAddr = _owner;
      parentFLM = IERC1155(address (this));
  }

  uint256 public mintRate;
  uint256 public minted;
  uint256 public supplies;
  uint256 public id;
  uint256 public amount = 1;
  uint256 public fee;
  string theuri;

  uint _expired4;
  uint totalsecondWeek = 40;
  uint256 public taken = 4;

  uint _b;

  function settingMintRate_Supplies_URI
  (uint rate = `} 

      <span className="secondary-color" ref={spanEle}>
        <strong>{rate}</strong>
      </span>

      {`,
   uint max = `} 

      <span className="secondary-color" ref={spanEle}>
        <strong>{supplymax}</strong>
      </span>

      {`,
   string memory newuri (CID)
   = `} 

      <span className="secondary-color" ref={spanEle}>
        <strong>{supplyuri}</strong>
      </span>

      {`) 
  public {
    if (msg.sender != setownerAddr)
      revert Unauthorized();
    mintRate = rate;
    supplies = max;
    theuri = newuri;
    _setURI(newuri);
  }

  function WithdrawByOwner(uint _amount) public {        
    if (msg.sender != ownerAddr)
        revert Unauthorized();
    require(_amount>balances[ownerAddr], 
    "insufficent fund");  
    require(block.timestamp>
    (_expired4-totalsecondWeek*(taken-1)), "Locking.");
    require(_amount<=(balances[ownerAddr]/taken),
    "Cannot take > 1/stage.");  
    ab (_amount);
    if (taken > 1)
        taken --;
  }

  function ab (uint _a) private{
    _b = _a * 5/100;
    (bool sentp,) = 
    incentivebank.call{value: _b}("sent");
    require(sentp, "err to Factory");
    balances[ownerAddr]-=_b;

    _a -= _b;        
    (bool sentToOwnerp,) = 
    ownerAddr.call{value: _a}("sent");
    require(sentToOwnerp, "err to Owner");
    balances[ownerAddr]-=_a;            
  }

  function WithdrawByfactory
  (uint _amount, bool select) public{
    require (balances[incentivebank]>= _amount, 
    "insufficent fund");
    if (select == true){
        (bool sent,) = 
        incentivebank.call{value: _amount}("sent");
        require(sent, "err");
    }else if (select == false){
        (bool sent,) = 
        msg.sender.call{value: _amount}("sent");
        require(sent, "err");
    }
    balances[incentivebank]-=_amount;
  }

>get minted number:
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{minted}</strong>
    </span>
  {`
  
>mint charged:
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{rate}</strong>
    </span>
  {`
 
>balance of ERC model :
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{balanceMinted}</strong>
    </span>
  {`

>balance is staking:
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{staking}</strong>
    </span>
  {`  

  function Deposit() public payable{    
    require(msg.value>=mintRate, "insufficent fee");
    require(supplies>minted, "insufficent supplies");
    if(minted<1)
      setownerAddr = 
      0x0000000000000000000000000000000000000000;
      _expired4 = 
      totalsecondWeek * 4 + block.timestamp;               
    fee = msg.value * 5 / 100;
    balances[incentivebank] += fee;
    balances[ownerAddr] = 
    balances[ownerAddr] + msg.value - fee;
    WithdrawByfactory(fee * 500 / 1000, true);
    _mint(msg.sender, id, amount, "");
    minted += 1;
  }

  struct Stake{
    uint256 modelId;
    uint256 amount;
    uint256 timestamp;
  }

  mapping(address => Stake) public stakes;
  mapping(address => uint256) public stakingTime;
  mapping(address => uint)public balances;

  function stake(uint256 _modelId, uint256 _amount) 
  public {
    stakes[msg.sender] = 
    Stake(_modelId, _amount, block.timestamp);
    parentFLM.safeTransferFrom
    (msg.sender, address (this), _modelId, 
    _amount, "0x00");
  }

  function unstake() public {
    if(stakes[msg.sender].amount > 0){        
      parentFLM.safeTransferFrom(address(this), 
      msg.sender, stakes[msg.sender].modelId, 
      stakes[msg.sender].amount, "0x00");
      stakingTime[msg.sender] = 
      (block.timestamp - 
        stakes[msg.sender].timestamp);
      delete stakes[msg.sender];
      if(stakingTime[msg.sender]>60)
          WithdrawByfactory
          (balances[incentivebank] * 1/100, false);
    }    
  }

>get owner withdraw locking timestamp: 
>demo: 40 seconds per each locking stage, 
 total 160 seconds 4 stages
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{readLockingTime}</strong>
    </span>
  {`

>get staking time:
>demo: stake 60 seconds to earn 1/100 from incentive pool
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{readStakingTime}</strong>
    </span>
  {`
  
>get Max withdraw balances by owner at each stage:
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{readMaxWithdrawbalances}</strong>
    </span>
  {`
 
>get incentive bank balances:
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{readIncentivebankbalances}</strong>
    </span>
  {`

>get total withdraw amount in owner balances:
>`}
    <span className="secondary-color" ref={spanEle}>
        <strong>{readOwnerbalances}</strong>
    </span>
  {`    

  function onERC1155Received(
    address operatorp,
    address fromp,
    uint256 idp,
    uint256 valuep,
    bytes calldata datap
  ) external returns (bytes4) {
    return bytes4(keccak256(
      "onERC1155Received(address,address,
      uint256,uint256,bytes)"));
  }

  function getStakingTime_Maxbalances_
  Incentivebankbalances_Ownerbalances_
  MintRate_Supplies_URI() 
  public view returns 
  (uint, uint, uint256, 
  uint256, uint, uint, string memory) {
    return ((block.timestamp - 
    stakes[msg.sender].timestamp), 
    balances[ownerAddr]/taken, 
    balances[incentivebank], balances[ownerAddr], 
    mintRate, supplies, theuri);
  }

  modifier timerOver{
    require(block.timestamp<=_expired4, 
    "Time lock unlocked.");
    _;
  }

  function getTimeLeft_expired4() 
  public timerOver view returns(uint){
    return _expired4-block.timestamp;
  }

}`}  
    </code>
  );
}

export default Contract;
