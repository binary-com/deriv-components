import type { Meta, Story } from '@storybook/react';
import { WalletCardProps, wallet_card_sizes } from '../wallet-card';
import WalletCard from '../wallet-card';

export default {
    title: 'WalletCard',
    argTypes: {
        background_color: {
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'select',
                options: [
                    '#FF5F00',
                    '#00AF7E',
                    '#1A8FFF',
                    '#FF0000',
                    '#93A6AD',
                    '#23BDAE',
                    '#B6CDED',
                    '#F7931B',
                    '#333333',
                    '#10D078',
                    '#3C58C6',
                    '#1A8FFF',
                    '#FF444F',
                    '#184977',
                    '#52567F',
                    '#F6931C',
                    '#A9C51A',
                    '#016AB6',
                    '#FF671F',
                    '#A5A8A9',
                    '#EB001B',
                    '#EB001B',
                    '#8DC640',
                    '#E87701',
                    '#008751',
                    '#E20613',
                    '#9A6BFC',
                    '#979797',
                    '#008AC9',
                    '#F3BA0C',
                    '#EF1515',
                    '#6C2556',
                    '#303992',
                    '#F25822',
                    '#009393',
                    '#0EE06E',
                    '#2775CA',
                    '#1A1F71',
                    '#1A1F71',
                    '#0068A3',
                    '#39A935',
                    '#A8E2C1',
                ],
            },
            description: 'Sets the card background color (different for each payment method).',
        },
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
            description: 'Controls the sizing of the wallet card.',
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

const Template: Story<WalletCardProps> = (args) => <WalletCard {...args} />;

export const LightLargeWithBalance = Template.bind({});
LightLargeWithBalance.args = {
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
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
    background_color: '',
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: true,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};
