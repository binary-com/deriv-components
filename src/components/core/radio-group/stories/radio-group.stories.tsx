import { ComponentMeta, ComponentStory } from '@storybook/react';
import RadioGroup, { RadioGroupStory } from '../radio-group';

export default {
    title: 'RadioGroup',
    component: RadioGroup,
    argTypes: {
        disabled: {
            description: 'If set to `true`, radio group will be disabled',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        handleChange: {
            control: false,
            action: 'handleChange',
        },
        options: {
            description: 'The options to be displayed in radio group',
        },
    },
} as ComponentMeta<typeof RadioGroupStory>;

const Template: ComponentStory<typeof RadioGroupStory> = (args) => <RadioGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
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
