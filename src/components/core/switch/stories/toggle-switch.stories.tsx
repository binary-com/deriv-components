import { ComponentMeta, ComponentStory } from '@storybook/react';
import Switch, { SwitchStory } from '../toggle-switch';

export default {
    title: 'Switch',
    component: Switch,
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
        dark: {
            description: 'If set to `true`, toggleSwitch will be displayed as per day mode',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        default_checked: {
            description: 'If set to `true`, by default the switch will be on',
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        id: {
            description: 'id for the switch',
            defaultValue: 'switch',
        },
        class_name_label: {
            description: 'Class to be applied for label',
            defaultValue: '',
        },
        label: {
            description: 'Label 1',
            defaultValue: 'Label 1',
        },
        handleChange: {
            defaultValue: (checked_value: boolean) => checked_value,
        },
    },
} as ComponentMeta<typeof SwitchStory>;

const Template: ComponentStory<typeof SwitchStory> = (args) => <Switch {...args}></Switch>;

export const SwitchLight = Template.bind({});

export const DarkSwitch = Template.bind({});
DarkSwitch.args = {
    dark: true,
};

DarkSwitch.parameters = {
    backgrounds: { default: 'dark' },
};
