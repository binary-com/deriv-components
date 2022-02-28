import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

const Button = styled('button', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    width: 'fit-content',
    borderRadius: '4px',

    '&:hover': {
        cursor: 'pointer',
    },
    '&:disabled': {
        opacity: 0.32,
        cursor: 'not-allowed',
    },

    variants: {
        size: {
            small: {
                padding: '3px 8px',
            },
            medium: {
                padding: '6px 16px',
            },
            large: {
                padding: '10px 16px',
            },
            hero: {
                padding: '17px 24px',
                borderRadius: '8px',
            },
        },
        color: {
            primary: {
                backgroundColor: '#ff444f',
                color: '$white',

                '&:hover': {
                    backgroundColor: '#eb3e48',
                },
            },
            'primary-light': {
                backgroundColor: 'rgba(255, 68, 79, 0.14)',
                color: '#ff444f',

                '&:hover': {
                    backgroundColor: 'rgba(255, 68, 79, 0.24)',
                },
                '&:disabled': {
                    opacity: 0.16,
                },
            },
            secondary: {
                border: '1px solid #999999',
                color: '#333333',

                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
            },
            tertiary: {
                backgroundColor: 'none',
                color: '#ff444f',

                '&:hover': {
                    backgroundColor: 'rgba(255, 68, 79, 0.08)',
                },
            },
        },
        block: {
            true: {
                width: '100%',
            },
        },
        dark: {
            true: {},
        },
    },
    compoundVariants: [
        {
            color: 'primary-light',
            dark: true,
            css: {
                backgroundColor: 'rgba(255, 68, 79, 0.16)',
                color: '#ff444f',

                '&:hover': {
                    backgroundColor: 'rgba(255, 68, 79, 0.24)',
                },
                '&:disabled': {
                    opacity: 0.32,
                },
            },
        },
        {
            color: 'secondary',
            dark: true,
            css: {
                borderColor: '#6e6e6e',
                background: 'none',
                color: '$white',

                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
            },
        },
        {
            color: 'secondary',
            size: 'medium',
            css: {
                borderWidth: '1px',
            },
        },
        {
            color: 'secondary',
            size: 'small',
            css: {
                borderWidth: '1px',
            },
        },
        {
            color: 'secondary',
            size: 'large',
            css: {
                borderWidth: '2px',
            },
        },
        {
            color: 'secondary',
            size: 'hero',
            css: {
                borderWidth: '2px',
            },
        },
    ],
    defaultVariants: {
        color: 'primary',
        size: 'medium',
        block: false,
        dark: false,
    },
});

export const button_size_type = ['small', 'medium', 'large', 'hero'];
export const button_color_type = ['primary', 'primary-light', 'secondary', 'tertiary'];

export default Button;

type NativeButtonProps = React.ComponentPropsWithoutRef<'button'>;

// Only export/use these in Storybook since they are just for the Stitchs x SB handshake
// Can be here or in the story
// We need to Omit css as Emotions global css typedef clashes with the Stitches css typedef
// Storybook currently uses v10+ of Emotion, this issue is fixed in Emotion v11+
// TODO: Remove Omit once Storybook's Emotion is running on v11+
type ButtonVariantProps = Stitches.VariantProps<typeof Button> & Omit<NativeButtonProps, 'css'>;
interface ButtonProps extends ButtonVariantProps {}
// Use this as the type in Story; i.e. `ComponentMeta<typeof ButtonStory>`
export const ButtonStory = modifyVariantsForStory<ButtonVariantProps, ButtonProps, typeof Button>(Button);
