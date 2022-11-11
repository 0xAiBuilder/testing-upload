import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
import { ethers } from "ethers";
import subsmartcontract from "../../contexts/EthContext/contracts/Account2.json";
import smartcontract from "../../contexts/EthContext/contracts/AIWalletFactory.json"
import { saveAs } from "file-saver";
const subsmartcontractABI = subsmartcontract.abi;
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/evm-utils');

// def funcation network 
const networks = {
  fantom: {
    chainId: `0x${Number(4002).toString(16)}`,
    chainName: "Fantom Testnet",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18
    },
    rpcUrls: ["https://xapi.testnet.fantom.network/lachesis"],
    blockExplorerUrls: ["https://testnet.ftmscan.com/"]
  },
  polygon: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"]
  },
  bsct: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.com"]
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18
    },
    rpcUrls: [
      "https://bsc-dataseed1.binance.org",
      "https://bsc-dataseed2.binance.org",
      "https://bsc-dataseed3.binance.org",
      "https://bsc-dataseed4.binance.org",
      "https://bsc-dataseed1.defibit.io",
      "https://bsc-dataseed2.defibit.io",
      "https://bsc-dataseed3.defibit.io",
      "https://bsc-dataseed4.defibit.io",
      "https://bsc-dataseed1.ninicoin.io",
      "https://bsc-dataseed2.ninicoin.io",
      "https://bsc-dataseed3.ninicoin.io",
      "https://bsc-dataseed4.ninicoin.io",
      "wss://bsc-ws-node.nariox.org"
    ],
    blockExplorerUrls: ["https://bscscan.com"]
  }
};

// def funcation switch wallet
const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};

