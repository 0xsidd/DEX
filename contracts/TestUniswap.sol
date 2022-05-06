//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;
// import "./IERC20.sol";
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface IERC20 {

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);


    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface IUniswapV2Router {
    function swapExactTokensForTokens(
      uint amountIn,
      uint amountOutMin,
      address[] calldata path,
      address to,
      uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactETHForTokens(uint amountOutMin,
     address[] calldata path,
      address to,
      uint deadline)
      external
      payable
    returns (uint[] memory amounts);

  
    function swapExactTokensForETH(uint amountIn, 
      uint amountOutMin, 
      address[] calldata path, 
      address to, 
      uint deadline)
      external
      returns (uint[] memory amounts);


    function getAmountsOut(uint amountIn, 
      address[] memory path)
      external 
      view 
      returns (uint[] memory amounts);


    function getAmountsIn(uint amountOut, 
      address[] memory path) 
      external 
      view 
      returns (uint[] memory amounts);


    function WETH() 
      external 
      pure 
      returns (address);

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
      uint amountIn,
      uint amountOutMin,
      address[] calldata path,
      address to,
      uint deadline
    ) external;

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
contract TestUniswap {
  address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
  uint[] public uintData;
  address public addressData;
  function swapTokensForTokens(
    address _tokenIn,
    address _tokenOut,
    uint _amountIn,
    uint _amountOutMin,
    address _to
  ) external {
      IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
      IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amountIn);
      address[]memory path;
      path = new address[](2);
      path[0] = _tokenIn;
      path[1] = _tokenOut;

      IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
        _amountIn,
        _amountOutMin,
        path,
        _to,
        block.timestamp
      );

    }
    

    function swapEthForTokens(
      uint amountOutMin,
      address _tokenOut,
      address _to
    )external payable
        {
          address[]memory path;
          path = new address[](2);
          path[0] = IUniswapV2Router(UNISWAP_V2_ROUTER).WETH();
          path[1] = _tokenOut;
          IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactETHForTokens{value:msg.value}(amountOutMin, path, _to, block.timestamp);
        }

    function swapTokensForEth(
      uint amountIn,
      uint amountOutMin,
      address _tokenIn,
      address _to
    )external 
        {
          IERC20(_tokenIn).transferFrom(msg.sender, address(this), amountIn);
          IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, amountIn);
          address[]memory path;
          path = new address[](2);
          path[0] = _tokenIn;
          path[1] = IUniswapV2Router(UNISWAP_V2_ROUTER).WETH();
          IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForETHSupportingFeeOnTransferTokens(amountIn,amountOutMin, path, _to, block.timestamp);
        }

    function getQuote(uint amountIn,address _tokenIn,address _tokenOut)external  returns(uint[]memory){
      address[]memory path;
      path = new address[](2);
      path[0] = _tokenIn;
      path[1] = _tokenOut;
      uintData =  IUniswapV2Router(UNISWAP_V2_ROUTER).getAmountsOut(amountIn,path);
      return uintData;
    }

    function weth()public returns(address){
      addressData = IUniswapV2Router(UNISWAP_V2_ROUTER).WETH();
      return(addressData);
    }


    
  }
