import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

const Button = styled('button', {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    width: 'fit-content',
    borderRadius: '$default',
    fontSize: '$2xs',
    fontWeight: '$bold',
    lineHeight: '$lineHeight20',

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
                borderRadius: '$pill',
            },
        },
        color: {
            primary: {
                backgroundColor: '$coral500',
                color: '$greyLight100',

                '&:hover': {
                    backgroundColor: '$coral600',
                },
                '&:disabled': {
                    opacity: 0.32,
                },
            },
            'primary-light': {
                backgroundColor: '$coral500_16',
                color: '$coral500',

                '&:hover': {
                    backgroundColor: '$coral500_24',
                },
                '&:disabled': {
                    opacity: 0.32,
                },
            },
            secondary: {
                border: '1px solid $greyLight600',
                color: '$greyLight700',
                backgroundColor: 'transparent',

                '&:hover': {
                    backgroundColor: '$greyLight700_8',
                },
            },
            tertiary: {
                backgroundColor: 'none',
                color: '$coral500',

                '&:hover': {
                    backgroundColor: '$coral500_8',
                },
            },
            monochrome: {
                backgroundColor: '#0E0E0E',
                color: '#FFFFFF',

                '&:hover': {
                    backgroundColor: '#323738',
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
            color: 'primary',
            dark: true,
            css: {
                backgroundColor: '$coral500',
                color: '$greyLight100',

                '&:hover': {
                    backgroundColor: '$coral400',
                },
                '&:disabled': {
                    opacity: 0.32,
                },
            },
        },
        {
            color: 'primary-light',
            dark: true,
            css: {
                backgroundColor: '$coral500_16',
                color: '$coral500',

                '&:hover': {
                    backgroundColor: '$coral500_24',
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
                borderColor: '$greyDark200',
                background: 'none',
                color: '$greyLight100',

                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
            },
        },
        {
            color: 'secondary',
            size: 'medium',
            css: {
                borderWidth: '$1',
            },
        },
        {
            color: 'secondary',
            size: 'small',
            css: {
                borderWidth: '$1',
            },
        },
        {
            color: 'secondary',
            size: 'large',
            css: {
                borderWidth: '$2',
            },
        },
        {
            color: 'secondary',
            size: 'hero',
            css: {
                borderWidth: '$2',
            },
        },
        {
            color: 'monochrome',
            dark: true,
            css: {
                background: '#FFFFFF',
                color: '#333333',

                '&:hover': {
                    backgroundColor: '#D6DADB',
                },
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
export const button_color_type = ['primary', 'primary-light', 'secondary', 'tertiary', 'monochrome'];

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
