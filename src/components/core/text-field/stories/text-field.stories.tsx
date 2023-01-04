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
        onChange: {
            description: 'On button click',
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

export const LabellessTextField = Template.bind({});
LabellessTextField.args = {
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
    label: 'Currency',
    type: 'number',
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

export const TextFieldWithButton = Template.bind({});
TextFieldWithButton.args = {
    button_label: 'Button',
    label: 'Currency',
    type: 'number',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    dark: false,
    readOnly: false,
    onButtonClickHandler: () => console.log('button'),
    onChange: (e) => console.log(e),
};

export const TextFieldWithSuffixIcon = Template.bind({});
TextFieldWithSuffixIcon.args = {
    label: 'Location',
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

export const TextFieldWithSuccess = Template.bind({});
TextFieldWithSuccess.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: 'Success message',
        error: '',
        hint: '',
    },
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithError = Template.bind({});
TextFieldWithError.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: 'Error message',
        hint: '',
    },
    disabled: false,
    readOnly: false,
    dark: false,
};

export const PasswordField = Template.bind({});
PasswordField.args = {
    label: 'Password',
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

export const TextAreaField = Template.bind({});
TextAreaField.args = {
    label: 'Instruction',
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
