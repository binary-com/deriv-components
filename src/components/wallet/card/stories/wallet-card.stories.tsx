import type { Meta, Story } from '@storybook/react';
import { WalletCardProps, wallet_card_sizes } from '../wallet-card';
import WalletCard from '../wallet-card';

export default {
    title: 'WalletCard',
    argTypes: {
        balance: {
            description: 'Sets the wallet balance.',
            defaultValue: undefined,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
        },
        currency: {
            description: 'Sets the wallet currency.',
            defaultValue: undefined,
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
        },
        dark: {
            description: 'If set to `true`, the wallet card color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        faded: {
            description: 'If set to `true`, the wallet card opacity will be set to 0.7 and hover effect will be off.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        logo: {
            description: 'Sets the payment method logo on the card.',
                defaultValue: undefined,
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: undefined },
                },
        },
        size: {
            control: {
                type: 'select',
                options: wallet_card_sizes,
            },
            description:
                "Controls the sizing of the wallet card.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'large' },
            },
        },
        wallet_name: {
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
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
            description: 'Sets the payment method name on the card.',
        },
    },
} as Meta<WalletCardProps>;

const Template: Story<WalletCardProps> = (args) => <WalletCard {...args}/>;

export const LightLargeWithBalance = Template.bind({});
LightLargeWithBalance.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    faded: false,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};

export const LightMediumWithBalance = Template.bind({});
LightMediumWithBalance.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    faded: false,
    logo: '',
    size: 'medium',
    wallet_name: '[Name]',
};

export const LightSmall = Template.bind({});
LightSmall.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    faded: false,
    logo: '',
    size: 'small',
    wallet_name: '[Name]',
};

export const LightLargeWithoutBalance = Template.bind({});
LightLargeWithoutBalance.args = {
    balance: '',
    currency: '',
    dark: false,
    faded: false,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};

export const LightMediumWithoutBalance = Template.bind({});
LightMediumWithoutBalance.args = {
    balance: '',
    currency: '',
    dark: false,
    faded: false,
    logo: '',
    size: 'medium',
    wallet_name: '[Name]',
};

export const DarkLargeWithBalance = Template.bind({});
DarkLargeWithBalance.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: false,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};

export const DarkMediumWithBalance = Template.bind({});
DarkMediumWithBalance.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: false,
    logo: '',
    size: 'medium',
    wallet_name: '[Name]',
};

export const DarkSmall = Template.bind({});
DarkSmall.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: false,
    logo: '',
    size: 'small',
    wallet_name: '[Name]',
};

export const DarkLargeWithoutBalance = Template.bind({});
DarkLargeWithoutBalance.args = {
    balance: '',
    currency: '',
    dark: true,
    faded: false,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};

export const DarkMediumWithoutBalance = Template.bind({});
DarkMediumWithoutBalance.args = {
    balance: '',
    currency: '',
    dark: true,
    faded: false,
    logo: '',
    size: 'medium',
    wallet_name: '[Name]',
};

export const FadedLight = Template.bind({});
FadedLight.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    faded: true,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};

export const FadedDark = Template.bind({});
FadedDark.args = {
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: true,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};