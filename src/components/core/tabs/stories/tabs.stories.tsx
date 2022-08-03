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

const Template: Story<TabsProps> = (args, { globals: { theme } }) => {
    const isDark = theme === 'dark';
    return (
        <Tabs {...args}>
            <Tab icon={isDark ? DepositIconDark : DepositIconLight} label="Deposit">
                Deposit
            </Tab>
            <Tab icon={isDark ? WithdrawIconDark : WithdrawIconLight} label="Withdraw">
                Withdraw
            </Tab>
            <Tab icon={isDark ? TransferIconDark : TransferIconLight} label="Transfer">
                Transfer
            </Tab>
            <Tab icon={isDark ? TransactionIconDark : TransactionIconLight} label="Transactions">
                Transactions
            </Tab>
        </Tabs>
    );
};

export const Bordered = Template.bind({});
Bordered.args = {
    active_index: 0,
    contained: false,
};

export const Contained = Template.bind({});
Contained.args = {
    active_index: 0,
    contained: true,
};
