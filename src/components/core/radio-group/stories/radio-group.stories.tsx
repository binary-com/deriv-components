import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioGroup, { RadioGroupStory } from '../radio-group';

export default {
    title: 'RadioGroup',
    component: RadioGroup,
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
            description: 'If set to `true`, radio group color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        disabled: {
            description: 'If set to `true`, radio group will be disabled',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        handleChange: {
            defaultValue: (value: string) => value,
        },
        options: {
            description: 'The options to be displayed in radio group',
        },
    },
} as ComponentMeta<typeof RadioGroupStory>;

const Template: ComponentStory<typeof RadioGroupStory> = (args) => <RadioGroup {...args} />;

export const LightRadioGroup = Template.bind({});
LightRadioGroup.args = {
    dark: false,
    selected_value: 'label1',
    disabled: true,
    options: [
        {
            id: '1',
            label: 'Label 1',
            value: 'label1',
        },
        {
            id: '2',
            label: 'Label 2',
            value: 'label2',
        },
    ],
};

export const DarkRadioGroup = Template.bind({});
DarkRadioGroup.args = {
    dark: true,
    selected_value: 'label2',
    options: [
        {
            id: '1',
            label: 'Label 1',
            value: 'label1',
        },
        {
            id: '2',
            label: 'Label 2',
            value: 'label2',
        },
    ],
};

DarkRadioGroup.parameters = {
    backgrounds: { default: 'dark' },
};
