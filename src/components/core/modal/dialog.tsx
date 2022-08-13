import { forwardRef, HTMLAttributes } from 'react';
import { styled } from 'Styles/stitches.config';
import Button from '../button/button';
import Text from '../text/text';
import CloseIconDark from '@assets/svg/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/ic-close-light.svg';
import { DialogProps } from './types';

export const DialogCloseContainer = styled('div', {
    position: 'inherit',
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const CloseIcon = styled('div', {
    position: 'relative',
    width: '12px',
    height: '12px',
    top: 'initial',
    right: 'initial',
    cursor: 'pointer',
    zIndex: '1',
    background: `url(${CloseIconLight}) no-repeat center`,
    '&:hover': {
        width: '32px',
        height: '32px',
        top: '0',
        right: '-10px',
        borderRadius: '4px',
        backgroundColor: '#E6E9E9',
    },
    variants: {
        dark: {
            true: {
                background: `url(${CloseIconDark}) no-repeat center`,

                '&:hover': {
                    backgroundColor: '#242828',
                },
            },
        },
    },
});

export const DialogTitle = styled(Text, {
    margin: '0',
    variants: {
        dark: {
            true: {
                color: '#ffffff',
            },
        },
    },
});

const DialogContainer = styled('div', {
    borderRadius: '8px',
    fontWeight: '$regular',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    width: '440px',
    variants: {
        dark: {
            true: {
                backgroundColor: '#0E0E0E',
                color: '#C2C2C2',
            },
            false: {
                backgroundColor: '#ffffff',
            },
        },
    },
    '@mobile': {
        width: '328px',
        padding: '16px',
    },
});

const DialogHeader = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > p': {
        margin: '0',
    },
});

const DialogBody = styled('div', {
    margin: '24px 0',
    flexWrap: 'overflow-wrap',
    '@mobile': {
        width: '328px',
        margin: '16px 0',
    },
});

const DialogFooter = styled('div', {
    variants: {
        block: {
            true: {
                display: 'block',
                width: '100%',
                '& > button:not(:first-child)': {
                    marginTop: '8px',
                },
            },
            false: {
                display: 'flex',
                justifyContent: 'flex-end',
                '& > button': {
                    marginLeft: '8px',
                },
            },
        },
    },
});

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
    ({ children, close_icon = true, title, action_buttons, dark, button_block, is_open, setIsOpen }, ref) => {
        const onCloseButton = () => {
            console.log('close');
        };

        return (
            <DialogContainer ref={ref} dark={dark} data-testid="dt_dialog_modal">
                <DialogHeader>
                    <div className="modal--header--title">
                        {title && (
                            <DialogTitle dark={dark} bold={true} align="left" type="paragraph-1">
                                {title}
                            </DialogTitle>
                        )}
                    </div>
                    <DialogCloseContainer>
                        {close_icon && (
                            <CloseIcon dark={dark} onClick={() => setIsOpen(false)} data-testid="dt_close_icon" />
                        )}
                    </DialogCloseContainer>
                </DialogHeader>
                <DialogBody>{children}</DialogBody>
                <DialogFooter block={button_block}>
                    {action_buttons?.map((button) => {
                        return (
                            <Button
                                dark={dark}
                                color={button.color}
                                size={'medium'}
                                key={button.name}
                                block={button_block}
                                onClick={() => button.onClick}
                            >
                                {button.name}
                            </Button>
                        );
                    })}
                </DialogFooter>
            </DialogContainer>
        );
    },
);

export default Dialog;
