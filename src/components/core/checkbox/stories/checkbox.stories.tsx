import type { Meta, Story } from '@storybook/react';
import type { CheckboxProps } from '../checkbox';
import Checkbox from '../checkbox';

export default {
    title: 'Checkbox',
    argTypes: {
        dark: {
            description: 'If set to `true`, checkbox border and text will be set to `dark` theme',
            defaultValue: `dark`,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        indetermine: {
            description:
                'If set to `true`, checkbox will be in the `indeterminate` state. Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        check: {
            description: 'If set to `true`, checkbox will show checked',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        size: {
            control: {
                type: 'select',
                options: {
                    default: 'default',
                    small: 'small',
                },
            },
            description: 'Controls the sizing of the checkbox and label.',
            defaultValue: 'default',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            },
        },
    },
} as Meta<CheckboxProps>;

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args}>{args.children}</Checkbox>;

export const Light = Template.bind({});
Light.args = {
    children: 'Label',
    dark: false,
    check: true,
    size: 'default',
};

export const Dark = Template.bind({});
Dark.args = {
    children: 'Label',
    dark: true,
    check: true,
    size: 'default',
};

export const Indetermine = Template.bind({});
Indetermine.args = {
    children: 'Label',
    dark: true,
    indetermine: true,
    size: 'default',
};
