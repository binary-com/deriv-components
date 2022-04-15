import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import ModalBody from './modal-body';
import ModalTrigger from './modal-trigger';

export const Dialog = DialogPrimitive.Root;

export interface ModalProps {
    children?: React.ReactElement[];
}

const WalletModal = ({ children }: ModalProps) => {
    return <Dialog>{children}</Dialog>;
};

WalletModal.Trigger = ModalTrigger;
WalletModal.Body = ModalBody;

export default WalletModal;
