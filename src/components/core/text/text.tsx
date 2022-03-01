import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

const Text = styled('p', {
    color: '#333333',

    variants: {
        bold: {
            true: {
                fontWeight: 'bold',
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
                lineHeight: '100px',

                '@mobile': {
                    fontSize: '40px',
                    lineHeight: '50px',
                },
            },
            'heading-1': {
                fontSize: '64px',
                lineHeight: '80px',

                '@mobile': {
                    fontSize: '32px',
                    lineHeight: '40px',
                },
            },
            'heading-2': {
                fontSize: '48px',
                lineHeight: '60px',

                '@mobile': {
                    fontSize: '28px',
                    lineHeight: '34px',
                },
            },
            'heading-3': {
                fontSize: '32px',
                lineHeight: '40px',

                '@mobile': {
                    fontSize: '24px',
                    lineHeight: '30px',
                },
            },
            'subtitle-1': {
                fontSize: '24px',
                lineHeight: '36px',

                '@mobile': {
                    fontSize: '18px',
                    lineHeight: '26px',
                },
            },
            'subtitle-2': {
                fontSize: '20px',
                lineHeight: '30px',

                '@mobile': {
                    fontSize: '16px',
                    lineHeight: '24px',
                },
            },
            'paragraph-1': {
                fontSize: '16px',
                lineHeight: '24px',

                '@mobile': {
                    fontSize: '14px',
                    lineHeight: '20px',
                },
            },
            'paragraph-2': {
                fontSize: '14px',
                lineHeight: '20px',

                '@mobile': {
                    fontSize: '12px',
                    lineHeight: '18px',
                },
            },
            small: {
                fontSize: '12px',
                lineHeight: '18px',

                '@mobile': {
                    fontSize: '10px',
                    lineHeight: '14px',
                },
            },
            'extra-small': {
                fontSize: '10px',
                lineHeight: '14px',

                '@mobile': {
                    fontSize: '8px',
                    lineHeight: '12px',
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
