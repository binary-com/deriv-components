import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import QuestionMarkIcon from '@assets/svg/question-mark-icon.svg';
import Dropdown from '../dropdown';

export default {
    title: 'Dropdown',
    component: Dropdown,

    argTypes: {
        label: {
            description: 'Displays a label for the input field',
        },
        list: {
            description: 'List',
        },
    },
} as ComponentMeta<typeof Dropdown>;

const TemplateWithoutValue: ComponentStory<typeof Dropdown> = (args) => {
    const [value, setValue] = React.useState('');

    const onChange = ({ target }) => {
        setValue(target.value);
    };

    return <Dropdown {...args} value={value} onChange={onChange} />;
};

const TemplateWithValue: ComponentStory<typeof Dropdown> = (args) => {
    const [value, setValue] = React.useState('US Dollar');

    const onChange = ({ target }) => {
        setValue(target.value);
    };

    return <Dropdown {...args} value={value} onChange={onChange} />;
};

const accounts_list_extended = [
    {
        text: 'US Dollar',
        value: 'US Dollar',
        subtitle: 'CR90000001',
        trailing_label: '0.00 USD',
    },
    {
        text: 'Litecoin',
        value: 'Litecoin',
        subtitle: 'CR90000111',
        trailing_label: '0.0000000000 LTC',
    },
    {
        text: 'USD Coin',
        value: 'USD Coin',
        subtitle: 'CR90000222',
        trailing_label: '0.00 USDC',
        disabled: true,
    },
    {
        text: 'Tether Omni',
        value: 'Tether Omni',
        subtitle: 'CR90000333',
        trailing_label: '0.00 USDT',
    },
    {
        text: 'Bitcoin',
        value: 'Bitcoin',
        subtitle: 'CR90000444',
        trailing_label: '0.0000000000 BTC',
    },
    {
        text: 'Etherium',
        value: 'Etherium',
        subtitle: 'CR90000555',
        trailing_label: '0.0000000000 ETH',
    },
];

const accounts_list_simple = [
    {
        text: 'US Dollar',
        value: 'US Dollar',
    },
    {
        text: 'Litecoin',
        value: 'Litecoin',
    },
    {
        text: 'USD Coin',
        value: 'USD Coin',
        disabled: true,
    },
    {
        text: 'Tether Omni',
        value: 'Tether Omni',
    },
    {
        text: 'Bitcoin',
        value: 'Bitcoin',
    },
    {
        text: 'Etherium',
        value: 'Etherium',
    },
];

export const DefaultDropdown = TemplateWithoutValue.bind({});
DefaultDropdown.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    label: 'Accounts',
    list: accounts_list_simple,
};

export const DefaultDropdownWithError = TemplateWithValue.bind({});
DefaultDropdownWithError.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: 'Error is occured',
        hint: '',
    },
    label: 'Accounts',
    list: accounts_list_simple,
};

export const DefaultDropdownDisabled = TemplateWithValue.bind({});
DefaultDropdownDisabled.args = {
    dark: false,
    disabled: true,
    hint_text: {
        error: '',
        hint: '',
    },
    label: 'Accounts',
    list: accounts_list_simple,
};

export const DropdownWithPrefixIcon = TemplateWithValue.bind({});
DropdownWithPrefixIcon.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    inline_prefix_element: <img src={QuestionMarkIcon} alt="question-mark-icon" />,
    label: 'Accounts',
    list: accounts_list_simple,
};

export const DropdownWithPrefixIconSubtitleAndTrailingLabel = TemplateWithValue.bind({});
DropdownWithPrefixIconSubtitleAndTrailingLabel.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    inline_prefix_element: <img src={QuestionMarkIcon} alt="question-mark-icon" />,
    label: 'Accounts',
    list: accounts_list_extended,
};

export const DropdownWithPrefixIconAndHelperMessage = TemplateWithValue.bind({});
DropdownWithPrefixIconAndHelperMessage.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: 'This is a helper message',
    },
    inline_prefix_element: <img src={QuestionMarkIcon} alt="question-mark-icon" />,
    label: 'Accounts',
    list: accounts_list_simple,
};

export const DropdownWithPrefixIconSubtitleTrailingLabelAndHelperMessage = TemplateWithValue.bind({});
DropdownWithPrefixIconSubtitleTrailingLabelAndHelperMessage.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: 'This is a helper message',
    },
    inline_prefix_element: <img src={QuestionMarkIcon} alt="question-mark-icon" />,
    label: 'Accounts',
    list: accounts_list_extended,
};

export const DropdownWithSubtitleAndTrailingLabel = TemplateWithValue.bind({});
DropdownWithSubtitleAndTrailingLabel.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    label: 'Accounts',
    list: accounts_list_extended,
};

export const DefaultDropdownWithHelperMessage = TemplateWithValue.bind({});
DefaultDropdownWithHelperMessage.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: 'This is a helper message',
    },
    label: 'Accounts',
    list: accounts_list_simple,
};

export const DropdownWithSubtitleTrailingLabelAndHelperMessage = TemplateWithValue.bind({});
DropdownWithSubtitleTrailingLabelAndHelperMessage.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: 'This is a helper message',
    },
    label: 'Accounts',
    list: accounts_list_extended,
};
