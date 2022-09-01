import React, { forwardRef } from 'react';
import type * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import useTheme from '@core/theme-context/use-theme';

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
] as const;

export const color_array = [
    'prominent',
    'general',
    'less-prominent',
    'disabled',
    'active',
    'hover',
    'secondary',
    'primary',
] as const;

export const align_array = ['left', 'center', 'right'] as const;

type StyledTextProps = Omit<Stitches.ComponentProps<typeof StyledText>, 'dark'>;

interface ITextProps extends StyledTextProps {
    as?: React.ElementType;
}

const StyledText = styled('p', {
    variants: {
        color: {
            prominent: {
                color: '$greyLight700',
            },
            general: {
                color: '$greyLight700',
            },
            'less-prominent': {
                color: '$greyLight600',
            },
            disabled: {
                color: '$greyLight500',
            },
            active: {
                color: '$greyLight400',
            },
            hover: {
                color: '$greyLight300',
            },
            secondary: {
                color: '$greyLight200',
            },
            primary: {
                color: '$greyLight100',
            },
        },
        dark: {
            true: {},
        },
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
    compoundVariants: [
        {
            color: 'prominent',
            dark: true,
            css: {
                color: '$greyLight100',
            },
        },
        {
            color: 'general',
            dark: true,
            css: {
                color: '$greyDark100',
            },
        },
        {
            color: 'less-prominent',
            dark: true,
            css: {
                color: '$greyDark200',
            },
        },
        {
            color: 'disabled',
            dark: true,
            css: {
                color: '$greyDark300',
            },
        },
        {
            color: 'active',
            dark: true,
            css: {
                color: '$greyDark400',
            },
        },
        {
            color: 'hover',
            dark: true,
            css: {
                color: '$greyDark500',
            },
        },
        {
            color: 'secondary',
            dark: true,
            css: {
                color: '$greyDark600',
            },
        },
        {
            color: 'primary',
            dark: true,
            css: {
                color: '$greyDark700',
            },
        },
    ],
    defaultVariants: {
        color: 'prominent',
        type: 'subtitle-1',
        align: 'left',
        bold: false,
    },
});

const Text = forwardRef<HTMLParagraphElement, ITextProps>(({ children, color, align, type, bold, ...props }, ref) => {
    const { isDark } = useTheme();

    return (
        <StyledText dark={isDark} color={color} align={align} type={type} bold={bold} ref={ref} {...props}>
            {children}
        </StyledText>
    );
});

Text.displayName = 'Text';

export default Text;

// Only export/use these in Storybook since they are just for the Stitchs x SB handshake
// Can be here or in the story
// We need to Omit css as Emotions global css typedef clashes with the Stitches css typedef
// Storybook currently uses v10+ of Emotion, this issue is fixed in Emotion v11+
// TODO: Remove Omit once Storybook's Emotion is running on v11+
type TextVariantProps = Stitches.VariantProps<typeof Text> & Omit<React.ComponentPropsWithoutRef<'p'>, 'css'>;
type TextProps = TextVariantProps;
// Use this as the type in Story; i.e. `ComponentMeta<typeof TextStory>`
export const TextStory = modifyVariantsForStory<TextVariantProps, TextProps, typeof Text>(Text);
