import React, { Component } from 'react'
import { init,exactTokenForEth,exactEthForToken,exactTokenForToken,getOutputAmount } from '../Web3Client'
import './App.css'

class Form extends Component {
    
    constructor(props) {
      super(props)
    
      this.state = {
         inputTokens:'',
         amount:0,
         outputTokens:'',
         connect:"Connect to MetaMask",
         approve:"",
         transactionStatus:"Ideal",
         enteredInputToken:0,
         expectedOutputTTokens:0


      }
    }
    
    handleChangeInputTokens = async(event)=>{
        this.setState({
            inputTokens:event.target.value,
        })
    }
    handleChangeForAmount=(event)=>{
        this.setState({
            amount:event.target.value,
        })
    }
    handleChangeForOutputTokens=(event)=>{
        this.setState({
            outputTokens:event.target.value
        })
    }
    handleChangeForSwapTokens=async(event)=>{
        let inputToken = this.state.inputTokens;
        let inputTokenAmount = this.state.amount;
        let outputToken = this.state.outputTokens ;
        let cmp = '0xf76D4a441E4ba86A923ce32B89AFF89dBccAA075';
        let weth = '0xc778417E063141139Fce010982780140Aa0cD5Ab';
        let eth = 'ETH';
        event.preventDefault(); 
        if(inputToken===cmp){
            let approveTokenName = 'cmp';
            if(outputToken ===weth){
                this.setState({
                    approve:"Please approve transaction in your MetaMask Wallet",
                    transactionStatus:"Initiated"
                })
                await exactTokenForToken(inputToken,outputToken ,inputTokenAmount,approveTokenName);
                event.preventDefault();
            }
            else if(outputToken ===eth){
                this.setState({
                    approve:"Please approve transaction in your MetaMask Wallet",
                    transactionStatus:"Initiated"
                })
                exactTokenForEth(inputTokenAmount.toString(),inputToken,approveTokenName);
                event.preventDefault();
            }
        }
        if(inputToken===weth){
            let approveTokenName = 'weth';
            if(outputToken ===cmp){

                this.setState({
                    approve:"Please approve transaction in your MetaMask Wallet",
                })
                exactTokenForToken(inputToken,outputToken ,inputTokenAmount,approveTokenName);
                event.preventDefault();
            }
            else if(outputToken ===eth){

                console.log("Can not swap WETH for ETH");
            }
        }
        else if(inputToken===eth){
            if(outputToken ===cmp){
                event.preventDefault();
                console.log(outputToken );
                await exactEthForToken(outputToken ,inputTokenAmount);
                event.preventDefault();
            }
            else if(outputToken ===weth){
                event.preventDefault();
                console.log(outputToken );
                await exactEthForToken(outputToken ,inputTokenAmount);
                event.preventDefault();
            }
            
        }

        
        
    }
    handleChangeForMetaMaskConnection=async(event)=>{
            init()
            this.setState({
                connect:"Connected to MetaMask"
            })
        
    }
    handleChangeForOutputTokensAmount=async(event)=>{
        event.preventDefault(); 
        await this.handleChangeForOutputTokens(event);
        let tx =await getOutputAmount(this.state.amount,this.state.inputTokens,this.state.outputTokens);
        this.setState({
            enteredInputToken:(tx[0])/1e18,
            expectedOutputTTokens:(tx[1])/1e18,
        })
        event.preventDefault(); 

    }
    handleChangeForOutputTokensAndGetAmount=async(event)=>{
        await this.handleChangeForOutputTokens(event);
        await this.handleChangeForOutputTokensAmount(event);
    }


  render() {
    const{tokemAmount,tokens} = this.state;
    return (
        <React.Fragment>           
            <button onClick={this.handleChangeForMetaMaskConnection} className='connectMetamask' >{this.state.connect} </button>
            <form onSubmit={this.handleChangeForSwapTokens} className="form">
                    <div >
                    <label className='button'>Swap From</label>
                    <select value={tokens} onChange={this.handleChangeInputTokens} className='button'>                       
                        <option value='0xf76D4a441E4ba86A923ce32B89AFF89dBccAA075' >Compound Token(CMP)</option>
                        <option value='0xc778417E063141139Fce010982780140Aa0cD5Ab' >Wrapped Ethereum(WETH)</option>
                        <option value='ETH' >Ethereum(ETH)</option>
                    </select>
                    <hr className='space'></hr>
                </div>
                <div>
                    <label className='button'>Amount</label>
                    <input type='number'step="any" value={tokemAmount}onChange={this.handleChangeForAmount}className='button'></input>
                </div>
                <hr className='space'></hr>
                <div>
                    <label className='button'>Swap to</label>
                    <select value={tokens} onChange={this.handleChangeForOutputTokensAndGetAmount} className='button'>
                        <option value='0xf76D4a441E4ba86A923ce32B89AFF89dBccAA075'>Compound Token(CMP)</option>
                        <option value='0xc778417E063141139Fce010982780140Aa0cD5Ab'>Wrapped Ethereum(WETH)</option>
                        <option value='ETH' >Ethereum(ETH)</option>
                    </select>
                </div>
                <hr></hr>
                <hr></hr>
                <p></p>
                <p className='button'>{this.state.approve}</p>
                <p className='button'>You get {this.state.expectedOutputTTokens} tokens in exchange</p>
                <button className='buttonSubmit'>Submitt</button>
            </form>
            
      </React.Fragment>
    )
  }
}

export default Form
