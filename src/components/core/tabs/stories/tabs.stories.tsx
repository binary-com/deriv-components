import type { Story } from '@storybook/react';
import Tab from '@core/tabs/tab';
import type { TabsProps } from '@core/tabs/tabs';
import Tabs from '@core/tabs/tabs';
import DepositIconLight from './assets/ic-deposit-light.svg';
import WithdrawIconLight from './assets/ic-withdraw-light.svg';
import TransferIconLight from './assets/ic-transfer-light.svg';
import TransactionIconLight from './assets/ic-transactions-light.svg';
import DepositIconDark from './assets/ic-deposit-dark.svg';
import WithdrawIconDark from './assets/ic-withdraw-dark.svg';
import TransferIconDark from './assets/ic-transfer-dark.svg';
import TransactionIconDark from './assets/ic-transactions-dark.svg';

export default {
    title: 'Tabs',
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#FFFFFF' },
                { name: 'dark', value: '#0E0E0E' },
                { name: 'greyDark', value: '#C2C2C2' },
                { name: 'greyLight', value: '#333333' },
            ],
        },
    },
    argTypes: {
        active_index: {
            description: 'Sets the active tab index.',
        },
        contained: {
            description: 'If set to `true`, the tab background will be changed.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        dark: {
            description: 'If set to `true`, the tab color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        size: {
            control: {
                type: 'select',
                options: {
                    default: 'default',
                    small: 'small',
                },
            },
            description: 'Controls the sizing of the tabs and label.',
            defaultValue: 'default',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            },
        },
    },
};

const Template: Story<TabsProps> = (args) => {
    return (
        <Tabs {...args}>
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
    );
};

export const BorderedLight = Template.bind({});
BorderedLight.args = {
    active_index: 0,
    contained: false,
    dark: false,
};

export const BorderedDark = Template.bind({});
BorderedDark.args = {
    active_index: 0,
    contained: false,
    dark: true,
};

BorderedDark.parameters = {
    backgrounds: { default: 'dark' },
};

export const ContainedLight = Template.bind({});
ContainedLight.args = {
    active_index: 0,
    contained: true,
    dark: false,
};

ContainedLight.parameters = {
    backgrounds: { default: 'greyDark' },
};

export const ContainedDark = Template.bind({});
ContainedDark.args = {
    active_index: 0,
    contained: true,
    dark: true,
};

ContainedDark.parameters = {
    backgrounds: { default: 'greyLight' },
};
