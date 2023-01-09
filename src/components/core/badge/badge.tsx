import React from 'react';
import classNames from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { styled } from 'Styles/stitches.config';

type TBadgeSize = 'small' | 'medium' | 'large';
type TBadgeSpacing = 'tight' | 'loose';
type TVisiblity = 'icon-only' | 'label-only' | 'icon-and-label' | 'label-and-icon' | 'icon-and-label-and-icon';
type TLabel = 'bold' | 'regular';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    prefix_icon_src?: string;
    suffix_icon_src?: string;
    prefix_icon_class?: string;
    suffix_icon_class?: string;
    prefix_icon_alt?: string;
    suffix_icon_alt?: string;
    prefixIconOnClickHandler?: VoidFunction;
    suffixIconOnClickHandler?: VoidFunction;
    size?: TBadgeSize;
    spacing?: TBadgeSpacing;
    visiblity?: TVisiblity;
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
        visiblity: {
            'icon-only': {
                '& .badge--prefix-icon': {
                    paddingRight: '0px',
                },
            },
            'label-only': {
                '& .badge--prefix-icon': {
                    paddingRight: '0px',
                },
            },
            'icon-and-label': {
                '& .badge--prefix-icon': {
                    paddingRight: '4px',
                },
            },
            'label-and-icon': {
                '& .badge--suffix-icon': {
                    paddingLeft: '4px',
                },
            },
            'icon-and-label-and-icon': {
                '& .badge--prefix-icon': {
                    paddingRight: '4px',
                },
                '& .badge--suffix-icon': {
                    paddingLeft: '4px',
                },
            },
        },
        size: {
            small: {
                minHeight: '24px',
                fontSize: '$4xs',
                '@mobile': {
                    //refactor
                    '& .badge--prefix-icon': {
                        height: '8px',
                    },
                    '& .badge--suffix-icon': {
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
            visiblity: 'icon-and-label',
            css: {
                '& .badge--prefix-icon': {
                    paddingRight: '4px',
                },
            },
        },
        {
            padding: 'tight',
            visiblity: 'label-only',
            css: {
                '& .badge--prefix-icon': {
                    paddingRight: '4px',
                },
            },
        },
        {
            padding: 'loose',
            visiblity: 'icon-and-label',
            css: {
                '& .badge--prefix-icon': {
                    paddingRight: '8px',
                },
            },
        },
        {
            padding: 'loose',
            visiblity: 'label-only',
            css: {
                '& .badge--prefix-icon': {
                    paddingRight: '8px',
                },
            },
        },
        {
            padding: 'loose',
            visiblity: 'label-and-icon',
            css: {
                '& .badge--suffix-icon': {
                    paddingLeft: '8px',
                },
            },
        },
        {
            padding: 'loose',
            visiblity: 'icon-and-label-and-icon',
            css: {
                '& .badge--prefix-icon': {
                    paddingRight: '8px',
                },
                '& .badge--suffix-icon': {
                    paddingLeft: '8px',
                },
            },
        },
    ],
    defaultVariants: {
        size: 'small',
        padding: 'loose',
        label: 'regular',
        visiblity: 'icon-and-label',
    },
});

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            prefix_icon_src,
            suffix_icon_src,
            prefix_icon_class,
            suffix_icon_class,
            prefixIconOnClickHandler,
            suffixIconOnClickHandler,
            children,
            size = 'small',
            spacing = 'loose',
            visiblity = 'icon-and-label',
            label = 'regular',
            prefix_icon_alt = 'Badge Icon',
            suffix_icon_alt = 'Badge Icon',
        },
        ref,
    ) => {
        const has_prefix_icon =
            visiblity === 'icon-and-label' || visiblity === 'icon-only' || visiblity === 'icon-and-label-and-icon';
        const has_suffix_icon = visiblity === 'label-and-icon' || visiblity === 'icon-and-label-and-icon';
        const has_label =
            visiblity === 'icon-and-label' ||
            visiblity === 'label-only' ||
            visiblity === 'label-and-icon' ||
            visiblity === 'icon-and-label-and-icon';

        return (
            <BadgeContainer ref={ref} size={size} padding={spacing} label={label} visiblity={visiblity}>
                {has_prefix_icon && prefix_icon_src && (
                    <img
                        src={prefix_icon_src}
                        alt={prefix_icon_alt}
                        className={classNames(prefix_icon_class, 'badge--prefix-icon')}
                        onClick={prefixIconOnClickHandler}
                    />
                )}
                {has_label && children}
                {has_suffix_icon && suffix_icon_src && (
                    <img
                        src={suffix_icon_src}
                        alt={suffix_icon_alt}
                        className={classNames(suffix_icon_class, 'badge--suffix-icon')}
                        onClick={suffixIconOnClickHandler}
                    />
                )}
            </BadgeContainer>
        );
    },
);

Badge.displayName = 'Badge';

export default Badge;
