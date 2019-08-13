import React from 'react';

interface WyreProps {
  amount: number;
  contractAddress: string;
  symbol: string;
}

export const WyreIframe = ({amount, contractAddress, symbol}: WyreProps) => {
  const accountId = 'AC-ZMQDYZ3JQJ4';
  const env = 'test';
  const operation = 'debitcard';

  return (
    <iframe
      src={`https://verify.testwyre.com/widget/v1?env=${env}&operation=${operation}&accountId=${accountId}
    &authType=secretKey&destCurrency=${symbol}&sourceCurrency=USD
    &sourceAmount=${amount}&dest=ethereum:${contractAddress}
    &redirectUrl=https://sendwyre.com`}
    />
  );
};
