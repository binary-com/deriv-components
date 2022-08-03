import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckboxList, { CheckboxListStory } from '@core/checkbox-list/checkbox-list';

export default {
    title: 'Checkbox-list',

    argTypes: {
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
            control: false,
            action: 'handleChange',
        },
    },
} as ComponentMeta<typeof CheckboxListStory>;

const Template: ComponentStory<typeof CheckboxListStory> = (args) => <CheckboxList {...args} />;

export const Light = Template.bind({});
Light.args = {
    size: 'default',
    check_boxes: [{ label: 'label 1', check: true }, { label: 'label 2' }],
};

export const Dark = Template.bind({});
Dark.args = {
    children: 'Label',
    size: 'default',
    check_boxes: [{ label: 'label 1', check: true }, { label: 'label 2' }, { label: 'label 3' }],
};

export const AllCheckboxDisabled = Template.bind({});
AllCheckboxDisabled.args = {
    size: 'default',
    check_boxes: [
        { label: 'label 1', check: true, disabled: true },
        { label: 'label 2', disabled: true },
    ],
};
