/* eslint-disable */
import { FoxAuction } from '../../config/contractConfig'
import networkConfig from '../../config/networkConfig'
import { makeBatchCall as _makeBatchCall } from "./base";

let contractInstance

const initContractInstance = () => {
  if (!contractInstance || window.web3.currentProvider.isMetaMask !== contractInstance.currentProvider.isMetaMask) {
    contractInstance = new window.web3.eth.Contract(FoxAuction.abi, FoxAuction.address[networkConfig.defaultNetwork])
  }
}
export const makeBatchCall = async (methods) => {
  initContractInstance();
  return await _makeBatchCall(contractInstance, methods)
}

export const sendTransaction = async (methodName, args, options) => {
  console.log(methodName, args, options)
  initContractInstance();
  const method = contractInstance.methods[methodName](...args)
  return await _sendTransaction(method, options)
}

export const getAddress = () => {
  initContractInstance();
  return contractInstance.options.address
}