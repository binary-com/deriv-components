import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { ModalBodyProps } from '@wallet/modal/modal-body';
import WalletModal from '@wallet/modal/modal';
import Tabs from '@core/tabs/tabs';
import Tab from '@core/tabs/tab';
import DepositIconLight from '@assets/svg/modal/ic-deposit-light.svg';
import WithdrawIconLight from '@assets/svg/modal/ic-withdraw-light.svg';
import TransferIconLight from '@assets/svg/modal/ic-transfer-light.svg';
import TransactionIconLight from '@assets/svg/modal/ic-transactions-light.svg';
import DepositIconDark from '@assets/svg/modal/ic-deposit-dark.svg';
import WithdrawIconDark from '@assets/svg/modal/ic-withdraw-dark.svg';
import TransferIconDark from '@assets/svg/modal/ic-transfer-dark.svg';
import TransactionIconDark from '@assets/svg/modal/ic-transactions-dark.svg';
import css from '@wallet/modal/modal.module.scss';

export default {
    title: 'Modal',
    argTypes: {
        balance: {
            description: 'Sets the wallet balance.',
        },
        currency: {
            description: 'Sets the wallet currency.',
        },
        dark: {
            description: 'If set to `true`, modal will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        wallet_name: {
            control: {
                type: 'select',
                options: [
                    '1Foryou',
                    'Advcash',
                    'Airtm',
                    'Astropay',
                    'Bank wire',
                    'Banxa',
                    'Beyonic',
                    'Bitcoin',
                    'Boleto',
                    'Changelly',
                    'Credit cards',
                    'Demo',
                    'Deriv P2P',
                    'Diners Club',
                    'Ethereum',
                    'Fasapay',
                    'Help2pay',
                    'JCB',
                    'Jeton',
                    'Litecoin',
                    'Maestro',
                    'Mastercard',
                    'Neteller',
                    'Nganluong',
                    'OnlineNaira',
                    'OXXO',
                    'Pay Livre',
                    'Payment agent',
                    'Paysafe card',
                    'Paytrust88',
                    'Perfect Money',
                    'Skrill',
                    'SPEI',
                    'Sticpay',
                    'Tether',
                    'Trustly',
                    'USD Coin',
                    'Visa',
                    'Visa Electron',
                    'WebMoney',
                    'WeChat Pay',
                    'Zingpay',
                ],
            },
            description: 'Sets the wallet logo and background.',
        },
        supported: {
            description: 'If set to `false`, a warning message will be shown on the footer.',
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
    },
} as Meta<ModalBodyProps>;

const Template: Story<ModalBodyProps> = (args) => {
    const logo_src = args?.wallet_name?.replace(' ', '-').toLowerCase();
    const [active_tab_index, setActiveTabIndex] = React.useState(0);

    return (
        <React.Fragment>
            <WalletModal>
                <WalletModal.Trigger>
                    <div
                        onClick={() => {
                            setActiveTabIndex(2);
                        }}
                    >
                        Transfer
                    </div>
                </WalletModal.Trigger>
                <WalletModal.Body
                    logo={args.dark ? `./modal/lg-${logo_src}-dark.svg` : `./modal/lg-${logo_src}-light.svg`}
                    {...args}
                >
                    <Tabs className={css.tabs} dark={args.dark} active_index={active_tab_index} contained>
                        <Tab icon={args.dark ? DepositIconDark : DepositIconLight} label="Deposit">
                            Deposit
                        </Tab>
                        <Tab icon={args.dark ? WithdrawIconDark : WithdrawIconLight} label="Withdraw">
                            Withdraw
                        </Tab>
                        <Tab icon={args.dark ? TransferIconDark : TransferIconLight} label="Transfer">
                            Transfer
                        </Tab>
                        <Tab icon={args.dark ? TransactionIconDark : TransactionIconLight} label="Transactions">
                            Transactions
                        </Tab>
                    </Tabs>
                </WalletModal.Body>
            </WalletModal>
        </React.Fragment>
    );
};

export const Wallet = Template.bind({});
Wallet.args = {
    balance: '10,0000.00',
    currency: 'USD',
    dark: false,
    supported: true,
    wallet_name: 'Advcash',
};
