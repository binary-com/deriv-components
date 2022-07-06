import type { Meta, Story } from '@storybook/react';
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
    },
} as Meta<TextFieldProps>;

const Template: Story<TextFieldProps> = (args) => <TextField {...args}></TextField>;

export const TextFieldTesting = Template.bind({});
