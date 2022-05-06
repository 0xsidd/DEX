const { messagePrefix } = require("@ethersproject/hash");
const Web3 = require("web3");
const provider = 'https://eth-ropsten.alchemyapi.io/v2/nfvwyUARcITA7WfR_ouQO86CuQEv-853';
//const provider = 'https://eth-mainnet.alchemyapi.io/v2/0KPXgVaHvwFWFOJSoyjTrGtnNAXaZV3D';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const BN = require('bn.js');
const DEXAbi =  [
	{
		"inputs": [],
		"name": "addressData",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_tokenIn",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenOut",
				"type": "address"
			}
		],
		"name": "getQuote",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountOutMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_tokenOut",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "swapEthForTokens",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountOutMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_tokenIn",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "swapTokensForEth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenIn",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_tokenOut",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amountIn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amountOutMin",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "swapTokensForTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "uintData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "weth",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const DEXAddress ='0x419b378b108F1991e7340c8acAc4582E3597FA5d';//'0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D' 
const daiAddress = '0xaD6D458402F60fD3Bd25163575031ACDce07538D';//'0x6B175474E89094C44Da98b954EedeAC495271d0F'
const wethAddress = '0xc778417E063141139Fce010982780140Aa0cD5Ab';//'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const SCALING_FACTOR = new BN(10).pow(new BN(18));
const AMOUNT_IN = 0.5
let val;



async function execute(){
    const contractDEX = new web3.eth.Contract(DEXAbi, DEXAddress);
	Value1 =  web3.utils.toWei('1', 'ether');
	Value = Value1.toString();
    const tx = await contractDEX.methods.getQuote(Value,wethAddress,daiAddress).call();
    console.log(tx);

  //   console.log(`Price of ${AMOUNT_IN } is ${ c1.toString()}`);
  
  
};
execute();

//0x1262490A3041e7D18B04939422186D336f943C53

//0x8e6c3D7B7a1c7A787C214B9c1DD66b01fbA10f45

//0x3E8564A5efaa5a78F887663dEBe7C32db3f2bF24

