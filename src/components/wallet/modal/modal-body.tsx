import { ReactElement } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { getModalMessage, wallets } from './wallets';
import css from './modal.module.scss';
import Icon from './icon';
import CloseIconLight from '@assets/svg/modal/ic-close-light.svg';
import CloseIconDark from '@assets/svg/modal/ic-close-dark.svg';

export interface DialogContentProps {
    children: ReactElement;
}

export const DialogContent = ({ children, ...props }: DialogContentProps) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay />
        <DialogPrimitive.Content {...props}>{children}</DialogPrimitive.Content>
    </DialogPrimitive.Portal>
);

export const DialogClose = DialogPrimitive.Close;

export interface ModalBodyProps {
    balance?: string;
    children?: ReactElement | ReactElement[];
    currency?: string;
    dark?: boolean;
    logo?: string;
    supported?: boolean;
    wallet_name?: string;
}

const ModalBody = ({ children, balance, currency, dark, logo, supported, wallet_name }: ModalBodyProps) => {
    return (
        <DialogContent>
            <div className={classNames(css.content, dark && css.dark)}>
                <div className={css.header}>
                    <div>
                        <div className={css.title}>
                            {wallet_name} {currency} wallet
                        </div>
                        <div className={css.subtitle}>
                            {balance} {currency}
                        </div>
                    </div>
                    <div className={css.image_wrapper}>
                        <img className={css.logo} src={logo} />
                        <DialogClose asChild>
                            <img className={css.close} src={dark ? CloseIconDark : CloseIconLight} />
                        </DialogClose>
                    </div>
                    <div className={css.ellipse}>
                        {wallets.map((wallet, idx) => {
                            if (wallet['name'] === wallet_name)
                                return (
                                    <div key={idx}>
                                        <Icon
                                            color={dark ? '#0E0E0E' : wallet['color']}
                                            name="ic-circle"
                                            width="59"
                                            height="136"
                                        />
                                        <Icon
                                            color={dark ? '#0E0E0E' : wallet['color']}
                                            name="ic-ellipse"
                                            width="183"
                                            height="44"
                                        />
                                    </div>
                                );
                        })}
                    </div>
                </div>
                <div className={css.body}>{children}</div>
                <div className={classNames(css.footer)}>
                    {!supported && <div className={css.message}>{getModalMessage().WALLET_UNSUPPORTED}</div>}
                </div>
            </div>
        </DialogContent>
    );
};

export default ModalBody;
