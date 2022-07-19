import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckboxList, { CheckboxListStory, TCheckBoxType } from '@core/checkbox-list/checkbox-list';

const handleChange = (check_boxes: TCheckBoxType) => check_boxes;

export default {
    title: 'Checkbox-list',
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
            description: 'If set to `true`, checkbox border and text will be set to `dark` theme',
            defaultValue: `dark`,
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
        check_boxes: {
            description: 'Labels and values of checkbox to be displayed',
            defaultValue: [{ label: 'label 1', check: true }, { label: 'label 2' }, { label: 'label 3', check: true }],
        },
        handleChange: {
            defaultValue: handleChange,
        },
    },
} as ComponentMeta<typeof CheckboxListStory>;

const Template: ComponentStory<typeof CheckboxListStory> = (args) => <CheckboxList {...args} />;

export const Light = Template.bind({});
Light.args = {
    size: 'default',
    dark: false,
    check_boxes: [
        { label: 'label 1', check: true },
        { label: 'label 2', check: true },
    ],
};

export const Dark = Template.bind({});
Dark.args = {
    children: 'Label',
    size: 'default',
    dark: true,
    check_boxes: [{ label: 'label 1', check: true }, { label: 'label 2' }, { label: 'label 3' }],
};

Dark.parameters = {
    backgrounds: { default: 'dark' },
};
