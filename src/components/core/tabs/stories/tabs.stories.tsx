import { Story } from '@storybook/react';
import Tabs, { TabsProps } from '../tabs';
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
    const tabs = [
        {
            label: 'Deposit',
            icon: isDark ? DepositIconDark : DepositIconLight,
            content: 'Deposit',
        },
        {
            label: 'Withdraw',
            icon: isDark ? WithdrawIconDark : WithdrawIconLight,
            content: 'Withdraw',
        },
        {
            label: 'Transfer',
            icon: isDark ? TransferIconDark : TransferIconLight,
            content: 'Transfer',
        },
        {
            label: 'Transactions',
            icon: isDark ? TransactionIconDark : TransactionIconLight,
            content: 'Transactions',
        },
    ];
    return <Tabs {...args} tabs={tabs} default_selected="Withdraw" />;
};

export const Bordered = Template.bind({});
Bordered.args = {
    contained: false,
};

export const Contained = Template.bind({});
Contained.args = {
    contained: true,
};
