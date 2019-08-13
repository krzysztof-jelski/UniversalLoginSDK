import React from 'react';

interface WyreProps {
  amount: number;
  contractAddress: string;
  symbol: string;
}

export const Wyre = ({amount, contractAddress, symbol}: WyreProps) => {
  const wyreScript = document.createElement('script');
  wyreScript.src = 'https://verify.sendwyre.com/js/widget-loader.js';
  let deviceToken = localStorage.getItem('DEVICE_TOKEN');

  if (!deviceToken) {
    const array = new Uint8Array(25);
    window.crypto.getRandomValues(array);
    deviceToken = Array.prototype.map.call(array, (x: any) => (`00${x.toString(16)}`).slice(-2)).join('');
    localStorage.setItem('DEVICE_TOKEN', deviceToken);
  }

  const accountId = 'AC-ZMQDYZ3JQJ4';
  const env = 'test';
  const operationType = 'debitcard';

  wyreScript.onload = () => {
    const wyreWidget = document.createElement('script');
    wyreWidget.innerHTML = `var widget = new Wyre.Widget({
      env: '${env}', //env
      accountId: '${accountId}', //accountId ??? our??
      auth: {
        type: 'secretKey',
        secretKey: ${deviceToken}, // deviceToken
      },
      operation: {
        type: '${operationType}',
        destCurrency: '${symbol}', //symbol
        sourceAmount: ${amount}, //amount (or sourceAmount)
        dest: 'ethereum:${contractAddress}' //ethereum:addresss
      }
    });
    widget.on('close', function (e: any) {
      // the widget closed before completing the process

      if (e.error) {
        console.log('there was a problem: ', e.error);
      } else {
        console.log('the customer closed the widget');
      }
    });
    widget.on('complete', function (e: any) {
      // onboarding was completed successfully!
    });
    widget.open();
    `;
  };
  document.body.appendChild(wyreScript);
  return(<input id="verifyButton" style={{display: 'block', borderRadius: '50px', outline: 'none', height: '82.5', width: '500px'}} />);
};
