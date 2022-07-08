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
        readonly: {
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
    label: 'Text field',
    type: 'text',
    success: '',
    error: '',
    hint: '',
    disabled: false,
    dark: false,
    readonly: false,
};

export const TextFieldWithSuffixText = Template.bind({});
TextFieldWithSuffixText.args = {
    label: 'Currency',
    type: 'number',
    success: '',
    error: '',
    hint: '',
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    dark: false,
    readonly: false,
};

export const TextFieldWithPrefixText = Template.bind({});
TextFieldWithPrefixText.args = {
    label: 'Phone no.',
    type: 'tel',
    success: '',
    error: '',
    hint: '',
    inline_prefix_element: <div>+971</div>,
    disabled: false,
    readonly: false,
    dark: false,
};

export const TextFieldWithSuffixIcon = Template.bind({});
TextFieldWithSuffixIcon.args = {
    label: 'Location',
    type: 'text',
    success: '',
    error: '',
    hint: '',
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    readonly: false,
    dark: false,
};

export const TextFieldWithCharacterLimit = Template.bind({});
TextFieldWithCharacterLimit.args = {
    label: 'Description',
    type: 'text',
    success: '',
    error: '',
    hint: '',
    max_length: 10,
    disabled: false,
    readonly: false,
    dark: false,
};

export const PasswordField = Template.bind({});
PasswordField.args = {
    label: 'Password',
    type: 'password',
    success: '',
    error: '',
    hint: '',
    disabled: false,
    readonly: false,
    dark: false,
};

export const TextAreaField = Template.bind({});
TextAreaField.args = {
    label: 'Instruction',
    type: 'textarea',
    hint: '',
    max_length: 250,
    disabled: false,
    readonly: false,
    dark: false,
};
