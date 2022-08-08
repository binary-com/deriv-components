import { ComponentMeta, ComponentStory } from '@storybook/react';
import ToggleSwitch, { ToggleSwitchStory } from '../toggle-switch';

export default {
    title: 'Switch',
    component: ToggleSwitch,
    argTypes: {
        disabled: {
            description: 'If set to `true`, toggleSwitch will be disabled',
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
} as ComponentMeta<typeof ToggleSwitchStory>;

const Template: ComponentStory<typeof ToggleSwitchStory> = (args) => <ToggleSwitch {...args}></ToggleSwitch>;

export const Default = Template.bind({});
