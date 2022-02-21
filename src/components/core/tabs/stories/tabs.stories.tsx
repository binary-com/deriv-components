import type { Story } from '@storybook/react';
import type { TabsProps } from '../tabs';
import Tabs from '../tabs';
import Tab from '../tab';
import DepositIconLight from '@assets/svg/modal/ic-deposit-light.svg';
import WithdrawIconLight from '@assets/svg/modal/ic-withdraw-light.svg';
import TransferIconLight from '@assets/svg/modal/ic-transfer-light.svg';
import TransactionIconLight from '@assets/svg/modal/ic-transactions-light.svg';
import DepositIconDark from '@assets/svg/modal/ic-deposit-dark.svg';
import WithdrawIconDark from '@assets/svg/modal/ic-withdraw-dark.svg';
import TransferIconDark from '@assets/svg/modal/ic-transfer-dark.svg';
import TransactionIconDark from '@assets/svg/modal/ic-transactions-dark.svg';

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
        dark: {
            description: 'If set to `true`, the tab color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
    },
};

const Template: Story<TabsProps> = (args) => {
    return (
        <Tabs {...args}>
            <Tab icon={args.dark ? DepositIconDark : DepositIconLight} label="Deposit"></Tab>
            <Tab icon={args.dark ? WithdrawIconDark : WithdrawIconLight} label="Withdraw"></Tab>
            <Tab icon={args.dark ? TransferIconDark : TransferIconLight} label="Transfer"></Tab>
            <Tab icon={args.dark ? TransactionIconDark : TransactionIconLight} label="Transactions"></Tab>
        </Tabs>
    );
};

export const Bordered = Template.bind({});
Bordered.args = {
    active_index: 0,
    contained: false,
    dark: false,
};

export const Contained = Template.bind({});
Contained.args = {
    active_index: 0,
    contained: true,
    dark: false,
};
