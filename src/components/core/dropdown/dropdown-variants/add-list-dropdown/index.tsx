import React from 'react';
import classNames from 'classnames';
import DropdownBase from '@core/dropdown/dropdown-base/dropdown-base';
import List from '@core/list/list';
import AddCircularIcon from '@assets/svg/add-circular-icon.svg';
import CircularCloseIcon from '@assets/svg/circular-close-icon.svg';
import TrashBinIcon from '@assets/svg/trash-bin-icon.svg';
import { ICompoundListItem } from '@core/list/types';
import { TAddListDropdownProps, TDropdownRef, TAddListItem } from '@core/dropdown/types';
import { styled } from 'Styles/stitches.config';

const AddListDropdownContainer = styled('div', {
    '& .display-text input': {
        paddingLeft: '16px',
    },

    '& .dropdown-wrapper': {
        border: 'dashed 2px $greyLight400',
    },

    '& .list-items': {
        border: '1px solid $greyLight400',
        height: '30px',
        marginTop: 0,
        marginBottom: '16px',
    },

    '& .list-items:hover': {
        backgroundColor: 'transparent',
    },
});

export const AddListDropdown = ({
    add_icon_src,
    classNameSelectedItems,
    default_selected_items,
    max_selected_items = 5,
    onAddSelectedItems,
    remove_item_icon_src,
    selected_items_size = 'large',
    ...props
}: TAddListDropdownProps) => {
    const default_items = React.useMemo(() => {
        if (default_selected_items?.length) {
            const items_have_remove_icon = default_selected_items.every((item) =>
                item.hasOwnProperty('action_icon_element'),
            );
            return items_have_remove_icon
                ? default_selected_items
                : default_selected_items?.map((item) => {
                      return {
                          ...item,
                          action_icon_element: (
                              <img
                                  src={remove_item_icon_src || TrashBinIcon}
                                  alt="remove-item-icon"
                                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                                  onClick={(e) => onRemoveItem(e, item.id)}
                              />
                          ),
                      };
                  });
        }
    }, [default_selected_items]);

    const [item, setItem] = React.useState<TAddListItem>({ value: '', text: '' });
    const [selected_items, setSelectedItems] = React.useState<ICompoundListItem[]>(default_items || []);
    const [search_term, setSearchTerm] = React.useState('');
    const dropdown_ref = React.useRef<TDropdownRef>(null);

    React.useEffect(() => {
        onAddSelectedItems?.(selected_items);
    }, [selected_items]);

    const onItemSelection = (item: TAddListItem) => {
        setItem(item);
        typeof item.text === 'string' && setSearchTerm(item.text);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onRemoveItem = (e: React.MouseEvent<HTMLImageElement>, id: number) => {
        e.stopPropagation();
        setSelectedItems((prev) => [...prev.filter((item) => item.id !== id)]);
    };

    const onAddItem = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        if (max_selected_items === selected_items.length) return;
        if (!item.text) return;
        if (item.text !== search_term) return;
        const id = Date.now();
        setSelectedItems([
            ...selected_items,
            {
                id,
                title: item.text,
                icon_src: item.add_list_icon_src,
                action_icon_element: (
                    <img
                        src={remove_item_icon_src || TrashBinIcon}
                        alt="remove-item-icon"
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                        onClick={(e) => onRemoveItem(e, id)}
                    />
                ),
            },
        ]);
        dropdown_ref.current?.clearInput();
    };

    const onClearInput = (e: React.MouseEvent<HTMLImageElement>) => {
        e.stopPropagation();
        setSearchTerm('');
        dropdown_ref.current?.clearInput();
    };

    const add_icon_element = (
        <img src={add_icon_src || AddCircularIcon} alt="add-icon" onClick={onAddItem} width={16} height={16} />
    );
    const clear_input_icon_element = (
        <img src={CircularCloseIcon} alt="clear-input-icon" onClick={onClearInput} width={16} height={16} />
    );

    return (
        <AddListDropdownContainer>
            {Boolean(selected_items.length) && (
                <List.CompoundList
                    classNameItems={classNames('list-items', classNameSelectedItems)}
                    items={selected_items}
                    size={selected_items_size}
                />
            )}
            {max_selected_items !== selected_items.length && (
                <DropdownBase
                    {...props}
                    classNameDisplay={classNames('display-text', props.classNameDisplay)}
                    classNameWrapper={classNames('dropdown-wrapper', props.classNameWrapper)}
                    dropdown_type="combobox"
                    has_chevron_icon={false}
                    inline_prefix_element={add_icon_element}
                    inline_suffix_element={(search_term || item.value) && clear_input_icon_element}
                    onInputChange={onInputChange}
                    onItemSelection={onItemSelection}
                    ref={dropdown_ref}
                    value={item.value}
                />
            )}
        </AddListDropdownContainer>
    );
};

export type TAddListDropdown = { AddListDropdown: typeof AddListDropdown };
