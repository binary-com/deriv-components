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
        demo: {
            description: 'Optional. If set to `true`, sets a special "demo" background.',
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
            description: 'Required. Sets a payment method name, logo and background color of the card.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'select',
                options: [
                    'universal', // non-existent, default color sheme applies
                    '1ForYou',
                    'Advcash',
                    'Airtm',
                    'ApplePay',
                    'AstroPay',
                    'AUD',
                    'Banxa',
                    'Beyonic',
                    'Bitcoin',
                    'Boleto',
                    'Changelly',
                    'Credit/debit',
                    'Demo',
                    'Deriv P2P',
                    'Diners Club',
                    'Directa24',
                    'Dragonpay',
                    'Dragon Phoenix',
                    'Ethereum',
                    'EUR',
                    'Fasapay',
                    'GBP',
                    'Help2Pay',
                    'Instant bank transfer',
                    'iWallet',
                    'JCB',
                    'Jenius',
                    'Jeton',
                    'Litecoin',
                    'Maestro',
                    'Mastercard',
                    'Neteller',
                    'NganLuong',
                    'OnlineNaira',
                    'OXXO',
                    'Pay Livre',
                    'Payment Agent',
                    'Paymero',
                    'PayRetailers',
                    'paysafecard',
                    'PayTrust88',
                    'Perfect Money',
                    'Qiwi',
                    'Skrill',
                    'SPEI',
                    'Sticpay',
                    'Tether',
                    'Trustly',
                    'UnionPay',
                    'USD',
                    'USD Coin',
                    'VISA',
                    'VISA Electron',
                    'WebMoney',
                    'WeChat Pay',
                    'Wyre',
                    'Xanpool',
                    'Xpay',
                    'ZingPay',
                ],
            },
        },
    },
} as Meta<WalletCardProps>;

const Template: Story<WalletCardProps> = (args) => <WalletCard {...args} />;

export const LightLargeWithBalance = Template.bind({});
LightLargeWithBalance.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    demo: false,
    faded: false,
    size: 'large',
    wallet_name: '[Name]',
};

export const LightMediumWithBalance = Template.bind({});
LightMediumWithBalance.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    demo: false,
    faded: false,
    size: 'medium',
    wallet_name: '[Name]',
};

export const LightSmall = Template.bind({});
LightSmall.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    demo: false,
    faded: false,
    size: 'small',
    wallet_name: '[Name]',
};

export const LightLargeWithoutBalance = Template.bind({});
LightLargeWithoutBalance.args = {
    active: false,
    balance: '',
    currency: '',
    dark: false,
    demo: false,
    faded: false,
    size: 'large',
    wallet_name: '[Name]',
};

export const LightMediumWithoutBalance = Template.bind({});
LightMediumWithoutBalance.args = {
    active: false,
    balance: '',
    currency: '',
    dark: false,
    demo: false,
    faded: false,
    size: 'medium',
    wallet_name: '[Name]',
};

export const DarkLargeWithBalance = Template.bind({});
DarkLargeWithBalance.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: false,
    faded: false,
    size: 'large',
    wallet_name: '[Name]',
};

export const DarkMediumWithBalance = Template.bind({});
DarkMediumWithBalance.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: false,
    faded: false,
    size: 'medium',
    wallet_name: '[Name]',
};

export const DarkSmall = Template.bind({});
DarkSmall.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: false,
    faded: false,
    size: 'small',
    wallet_name: '[Name]',
};

export const DarkLargeWithoutBalance = Template.bind({});
DarkLargeWithoutBalance.args = {
    active: false,
    balance: '',
    currency: '',
    dark: true,
    demo: false,
    faded: false,
    size: 'large',
    wallet_name: '[Name]',
};

export const DarkMediumWithoutBalance = Template.bind({});
DarkMediumWithoutBalance.args = {
    active: false,
    balance: '',
    currency: '',
    dark: true,
    demo: false,
    faded: false,
    size: 'medium',
    wallet_name: '[Name]',
};

export const FadedLightLarge = Template.bind({});
FadedLightLarge.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    demo: false,
    faded: true,
    size: 'large',
    wallet_name: '[Name]',
};

export const FadedDarkMedium = Template.bind({});
FadedDarkMedium.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: false,
    faded: true,
    size: 'medium',
    wallet_name: '[Name]',
};

export const FadedDarkSmall = Template.bind({});
FadedDarkSmall.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: false,
    faded: true,
    size: 'small',
    wallet_name: '[Name]',
};

export const ActiveLightLarge = Template.bind({});
ActiveLightLarge.args = {
    active: true,
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    demo: false,
    faded: false,
    size: 'large',
    wallet_name: '[Name]',
};

export const ActiveDarkMedium = Template.bind({});
ActiveDarkMedium.args = {
    active: true,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: false,
    faded: false,
    size: 'medium',
    wallet_name: '[Name]',
};

export const ActiveDarkSmall = Template.bind({});
ActiveDarkSmall.args = {
    active: true,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: false,
    faded: false,
    size: 'small',
    wallet_name: '[Name]',
};

export const DemoLightLarge = Template.bind({});
DemoLightLarge.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: false,
    demo: true,
    faded: false,
    size: 'large',
    wallet_name: 'Demo',
};

export const DemoDarkLarge = Template.bind({});
DemoDarkLarge.args = {
    active: false,
    balance: '0.00',
    currency: '[Currency]',
    dark: true,
    demo: true,
    faded: false,
    size: 'large',
    wallet_name: 'Demo',
};
