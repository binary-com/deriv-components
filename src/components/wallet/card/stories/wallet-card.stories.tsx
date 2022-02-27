import type { Meta, Story } from '@storybook/react';
import { WalletCardProps } from '../wallet-card';
import WalletCard from '../wallet-card';

export default {
    title: 'WalletCard',
    parameters: { controls: { sort: 'alpha' } },
    argTypes: {
        active: {
            description:
                'Optional. If set to `true`, the wallet card border is highlighted in red by setting CSS "outline" property, and a check icon appears. Turned off for faded state.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        background_colors: {
            description:
                'Optional. Sets background colors of the card (different for each payment method). ' +
                '"primary" applies to its top-left & bottom-right corners. "secondary" applies to its top-right corner.',
            defaultValue: undefined,
            table: {
                expanded: true,
                type: { summary: '{ primary: string; secondary?: string; } | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        balance: {
            description: 'Optional. Sets the wallet balance.',
            defaultValue: undefined,
            table: {
                type: { summary: 'string | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        currency: {
            description: 'Optional. Sets the wallet currency.',
            defaultValue: undefined,
            table: {
                type: { summary: 'string | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        dark: {
            description: 'Optional. If set to `true`, the wallet card color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        faded: {
            description: 'Optional. If set to `true`, the wallet card opacity is set to 0.7 and hover effect is off.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        logo: {
            description: 'Optional. Accepts an image path (URL). Sets the payment method logo on the card.',
            defaultValue: undefined,
            table: {
                type: { summary: 'string | undefined' },
                defaultValue: { summary: undefined },
            },
        },
        size: {
            description: 'Optional. Controls the sizing of the wallet card.',
            control: {
                type: 'radio',
                options: ['small', 'medium', 'large'],
            },
            table: {
                type: { summary: '"small" | "medium" | "large" | undefined' },
                defaultValue: { summary: 'large' },
            },
        },
        wallet_name: {
            description: 'Required. Sets a payment method name on the card.',
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
        },
    },
} as Meta<WalletCardProps>;

const Template: Story<WalletCardProps> = (args) => <WalletCard {...args} />;

export const LightLargeWithBalance = Template.bind({});
LightLargeWithBalance.args = {
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
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
    active: false,
    background_colors: { primary: '', secondary: '' },
    balance: '',
    currency: '',
    dark: true,
    faded: false,
    logo: '',
    size: 'medium',
    wallet_name: '[Name]',
};

export const FadedLightLarge = Template.bind({});
FadedLightLarge.args = {
    active: false,
    background_colors: { primary: '', secondary: '' },
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    faded: true,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};

export const FadedDarkMedium = Template.bind({});
FadedDarkMedium.args = {
    active: false,
    background_colors: { primary: '', secondary: '' },
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: true,
    logo: '',
    size: 'medium',
    wallet_name: '[Name]',
};

export const FadedDarkSmall = Template.bind({});
FadedDarkSmall.args = {
    active: false,
    background_colors: { primary: '', secondary: '' },
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: true,
    logo: '',
    size: 'small',
    wallet_name: '[Name]',
};

export const ActiveLightLarge = Template.bind({});
ActiveLightLarge.args = {
    active: true,
    background_colors: { primary: '', secondary: '' },
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    faded: false,
    logo: '',
    size: 'large',
    wallet_name: '[Name]',
};

export const ActiveDarkMedium = Template.bind({});
ActiveDarkMedium.args = {
    active: true,
    background_colors: { primary: '', secondary: '' },
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: false,
    logo: '',
    size: 'medium',
    wallet_name: '[Name]',
};

export const ActiveDarkSmall = Template.bind({});
ActiveDarkSmall.args = {
    active: true,
    background_colors: { primary: '', secondary: '' },
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    faded: false,
    logo: '',
    size: 'small',
    wallet_name: '[Name]',
};
