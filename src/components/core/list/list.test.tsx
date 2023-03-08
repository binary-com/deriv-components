import DefaultListActionIconSVG from '@assets/svg/default-action-icon.svg';
import DefaultListIconSVG from '@assets/svg/default-list-icon.svg';
import { cleanup, fireEvent, render, screen, within } from 'test-setup';
import List from './list';
import { ICheckListItem, ICompoundListItem, ISimpleListItem } from './types';

const simpleDataList: ISimpleListItem[] = [
    { id: 0, title: 'first' },
    { id: 1, title: 'second' },
    { id: 2, title: 'third' },
    { id: 3, title: 'forth' },
    { id: 4, title: 'fifth' },
    { id: 5, title: 'sixth' },
    { id: 6, title: 'seventh' },
    { id: 7, title: 'eighth' },
];

const checkedListData: ICheckListItem[] = [
    { id: 0, title: 'first', checked: true, crossed: false },
    { id: 1, title: 'second', checked: true, crossed: true },
    { id: 2, title: 'third', checked: false, crossed: true },
    { id: 3, title: 'forth', checked: false, crossed: false },
    { id: 4, title: 'fifth', checked: false, crossed: false },
    { id: 5, title: 'sixth', checked: false, crossed: false },
    { id: 6, title: 'seventh', checked: false, crossed: false },
    { id: 7, title: 'eighth', checked: false, crossed: true },
];

const action_icon_element = <img src={DefaultListActionIconSVG} alt="remove-item-icon" />;

export const compoundListData: ICompoundListItem[] = [
    {
        id: 0,
        title: 'first',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
    {
        id: 1,
        title: 'second',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
    {
        id: 2,
        title: 'third',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
    {
        id: 3,
        title: 'forth',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
    {
        id: 4,
        title: 'fifth',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
];

const simpleListTitles = simpleDataList.map((item) => item.title);
const checkedListTitles = checkedListData.map((item) => item.title);
const compoundListTitles = compoundListData.map((item) => item.title);
const compoundListSubtitles = compoundListData.map((item) => item.subtitle);

describe('List Component', () => {
    describe('Bulleted List', () => {
        let renderedBulletedListItems: HTMLElement[];
        let list: HTMLElement;
        beforeAll(() => {
            render(<List.BulletedList items={simpleDataList} />);
            list = screen.getByRole('list');
            const { getAllByRole } = within(list);
            renderedBulletedListItems = getAllByRole('listitem');
        });
        it('Should render all the items properly in Bulleted List', () => {
            expect(renderedBulletedListItems.length).toBe(8);
        });

        it('should render all titles properly in Bulleted List', () => {
            const renderedTitles = renderedBulletedListItems.map((item) => item.textContent);
            expect(renderedTitles).toEqual(expect.arrayContaining(simpleListTitles));
        });

        it('Should render light bulleted list', () => {
            expect(list).not.toHaveAttribute('class', expect.stringContaining('dark'));
        });
    });

    describe('Numbered List', () => {
        let renderedNumberListItems: HTMLElement[];
        let list: HTMLElement;
        beforeAll(() => {
            render(<List.NumberList items={simpleDataList} />);
            list = screen.getByRole('list');
            const { getAllByRole } = within(list);
            renderedNumberListItems = getAllByRole('listitem');
        });
        it('Should render all the items properly in Numbered List', () => {
            expect(renderedNumberListItems.length).toBe(8);
        });
        it('Should render all the title items properly in Numbered List', () => {
            const renderedTitles = renderedNumberListItems.map((item) => item.textContent);
            expect(renderedTitles).toEqual(expect.arrayContaining(simpleListTitles));
        });

        it('Should render light numbered list', () => {
            expect(list).not.toHaveAttribute('class', expect.stringContaining('dark'));
        });
    });

    describe('Checked List', () => {
        let renderedCheckedListItems: HTMLElement[];
        let list: HTMLElement;
        beforeAll(() => {
            render(<List.CheckList items={checkedListData} />);
            list = screen.getByRole('list');
            const { getAllByRole } = within(list);
            renderedCheckedListItems = getAllByRole('listitem');
        });

        it('Should render all the items properly in the Checked List', () => {
            expect(renderedCheckedListItems.length).toBe(8);
        });

        it('Should render all the title items properly in the Checked List', () => {
            const renderedTitles = renderedCheckedListItems.map((item) => item.textContent);
            expect(renderedTitles).toEqual(expect.arrayContaining(checkedListTitles));
        });

        it('Should render light checked list', () => {
            expect(list).not.toHaveAttribute('class', expect.stringContaining('dark'));
        });
    });

    describe('Compound List', () => {
        let list: HTMLElement;
        let renderedCompoundListItems: HTMLElement[];
        beforeAll(() => {
            render(<List.CompoundList items={compoundListData} />);
            list = screen.getByRole('list');
            const { getAllByRole } = within(list);
            renderedCompoundListItems = getAllByRole('listitem');
        });
        it('Should render all the items properly in the Compound List', () => {
            expect(renderedCompoundListItems.length).toBe(5);
        });

        it('Should render all the title items properly in the Compound List', () => {
            const { getAllByTestId } = within(list);
            const renderedTitles = getAllByTestId('title');
            const titleTextContents = renderedTitles.map((item) => item.textContent);
            expect(titleTextContents).toEqual(expect.arrayContaining(compoundListTitles));
        });

        it('Should render all the subtitles properly in the Compound List', () => {
            const { getAllByTestId } = within(list);
            const renderedSubtitles = getAllByTestId('subtitle');
            const subtitleTextContents = renderedSubtitles.map((item) => item.textContent);
            expect(subtitleTextContents).toEqual(expect.arrayContaining(compoundListSubtitles));
        });

        it('Should render light compound list', () => {
            expect(list).not.toHaveAttribute('class', expect.stringContaining('dark'));
        });

        it('Should be able to click on compond list item', () => {
            // clean up the screen since we are using beforeEach in the describe block. if we don't use it there will be two instances of list
            cleanup();

            const onItemClickMock = jest.fn();
            render(<List.CompoundList items={compoundListData} onClickItem={onItemClickMock} />);
            list = screen.getByRole('list');
            const { getByText } = within(list);
            fireEvent.click(getByText(/first/i));
            expect(onItemClickMock).toHaveBeenCalledTimes(1);
        });
    });
});
