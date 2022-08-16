import React from 'react';
import { forwardRef } from 'react';
import DialogContent from './dialog';
import Page from './page';
import Button from '../button/button';
import { ModalContainerProps } from './types';
import { styled } from '@stitches/react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTransition, animated, config } from 'react-spring';
import useTheme from '@core/theme-context/use-theme';

const Overlay = styled(Dialog.Overlay, {
    background: '#00000080',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'grid',
    placeItems: 'center',
    overflowY: 'auto',

    '& .dialog-overlay[data-state="open"]': {
        animation: 'fadeIn 300ms ease-out',
    },
});

const Content = styled(Dialog.Content, {
    borderRadius: '0',
    border: 'none',
});

const Trigger = styled(Dialog.Trigger, {
    border: 'none',
    backgroundColor: 'transparent',
});

export const Modal = forwardRef<HTMLDivElement, ModalContainerProps>(
    ({ type, title = '', close_icon = true, action_buttons, panel, children, button_block = false }, ref) => {
        const [is_modal_open, setIsModalOpen] = React.useState<boolean>(true);
        const transitions = useTransition(is_modal_open, {
            from: { opacity: 0, y: 10 },
            enter: { opacity: 1, y: 0 },
            leave: { opacity: 0, y: 10 },
            config: config.stiff,
        });

        const { isDark } = useTheme();

        return (
            <Dialog.Root open={is_modal_open}>
                <Trigger>
                    <Button onClick={() => setIsModalOpen(true)}>OpenModal</Button>
                </Trigger>
                <Dialog.Portal>
                    <Overlay forceMount>
                        {transitions((styles, item) =>
                            item ? (
                                <animated.div
                                    style={{
                                        opacity: styles.opacity,
                                        y: styles.y,
                                    }}
                                >
                                    <Content>
                                        {type === 'dialog' && (
                                            <DialogContent
                                                dark={isDark}
                                                title={title}
                                                close_icon={close_icon}
                                                action_buttons={action_buttons}
                                                button_block={button_block}
                                                setIsOpen={setIsModalOpen}
                                                ref={ref}
                                            >
                                                {children}
                                            </DialogContent>
                                        )}
                                        {type === 'page' && (
                                            <Page
                                                dark={isDark}
                                                title={title}
                                                close_icon={close_icon}
                                                action_buttons={action_buttons}
                                                panel={panel}
                                                button_block={button_block}
                                                setIsOpen={setIsModalOpen}
                                                ref={ref}
                                            >
                                                {children}
                                            </Page>
                                        )}
                                    </Content>
                                </animated.div>
                            ) : null,
                        )}
                    </Overlay>
                </Dialog.Portal>
            </Dialog.Root>
        );
    },
);

export default Modal;
