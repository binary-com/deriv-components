import React from 'react';
import classNames from 'classnames';
import Text from '@core/text/text';
import { TListItem } from './types';
import { styled } from 'Styles/stitches.config';

type TListItems = {
    active_index: null | number;
    className?: string;
    dark: boolean;
    is_align_text_center: boolean;
    list: TListItem[];
    not_found_text: string;
    onItemSelection: (item: TListItem, keycode?: number) => void;
    selected_value: number | string | null;
};

type TItem = {
    dark: boolean;
    child_ref?: React.ForwardedRef<HTMLDivElement> | null;
    className?: string;
    is_active?: boolean;
    is_align_text_center: boolean;
    item: TListItem;
    onItemSelection: (item: TListItem, keycode?: number) => void;
    selected_value?: string | number | null;
};

/* 
    ItemContainer - This acts as a wrapper and styles item value
*/
const ItemContainer = styled('div', {
    cursor: 'pointer',
    paddingX: '1rem',
    paddingY: '0.625rem',
    outline: 'none',

    variants: {
        dark: {
            true: {
                '&:not(.nohover):hover, &:not(.nohover):focus': {
                    backgroundColor: '$greyDark600',
                },
            },
            false: {
                '&:not(.nohover):hover, &:not(.nohover):focus': {
                    backgroundColor: '$greyLight300',
                },
            },
        },
        active: {
            true: {
                backgroundColor: '$greyLight300',
            },
        },
        disbaled: {
            true: {
                color: '$greyLight600',
                cursor: 'default',
                opacity: 0.3,
            },
        },
        selected: {
            true: {
                backgroundColor: '$greyLight400',
                fontWeight: 'bold',
            },
        },
        is_align_text_center: {
            true: {
                textAlign: 'center',
            },
        },
    },

    compoundVariants: [
        {
            dark: true,
            active: true,
            css: {
                backgroundColor: '$greyDark600',
            },
        },
        {
            dark: true,
            selected: true,
            css: {
                backgroundColor: '$greyDark500',
            },
        },
    ],
});

const Item = ({
    child_ref,
    className,
    dark,
    is_active,
    is_align_text_center,
    item,
    onItemSelection,
    selected_value,
}: TItem) => {
    return (
        <ItemContainer
            className={classNames(className, {
                nohover: selected_value === item.value || item.disabled,
            })}
            dark={dark}
            data-testid="dt_list_item"
            disbaled={item.disabled}
            active={is_active}
            onClick={() => onItemSelection(item)}
            ref={child_ref}
            selected={selected_value === item.value}
        >
            <Text
                align={is_align_text_center ? 'center' : 'left'}
                color={dark && selected_value === item.value ? 'prominent' : 'general'}
                css={{ margin: 0 }}
                type="paragraph-2"
            >
                {item.text}
            </Text>
        </ItemContainer>
    );
};

const ListItems = React.forwardRef<React.ElementRef<typeof ItemContainer>, TListItems>(
    (
        { active_index, className, dark, is_align_text_center, list, not_found_text, onItemSelection, selected_value },
        ref,
    ) => {
        return (
            <>
                {list.length ? (
                    list.map((item, item_idx) => (
                        <Item
                            child_ref={item_idx === active_index ? ref : null}
                            className={className}
                            dark={dark}
                            is_align_text_center={is_align_text_center}
                            key={item_idx}
                            item={item}
                            is_active={item_idx === active_index}
                            onItemSelection={onItemSelection}
                            selected_value={selected_value}
                        />
                    ))
                ) : (
                    <Item
                        className={className}
                        dark={dark}
                        is_align_text_center={is_align_text_center}
                        item={{ value: '', text: not_found_text }}
                        onItemSelection={() => onItemSelection({ value: '', text: '' })}
                    />
                )}
            </>
        );
    },
);

ListItems.displayName = 'ListItems';

export default ListItems;
