import React from 'react';
import { DropdownStoryDecorator, DropdownBaseStoriesArgTypes, default_add_list_items, names_add_list } from './utils';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AddListDropdown } from '../dropdown-variants/add-list-dropdown';

export default {
    title: 'Dropdown variants / AddList dropdown',
    component: AddListDropdown,
    decorators: [DropdownStoryDecorator],
    argTypes: {
        ...DropdownBaseStoriesArgTypes,
        default_selected_items: {
            description: 'Default list with selected items',
        },
        max_selected_items: {
            description: 'The maximum number of selected items that can be displayed on the screen',
        },
        onAddSelectedItems: {
            description: 'Used to save the selected items outside the component',
        },
    },
} as ComponentMeta<typeof AddListDropdown>;

const Template: ComponentStory<typeof AddListDropdown> = (args) => <AddListDropdown {...args} />;

export const DefaultDropdownAddList = Template.bind({});
DefaultDropdownAddList.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    list: names_add_list,
    placeholder: 'Add',
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
    max_selected_items: 3,
};

export const DefaultDropdownAddListWithDefaultSelectedItems = Template.bind({});
DefaultDropdownAddListWithDefaultSelectedItems.args = {
    dark: false,
    disabled: false,
    hint_text: {
        error: '',
        hint: '',
    },
    list: names_add_list,
    placeholder: 'Add',
    onClickDropdownHandler: undefined,
    onBlurHandler: undefined,
    max_selected_items: 4,
    default_selected_items: default_add_list_items,
};
