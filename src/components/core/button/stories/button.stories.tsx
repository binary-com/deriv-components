import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import Button from '../button';

export default {
    title: 'Button',
    component: Button,

    argTypes: {
        block: {
            description: 'If set to `true`, button width will be full-width relative to the container size.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },

        onClick: {
            description: 'onClick event handler for the button',
            control: false,
            action: 'onClick',
        },

        color: {
            control: {
                type: 'select',
                options: ['primary', 'primary-light', 'secondary', 'tertiary', 'monochrome'],
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
                options: ['small', 'medium', 'large', 'hero'],
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
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    block: false,
    color: 'primary',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    block: false,
    color: 'primary-light',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
    block: false,
    color: 'secondary',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    block: false,
    color: 'tertiary',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const Monochrome = Template.bind({});
Monochrome.args = {
    block: false,
    color: 'monochrome',
    size: 'medium',
    disabled: false,
    children: 'Button',
};
