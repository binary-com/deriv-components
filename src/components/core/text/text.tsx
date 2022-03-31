import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

const Text = styled('p', {
    color: '#333333',

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
                fontSize: '80px',
                lineHeight: '$lineHeight100',

                '@mobile': {
                    fontSize: '40px',
                    lineHeight: '$lineHeight50',
                },
            },
            'heading-1': {
                fontSize: '64px',
                lineHeight: '$lineHeight80',

                '@mobile': {
                    fontSize: '32px',
                    lineHeight: '$lineHeight40',
                },
            },
            'heading-2': {
                fontSize: '48px',
                lineHeight: '$lineHeight60',

                '@mobile': {
                    fontSize: '28px',
                    lineHeight: '$lineHeight34',
                },
            },
            'heading-3': {
                fontSize: '32px',
                lineHeight: '$lineHeight40',

                '@mobile': {
                    fontSize: '24px',
                    lineHeight: '$lineHeight30',
                },
            },
            'subtitle-1': {
                fontSize: '24px',
                lineHeight: '$lineHeight36',

                '@mobile': {
                    fontSize: '18px',
                    lineHeight: '$lineHeight26',
                },
            },
            'subtitle-2': {
                fontSize: '20px',
                lineHeight: '$lineHeight30',

                '@mobile': {
                    fontSize: '16px',
                    lineHeight: '$lineHeight24',
                },
            },
            'paragraph-1': {
                fontSize: '16px',
                lineHeight: '$lineHeight24',

                '@mobile': {
                    fontSize: '14px',
                    lineHeight: '$lineHeight20',
                },
            },
            'paragraph-2': {
                fontSize: '14px',
                lineHeight: '$lineHeight20',

                '@mobile': {
                    fontSize: '12px',
                    lineHeight: '$lineHeight18',
                },
            },
            small: {
                fontSize: '12px',
                lineHeight: '$lineHeight18',

                '@mobile': {
                    fontSize: '10px',
                    lineHeight: '$lineHeight14',
                },
            },
            'extra-small': {
                fontSize: '10px',
                lineHeight: '$lineHeight14',

                '@mobile': {
                    fontSize: '8px',
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
