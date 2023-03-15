import { render, screen, within, fireEvent } from 'test-setup';
import Breadcrumb from './breadcrumb';

const items = [
    { value: 0, text: 'Home' },
    { value: 1, text: 'About' },
    { value: 2, text: 'CFD' },
    { value: 3, text: 'mt5' },
];

describe('Breadcrumb Component', () => {
    it('Should render all provided items', () => {
        const handleOnClick = jest.fn();
        render(<Breadcrumb items={items} handleOnClick={handleOnClick} />);
        const list = screen.getByRole('list');
        const { getAllByRole } = within(list);
        const renderedBreadCrumbs = getAllByRole('listitem');

        expect(renderedBreadCrumbs.length).toBe(4);
    });

    it('Should be able to click on items', () => {
        const handleOnClick = jest.fn();
        render(<Breadcrumb items={items} handleOnClick={handleOnClick} />);
        const list = screen.getByRole('list');
        const { getByText } = within(list);
        fireEvent.click(getByText(/CFD/i));

        expect(handleOnClick).toHaveBeenCalledTimes(1);
    });
});
