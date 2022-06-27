import { ComponentMeta, ComponentStory } from '@storybook/react';
import Button, { button_color_type, button_size_type, ButtonStory } from '../button';

export default {
    title: 'Button',
    component: Button,
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#0E0E0E' },
            ],
        },
    },
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
                options: button_color_type,
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
                options: button_size_type,
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
} as ComponentMeta<typeof ButtonStory>;

const Template: ComponentStory<typeof ButtonStory> = (args) => <Button {...args}>{args.children}</Button>;

export const Accessible = Template.bind({});
Accessible.args = {
    color: 'secondary',
    size: 'large',
    children: 'Button',
};

export const Inaccessible = Template.bind({});
Inaccessible.args = {
    style: { backgroundColor: 'red', color: 'darkRed' },
    children: 'Button',
};
Inaccessible.parameters = {
    a11y: {
        config: {
            rules: [{ id: 'color-contrast', enabled: true }],
        },
    },
};

export const Primary = Template.bind({});
Primary.args = {
    block: false,
    dark: false,
    color: 'primary',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    block: false,
    dark: false,
    color: 'primary-light',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
    block: false,
    dark: false,
    color: 'secondary',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    block: false,
    dark: true,
    color: 'secondary',
    size: 'medium',
    disabled: false,
    children: 'Button',
};
SecondaryDark.parameters = {
    backgrounds: { default: 'dark' },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    block: false,
    dark: false,
    color: 'tertiary',
    size: 'medium',
    disabled: false,
    children: 'Button',
};

export const Monochrome = Template.bind({});
Monochrome.args = {
    block: false,
    dark: false,
    color: 'monochrome',
    size: 'medium',
    disabled: false,
    children: 'Button',
};
