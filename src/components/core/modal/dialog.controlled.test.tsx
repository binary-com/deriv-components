import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { fireEvent, render, screen, within } from 'test-setup';
import Modal from '.';
import { Button } from '..';
import { TModalActionButton } from './types';

const TestControlledDialog = ({ action_buttons }: { action_buttons: TModalActionButton[] }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
                <Button>Open</Button>
            </Modal.Trigger>
            <Modal.Portal>
                <Modal.Overlay />
                <Modal.DialogContent
                    title={'Title'}
                    content={'This is the dialog content'}
                    has_close_button={true}
                    action_buttons={action_buttons}
                    block_action_buttons={true}
                />
            </Modal.Portal>
        </DialogPrimitive.Root>
    );
};

describe('Controlled Dialog Component', () => {
    const onActionButtonClickMock = jest.fn();

    const action_buttons: TModalActionButton[] = [
        {
            id: 0,
            text: 'Primary',
            color: 'primary',
            onClick: onActionButtonClickMock,
        },
        {
            id: 1,
            text: 'Secondary',
            color: 'tertiary',
            onClick: onActionButtonClickMock,
        },
    ];

    let openButton: HTMLElement;
    const openDialog = () => {
        fireEvent.click(openButton);
    };

    beforeEach(() => {
        render(<TestControlledDialog action_buttons={action_buttons} />);
        openButton = screen.getByRole('button');
    });

    it('Should render the open button', () => {
        expect(openButton.textContent).toBe('Open');
    });

    it('Should open the Dialog onClick button', () => {
        openDialog();
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
    });

    it('Should close the Dialog on ESC key press', () => {
        openDialog();
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape', keyCode: 27, charCode: 27 });
        expect(dialog).not.toBeInTheDocument();
    });

    it('Should render title', () => {
        openDialog();
        const title = screen.getByText(/title/i);
        expect(title).toBeInTheDocument();
    });

    it('Should render content', () => {
        openDialog();
        const content = screen.getByText(/this is the dialog content/i);
        expect(content).toBeInTheDocument();
    });

    it('Should render action buttons', () => {
        openDialog();
        const dialog = screen.getByRole('dialog');
        const withinDialog = within(dialog);
        const actionButtons = withinDialog.getAllByTestId('action-button');
        expect(actionButtons).toHaveLength(2);
    });

    it('Should click on action buttons', () => {
        openDialog();
        const dialog = screen.getByRole('dialog');
        const withinDialog = within(dialog);
        const primaryButton = withinDialog.getByText(/Primary/i);
        fireEvent.click(primaryButton);
        expect(onActionButtonClickMock).toHaveBeenCalledTimes(1);
    });

    it('Should render close button with has_close_button=true', () => {
        openDialog();
        const dialog = screen.getByRole('dialog');
        const withinDialog = within(dialog);
        const closeButton = withinDialog.getByTestId('close-button');
        expect(closeButton).toBeInTheDocument();
    });
});