function ContractBtns({ setValue, setUseraddress, setMainaddressid, setSpawnaddress, setSpawnowneraddress, setContractInfo, setRate, setSupplymax, setSupplyuri, setMinted, setMint, setReadLockingTime, setReadStakingTime, setReadMaxWithdrawbalances, setReadIncentivebankbalances, setReadOwnerbalances, setBalanceMinted, setStaking}) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputID, setInputID] = useState("");
  const [inputRate, setInputRate] = useState("");
  const [inputSupplyMax, setInputSupplyMax] = useState("");
  const [inputUri, setInputUri] = useState("");
  const [inputStakingNumber, setInputStakingNumber] = useState("");
  const [inputToAddr, setInputToAddr] = useState("");
  const [inputToAmount, setInputToAmount] = useState("");

  //let subsmartcontract;
  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputID(e.target.value);
    }
  };

  const handleInputAddress = e => {
    setInputValue(e.target.value);
  };

  const handleInputToAddr = e => {
    setInputToAddr(e.target.value);
  };

  const handleInputToAmount = e => {
    setInputToAmount(e.target.value);
  };

  const handleInputRate = e => {
    setInputRate(e.target.value);
  };

  const handleInputSupplyMax = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputSupplyMax(e.target.value);
    }
  };

  const handleInputUri = e => {
    setInputUri(e.target.value);
  };
  

  const handleInputStakingNumber = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputStakingNumber(e.target.value);
    }
  };

  // funcation switch wallet
  const [error, setError] = useState();

  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  const getUseraddress = async () => {
    const useraddress = await contract.methods.factory().call({ from: accounts[0] });
    setUseraddress(useraddress);
  };

  const createAccount = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a builder's address.");
      return;
    }

    const newAddress = String(inputValue);
    const weiValue = Web3.utils.toWei('0.05', 'ether');
    await contract.methods.createAccount(newAddress).send({ from: accounts[0], value: weiValue});
  };
  
  const getBalance = async () => {
    const value = await contract.methods.getBalance().call({ from: accounts[0] });
    setValue((parseFloat(value)/1000000000000000000).toString());
  };

  const getCounter = async e => {
    const counter = await contract.methods.counter().call({ from: accounts[0] });
    setMainaddressid((parseInt(counter)-1).toString());
  };

  const sendCall = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputToAddr === "") {
      alert("What address would you like to sent to?");
      return;
    }
    if (inputToAmount === "") {
      alert("Please enter amount.");
      return;
    }
    const newAddress = String(inputToAddr);
    const weiValue = Web3.utils.toWei(inputToAmount, 'ether');
    await contract.methods.sendViaCall(newAddress, weiValue).send({ from: accounts[0], value: weiValue});
    const value = await contract.methods.getBalance().call({ from: accounts[0] });
    setValue((parseFloat(value)/1000000000000000000).toString());
  };

  const getSpawnaddress = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    setSpawnaddress(currentspawnaddr);
    console.log("currentspawnaddr:", currentspawnaddr);
  };

  const ownerwithdraw = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputToAmount === "") {
      alert("Please enter amount.");
      return;
    }
    const weiValue = Web3.utils.toWei(inputToAmount, 'ether');
    await contract.methods.WithdrawByOwner(weiValue).send({ from: accounts[0], value: weiValue});
    const value = await contract.methods.getBalance().call({ from: accounts[0] });
    setValue((parseFloat(value)/1000000000000000000).toString());
  };
  

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  /* const abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function getTimeLeft_stakingTime_Maxbalances_Incentivebankbalances_Ownerbalances_MintRate_Supplies_URI() public view returns (uint, uint, uint, uint256, uint256, uint, uint, string memory)",
    "function amount() view returns (uint256)",

    // Authenticated Functions
    "function stake(uint256 _modelId, uint256 _amount) public",
    "function unstake() public",
    "function Deposit() public payable",
    "function WithdrawByOwner(uint _amount) public",
    "function settingMintRate_Supplies_URI(uint rate, uint max, string memory newuri) public",


    // Events
    //"event Transfer(address indexed from, address indexed to, uint amount)"
  ]; */

  const abi = [
    // Read-Only Functions
    "function fee() view returns (uint256)",
  ];

  const getContractInfo = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    //const account2 = new ethers.Contract(currentspawnaddr, abi, provider);
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    //const scfee = ethers.utils.formatEther(await account2.fee());
    const builderaddress = await account2.ownerAddr();
    console.log("builder address:", builderaddress);    
    setContractInfo(builderaddress);    
  }

  const setup = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    if (inputRate === "") {
      alert("Please enter a minting fee.");
      return;
    }
    if (inputSupplyMax === "") {
      alert("Please enter max supply.");
      return;
    }
    if (inputUri === "") {
      alert("Please enter uri.");
      return;
    }
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, signer);
    const rate = ethers.utils.formatUnits(ethers.utils.parseEther(inputRate), 0);
    //const max = inputSupplyMax;
    //const uri = inputUri;
    //const options = { gasLimit: 150000, gasPrice: "300000000000"}
    //console.log("newRate:", ethers.utils.formatUnits(ethers.utils.parseEther(newRate), 0)); 
    const readSettingMintRate_Supplies_URI = await account2.settingMintRate_Supplies_URI(rate, inputSupplyMax, inputUri);//, options);
    console.log("read Setting MintRate_Supplies_URI:", readSettingMintRate_Supplies_URI); 
    setRate(inputRate);
    setSupplymax(inputSupplyMax);
    setSupplyuri(inputUri);
  };

  const getRate = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const rate = ethers.utils.formatEther(await account2.mintRate());
    console.log("mint rate:", rate);    
    setRate(rate);
  };

  const getSupplymax = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const supplyMax = ethers.utils.formatUnits(await account2.supplies(), 0);
    console.log("max.supply:", supplyMax);    
    setSupplymax(supplyMax);
  };

  const getMinted = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const minted = ethers.utils.formatUnits(await account2.minted(), 0);
    console.log("minted number:", minted);    
    setMinted(minted);
  };

  const getMintInfo = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const minted = ethers.utils.formatUnits(await account2.minted(), 0);
    console.log("minted number:", minted); 
    setMinted(minted);
    if (minted === "0") {
      alert("0 minted.");
      return;
    }
    const allInfo = await account2.getStakingTime_Maxbalances_Incentivebankbalances_Ownerbalances_MintRate_Supplies_URI();
    const sminfo = allInfo[6];
    console.log("all Info:", sminfo); 
    setSupplyuri(sminfo);
  };

  const toMint = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, signer);
    const rate = ethers.utils.formatEther(await account2.mintRate());
    console.log("mint rate:", rate);    
    setRate(rate);
    //account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, signer);
    const weirate = ethers.utils.formatUnits(await account2.mintRate(), 0);
    const addmint = await account2.Deposit({value: weirate});
    console.log("read Setting MintRate_Supplies_URI:", addmint); 
    //account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const minted = ethers.utils.formatUnits(await account2.minted(), 0);
    console.log("minted number:", minted); 
    setMinted(minted);

    await Moralis.start({
      apiKey: "5CFEScR8LoeA8acNldIK1NApktut5NgiDJJXUbrghxqDQ26b0bP7A6HMDufyUyi0",
    });
    const mycontent = '{"Receipt":{"From ID":' + inputID + ',"FromAddress":' + currentspawnaddr + ',"Price:":' + rate + ', Amount: 1}}';

    const abi = [
    {
        path: "D:/xampp/htdocs/testnet/skill_language/v2/testing-upload-3/public/logo512.jpg",
        Content: mycontent
    },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({ abi });

    console.log(response);
    alert(response.data[0].path);
    
  };

  const balanceforstake = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);    
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const userAddr = (await provider.listAccounts())[0];
    console.log("userAddr:", userAddr);
    const modelnumber = ethers.utils.formatUnits(await account2.balanceOf(userAddr, 0), 0);
    console.log("balance of ERC model:", modelnumber);   
    setBalanceMinted(modelnumber);
    const stakinginfo = await account2.stakes(userAddr)
    const stakingmodel = ethers.utils.formatUnits(stakinginfo[1], 0);
    console.log("staking model:", stakingmodel); 
    setStaking(stakingmodel);
  };

  const toStake = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    if (inputStakingNumber === "") {
      alert("Please enter a staking number.");
      return;
    } 
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    const signer = provider.getSigner();
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, signer);
    const userAddr = (await provider.listAccounts())[0];
    const checkmaxStakingNumber = await account2.balanceOf(userAddr, "0");
    if (parseInt(checkmaxStakingNumber) < parseInt(inputStakingNumber)) {
      alert("Your max. number for staking is "+checkmaxStakingNumber+", but you enter "+ inputStakingNumber + " for staking.");
      return;
    }
    const approval = await account2.setApprovalForAll(currentspawnaddr, "True");
    console.log("approval before:", approval);
    /* const account2p = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const userAddr = (await provider.listAccounts())[0];
    console.log("userAddr:", userAddr);
    const modelnumber = ethers.utils.formatUnits(await account2p.balanceOf(userAddr, 0), 0);
    console.log("balance of ERC model:", modelnumber);
    if (inputStakingNumber > modelnumber) {
      alert("out of model in storage.");
      return;
    }  */
    await account2.stake("0", inputStakingNumber);
    /* approval = await account2.setApprovalForAll(currentspawnaddr, "False");
    console.log("approval after:", approval);
    modelnumber = ethers.utils.formatUnits(await account2.balanceOf(userAddr, 0), 0);
    console.log("balance of ERC model:", modelnumber);
    setBalanceMinted(modelnumber); */
    setStaking(inputStakingNumber);
  };

  const toUnstake = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, signer);
    await account2.unstake();
  
  } 

  const downloadJSONFile = async e => {
    e.preventDefault();
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const minted = ethers.utils.formatUnits(await account2.minted(), 0);
    console.log("minted number:", minted); 
    setMinted(minted);
    if (minted === "0") {
      alert("0 minted.");
      return;
    }
    const allInfo = await account2.getStakingTime_Maxbalances_Incentivebankbalances_Ownerbalances_MintRate_Supplies_URI();
    const sminfo = allInfo[6];
    console.log("all Info: https://ipfs.io/ipfs/", sminfo); 
    setSupplyuri(sminfo);
    //const ipfsURI = "https://ipfs.io/ipfs/bafybeiccb6jlx4iq45ycnx3z2waoupl53byqucs4y2wmdldjrjeryebevm"
    saveAs("https://ipfs.io/ipfs/" + sminfo + "/model.json", "model.json");
    fetch("https://ipfs.io/ipfs/" + sminfo + "/model.weights.bin").then((res) => { return res.blob(); }).then((data) => {
      var a = document.createElement("a");
      a.href = window.URL.createObjectURL(data);
      a.download = "model.weights.bin";
      a.click();
    });
  }

  const getDeFiInfo = async e => {
    if (inputID === "") {
      alert("Please enter a spawn address ID.");
      return;
    }
    const checkmaxsm = await contract.methods.counter().call({ from: accounts[0]});
    if (parseInt(inputID) >= parseInt(checkmaxsm)) {
      alert("Present max. number of smart contract ID is "+checkmaxsm+", but you enter "+inputID);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const newID = String(inputID);
    const currentspawnaddr = await contract.methods.myaccounts(newID).call({ from: accounts[0]});
    console.log("currentspawnaddr:", currentspawnaddr);
    const account2 = new ethers.Contract(currentspawnaddr, subsmartcontractABI, provider);
    const allInfo = await account2.getStakingTime_Maxbalances_Incentivebankbalances_Ownerbalances_MintRate_Supplies_URI();
    const sminfo1 = ethers.utils.formatUnits(allInfo[1], 0); 
    setReadMaxWithdrawbalances((parseFloat(sminfo1)/1000000000000000000).toString());
    const sminfo2 = ethers.utils.formatUnits(allInfo[2], 0); 
    setReadIncentivebankbalances((parseFloat(sminfo2)/1000000000000000000).toString());
    const sminfo3 = ethers.utils.formatUnits(allInfo[3], 0); 
    setReadOwnerbalances((parseFloat(sminfo3)/1000000000000000000).toString());
    const mintednum = await account2.minted();
    const strmintednum = ethers.utils.formatUnits(mintednum, 0); 
    if (strmintednum === "0") {
      alert("Locking function haven't start yet, please mint the first ERC1155 to start the function");
      return;
    }
    try {
      const lockingcounter = await account2.getTimeLeft_expired4();
      const strlockingcounter = ethers.utils.formatUnits(lockingcounter, 0);    
      setReadLockingTime(strlockingcounter);
    }
    catch(err) {
      setReadLockingTime("All time lock is unlocked.");
    }
    const userAddr = (await provider.listAccounts())[0];
    const modelnumber = ethers.utils.formatUnits(await account2.balanceOf(userAddr, 0), 0);
    console.log("balance of ERC model:", modelnumber);   
    setBalanceMinted(modelnumber);
    const stakinginfo = await account2.stakes(userAddr)
    const stakingmodel = ethers.utils.formatUnits(stakinginfo[1], 0);
    console.log("staking model:", stakingmodel); 
    setStaking(stakingmodel);  
    if (stakingmodel === "0") {
      setReadStakingTime("Are you staking? Please check balance for staking ().");     
      return;
    }
    const sminfo0 = ethers.utils.formatUnits(allInfo[0], 0);
    if(parseInt(sminfo0)>60)
      setReadStakingTime("60");
    else  
      setReadStakingTime(sminfo0);
    //console.log("defi Info:", sminfo0); 

  }

  
  
  /* const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };
 */
  return (
    <div className="btns">

      <button
        onClick={() => handleNetworkSwitch("fantom")}
        className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
      >
        Switch to Testnet Fantom
      </button>
      <button
        onClick={() => handleNetworkSwitch("polygon")}
        className="mt-2 mb-2 btn btn-primary submit-button focus:ring focus:outline-none w-full"
      >
        Switch to Mainnet Polygon
      </button>
      <button
        onClick={() => handleNetworkSwitch("bsct")}
        className="mt-2 mb-2 bg-warning border-warning btn submit-button focus:ring focus:outline-none w-full"
      >
        Switch to Testnet BSC
      </button>

      <button onClick={getUseraddress}>
        AIWalletFactory owner address
      </button>

      <button onClick={createAccount} className="input-btn">
        build(<input
          type="text"
          placeholder="address"
          value={inputValue}
          onChange={handleInputAddress}
        />)
      </button>

      <button onClick={getBalance}>
        getBalance()
      </button>

      <button onClick={getCounter}>
        get latest AddressID()
      </button>

      <button onClick={getSpawnaddress} className="input-btn">
        Please enter Spawn Address ID (<input
          type="text"
          placeholder="ID"
          value={inputID}
          onChange={handleInputChange}
        />)
      </button>

      <button onClick={sendCall} className="input-btn">
        send via call from AIWalletFactory platform (
          <input
            type="text"
            placeholder="address"
            value={inputToAddr}
            onChange={handleInputToAddr}
          />
          <input
            type="text"
            placeholder="ether"
            value={inputToAmount}
            onChange={handleInputToAmount}
          />
        )
      </button>

      <button onClick={ownerwithdraw} className="input-btn">
        withdraw by owner from subsmartcontract (
          <input
            type="text"
            placeholder="ether"
            value={inputToAmount}
            onChange={handleInputToAmount}
          />
        )
      </button>

      <button onClick={getContractInfo}>
        getBuilderAddr()
      </button>

      <button onClick={setup} className="input-btn">        
        setup(      
        <input
          type="text"
          placeholder="mint ether"
          value={inputRate}
          onChange={handleInputRate}
        />
        <input
          type="text"
          placeholder="max. supply"
          value={inputSupplyMax}
          onChange={handleInputSupplyMax}
        />
        <input
          type="text"
          placeholder="ipfs uri CID"
          value={inputUri}
          onChange={handleInputUri}
        />)
      </button>

      <button onClick={getRate}>
        getRate()
      </button>

      <button onClick={getSupplymax}>
        getSupplymax()
      </button>

      <button onClick={getMinted}>
        getMinted()
      </button>

      <button onClick={getMintInfo}>
        getMintInfo()
      </button>

      <button onClick={toMint}>
        mint()
      </button>

      <button onClick={balanceforstake}>
        balanceforstake()
      </button>

      <button onClick={toStake} className="input-btn">
        stake(<input
          type="text"
          placeholder="qty."
          value={inputStakingNumber}
          onChange={handleInputStakingNumber}
        />)
      </button>

      <button onClick={toUnstake}>
        unstake()
      </button>
      
      <button onClick={downloadJSONFile}>
        download 2 files from uri()
      </button>

      <button onClick={getDeFiInfo}>
        defi info()
      </button>

      {/* <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div> */}

    </div>
  );
}

export default ContractBtns;
