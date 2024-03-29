import React, { ReactNode } from 'react';
import { forwardRef, HTMLAttributes } from 'react';
import { styled } from 'Styles/stitches.config';

type TBadgeSize = 'small' | 'medium' | 'large';
type TBadgeSpacing = 'tight' | 'loose';
type TVisiblity = 'icon-only' | 'label-only' | 'icon-and-label' | 'label-and-icon' | 'icon-and-label-and-icon';
type TLabel = 'bold' | 'regular';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    prefix_icon?: ReactNode;
    suffix_icon?: ReactNode;
    size?: TBadgeSize;
    spacing?: TBadgeSpacing;
    visibility?: TVisiblity;
    label?: TLabel;
}

const BadgeContainer = styled('span', {
    backgroundColor: '$greyLight200',
    borderRadius: '$default',
    fontWeight: '$regular',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',

    variants: {
        visibility: {
            'icon-only': {
                '& .badge--prefix-icon-container': {
                    paddingRight: '0px',
                },
            },
            'label-only': {
                '& .badge--prefix-icon-container': {
                    paddingRight: '0px',
                },
            },
            'icon-and-label': {
                '& .badge--prefix-icon-container': {
                    paddingRight: '4px',
                },
            },
            'label-and-icon': {
                '& .badge--suffix-icon-container': {
                    paddingLeft: '4px',
                },
            },
            'icon-and-label-and-icon': {
                '& .badge--prefix-icon-container': {
                    paddingRight: '4px',
                },
                '& .badge--suffix-icon-container': {
                    paddingLeft: '4px',
                },
            },
        },
        size: {
            small: {
                minHeight: '24px',
                fontSize: '$4xs',
                '@mobile': {
                    '& .badge--prefix-icon-container': {
                        height: '8px',
                    },
                    '& .badge--suffix-icon-container': {
                        height: '8px',
                    },
                    minHeight: '20px',
                    fontSize: '$5xs',
                },
            },
            medium: {
                minHeight: '26px',
                fontSize: '$3xs',
                '@mobile': {
                    minHeight: '22px',
                    fontSize: '$4xs',
                },
            },
            large: {
                minHeight: '28px',
                fontSize: '$2xs',
                '@mobile': {
                    minHeight: '24px',
                    fontSize: '$3xs',
                },
            },
        },
        padding: {
            tight: {
                padding: '0px 4px',
            },
            loose: {
                padding: '0px 8px',
            },
        },
        label: {
            bold: {
                fontWeight: '$bold',
            },
            regular: {
                fontWeight: '$regular',
            },
        },
    },
    compoundVariants: [
        {
            padding: 'tight',
            visibility: 'icon-and-label',
            css: {
                '& .badge--prefix-icon-container': {
                    paddingRight: '4px',
                },
            },
        },
        {
            padding: 'tight',
            visibility: 'label-only',
            css: {
                '& .badge--prefix-icon-container': {
                    paddingRight: '4px',
                },
            },
        },
        {
            padding: 'loose',
            visibility: 'icon-and-label',
            css: {
                '& .badge--prefix-icon-container': {
                    paddingRight: '8px',
                },
            },
        },
        {
            padding: 'loose',
            visibility: 'label-only',
            css: {
                '& .badge--prefix-icon-container': {
                    paddingRight: '8px',
                },
            },
        },
        {
            padding: 'loose',
            visibility: 'label-and-icon',
            css: {
                '& .badge--suffix-icon-container': {
                    paddingLeft: '8px',
                },
            },
        },
        {
            padding: 'loose',
            visibility: 'icon-and-label-and-icon',
            css: {
                '& .badge--prefix-icon-container': {
                    paddingRight: '8px',
                },
                '& .badge--suffix-icon-container': {
                    paddingLeft: '8px',
                },
            },
        },
    ],
    defaultVariants: {
        size: 'small',
        padding: 'loose',
        label: 'regular',
        visibility: 'icon-and-label',
    },
});

const IconContainer = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            prefix_icon,
            suffix_icon,
            children,
            size = 'small',
            spacing = 'loose',
            visibility = 'icon-and-label',
            label = 'regular',
        },
        ref,
    ) => {
        const has_prefix_icon = ['icon-and-label', 'icon-only', 'icon-and-label-and-icon'].includes(visibility);
        const has_suffix_icon = ['label-and-icon', 'icon-and-label-and-icon'].includes(visibility);
        const has_label = ['icon-and-label', 'label-only', 'label-and-icon', 'icon-and-label-and-icon'].includes(
            visibility,
        );

        return (
            <BadgeContainer ref={ref} size={size} padding={spacing} label={label} visibility={visibility}>
                {has_prefix_icon && (
                    <IconContainer className="badge--prefix-icon-container">{prefix_icon}</IconContainer>
                )}
                {has_label && children}
                {has_suffix_icon && (
                    <IconContainer className="badge--suffix-icon-container">{suffix_icon}</IconContainer>
                )}
            </BadgeContainer>
        );
    },
);

Badge.displayName = 'Badge';

export default Badge;
