/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle")
 require("@nomiclabs/hardhat-truffle5");
 const ALCHEMY_API_KEY = "nfvwyUARcITA7WfR_ouQO86CuQEv-853";
 const RINKEBY_PRIVATE_KEY = "0cb9ff1849e6d47f991d09b8ce9acec5e5d24866dc4683a45415fcaa47e652e0";
 
 module.exports = {
   solidity: "0.8.9",
 
   networks:{
     ropsten:{
       url:`https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
       accounts:[`${RINKEBY_PRIVATE_KEY}`],
 
     },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
  }
}
 
 //https://thybrqfxbtk1.usemoralis.com:2053/server //https://eth-ropsten.alchemyapi.io/v2/nfvwyUARcITA7WfR_ouQO86CuQEv-853

 //0x2F2dc954dF2b7b21554e4E626DbEaFA9Aa50970F
 