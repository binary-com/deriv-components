import React from 'react';
import { forwardRef, HTMLAttributes } from 'react';
import Dialog from './dialog';
import Page from './page';
import Button from '../button/button';
import { ModalContainerProps } from './types';

export const Modal = forwardRef<HTMLDivElement, ModalContainerProps>(
    (
        { type, title = '', close_icon = true, action_buttons, panel, children, dark = false, button_block = false },
        ref,
    ) => {
        const [is_modal_open, setIsModalOpen] = React.useState(true);
        return (
            <>
                {is_modal_open ? (
                    <div className="modal" ref={ref}>
                        {type === 'dialog' && (
                            <Dialog
                                dark={dark}
                                title={title}
                                close_icon={close_icon}
                                action_buttons={action_buttons}
                                button_block={button_block}
                                is_open={is_modal_open}
                                setIsOpen={setIsModalOpen}
                            >
                                {children}
                            </Dialog>
                        )}
                        {type === 'page' && (
                            <Page
                                dark={dark}
                                title={title}
                                close_icon={close_icon}
                                action_buttons={action_buttons}
                                panel={panel}
                                button_block={button_block}
                                is_open={is_modal_open}
                                setIsOpen={setIsModalOpen}
                            >
                                {children}
                            </Page>
                        )}
                    </div>
                ) : (
                    <>
                        <Button onClick={() => setIsModalOpen(true)}>OpenModal</Button>
                    </>
                )}
            </>
        );
    },
);

export default Modal;
