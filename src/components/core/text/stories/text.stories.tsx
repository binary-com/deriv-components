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

// export const FullList = () => {
//     return (
//         <>
//             <Text as="h1" type="hero">
//                 Hero banner text
//             </Text>
//             <Text as="h1" type="heading-1">
//                 Heading-1 text
//             </Text>
//             <Text as="h2" type="heading-2">
//                 Heading-2 text
//             </Text>
//             <Text as="h3" type="heading-3">
//                 Heading-3 text
//             </Text>
//             <Text as="h4" type="subtitle-1">
//                 Subtitle-1 text
//             </Text>
//             <Text as="p" type="paragraph-1">
//                 Paragraph-1 text
//             </Text>
//             <Text as="p" type="paragraph-2">
//                 Paragraph-2 text
//             </Text>
//             <Text as="p" type="small">
//                 Small text
//             </Text>
//             <Text as="p" type="extra-small">
//                 Extra small text
//             </Text>
//         </>
//     );
// };

export const Controls: Story<TextProps> = (args) => <Text {...args}>{args.children}</Text>;
Controls.args = {
    children: 'Text',
    as: 'p',
    type: 'subtitle-1',
    bold: true,
    align: 'left',
};
