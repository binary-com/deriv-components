import { ReactElement } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { wallets } from './wallets';
import css from './modal.module.scss';
import Icon from './icon';
import CloseIconLight from '@assets/svg/modal/ic-close-light.svg';
import CloseIconDark from '@assets/svg/modal/ic-close-dark.svg';

interface DialogContentProps {
    children: ReactElement;
}

const DialogContent = ({ children, ...props }: DialogContentProps) => (
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
    message?: string;
    message_type?: string;
    wallet_name?: string;
}

const ModalBody = ({ children, balance, currency, dark, logo, message, message_type, wallet_name }: ModalBodyProps) => {
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
                    <div className={css.ellipse_wrapper}>
                        {wallets.map((wallet, idx) => {
                            if (wallet['name'] === wallet_name)
                                return (
                                    <div key={idx}>
                                        <Icon
                                            className={css.ellipse}
                                            custom_color={dark ? '#0E0E0E' : wallet['color']}
                                            icon="ic-circle"
                                            width={59}
                                            height={136}
                                        />
                                        <Icon
                                            className={css.circle}
                                            custom_color={dark ? '#0E0E0E' : wallet['color']}
                                            icon="ic-ellipse"
                                            width={183}
                                            height={44}
                                        />
                                    </div>
                                );
                        })}
                    </div>
                </div>
                <div className={css.body}>{children}</div>
                <div className={css.footer}>
                    {message && (
                        <div className={classNames(css.message, css[`${message_type}`])}>
                            <Icon className={css.icon} icon={`ic-${message_type}`} />
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </DialogContent>
    );
};

export default ModalBody;
