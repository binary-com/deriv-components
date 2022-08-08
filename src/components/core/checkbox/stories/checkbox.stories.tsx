import { ComponentMeta, ComponentStory } from '@storybook/react';
import Checkbox, { CheckboxStory } from '../checkbox';

export default {
    title: 'Checkbox',
    component: Checkbox,
    argTypes: {
        indetermine: {
            description:
                'If set to `true`, checkbox will be in the `indeterminate` state. Ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#attr-indeterminate',
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
            description: 'Controls the sizing of the checkbox and label.',
            defaultValue: 'default',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            },
        },
        handleChange: {
            control: false,
            action: 'handleChange',
        },
    },
} as ComponentMeta<typeof CheckboxStory>;

const Template: ComponentStory<typeof CheckboxStory> = (args) => <Checkbox {...args}>{args.children}</Checkbox>;

export const Light = Template.bind({});
Light.args = {
    children: 'Label',
    size: 'default',
    check: true,
    indetermine: false,
};

export const Dark = Template.bind({});
Dark.args = {
    children: 'Label',
    size: 'default',
    check: true,
    indetermine: false,
};

export const Indetermine = Template.bind({});
Indetermine.args = {
    children: 'Label',
    size: 'default',
    indetermine: true,
    check: false,
};
