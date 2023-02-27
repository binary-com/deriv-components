import React from 'react';
import classNames from 'classnames';
import Text from '@core/text/text';
import { TListItem } from './types';
import { styled } from 'Styles/stitches.config';

type TListItems = {
    active_index: null | number;
    classNameItems?: string;
    dark: boolean;
    is_align_text_center: boolean;
    list: TListItem[];
    not_found_text: string;
    onItemSelection: (item: TListItem) => void;
    setActiveIndex: (index: null | number) => void;
    value: number | string | null;
};

type TItem = {
    dark: boolean;
    child_ref: React.ForwardedRef<HTMLDivElement> | null;
    is_active: boolean;
    is_align_text_center: boolean;
    item: TListItem;
    onItemSelection: (item: TListItem) => void;
    value: string | number | null;
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
                    //find color
                    backgroundColor: '#242828',
                },
            },
            false: {
                '&:not(.nohover):hover, &:not(.nohover):focus': {
                    backgroundColor: '$greyLight300',
                },
            },
        },
        selected: {
            true: {
                backgroundColor: '$greyLight400',
                fontWeight: 'bold',
            },
        },
        disbaled: {
            true: {
                color: '$greyLight600',
                cursor: 'default',
                opacity: 0.3,
            },
        },
        is_align_text_center: {
            true: {
                textAlign: 'center',
            },
        },
        is_active: {
            true: {
                //find color
                backgroundColor: '$greyLight400',
                // backgroundColor: '#e6e9e9',
            },
        },
    },

    compoundVariants: [
        {
            dark: true,
            selected: true,
            css: {
                backgroundColor: '$greyDark500',
            },
        },
    ],
});

const Item = ({ child_ref, dark, is_active, is_align_text_center, item, onItemSelection, value }: TItem) => {
    return (
        <ItemContainer
            className={classNames({
                nohover: value === item.value || item.disabled,
            })}
            dark={dark}
            data-testid="dt_list_item"
            disbaled={item.disabled}
            is_active={is_active}
            onClick={() => onItemSelection(item)}
            ref={child_ref}
            // selected={value === item.text}
        >
            <Text
                align={is_align_text_center ? 'center' : 'left'}
                color={dark && value === item.value ? 'prominent' : 'general'}
                css={{ margin: 0 }}
                type="paragraph-2"
            >
                {item.text}
            </Text>
        </ItemContainer>
    );
};

const ListItems = React.forwardRef<React.ElementRef<typeof ItemContainer>, TListItems>(
    ({ active_index, list, not_found_text, ...props }, ref) => {
        return (
            <>
                {list.length ? (
                    list.map((item, item_idx) => (
                        <Item
                            key={item_idx}
                            item={item}
                            is_active={item_idx === active_index}
                            child_ref={item_idx === active_index ? ref : null}
                            {...props}
                        />
                    ))
                ) : (
                    <div>{not_found_text}</div>
                )}
            </>
        );
    },
);

ListItems.displayName = 'ListItems';

export default ListItems;
