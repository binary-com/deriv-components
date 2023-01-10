import React from 'react';
import type { Meta, Story } from '@storybook/react';
import LocationPin from '@assets/svg/location-pin.svg';
import type { TextFieldProps } from '../text-field';
import TextField from '../text-field';

export default {
    title: 'TextField',
    argTypes: {
        label: {
            description: 'Displays a label for the input field',
        },
        button_label: {
            description: 'Displays the provided button',
        },
        inline_prefix_element: {
            description: 'Displays the provided inline-prefix element',
        },
        inline_suffix_element: {
            description: 'Displays the provided inline-suffix element',
        },
        is_borderless: {
            description: 'Removes border from labelless textfields',
        },
        hint: {
            description: 'Displays a hint text',
        },
        error: {
            description: 'Displays an error text',
        },
        success: {
            description: 'Displays a success text',
        },
        max_length: {
            description: 'Max length that the field can accept',
        },
        onButtonClickHandler: {
            description: 'Runs custom callback when the button is clicked',
        },
        type: {
            defaultValue: 'text',
            control: {
                type: 'select',
                options: ['email', 'number', 'password', 'tel', 'text', 'textarea'],
            },
            description: 'Type of input field',
        },
        disabled: {
            description:
                'Extends the style of HTML [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) attribute.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        readOnly: {
            description: 'Makes the field still focusable and functional but value cannot be edited',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        dark: {
            description: 'Displays content in dark theme',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
    },
} as Meta<TextFieldProps>;

const Template: Story<TextFieldProps> = (args) => <TextField {...args}></TextField>;

export const Test = Template.bind({});
Test.args = {
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    placeholder: 'Search',
    disabled: false,
    dark: false,
    readOnly: false,
};

export const SimpleTextField = Template.bind({});
SimpleTextField.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    disabled: false,
    dark: false,
    readOnly: false,
};

export const TextFieldWithHint = Template.bind({});
TextFieldWithHint.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithCharacterLimit = Template.bind({});
TextFieldWithCharacterLimit.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    max_length: 10,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithSuffixText = Template.bind({});
TextFieldWithSuffixText.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    dark: false,
    readOnly: false,
};

export const TextFieldWithHintAndSuffixText = Template.bind({});
TextFieldWithHintAndSuffixText.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithCharacterLimitAndSuffixText = Template.bind({});
TextFieldWithCharacterLimitAndSuffixText.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <div>USD</div>,
    max_length: 10,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithSuffixIcon = Template.bind({});
TextFieldWithSuffixIcon.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithSuffixIconAndHintText = Template.bind({});
TextFieldWithSuffixIconAndHintText.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithSuffixIconAndCharacterLimit = Template.bind({});
TextFieldWithSuffixIconAndCharacterLimit.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    max_length: 10,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const SimpleTextAreaField = Template.bind({});
SimpleTextAreaField.args = {
    label: 'Label',
    type: 'textarea',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    disabled: false,
    readOnly: false,
    dark: false,
};

export const SimpleTextAreaFieldWithHint = Template.bind({});
SimpleTextAreaFieldWithHint.args = {
    label: 'Label',
    type: 'textarea',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    disabled: false,
    readOnly: false,
    dark: false,
};

export const SimpleTextAreaFieldWithCharacterLimit = Template.bind({});
SimpleTextAreaFieldWithCharacterLimit.args = {
    label: 'Label',
    type: 'textarea',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    max_length: 250,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const SimpleTextAreaFieldWithHintAndCharacterLimit = Template.bind({});
SimpleTextAreaFieldWithHintAndCharacterLimit.args = {
    label: 'Label',
    type: 'textarea',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    max_length: 250,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithButton = Template.bind({});
TextFieldWithButton.args = {
    button_label: 'Button',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    disabled: false,
    dark: false,
    readOnly: false,
    onButtonClickHandler: () => console.log('button_clicked'),
};

export const TextFieldWithButtonAndHintText = Template.bind({});
TextFieldWithButtonAndHintText.args = {
    button_label: 'Button',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    disabled: false,
    dark: false,
    readOnly: false,
    onButtonClickHandler: () => console.log('button_clicked'),
};

export const TextFieldWithButtonAndCharacterLimit = Template.bind({});
TextFieldWithButtonAndCharacterLimit.args = {
    button_label: 'Button',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    max_length: 10,
    disabled: false,
    dark: false,
    readOnly: false,
    onButtonClickHandler: () => console.log('button_clicked'),
};

export const TextFieldWithButtonAndSuffixText = Template.bind({});
TextFieldWithButtonAndSuffixText.args = {
    button_label: 'Button',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    dark: false,
    readOnly: false,
    onButtonClickHandler: () => console.log('button_clicked'),
};

export const TextFieldWithButtonAndHintMessageAndSuffixText = Template.bind({});
TextFieldWithButtonAndHintMessageAndSuffixText.args = {
    button_label: 'Button',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    dark: false,
    readOnly: false,
    onButtonClickHandler: () => console.log('button_clicked'),
};

export const TextFieldWithButtonAndCharacterLimitAndSuffixText = Template.bind({});
TextFieldWithButtonAndCharacterLimitAndSuffixText.args = {
    button_label: 'Button',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    max_length: 10,
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    dark: false,
    readOnly: false,
    onButtonClickHandler: () => console.log('button_clicked'),
};

export const SimplePasswordField = Template.bind({});
SimplePasswordField.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithHintMessage = Template.bind({});
PasswordFieldWithHintMessage.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithCharacterLimit = Template.bind({});
PasswordFieldWithCharacterLimit.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    max_length: 10,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithSuffixText = Template.bind({});
PasswordFieldWithSuffixText.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithSuffixTextAndHintMessage = Template.bind({});
PasswordFieldWithSuffixTextAndHintMessage.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithSuffixTextAndCharacterLimit = Template.bind({});
PasswordFieldWithSuffixTextAndCharacterLimit.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    max_length: 10,
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithSuffixIcon = Template.bind({});
PasswordFieldWithSuffixIcon.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithSuffixIconAndHintMessage = Template.bind({});
PasswordFieldWithSuffixIconAndHintMessage.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordFieldWithSuffixIconAndCharacterLimit = Template.bind({});
PasswordFieldWithSuffixIconAndCharacterLimit.args = {
    label: 'Label',
    type: 'password',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    max_length: 10,
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    readOnly: false,
    dark: false,
};
