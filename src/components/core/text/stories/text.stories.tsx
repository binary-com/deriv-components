import type { Story } from '@storybook/react';
import { TextProps, type_array, align_array } from '../text';
import Text from '../text';

export default {
    title: 'Text',
    component: Text,
    argTypes: {
        type: {
            control: { type: 'select', options: type_array },
            description:
                'Controls the font size and line height of the text component mapping to the configuation in Figma.',
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
        as: {
            description: 'The HTML element to render as.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'p' },
            },
            control: 'none',
        },
        bold: {
            description: 'If set to `true`, text will bolded.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
    },
};

export const Controls: Story<TextProps> = (args) => <Text {...args}>{args.children}</Text>;
Controls.args = {
    children: 'Text',
    as: 'p',
    type: 'subtitle-1',
    bold: true,
    align: 'left',
};
