import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { styled } from 'Styles/stitches.config';

type TBadgeSize = 'small' | 'medium' | 'large';
type TBadgeSpacing = 'tight' | 'loose';
type TVisiblity = 'icon-only' | 'label-only' | 'icon-and-label';
type TLabel = 'bold' | 'regular';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    icon_src?: string;
    icon_class?: string;
    size?: TBadgeSize;
    spacing?: TBadgeSpacing;
    visiblity?: TVisiblity;
    label?: TLabel;
    iconAlt?: string;
}

const BadgeContainer = styled('span', {
    backgroundColor: '$greyLight200',
    borderRadius: '$default',
    fontWeight: '$regular',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    variants: {
        size: {
            small: {
                minHeight: '24px',
                fontSize: '$4xs',
                '@mobile': {
                    '& .badge--icon': {
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
                '& .badge--icon__padding': {
                    paddingRight: '4px',
                },
            },
            loose: {
                padding: '0px 8px',
                '& .badge--icon__padding': {
                    paddingRight: '8px',
                },
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
    defaultVariants: {
        size: 'small',
        padding: 'loose',
        label: 'regular',
    },
});

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            icon_src,
            icon_class,
            children,
            size = 'small',
            spacing = 'loose',
            visiblity = 'icon-and-label',
            label = 'regular',
            iconAlt = 'Badge Icon',
        },
        ref,
    ) => {
        const has_icon = visiblity === 'icon-and-label' || visiblity === 'icon-only';
        const has_label = visiblity === 'icon-and-label' || visiblity === 'label-only';
        return (
            <BadgeContainer ref={ref} size={size} padding={spacing} label={label}>
                {has_icon && icon_src && (
                    <img
                        src={icon_src}
                        alt={iconAlt}
                        className={classNames(icon_class, 'badge--icon', { 'badge--icon__padding': has_label })}
                    />
                )}
                {has_label && children}
            </BadgeContainer>
        );
    },
);

export default Badge;
