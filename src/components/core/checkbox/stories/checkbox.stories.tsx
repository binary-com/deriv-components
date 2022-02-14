import type { Meta, Story } from '@storybook/react';
import type { CheckboxProps } from '../checkbox';
import Checkbox from '../checkbox';

export default {
    title: 'Checkbox',
    argTypes: {
        dark: {
            description: 'If set to `dark`, checkbox border and text will set to `dark` theme  ',
            defaultValue: `dark`,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        indetermine: {
            description: 'If set to `true`, it will show `indetermine` checkbox',
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
            description: 'If set to `small`, checkbox will show small checkbox and label.',
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
    check: false,
    size: 'default',
};

export const Dark = Template.bind({});
Dark.args = {
    children: 'Label',
    dark: true,
    check: false,
    size: 'default',
};

export const Indetermine = Template.bind({});
Indetermine.args = {
    children: 'Label',
    dark: true,
    indetermine: false,
    size: 'default',
};
