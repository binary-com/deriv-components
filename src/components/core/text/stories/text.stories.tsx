import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { TextStory, type_array, align_array, color_array } from '../text';
import Text from '../text';

export default {
    title: 'Text',
    component: Text,
    argTypes: {
        as: {
            description: 'The HTML element to render as.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'p' },
            },
            control: 'none',
        },
        color: {
            control: { type: 'select', options: color_array },
            description: 'Controls the color of the text component mapping to the configuration in Figma.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'prominent' },
            },
        },
        type: {
            control: { type: 'select', options: type_array },
            description:
                'Controls the font size and line height of the text component mapping to the configuration in Figma.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'subtitle-1' },
            },
        },
        align: {
            control: { type: 'select', options: align_array },
            description: 'Sets the text alignment.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
            },
        },
        bold: {
            description: 'If set to `true`, text will bolded.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
    },
} as ComponentMeta<typeof TextStory>;

const Template: ComponentStory<typeof TextStory> = (args) => <Text {...args}>{args.children}</Text>;

export const Controls = Template.bind({});
Controls.args = {
    children: 'Text',
    type: 'subtitle-1',
    color: 'prominent',
    bold: false,
    align: 'left',
};
Controls.parameters = {
    controls: {
        exclude: ['dark', 'as'],
    },
};
