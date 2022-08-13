import { fireEvent, render, screen, within } from 'test-setup';
import Page from './page';
import Dialog from './dialog';
import { ActionButtonProps, PanelProps } from './types';

const sampleActionButtons: ActionButtonProps[] = [
    { name: 'primary', color: 'primary' },
    { name: 'secondary', color: 'secondary' },
];

const samplePanel: PanelProps[] = [
    { label: 'label1', content: 'content1' },
    { label: 'label2', content: 'content2' },
    { label: 'label3', content: 'content3' },
];

const pageProps = {
    title: 'Page Modal',
    close_icon: true,
    panel: samplePanel,
    action_buttons: sampleActionButtons,
    is_open: true,
    setIsOpen: () => jest.fn(),
};

const dialogProps = {
    title: 'Page Modal',
    close_icon: true,
    action_buttons: sampleActionButtons,
    is_open: true,
    setIsOpen: () => jest.fn(),
};

describe('Modal Component', () => {
    describe('Page Modal', () => {
        let actionButtons: HTMLElement[];
        let panelItems: HTMLElement[];
        let page: HTMLElement;
        let close_icon: HTMLElement;
        beforeAll(() => {
            render(<Page {...pageProps} />);
            page = screen.getByTestId('dt_page_modal');
            const { getAllByRole } = within(page);
            actionButtons = getAllByRole('button');
            panelItems = screen.getAllByTestId('dt_panel_label');
            close_icon = screen.getByTestId('dt_close_icon');
        });
        it('Should render page modal', () => {
            expect(page).toBeInTheDocument();
        });

        it('Should render 2 buttons with certain text in modal', () => {
            expect(actionButtons.length).toBe(2);
            expect(actionButtons[0]).toHaveTextContent('primary');
            expect(actionButtons[1]).toHaveTextContent('secondary');
        });

        it('Should render 3 lables with certain text in the panel of modal', () => {
            expect(panelItems.length).toBe(3);
            expect(panelItems[0]).toHaveTextContent('label1');
            expect(panelItems[1]).toHaveTextContent('label2');
            expect(panelItems[2]).toHaveTextContent('label3');
        });

        it('Should render light page modal', () => {
            expect(page).not.toHaveAttribute('class', expect.stringContaining('dark'));
        });

        it('Should render dark page modal', () => {
            render(<Page {...pageProps} dark={true} />);
            page = screen.getByTestId('dt_page_modal');
            expect(page).toHaveAttribute('class', expect.stringContaining('dark'));
        });

        it('Should not render page modal when clicking on closeIcon', () => {
            fireEvent.click(close_icon);
            expect(page).not.toBeInTheDocument();
        });
    });

    describe('Dialog Modal', () => {
        let actionButtons: HTMLElement[];
        let dialog: HTMLElement;
        let close_icon: HTMLElement;

        beforeAll(() => {
            render(<Dialog {...dialogProps} />);
            dialog = screen.getByTestId('dt_dialog_modal');
            const { getAllByRole } = within(dialog);
            actionButtons = getAllByRole('button');
            close_icon = screen.getByTestId('dt_close_icon');
        });
        it('Should render dialog modal', () => {
            expect(dialog).toBeInTheDocument();
        });

        it('Should render 2 buttons with certain text in modal', () => {
            expect(actionButtons.length).toBe(2);
            expect(actionButtons[0]).toHaveTextContent('primary');
            expect(actionButtons[1]).toHaveTextContent('secondary');
        });

        it('Should render light dialog modal', () => {
            expect(dialog).not.toHaveAttribute('class', expect.stringContaining('dark'));
        });

        it('Should render dark dialog modal', () => {
            render(<Dialog {...dialogProps} dark={true} />);
            dialog = screen.getByTestId('dt_dialog_modal');
            expect(dialog).toHaveAttribute('class', expect.stringContaining('dark'));
        });

        it('Should not render dialog modal when clicking on closeIcon', () => {
            fireEvent.click(close_icon);
            expect(dialog).not.toBeInTheDocument();
        });
    });
});
