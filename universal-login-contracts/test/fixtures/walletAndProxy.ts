import {utils, Contract, Wallet, providers} from 'ethers';
import {deployContract} from 'ethereum-waffle';
import {createKeyPair} from '@universal-login/commons';
import WalletContract from '../../build/Wallet.json';
import Proxy from '../../build/UpgradeabilityProxy.json';
import MockToken from '../../build/MockToken.json';
import MockContract from '../../build/MockContract.json';
import {deployWalletContract} from '../../lib';

const {parseEther} = utils;

export default async function walletAndProxy(unusedProvider : providers.Provider, [, , , , , , , , , wallet] : Wallet []) {
  const keyPair = createKeyPair();
  const walletContractMaster = await deployWalletContract(wallet);
  const walletContractProxy = await deployContract(wallet, Proxy, [walletContractMaster.address]);
  const proxyAsWalletContract = new Contract(walletContractProxy.address, WalletContract.abi, wallet);
  await proxyAsWalletContract.initialize(keyPair.publicKey);
  const mockToken = await deployContract(wallet, MockToken);
  const mockContract = await deployContract(wallet, MockContract);
  await wallet.sendTransaction({to: walletContractProxy.address, value: parseEther('2.0')});
  await mockToken.transfer(walletContractProxy.address, parseEther('1.0'));
  return {
    provider: wallet.provider,
    publicKey: keyPair.publicKey,
    privateKey: keyPair.privateKey,
    walletContractProxy,
    proxyAsWalletContract,
    mockToken,
    mockContract,
    wallet
  };
}