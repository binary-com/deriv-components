import { ReactElement, ReactNode, useState } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as Stitches from '@stitches/react';
import { keyframes } from '@stitches/react';
import useTheme from '@core/theme-context/use-theme';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

type TooltipProps = {
    dark: boolean;
    type?: 'default' | 'error';
    side: 'top' | 'bottom' | 'left' | 'right';
    children: ReactElement;
    tooltip_content: ReactNode;
    icon?: string;
    is_fixed_width?: boolean;
};

const Flex = styled('div', {
    display: 'flex',
});

const Icon = styled('img', {
    width: 16,
    height: 16,
    paddingRight: '0.5rem',
});

const slideUpAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(50%)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(-50%)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateY(-50%)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
    '0%': { opacity: 0, transform: 'translateX(50%)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
});

const StyledContent = styled(TooltipPrimitive.Content, {
    padding: '0.5rem',
    fontSize: '$3xs',
    lineHeight: '$lineHeight18',
    borderRadius: 4,
    userSelect: 'none',
    '@media (prefers-reduced-motion: no-preference)': {
        animationDuration: '0.18s',
        animationTimingFunction: 'ease-out',
        willChange: 'transform, opacity',
        '&[data-state="delayed-open"]': {
            '&[data-side="top"]': { animationName: slideUpAndFade },
            '&[data-side="right"]': { animationName: slideRightAndFade },
            '&[data-side="bottom"]': { animationName: slideDownAndFade },
            '&[data-side="left"]': { animationName: slideLeftAndFade },
        },
    },
    '@mobile': {
        fontSize: '$4xs',
        lineHeight: '$lineHeight14',
    },
    variants: {
        type: {
            default: {
                backgroundColor: '$greyLight400',
                color: '$greyLight700',
            },
            error: {
                backgroundColor: '$redLight',
                color: '$greyLight100',
            },
        },
        dark: {
            true: {
                backgroundColor: '$greyDark400',
                color: '$greyDark100',
            },
        },
    },
    compoundVariants: [
        {
            dark: true,
            type: 'error',
            css: {
                backgroundColor: '$redDark',
                color: '$greyLight100',
            },
        },
    ],
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
    width: 12,
    height: 6,
    fill: '$greyLight400',
    variants: {
        type: {
            default: {
                fill: '$greyLight400',
            },
            error: {
                fill: '$redLight',
            },
        },
        dark: {
            true: {
                fill: '$greyDark400',
            },
        },
    },
    compoundVariants: [
        {
            dark: true,
            type: 'error',
            css: {
                fill: '$redDark',
            },
        },
    ],
});

const Tooltip = ({ children, type = 'error', tooltip_content, icon, is_fixed_width, side = 'top' }: TooltipProps) => {
    const { isDark } = useTheme();
    const [open_tooltip, setOpenTooltip] = useState(false);
    return (
        <TooltipPrimitive.Provider>
            <TooltipPrimitive.Root open={open_tooltip}>
                <TooltipPrimitive.Trigger
                    style={{
                        position: 'relative',
                    }}
                    asChild
                    onMouseEnter={() => setOpenTooltip(true)}
                    onMouseLeave={() => setOpenTooltip(false)}
                >
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <StyledContent
                        type={type}
                        dark={isDark}
                        side={side}
                        css={{
                            width: is_fixed_width ? 280 : 'auto',
                        }}
                        sideOffset={8}
                    >
                        <Flex>
                            {icon && <Icon src={icon} alt="tooltip-icon" />}
                            <div>{tooltip_content}</div>
                        </Flex>
                        <StyledArrow type={type} dark={isDark} />
                    </StyledContent>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
};

export default Tooltip;

type TooltipVariantProps = Stitches.VariantProps<typeof Tooltip>;

export const TooltipStory = modifyVariantsForStory<TooltipVariantProps, TooltipProps, typeof Tooltip>(Tooltip);
