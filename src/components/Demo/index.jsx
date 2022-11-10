import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  
  const [value, setValue] = useState("?(balance)");
  const [useraddress, setUseraddress] = useState("?(AI Wallet Factory owner address)");
  const [mainaddressid, setMainaddressid] = useState("?(Spawn address ID)");
  const [spawnaddress, setSpawnaddress] = useState("?(Spawn address)");
  const [spawnowneraddress, setSpawnowneraddress] = useState("?(Spawn owner address)");
  const [contractInfo, setContractInfo] = useState("?(Builder address)");
  const [rate, setRate] = useState("?(Mint fee)");
  const [supplymax, setSupplymax] = useState("?(Max supply)");
  const [supplyuri, setSupplyuri] = useState("?(Supply uri)");
  const [minted, setMinted] = useState("?(Minted number)");
  const [mint, setMint] = useState("?(Mint)");
  const [readLockingTime, setReadLockingTime] = useState("?(Locking second)");
  const [readStakingTime, setReadStakingTime] = useState("?(Staking starting timestamp)");
  const [readMaxWithdrawbalances, setReadMaxWithdrawbalances] = useState("?(Max withdraw balances at each stage 40 secounds (total four stages in demo)");
  const [readIncentivebankbalances, setReadIncentivebankbalances] = useState("?(Sub smart contract incentive bank balances)");
  const [readOwnerbalances, setReadOwnerbalances] = useState("?(Sub smart contract owner balances)");
  const [balanceMinted, setBalanceMinted] = useState("?(Own Balance Minted)");
  const [staking, setStaking] = useState("?(staking number)");
  const demo =
    <>
      <Cta />
      <div className="contract-container"> 
        
        <ContractBtns setValue={setValue} setUseraddress={setUseraddress} setMainaddressid={setMainaddressid} 
        setSpawnaddress={setSpawnaddress} setSpawnowneraddress={setSpawnowneraddress} 
        setContractInfo={setContractInfo} setRate={setRate} setSupplymax={setSupplymax} setSupplyuri={setSupplyuri}
        setMinted={setMinted} setMint={setMint} setReadLockingTime={setReadLockingTime}  setReadStakingTime={setReadStakingTime}
        setReadMaxWithdrawbalances={setReadMaxWithdrawbalances} setReadIncentivebankbalances={setReadIncentivebankbalances} 
        setReadOwnerbalances={setReadOwnerbalances}
        setBalanceMinted={setBalanceMinted} setStaking={setStaking}/>
      </div>
      <div className="contract-container">
        <Contract value={value} useraddress={useraddress} mainaddressid={mainaddressid} 
        spawnaddress={spawnaddress} spawnowneraddress={spawnowneraddress} 
        contractInfo={contractInfo} rate={rate} supplymax={supplymax} supplyuri={supplyuri}
        minted={minted} mint={mint} readLockingTime={readLockingTime} readStakingTime={readStakingTime}
        readMaxWithdrawbalances={readMaxWithdrawbalances} readIncentivebankbalances={readIncentivebankbalances} 
        readOwnerbalances={readOwnerbalances}
        balanceMinted={balanceMinted} staking={staking}/>
      </div>
    </>;

  return (
    <div className="demo">
      <Title />
      {
        //!state.artifact ? <NoticeNoArtifact /> :
        //  !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
