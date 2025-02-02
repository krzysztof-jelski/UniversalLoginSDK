import React from 'react';
import UniversalLoginSDK from '@universal-login/sdk';
import {TransferDetails} from '@universal-login/commons';
import {TransferAmount} from './TransferAmount';
import {getStyleForTopLevelComponent} from '../../../core/utils/getStyleForTopLevelComponent';

export interface ModalTransferAmountProps {
  sdk: UniversalLoginSDK;
  ensName: string;
  onSelectRecipientClick: () => void;
  updateTransferDetailsWith: (transferDetails: Partial<TransferDetails>) => void;
  currency: string;
  modalLayoutClassName?: string;
  transferAmountClassName?: string;
}

export const ModalTransferAmount = ({
  sdk,
  ensName,
  onSelectRecipientClick,
  updateTransferDetailsWith,
  currency,
  modalLayoutClassName,
  transferAmountClassName
}: ModalTransferAmountProps) => {
  return (
    <div className="universal-login-modal">
      <div className={getStyleForTopLevelComponent(modalLayoutClassName)}>
        <div className="transfer-modal">
          <div className="box-header">
            <h2 className="box-title">Send</h2>
          </div>
          <div className="modal-content">
            <TransferAmount
              sdk={sdk}
              ensName={ensName}
              onSelectRecipientClick={onSelectRecipientClick}
              updateTransferDetailsWith={updateTransferDetailsWith}
              currency={currency}
              transferAmountClassName={transferAmountClassName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

