import React from 'react';
import AccountOption from './AccountOption';
import DefaultActionIcon from '@assets/svg/default-action-icon.svg';
import { styled } from 'Styles/stitches.config';

export const DropdownStoryWrapper = styled('div', {
    margin: '50px auto',
    width: '500px',
});

export const DropdownStoryDecorator = (Story: any) => <DropdownStoryWrapper>{Story()}</DropdownStoryWrapper>;

const default_icon = <img src={DefaultActionIcon} alt="default-icon" />;

export const default_add_list_items = [
    {
        id: 1,
        title: 'Bob',
        icon_src: DefaultActionIcon,
    },
    {
        id: 2,
        title: 'Ilya',
        icon_src: DefaultActionIcon,
    },
    {
        id: 3,
        title: 'George',
        icon_src: DefaultActionIcon,
    },
];

export const names_add_list = [
    {
        text: 'Bob',
        value: 'Bob',
        add_list_icon_src: DefaultActionIcon,
    },
    {
        text: 'Ilya',
        value: 'Ilya',
        add_list_icon_src: DefaultActionIcon,
    },
    {
        text: 'George',
        value: 'George',
        add_list_icon_src: DefaultActionIcon,
    },
    {
        text: 'Dima',
        value: 'Dima',
        add_list_icon_src: DefaultActionIcon,
    },
    {
        text: 'Andrew',
        value: 'Andrew',
        add_list_icon_src: DefaultActionIcon,
    },
    {
        text: 'Olga',
        value: 'Olga',
        add_list_icon_src: DefaultActionIcon,
    },
    {
        text: 'Anna',
        value: 'Anna',
        add_list_icon_src: DefaultActionIcon,
    },

    {
        text: 'Mike',
        value: 'Mike',
        add_list_icon_src: DefaultActionIcon,
    },
];

export const accounts_prompt = [
    {
        text: (
            <AccountOption
                dark={false}
                icon={default_icon}
                trailing_label="0.00 USD"
                title="US Dollar"
                subtitle="CR90000001"
            />
        ),
        value: 'US Dollar',
    },
    {
        text: (
            <AccountOption
                dark={false}
                icon={default_icon}
                trailing_label="0.0000000000 LTC"
                title="Litecoin"
                subtitle="CR90000111"
            />
        ),
        value: 'Litecoin',
    },
    {
        text: (
            <AccountOption
                dark={false}
                icon={default_icon}
                trailing_label="0.00 USDC"
                title="USD Coin"
                subtitle="CR90000222"
            />
        ),
        value: 'USD Coin',
    },
    {
        text: (
            <AccountOption
                dark={false}
                icon={default_icon}
                trailing_label="0.00 USDT"
                title="Tether Omni"
                subtitle="CR90000333"
            />
        ),
        value: 'Tether Omni',
    },
    {
        text: (
            <AccountOption
                dark={false}
                icon={default_icon}
                trailing_label="0.0000000000 BTC"
                title="Bitcoin"
                subtitle="CR90000444"
            />
        ),
        value: 'Bitcoin',
    },
    {
        text: (
            <AccountOption
                dark={false}
                icon={default_icon}
                trailing_label="0.0000000000 ETH"
                title="Etherium"
                subtitle="CR90000555"
            />
        ),
        value: 'Etherium',
    },
];

export const names_combobox = [
    {
        text: 'Bob',
        value: 'Bob',
    },
    {
        text: 'Ilya',
        value: 'Ilya',
        disabled: true,
    },
    {
        text: 'George',
        value: 'George',
    },
    {
        text: 'Dima',
        value: 'Dima',
    },
    {
        text: 'Andrew',
        value: 'Andrew',
        disabled: true,
    },
    {
        text: 'Olga',
        value: 'Olga',
    },
    {
        text: 'Anna',
        value: 'Anna',
    },

    {
        text: 'Mike',
        value: 'Mike',
    },
];

export const DropdownBaseStoriesArgTypes = {
    dark: {
        description: 'Displays content in dark theme',
        table: {
            defaultValue: { summary: false },
        },
    },
    disabled: {
        description:
            'Extends the style of HTML [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) attribute.',
        table: {
            defaultValue: { summary: false },
        },
    },
    inline_prefix_element: {
        description: 'Displays the provided inline-prefix element',
    },
    inline_suffix_element: {
        description: 'Displays the provided inline-suffix element',
    },
    has_chevron_icon: {
        description: 'Flag to show/hide chevron icon in dropdown menu',
        table: {
            defaultValue: { summary: false },
        },
    },
    hint_text: {
        description: 'Displays a hint text or error text',
        table: {
            type: { summary: 'object' },
        },
    },
    is_align_text_center: {
        description: 'Aligns text of the items to center',
        table: {
            defaultValue: { summary: false },
        },
    },
    label: {
        description: 'Displays a label for the input field',
    },
    list: {
        description: 'List with items',
    },
    list_size: {
        description: 'List size',
        options: ['small', 'medium', 'large'],
        control: { type: 'radio' },
    },
    not_found_text: {
        description: 'Displays the placeholder if the item is not in the list',
    },
    onBlurHandler: {
        description: 'Runs custom callback when the user clicks outside the dropdown menu',
    },
    onClickDropdownHandler: {
        description: 'Runs custom callback when the user clicks on the dropdown menu',
    },
    onInputChange: {
        description: 'Runs custom callback when the user types inside the dropdown input field',
    },
    onItemSelection: {
        description: 'Runs custom callback when the user selects an item',
    },
    placeholder: {
        description: 'Displays a placeholder for the input field',
    },
    value: {
        description: 'Using this property we can control dropdown value outside the component',
    },
};
