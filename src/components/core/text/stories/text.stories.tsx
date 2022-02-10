import type { Story } from '@storybook/react';
import { TextProps, type_array, align_array } from '../text';
import Text from '../text';

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'Text',
    component: Text,
    argTypes: {
        type: {
            control: { type: 'select', options: type_array },
        },
        align: {
            control: { type: 'select', options: align_array },
        },
    },
};

export const FullList = () => {
    return (
        <>
            <Text as="h1" type="hero">
                Hero banner text
            </Text>
            <Text as="h1" type="heading-1">
                Heading-1 text
            </Text>
            <Text as="h2" type="heading-2">
                Heading-2 text
            </Text>
            <Text as="h3" type="heading-3">
                Heading-3 text
            </Text>
            <Text as="h4" type="subtitle-1">
                Subtitle-1 text
            </Text>
            <Text as="p" type="paragraph-1">
                Paragraph-1 text
            </Text>
            <Text as="p" type="paragraph-2">
                Paragraph-2 text
            </Text>
            <Text as="p" type="small">
                Small text
            </Text>
            <Text as="p" type="extra-small">
                Extra small text
            </Text>
        </>
    );
};

export const Controls: Story<TextProps> = (args) => <Text {...args}>{args.children}</Text>;
Controls.args = {
    children: 'Text',
    as: 'p',
    type: 'hero',
    bold: true,
    align: 'left',
};
