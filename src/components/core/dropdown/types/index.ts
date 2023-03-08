import { ReactNode } from 'react';
import { ICompoundListItem } from '@core/list/types';

type THintTextProps = { error: string; hint: string };

type TListSize = 'small' | 'medium' | 'large';

export type TDirection = 'up' | 'down';

export type TDropdownBase = {
    className?: string;
    classNameDisplay?: string;
    classNameHint?: string;
    classNameItems?: string;
    classNamePrefix?: string;
    classNameSuffix?: string;
    classNameWrapper?: string;
    inline_prefix_element?: ReactNode;
    inline_suffix_element?: ReactNode;
    id?: string;
    dark?: boolean;
    disabled?: boolean;
    dropdown_type?: 'prompt' | 'combobox';
    has_chevron_icon?: boolean;
    hint_text?: THintTextProps;
    is_align_text_center?: boolean;
    is_alignment_top?: boolean;
    label?: string;
    list: TListItem[];
    list_size?: TListSize;
    not_found_text?: string;
    onBlurHandler?: VoidFunction;
    onClickDropdownHandler?: VoidFunction;
    onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onItemSelection?: (item: TListItem) => void;
    placeholder?: string;
    test_id?: string;
    value?: string;
};

export type TAddListDropdownProps = Omit<
    TDropdownBase,
    | 'dropdown_type'
    | 'has_chevron_icon'
    | 'inline_prefix_element'
    | 'inline_suffix_element'
    | 'onInputChange'
    | 'onItemSelection'
    | 'value'
> & {
    add_icon_src?: string;
    classNameSelectedItems?: string;
    default_selected_items?: {
        id: number;
        title: string;
        icon_src?: string;
        action_icon_element?: ReactNode;
    }[];
    selected_items_size: 'small' | 'medium' | 'large';
    max_selected_items: number;
    onAddSelectedItems?: (list_items: ICompoundListItem[]) => void;
    remove_item_icon_src?: string;
};

export type TListItems = {
    active_index: null | number;
    className?: string;
    dark: boolean;
    is_align_text_center: boolean;
    list: TListItem[];
    not_found_text: string;
    onItemSelection: (item: TListItem, keycode?: number) => void;
    selected_value?: string;
};

export type TItem = {
    dark: boolean;
    child_ref?: React.ForwardedRef<HTMLDivElement> | null;
    className?: string;
    is_active?: boolean;
    is_align_text_center: boolean;
    item: TListItem;
    onItemSelection: (item: TListItem, keycode?: number) => void;
    selected_value?: string;
};

export interface TListItem {
    disabled?: boolean;
    text: JSX.Element | string;
    value: string;
}

export interface TAddListItem extends TListItem {
    add_list_icon_src?: string;
}

export type TDisplayText = {
    dark: boolean;
    has_prefix_element?: boolean;
    list: TListItem[];
    value?: string;
};

export type TDropdownList = {
    active_index: number | null;
    classNameItems?: string;
    dark: boolean;
    is_align_text_center: boolean;
    is_alignment_top: boolean;
    is_list_visible: boolean;
    list: TListItem[];
    list_size: 'small' | 'medium' | 'large';
    not_found_text: string;
    onItemSelection: (item: TListItem, keycode?: number) => void;
    setActiveIndex: (index: null | number) => void;
    selected_value?: string;
};

export type TDropdownRef = {
    clearInput: VoidFunction;
};

export type TDropdownListRef = {
    listClientHeight?: number;
    itemOffsetTop?: number;
    scrollTo?: {
        (options?: ScrollToOptions | undefined): void;
        (x: number, y: number): void;
    };
    getBoundingClientRectOfDropdownList?: () => DOMRect;
    getBoundingClientRectOfListItem?: () => DOMRect;
};
