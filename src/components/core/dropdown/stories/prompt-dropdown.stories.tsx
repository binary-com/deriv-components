import React from 'react';
import QuestionMarkIcon from '@assets/svg/question-mark-icon.svg';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PromptDropdown } from '../dropdown-variants/prompt-dropdown';
import { TListItem } from '../types';
import { DropdownBaseStoriesArgTypes, DropdownStoryDecorator, accounts_prompt, names_combobox } from './utils';

export default {
    title: 'Dropdown variants / Prompt dropdown',
    component: PromptDropdown,
    decorators: [DropdownStoryDecorator],
    argTypes: { ...DropdownBaseStoriesArgTypes },
} as ComponentMeta<typeof PromptDropdown>;

const TemplateWithoutDefaultValue: ComponentStory<typeof PromptDropdown> = (args) => {
    const [value, setValue] = React.useState<string>('');

    const onItemSelection = (item: TListItem) => {
        setValue(item.value);
    };

    return <PromptDropdown {...args} value={value} onItemSelection={onItemSelection} />;
};

const TemplateWithDefaultValue: ComponentStory<typeof PromptDropdown> = (args) => {
    const [value, setValue] = React.useState<string>('Mike');

    const onItemSelection = (item: TListItem) => {
        setValue(item.value);
    };

    return <PromptDropdown {...args} value={value} onItemSelection={onItemSelection} />;
};

export const DefaultDropdownPromptAccounts = TemplateWithoutDefaultValue.bind({});
DefaultDropdownPromptAccounts.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    label: 'Accounts',
    list: accounts_prompt,
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
};

export const DefaultDropdownPromptNames = TemplateWithoutDefaultValue.bind({});
DefaultDropdownPromptNames.args = {
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

export const DefaultDropdownPromptError = TemplateWithDefaultValue.bind({});
DefaultDropdownPromptError.args = {
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

export const DefaultDropdownPromptDisabled = TemplateWithDefaultValue.bind({});
DefaultDropdownPromptDisabled.args = {
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

export const DropdownPromptWithPrefixIcon = TemplateWithDefaultValue.bind({});
DropdownPromptWithPrefixIcon.args = {
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

export const DropdownPromptWithPrefixIconAndHelperMessage = TemplateWithDefaultValue.bind({});
DropdownPromptWithPrefixIconAndHelperMessage.args = {
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
