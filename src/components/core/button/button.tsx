import useTheme from '@core/theme-context/use-theme';
import * as Stitches from '@stitches/react';
import { CSS } from '@stitches/react/types/css-util';
import React, { forwardRef } from 'react';

import { styled } from 'Styles/stitches.config';

const StyledButton = styled('button', {
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
                backgroundColor: '$greyDark700',
                color: '$greyLight100',

                '&:hover': {
                    backgroundColor: '$greyDark400',
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
                background: '$greyLight100',
                color: '$greyLight700',

                '&:hover': {
                    backgroundColor: '$greyLight400',
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

type StyledButtonProps = Omit<Stitches.VariantProps<typeof StyledButton>, 'dark'> & CSS;
type TButtonProps = StyledButtonProps & React.ComponentPropsWithoutRef<'button'>;

const Button = forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => {
    const { isDark } = useTheme();
    return <StyledButton {...props} ref={ref} dark={isDark} />;
});

Button.displayName = 'Button';

export default Button;
