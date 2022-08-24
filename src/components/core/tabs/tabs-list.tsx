import { Children, HtmlHTMLAttributes, ReactElement, cloneElement } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import useTheme from '@core/theme-context/use-theme';
import { styled } from 'Styles/stitches.config';

export interface TabsListProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children?: ReactElement[];
}

export interface TabsTriggerProps extends HtmlHTMLAttributes<HTMLDivElement> {
    contained?: boolean;
    size?: 'default' | 'small';
    children?: string;
    icon?: string;
    icon_alt?: string;
    value: string;
}

const StyledList = styled(TabsPrimitive.List, {
    display: 'flex',
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
    all: 'unset',
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
    '&[data-state="active"]': {
        backgroundColor: 'transparent',
        borderBottom: '2px solid $coral500',
        fontWeight: '$bold',
        '&:hover': {
            backgroundColor: 'transparent',
            borderBottom: '2px solid $coral500',
        },
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
            css: {
                '&[data-state="active"]': {
                    color: '$greyLight100',
                    backgroundColor: 'transparent',
                    borderBottom: '2px solid $coral500',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        borderBottom: '2px solid $coral500',
                    },
                },
            },
        },
        {
            contained: true,
            css: {
                '&[data-state="active"]': {
                    backgroundColor: '$greyLight100',
                    borderBottom: 'unset',
                    '&:hover': {
                        backgroundColor: '$greyLight100',
                        borderBottom: 'unset',
                    },
                },
            },
        },
        {
            contained: true,
            dark: true,
            css: {
                borderBottom: 'unset',
                '&[data-state="active"]': {
                    backgroundColor: '$greyDark700',
                    borderBottom: 'unset',
                    color: '$greyLight100',
                    '&:hover': {
                        backgroundColor: '$greyDark700',
                        borderRadius: '16px 16px 0 0',
                        borderBottom: 'unset',
                    },
                },
                '&:hover': {
                    backgroundColor: '#0E0E0E66',
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

const Box = styled('div', {});

export const TabsTrigger = ({ contained, size, children, icon, icon_alt, value }: TabsTriggerProps) => {
    const { isDark } = useTheme();
    return (
        <StyledTrigger value={value} size={size} contained={contained} dark={isDark}>
            {icon && <Icon src={icon} alt={icon_alt} />} {children}
        </StyledTrigger>
    );
};

const TabsList = ({ children, ...props }: TabsListProps) => {
    return (
        <StyledList>
            {Children.map(children, (child) => {
                if (child) {
                    return cloneElement(child, { ...props });
                }
            })}
        </StyledList>
    );
};

export default TabsList;
