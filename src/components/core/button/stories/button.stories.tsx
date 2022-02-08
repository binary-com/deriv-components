import type { Meta, Story } from '@storybook/react';
import type { ButtonProps } from '../button';
import Button from '../button';

export default {
    title: 'Button',
    argTypes: {
        block: {
            description: 'If set to `true`, button width will be full-width relative to the container size.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        dark: {
            description: 'If set to `true`, button color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        color: {
            control: {
                type: 'select',
                options: {
                    primary: 'primary',
                    primary_light: 'primary-light',
                    secondary: 'secondary',
                    tertiary: 'tertiary',
                },
            },
            description: '`color` controls the color sets of the button.',
            defaultValue: 'primary',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'primary' },
            },
        },
        size: {
            control: {
                type: 'select',
                options: {
                    small: 'small',
                    medium: 'medium',
                    large: 'large',
                    hero: 'hero',
                },
            },
            description:
                "`size` actually controls the padding of the button. It will always fit to it's children size and align it to the center.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
            },
        },
        disabled: {
            description:
                'Extends the style of HTML [disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) attribute.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
    },
} as Meta<ButtonProps>;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Example button</Button>;

export const Primary = Template.bind({});
Primary.args = {
    block: false,
    dark: false,
    color: 'primary',
    size: 'medium',
    disabled: false,
};

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    block: false,
    dark: false,
    color: 'primary-light',
    size: 'medium',
    disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
    block: false,
    dark: false,
    color: 'secondary',
    size: 'medium',
    disabled: false,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    block: false,
    dark: false,
    color: 'tertiary',
    size: 'medium',
    disabled: false,
};
