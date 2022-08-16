import React from 'react';
import { forwardRef, HTMLAttributes } from 'react';
import { styled } from 'Styles/stitches.config';
import Button from '../button/button';
import Text from '../text/text';
import { CloseIcon } from './dialog';
import Tab from '../tabs/tab';
import DefaultListIconSVG from '@assets/svg/default-list-icon.svg';
import DefaultListIconDarkSVG from '@assets/svg/default-list-icon-dark.svg';
import { isDesktop, isMobile } from 'utils';
import { PageProps } from './types';

const PageContainer = styled('div', {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    width: 'fit-content',
    display: 'flex',
    variants: {
        dark: {
            true: {
                backgroundColor: '#0E0E0E',
            },
            false: {
                backgroundColor: '#ffffff',
            },
        },
    },
});

const PageBody = styled('div', {
    position: 'relative',
    width: '400px',
    display: 'block',
    boxSizing: 'border-box',
    '@mobile': {
        width: '360px',
    },
});

const BodyHeader = styled('div', {
    justifyContent: 'space-between',
    padding: '16px 24px',
    variants: {
        dark: {
            true: {
                borderBottom: '2px solid $greyLight700',
            },
            false: {
                borderBottom: '2px solid $greyLight200',
            },
        },
        has_title: {
            true: {
                display: 'flex',
                justifyContent: 'space-between',
            },
        },
        close_icon: {
            true: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
        has_panel: {
            true: {
                display: 'flex',
                justifyContent: 'flex-end',
            },
        },
    },
    compoundVariants: [
        {
            has_title: false,
            close_icon: false,
            css: {
                display: 'none',
            },
        },
        {
            has_panel: true,
            close_icon: false,
            css: {
                display: 'none',
            },
        },
        {
            has_panel: true,
            close_icon: false,
            has_title: true,
            css: {
                display: 'none',
                '@mobile': {
                    display: 'flex',
                    justifyContent: 'flex-start',
                },
            },
        },
        {
            has_panel: false,
            close_icon: true,
            has_title: true,
            css: {
                display: 'flex',
                justifyContent: 'space-between',
            },
        },
        {
            has_panel: true,
            close_icon: true,
            has_title: true,
            css: {
                display: 'flex',
                justifyContent: 'flex-end',
                '@mobile': {
                    justifyContent: 'space-between',
                },
            },
        },
    ],
    '@mobile': {
        padding: '14px 24px',
    },
});

const BodyContent = styled('div', {
    minHeight: '400px',
    padding: '16px 24px',
    variants: {
        dark: {
            true: {
                color: '#C2C2C2',
            },
            fasle: {
                color: '#ffffff',
            },
        },
    },
    '@mobile': {
        minHeight: '360px',
    },
});

const BodyFooter = styled('div', {
    width: '100%',
    right: '0',
    bottom: '0',
    boxSizing: 'border-box',
    padding: '16px 24px',

    variants: {
        dark: {
            true: {
                borderTop: '2px solid $greyLight700',
            },
            false: {
                borderTop: '2px solid $greyLight200',
            },
        },
        has_action: {
            false: {
                display: 'none',
            },
        },
        block: {
            true: {
                '& > button:not(:first-child)': {
                    marginTop: '8px',
                },
            },
            false: {
                justifyContent: 'flex-end',
                '& > button': {
                    marginLeft: '8px',
                },
            },
        },
    },
    compoundVariants: [
        {
            has_action: true,
            block: true,
            css: {
                display: 'block',
            },
        },
        {
            has_action: true,
            block: false,
            css: {
                display: 'flex',
            },
        },
    ],
});

const LeftPanel = styled('div', {
    width: '240px',
    paddingBottom: '100px',
    borderRadius: '8px 0 0 8px',
    variants: {
        dark: {
            true: {
                backgroundColor: '#151717',
            },
            false: {
                backgroundColor: '$greyLight200',
            },
        },
        has_panel: {
            false: {
                display: 'none',
            },
        },
    },
});

const CloseIconContainer = styled('div', {
    height: '20px',
    position: 'inherit',
    variants: {
        close_icon: {
            true: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
            false: {
                display: 'none',
            },
        },
    },
});

export const PageCloseIcon = styled(CloseIcon, {
    position: 'absolute',
    top: 'initial',
    right: 'initial',
    '&:hover': {
        top: 'initial',
        right: '14px',
    },
});

export const PanelTab = styled(Tab, {
    border: 'none',
    justifyContent: 'flex-start',
    padding: '0 24px',
    '&:hover': {
        border: 'none',
    },
    borderBottom: 'none',
    variants: {
        active: {
            true: {
                fontWeight: '$bold',
                borderBottom: 'none',
            },
        },
        dark: {
            true: {
                color: '$greyDark100',
            },
        },
    },
    compoundVariants: [
        {
            active: true,
            dark: true,
            css: {
                backgroundColor: '$greyLight700',
                '&:hover': {
                    backgroundColor: '$greyLight700',
                },
            },
        },
        {
            active: true,
            dark: false,
            css: {
                backgroundColor: '$greyLight300',
            },
        },
        {
            active: false,
            dark: true,
            css: {
                '&:hover': {
                    backgroundColor: '$greyLight700',
                },
            },
        },
    ],
    '@mobile': {
        padding: '0 16px',
    },
});

export const PageTitle = styled(Text, {
    margin: '0',
    variants: {
        dark: {
            true: {
                color: '#ffffff',
            },
        },
        has_panel: {
            false: {
                padding: '0',
            },
        },
        is_mobile: {
            false: {
                padding: '16px 24px',
                '@mobile': {
                    padding: '14px 16px',
                },
            },
        },
    },
});

export const Page = forwardRef<HTMLDivElement, PageProps>(
    ({ title = '', close_icon = true, action_buttons, panel, children, dark, button_block, setIsOpen }, ref) => {
        const [active_tab, setActiveTab] = React.useState<number>(0);
        const has_action_buttons = action_buttons?.length ? true : false;
        const has_panel = panel?.length ? true : false;
        const has_title = title !== '';

        return (
            <PageContainer className="page_container" ref={ref} dark={dark} data-testid="dt_page_modal">
                {isDesktop() && (
                    <LeftPanel dark={dark} has_panel={has_panel}>
                        {title && (
                            <PageTitle
                                dark={dark}
                                bold={true}
                                align="left"
                                type="paragraph-1"
                                has_panel={has_panel}
                                is_mobile={isMobile()}
                            >
                                {title}
                            </PageTitle>
                        )}
                        <div className="modal--panel--sidebar">
                            {panel?.map((item, index) => (
                                <PanelTab
                                    data-testid="dt_panel_label"
                                    label={item.label}
                                    icon={item.icon || (dark ? DefaultListIconDarkSVG : DefaultListIconSVG)}
                                    onClick={() => setActiveTab(index)}
                                    active={index === active_tab}
                                    key={item.label}
                                    dark={dark}
                                ></PanelTab>
                            ))}
                        </div>
                    </LeftPanel>
                )}
                <PageBody>
                    <BodyHeader dark={dark} close_icon={close_icon} has_title={has_title} has_panel={has_panel}>
                        {(!has_panel || isMobile()) && (
                            <PageTitle dark={dark} bold={true} align="left" type="paragraph-1" has_panel={has_panel}>
                                {title}
                            </PageTitle>
                        )}
                        {close_icon && (
                            <CloseIconContainer close_icon={close_icon}>
                                <PageCloseIcon
                                    dark={dark}
                                    onClick={() => setIsOpen(false)}
                                    data-testid="dt_close_icon"
                                />
                            </CloseIconContainer>
                        )}
                    </BodyHeader>
                    <BodyContent dark={dark}>
                        {panel && isDesktop()
                            ? panel?.map((item, index) => {
                                  if (index === active_tab) return item.content;
                              })
                            : children}
                    </BodyContent>
                    <BodyFooter dark={dark} has_action={has_action_buttons} block={button_block}>
                        {action_buttons?.map((button) => {
                            return (
                                <Button
                                    color={button.color}
                                    size={'medium'}
                                    key={button.name}
                                    block={button_block}
                                    onClick={button.onClick}
                                >
                                    {button.name}
                                </Button>
                            );
                        })}
                    </BodyFooter>
                </PageBody>
            </PageContainer>
        );
    },
);

export default Page;
