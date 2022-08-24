import * as DialogPrimitive from '@radix-ui/react-dialog';
import { fireEvent, render, screen, within } from 'test-setup';
import Modal from '.';
import { Button } from '..';
import { TModalActionButton } from './types';

describe('Page Dialog Component', () => {
    const onActionButtonClickMock = jest.fn();

    const actionButtons: TModalActionButton[] = [
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
        render(
            <DialogPrimitive.Root>
                <Modal.Trigger asChild>
                    <Button>Open</Button>
                </Modal.Trigger>
                <Modal.Portal>
                    <Modal.Overlay />
                    <Modal.PageContent
                        title={'Title'}
                        has_close_button={true}
                        has_title_separator={true}
                        has_footer_separator={true}
                        block_action_buttons={true}
                        action_buttons={actionButtons}
                    >
                        <div data-testid="page-dialog-content">Page Dialog Content</div>
                    </Modal.PageContent>
                </Modal.Portal>
            </DialogPrimitive.Root>,
        );
        openButton = screen.getByRole('button');
    });

    it('Should render the open button', () => {
        expect(openButton.textContent).toBe('Open');
    });

    it('Should open the Page Dialog onClick button', () => {
        openDialog();
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
    });

    it('Should close the Page Dialog on ESC key press', () => {
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

    it('Should render page content', () => {
        openDialog();
        const content = screen.getByTestId('page-dialog-content');
        expect(content).toBeInTheDocument();
    });

    it('Should render page content properly', () => {
        openDialog();
        const content = screen.getByTestId('page-dialog-content');
        expect(content.textContent).toBe('Page Dialog Content');
    });

    it('Should render title seprator', () => {
        openDialog();
        const title_separator = screen.getByTestId('title-separator');
        expect(title_separator).toBeInTheDocument();
    });

    it('Should render footer seprator', () => {
        openDialog();
        const footer_separator = screen.getByTestId('footer-separator');
        expect(footer_separator).toBeInTheDocument();
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
