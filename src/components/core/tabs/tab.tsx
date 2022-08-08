import React from 'react';
import type { LiHTMLAttributes } from 'react';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import useTheme from '@core/theme-context/use-theme';

export interface TabProps extends LiHTMLAttributes<HTMLLIElement> {
    active?: boolean;
    contained?: boolean;
    size?: 'default' | 'small';
    icon?: string;
    label?: string;
    width_of_tab?: string;
}

const List = styled('li', {
    padding: '0 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$2xs',
    lineHeight: '$lineHeight20',
    color: '$greyLight700',
    borderBottom: '2px solid $greyLight200',
    transition: 'all ease-in-out 0.3s',
    '&:hover': {
        backgroundColor: '$greyLight300',
        borderRadius: '0',
        cursor: 'pointer',
        borderBottom: '2px solid $greyLight200',
    },
    variants: {
        size: {
            default: {
                height: '40px',
            },
            small: {
                height: '32px',
            },
        },
        active: {
            true: {
                backgroundColor: 'transparent',
                borderBottom: '2px solid $coral500',
                fontWeight: '$bold',
                '&:hover': {
                    backgroundColor: 'transparent',
                    borderBottom: '2px solid $coral500',
                },
            },
        },
        contained: {
            true: {
                backgroundColor: 'transparent',
                borderRadius: '16px 16px 0 0',
                borderBottom: 'unset',
                '&:hover': {
                    backgroundColor: '#FFFFFF66',
                    borderRadius: '16px 16px 0 0',
                    borderBottom: 'unset',
                },
            },
        },
        dark: {
            true: {
                color: '$greyDark100',
                borderBottom: '2px solid $greyDark600',
                '&:hover': {
                    backgroundColor: '$greyDark500',
                    borderRadius: 0,
                    borderBottom: 'unset',
                },
            },
        },
    },
    compoundVariants: [
        {
            dark: true,
            active: true,
            css: {
                color: '$greyLight100',
                backgroundColor: 'transparent',
                borderBottom: '2px solid $coral500',
                '&:hover': {
                    backgroundColor: 'transparent',
                    borderBottom: '2px solid $coral500',
                },
            },
        },
        {
            contained: true,
            active: true,
            css: {
                backgroundColor: '$greyLight100',
                borderBottom: 'unset',
                '&:hover': {
                    backgroundColor: '$greyLight100',
                    borderBottom: 'unset',
                },
            },
        },
        {
            contained: true,
            dark: true,
            css: {
                borderBottom: 'unset',
                '&:hover': {
                    backgroundColor: '#0E0E0E66',
                    borderRadius: '16px 16px 0 0',
                    borderBottom: 'unset',
                },
            },
        },
        {
            contained: true,
            dark: true,
            active: true,
            css: {
                backgroundColor: '$greyDark700',
                borderBottom: 'unset',
                color: '$greyLight100',
                '&:hover': {
                    backgroundColor: '$greyDark700',
                    borderRadius: '16px 16px 0 0',
                    borderBottom: 'unset',
                },
            },
        },
    ],
    '@mobile': {
        fontSize: '$3xs',
        lineHeight: '$lineHeight18',
    },
});

const Icon = styled('img', {
    width: '16px',
    height: '16px',
    marginRight: '8px',
});

const Tab = React.forwardRef(
    ({ active, contained, size = 'default', icon, label, width_of_tab, ...props }: TabProps, ref: any) => {
        const { isDark } = useTheme();
        return (
            <List
                active={active}
                dark={isDark}
                size={size}
                contained={contained}
                {...props}
                ref={ref}
                css={{
                    width: width_of_tab ? width_of_tab : 'auto',
                }}
            >
                <Icon src={icon} />
                <span>{label}</span>
            </List>
        );
    },
);

export default Tab;

type TabVariantProps = Stitches.VariantProps<typeof Tab>;

export const BreadcrumbStory = modifyVariantsForStory<TabVariantProps, TabProps, typeof Tab>(Tab);
