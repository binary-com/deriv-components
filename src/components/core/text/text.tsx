import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

const Text = styled('p', {
    color: '$greyLight700',

    variants: {
        bold: {
            true: {
                fontWeight: '$bold',
            },
        },
        align: {
            left: {
                textAlign: 'left',
            },
            center: {
                textAlign: 'center',
            },
            right: {
                textAlign: 'right',
            },
        },
        type: {
            hero: {
                fontSize: '$6xl',
                lineHeight: '$lineHeight100',

                '@mobile': {
                    fontSize: '$3xl',
                    lineHeight: '$lineHeight50',
                },
            },
            'heading-1': {
                fontSize: '$5xl',
                lineHeight: '$lineHeight80',

                '@mobile': {
                    fontSize: '2xl',
                    lineHeight: '$lineHeight40',
                },
            },
            'heading-2': {
                fontSize: '$4xl',
                lineHeight: '$lineHeight60',

                '@mobile': {
                    fontSize: '$xl',
                    lineHeight: '$lineHeight34',
                },
            },
            'heading-3': {
                fontSize: '$3xl',
                lineHeight: '$lineHeight40',

                '@mobile': {
                    fontSize: '$lg',
                    lineHeight: '$lineHeight30',
                },
            },
            'subtitle-1': {
                fontSize: '$lg',
                lineHeight: '$lineHeight36',

                '@mobile': {
                    fontSize: '$sm',
                    lineHeight: '$lineHeight26',
                },
            },
            'subtitle-2': {
                fontSize: '$md',
                lineHeight: '$lineHeight30',

                '@mobile': {
                    fontSize: '$xs',
                    lineHeight: '$lineHeight24',
                },
            },
            'paragraph-1': {
                fontSize: '$xs',
                lineHeight: '$lineHeight24',

                '@mobile': {
                    fontSize: '$2xs',
                    lineHeight: '$lineHeight20',
                },
            },
            'paragraph-2': {
                fontSize: '$2xs',
                lineHeight: '$lineHeight20',

                '@mobile': {
                    fontSize: '$3xs',
                    lineHeight: '$lineHeight18',
                },
            },
            small: {
                fontSize: '$3xs',
                lineHeight: '$lineHeight18',

                '@mobile': {
                    fontSize: '$4xs',
                    lineHeight: '$lineHeight14',
                },
            },
            'extra-small': {
                fontSize: '$4xs',
                lineHeight: '$lineHeight14',

                '@mobile': {
                    fontSize: '$5xs',
                    lineHeight: '$lineHeight12',
                },
            },
        },
    },
    defaultVariants: {
        type: 'subtitle-1',
        align: 'left',
        bold: true,
    },
});

export const type_array = [
    'hero',
    'heading-1',
    'heading-2',
    'heading-3',
    'subtitle-1',
    'subtitle-2',
    'paragraph-1',
    'paragraph-2',
    'small',
    'extra-small',
];

export const align_array = ['left', 'center', 'right'];

export default Text;

type NativeParagraphProps = React.ComponentPropsWithoutRef<'p'>;

// Only export/use these in Storybook since they are just for the Stitchs x SB handshake
// Can be here or in the story
// We need to Omit css as Emotions global css typedef clashes with the Stitches css typedef
// Storybook currently uses v10+ of Emotion, this issue is fixed in Emotion v11+
// TODO: Remove Omit once Storybook's Emotion is running on v11+
type TextVariantProps = Stitches.VariantProps<typeof Text> & Omit<NativeParagraphProps, 'css'>;
interface TextProps extends TextVariantProps {}
// Use this as the type in Story; i.e. `ComponentMeta<typeof ButtonStory>`
export const TextStory = modifyVariantsForStory<TextVariantProps, TextProps, typeof Text>(Text);
