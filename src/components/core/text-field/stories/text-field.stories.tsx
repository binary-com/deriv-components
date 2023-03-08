import React from 'react';
import type { Meta, Story } from '@storybook/react';
import LocationPin from '@assets/svg/location-pin.svg';
import type { TextFieldProps } from '../text-field';
import TextField from '../text-field';

export default {
    title: 'TextField',
    argTypes: {
        align_value: {
            defaultValue: 'left',
            control: {
                type: 'select',
                options: ['left', 'center', 'right'],
            },
            description: 'Text alignment',
        },
        label: {
            description: 'Displays a label for the input field',
        },
        button_label: {
            description: 'Displays the provided button',
        },
        inline_prefix_element: {
            description: 'Displays the provided inline-prefix element',
        },
        currency_suffix_element: {
            description: 'Displays the provided currency-suffix element',
        },
        inline_suffix_element: {
            description: 'Displays the provided inline-suffix element',
        },
        is_borderless: {
            description: 'Removes border from labelless textfields',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        has_password_meter: {
            description: 'Adds passowrd strength meter',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        hint_text: {
            description: 'Displays a hint text, error text and success text',
            table: {
                type: { summary: 'object' },
            },
        },
        max_length: {
            description: 'Max length that the field can accept',
        },
        number_of_badges: {
            description: 'The number of badges a user can add',
            control: 'number',
            defaultValue: 0,
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
        with_badges: {
            description: 'Allows to create badges in input field',
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
        default_badges: {
            table: {
                disable: true,
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

export const DisabledTextField = Template.bind({});
DisabledTextField.args = {
    value: 'George',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    max_length: 10,
    inline_suffix_element: <div>USD</div>,
    disabled: true,
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

export const DisabledTextAreaField = Template.bind({});
DisabledTextAreaField.args = {
    value: 'George',
    label: 'Label',
    type: 'textarea',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    max_length: 250,
    disabled: true,
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

export const DisabledTextFieldWithButton = Template.bind({});
DisabledTextFieldWithButton.args = {
    button_label: 'Button',
    value: 'George',
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    max_length: 10,
    inline_suffix_element: <div>USD</div>,
    disabled: true,
    readOnly: false,
    dark: false,
};

export const SimplePasswordField = Template.bind({});
SimplePasswordField.args = {
    label: 'Label',
    type: 'password',
    has_password_meter: true,
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
    has_password_meter: true,
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
    has_password_meter: true,
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
    has_password_meter: true,
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
    has_password_meter: true,
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
    has_password_meter: true,
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
    has_password_meter: true,
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
    has_password_meter: true,
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
    has_password_meter: true,
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

export const DisabledPasswordTextField = Template.bind({});
DisabledPasswordTextField.args = {
    value: 'verylongpassword',
    label: 'Label',
    type: 'password',
    has_password_meter: true,
    hint_text: {
        success: '',
        error: '',
        hint: 'Helper message',
    },
    max_length: 10,
    inline_suffix_element: <div>USD</div>,
    disabled: true,
    readOnly: false,
    dark: false,
};

export const TextFieldWithBadges = Template.bind({});
TextFieldWithBadges.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    with_badges: true,
    number_of_badges: 5,
    disabled: false,
    readOnly: false,
    dark: false,
};

export const TextFieldWithPredefinedBadges = Template.bind({});
TextFieldWithPredefinedBadges.args = {
    label: 'Label',
    type: 'text',
    hint_text: {
        success: '',
        error: '',
        hint: '',
    },
    with_badges: true,
    number_of_badges: 5,
    disabled: false,
    readOnly: false,
    dark: false,
    default_badges: [
        { id: '1', label: 'George' },
        { id: '2', label: 'is' },
        { id: '3', label: 'occured' },
    ],
};

export const LabellessTextFieldWithoutBorder = Template.bind({});
LabellessTextFieldWithoutBorder.args = {
    is_borderless: true,
    placeholder: 'Search',
    type: 'text',
    inline_prefix_element: <img src={LocationPin} alt="location-icon" />,
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    dark: false,
    readOnly: false,
};

export const LabellessTextFieldWithoutBorderAndCurrencySuffix = Template.bind({});
LabellessTextFieldWithoutBorderAndCurrencySuffix.args = {
    is_borderless: true,
    value: 10,
    align_value: 'center',
    currency_suffix_element: 'USD',
    type: 'text',
    inline_prefix_element: <img src={LocationPin} alt="location-icon" />,
    inline_suffix_element: <img src={LocationPin} alt="location-icon" />,
    disabled: false,
    dark: false,
    readOnly: false,
};

export const LabellessTextFieldWithBorderAndTransparentBackground = Template.bind({});
LabellessTextFieldWithBorderAndTransparentBackground.args = {
    placeholder: 'Search',
    type: 'text',
    inline_prefix_element: <img src={LocationPin} alt="location-icon" />,
    inline_suffix_element: <div>USD</div>,
    disabled: false,
    dark: false,
    readOnly: false,
};
