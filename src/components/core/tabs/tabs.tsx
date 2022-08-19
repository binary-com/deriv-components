import { HtmlHTMLAttributes, ReactNode } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import useTheme from '@core/theme-context/use-theme';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';

export interface TabsProps extends HtmlHTMLAttributes<HTMLDivElement> {
    contained?: boolean;
    size?: 'default' | 'small';
    default_selected: string;
    tabs: {
        label: string;
        icon?: string;
        iconAlt?: string;
        content: ReactNode | ReactNode[];
    }[];
}

const StyledTabs = styled(TabsPrimitive.Root, {
    display: 'flex',
    flexDirection: 'column',
});

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

const StyledContent = styled(TabsPrimitive.Content, {});

const Icon = styled('img', {
    width: '16px',
    height: '16px',
    marginRight: '8px',
});

const Box = styled('div', {});

const Tabs = ({ contained = false, size = 'default', default_selected, tabs }: TabsProps) => {
    const { isDark } = useTheme();
    return (
        <Box css={{}}>
            <StyledTabs defaultValue={default_selected}>
                <StyledList>
                    {tabs.map(({ label, icon, iconAlt }) => (
                        <StyledTrigger key={label} contained={contained} size={size} value={label} dark={isDark}>
                            {icon && <Icon src={icon} alt={iconAlt ? iconAlt : 'Tab icon image'} />}
                            <span>{label}</span>
                        </StyledTrigger>
                    ))}
                </StyledList>
                {tabs.map(({ content, label }) => (
                    <StyledContent key={label} value={label}>
                        {content}
                    </StyledContent>
                ))}
            </StyledTabs>
        </Box>
    );
};

export default Tabs;

type TabsVariantProps = Stitches.VariantProps<typeof Tabs>;

export const TabsStory = modifyVariantsForStory<TabsVariantProps, TabsProps, typeof Tabs>(Tabs);
