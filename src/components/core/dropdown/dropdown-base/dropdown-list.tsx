import React from 'react';
import ListItems from './list-items';
import { TDropdownList } from '../types';
import { styled } from 'Styles/stitches.config';
import { CSSTransition } from 'react-transition-group';
import { TDropdownListRef } from '../types';
import Scrollbars from '@core/scrollbars/scrollbars';

const SIZE = {
    small: 220,
    medium: 420,
    large: 660,
};

/* 
    DropdownListContainer - This acts as a wrapper and styles list of items
*/
const DropdownListContainer = styled('div', {
    position: 'absolute',
    left: 0,
    bottom: '-4px',
    width: '100%',
    transition: 'transform 0.25s ease, opacity 0.25s linear',
    transform: 'scale(1, 0)',
    userSelect: 'none',
    opacity: 0,
    zIndex: 999,

    '&.list-enter, &.list-exit': {
        transform: 'scale(1, 0)',
        opacity: 0,
    },

    '&.list-enter-done': {
        transform: 'scale(1, 1)',
        opacity: 1,
    },
});

/* 
    List - This section displays list of items
*/
const List = styled('div', {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    boxShadow: '0px 32px 64px rgba(14, 14, 14, 0.14)',
    borderRadius: '$default',

    variants: {
        dark: {
            true: {
                backgroundColor: '$greyDark700',
            },
            false: {
                backgroundColor: '$greyLight100',
            },
        },
    },
});

const DropdownList = React.forwardRef<TDropdownListRef, TDropdownList>(
    (
        {
            active_index,
            classNameItems,
            dark,
            is_align_text_center,
            is_alignment_top,
            is_list_visible,
            list,
            list_size,
            not_found_text,
            onItemSelection,
            selected_value,
        },
        ref,
    ) => {
        const dropdown_list_ref = React.useRef<HTMLDivElement>(null);
        const list_item_ref = React.useRef<HTMLDivElement>(null);

        React.useImperativeHandle(
            ref,
            () => {
                return {
                    listClientHeight: dropdown_list_ref.current?.clientHeight,
                    itemOffsetTop: list_item_ref.current?.offsetTop,
                    scrollTo: dropdown_list_ref.current?.scrollTo.bind(dropdown_list_ref.current),
                    getBoundingClientRectOfDropdownList: dropdown_list_ref.current?.getBoundingClientRect.bind(
                        dropdown_list_ref.current,
                    ),
                    getBoundingClientRectOfListItem: list_item_ref.current?.getBoundingClientRect.bind(
                        list_item_ref.current,
                    ),
                };
            },
            [active_index, is_list_visible],
        );

        const [list_dimensions, setListDimensions] = React.useState([0, 0]);

        /**
         * Calculate the offset for the dropdown list based on its height
         *
         * @return {{transform: string}}
         */
        const computed_offset_top = () => {
            return {
                transform: `translate3d(0, calc(-${list_dimensions[1]}px - 50px), 0px)`,
            };
        };

        // Upon render via css transition group, we use this as a callback to set the width/height of the dropdown list in the state
        const setListDimension = () => {
            setListDimensions([
                (dropdown_list_ref as React.MutableRefObject<HTMLDivElement>).current.offsetWidth,
                (dropdown_list_ref as React.MutableRefObject<HTMLDivElement>).current.offsetHeight,
            ]);
        };

        const getDropDownAlignment = () => {
            if (is_alignment_top) return computed_offset_top();
        };

        return (
            <CSSTransition
                appear={is_list_visible}
                in={is_list_visible}
                onEntered={setListDimension}
                timeout={100}
                classNames="list"
                unmountOnExit
            >
                <DropdownListContainer>
                    <List dark={dark} aria-expanded={is_list_visible} role="list" style={getDropDownAlignment()}>
                        <Scrollbars style={{ maxHeight: SIZE[list_size], marginRight: 0 }} ref={dropdown_list_ref}>
                            <ListItems
                                active_index={active_index}
                                dark={dark}
                                className={classNameItems}
                                is_align_text_center={is_align_text_center}
                                list={list}
                                not_found_text={not_found_text}
                                onItemSelection={onItemSelection}
                                ref={list_item_ref}
                                selected_value={selected_value}
                            />
                        </Scrollbars>
                    </List>
                </DropdownListContainer>
            </CSSTransition>
        );
    },
);

DropdownList.displayName = 'DropdownList';

export default DropdownList;
