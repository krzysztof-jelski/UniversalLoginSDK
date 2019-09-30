import {utils} from 'ethers';
import {UnsignedMessage, SignedMessage, computeGasData, createFullHexString, SignedMessagePaymentOptions} from '@universal-login/commons';
import {encodeDataForExecuteSigned} from './encode';
import cloneDeep from 'lodash.clonedeep';

export const computeGasFields = (unsignedMessage: UnsignedMessage, gasLimit: utils.BigNumberish) => {
  const gasData = utils.bigNumberify(estimateGasDataFromUnsignedMessage(unsignedMessage));
  const gasLimitExecution = utils.bigNumberify(gasLimit).sub(gasData);
  return {gasData, gasLimitExecution};
};

export const estimateGasDataFromUnsignedMessage = (unsignedMessage: UnsignedMessage) => {
  const signature = createFullHexString(65);
  return estimateGasDataFromSignedMessage({...unsignedMessage, signature});
};

export const estimateGasDataFromSignedMessage = (signedMessage: SignedMessage) => {
  const copySignedMessage = {...cloneDeep(signedMessage), gasData: utils.bigNumberify('0xFFFFFF'), gasLimitExecution: utils.bigNumberify('0xFFFFFF')};
  const txdata = encodeDataForExecuteSigned(copySignedMessage);
  return computeGasData(txdata);
};

export const estimateGasLimit = (gasLimitExecution: string | number | utils.BigNumberish, gasData: string | number | utils.BigNumberish) =>
  utils.bigNumberify(gasLimitExecution).add(gasData).add('40000');

export const calculatePaymentOptions = (msg: SignedMessagePaymentOptions) =>
  ({gasLimit: estimateGasLimit(msg.gasLimitExecution, msg.gasData)});
