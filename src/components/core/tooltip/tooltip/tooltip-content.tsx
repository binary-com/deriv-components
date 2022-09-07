import { HTMLAttributes, ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { keyframes } from '@stitches/react';
import useTheme from '@core/theme-context/use-theme';
import { styled } from 'Styles/stitches.config';

export type TTooltipContentProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
    type?: 'default' | 'error';
    side: 'top' | 'bottom' | 'left' | 'right';
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

const TooltipContent = ({
    children,
    type = 'error',
    icon,
    is_fixed_width = false,
    side = 'top',
}: TTooltipContentProps) => {
    const { isDark } = useTheme();
    return (
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
                    <div>{children}</div>
                </Flex>
                <StyledArrow type={type} dark={isDark} />
            </StyledContent>
        </TooltipPrimitive.Portal>
    );
};

export default TooltipContent;
