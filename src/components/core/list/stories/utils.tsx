import DefaultListActionIconSVG from '@assets/svg/default-action-icon.svg';
import DefaultListIconSVG from '@assets/svg/default-list-icon.svg';
import { styled } from 'Styles/stitches.config';
import { ICheckListItem, ICompoundListItem, ISimpleListItem } from '../types';

export const SimpleListData: ISimpleListItem[] = [
    { id: 0, title: 'first' },
    { id: 1, title: 'second' },
    { id: 2, title: 'third' },
    { id: 3, title: 'forth' },
    { id: 4, title: 'fifth' },
    { id: 5, title: 'sixth' },
    { id: 6, title: 'seventh' },
    { id: 7, title: 'eighth' },
];
export const CheckListData: ICheckListItem[] = [
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

export const CompoundListData: ICompoundListItem[] = [
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
    {
        id: 5,
        title: 'sixth',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
    {
        id: 6,
        title: 'seventh',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
    {
        id: 7,
        title: 'eighth',
        subtitle: 'subtitle',
        label: 'label',
        icon_src: DefaultListIconSVG,
        action_icon_element,
    },
];

export const ListStoryWrapper = styled('div', {
    margin: '0 auto',
    width: '500px',
});

export const ListStoryDecorator = (Story: any) => <ListStoryWrapper>{Story()}</ListStoryWrapper>;

export const ListStoriesArgTypes = {
    size: {
        control: {
            type: 'radio',
            options: ['small', 'medium', 'large'],
        },
        description: 'the size of List, it affects spacing and font-size of the list items',
        defaultValue: 'medium',
        table: {
            defaultValue: { summary: 'medium' },
        },
    },
    items: {
        control: false,
        description: 'Array of list items, they should have type',
    },
};
