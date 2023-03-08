import React from 'react';
import QuestionMarkIcon from '@assets/svg/question-mark-icon.svg';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ComboboxDropdown } from '../dropdown-variants/combobox-dropdown';
import { TListItem } from '../types';
import { DropdownBaseStoriesArgTypes, DropdownStoryDecorator, names_combobox } from './utils';

export default {
    title: 'Dropdown variants / Combobox dropdown',
    component: ComboboxDropdown,
    decorators: [DropdownStoryDecorator],
    argTypes: { ...DropdownBaseStoriesArgTypes },
} as ComponentMeta<typeof ComboboxDropdown>;

const TemplateWithoutDefaultValue: ComponentStory<typeof ComboboxDropdown> = (args) => {
    const [value, setValue] = React.useState('');

    const onItemSelection = (item: TListItem) => {
        setValue(item.value);
    };

    return <ComboboxDropdown {...args} value={value} onItemSelection={onItemSelection} />;
};

const TemplateWithDefaultValue: ComponentStory<typeof ComboboxDropdown> = (args) => {
    const [value, setValue] = React.useState('Mike');

    const onItemSelection = (item: TListItem) => {
        setValue(item.value);
    };

    return <ComboboxDropdown {...args} value={value} onItemSelection={onItemSelection} />;
};

export const DefaultDropdownCombobox = TemplateWithoutDefaultValue.bind({});
DefaultDropdownCombobox.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    label: 'Names',
    list: names_combobox,
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
};

export const DefaultDropdownComboboxWithError = TemplateWithDefaultValue.bind({});
DefaultDropdownComboboxWithError.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: 'Error is occured',
        hint: '',
    },
    label: 'Names',
    list: names_combobox,
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
};

export const DefaultDropdownComboboxDisabled = TemplateWithDefaultValue.bind({});
DefaultDropdownComboboxDisabled.args = {
    dark: false,
    disabled: true,
    hint_text: {
        error: '',
        hint: '',
    },
    label: 'Names',
    list: names_combobox,
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
};

export const DropdownComboboxWithPrefixIcon = TemplateWithDefaultValue.bind({});
DropdownComboboxWithPrefixIcon.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    inline_prefix_element: <img src={QuestionMarkIcon} alt="question-mark-icon" />,
    label: 'Names',
    list: names_combobox,
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
};

export const DropdownComboboxWithPrefixIconAndHelperMessage = TemplateWithDefaultValue.bind({});
DropdownComboboxWithPrefixIconAndHelperMessage.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: 'This is a helper message',
    },
    inline_prefix_element: <img src={QuestionMarkIcon} alt="question-mark-icon" />,
    label: 'Names',
    list: names_combobox,
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
};
