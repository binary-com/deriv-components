import React from 'react';
import ListItems from './list-items';
import { TListItem } from './types';
import { styled } from 'Styles/stitches.config';
import { CSSTransition } from 'react-transition-group';
import Scrollbars from '@core/scrollbars/scrollbars';

const size = {
    small: 220,
    medium: 420,
    large: 660,
};

type TDropdownList = {
    active_index: number | null;
    classNameItems?: string;
    dark: boolean;
    is_align_text_center: boolean;
    is_alignment_left: boolean;
    is_alignment_top: boolean;
    is_list_visible: boolean;
    list: TListItem[];
    list_size: 'small' | 'medium' | 'large';
    onItemSelection: (item: TListItem) => void;
    setActiveIndex: (index: null | number) => void;
    value: string | number | null;
};

/* 
    DropdownListContainer - This acts as a wrapper and styles list of items
*/
const DropdownListContainer = styled('div', {
    // position: 'absolute',
    marginTop: '4px',
    borderRadius: '4px',
    zIndex: 1,
    boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.24)',
    transformOrigin: 'top',
    transition: 'transform 0.25s ease, opacity 0.25s linear',
    transform: 'scale(1, 0)',
    cursor: 'pointer',
    width: '100%',

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
    background: '$greyLight100',
    boxShadow: '0px 32px 64px rgba(14, 14, 14, 0.14)',
    borderRadius: 4,

    variants: {
        dark: {
            true: {
                backgroundColor: '$greyDark700',
            },
        },
    },
});

export type TRef = {
    listClientHeight?: number;
    itemOffsetTop?: number;
    scrollTo:
        | {
              (options?: ScrollToOptions | undefined): void;
              (x: number, y: number): void;
          }
        | undefined;
    getBoundingClientRectOfDropdownList?: () => DOMRect;
    getBoundingClientRectOfListItem?: () => DOMRect;
};

const DropdownList = React.forwardRef<TRef, TDropdownList>(
    (
        {
            active_index,
            classNameItems,
            dark,
            is_align_text_center,
            is_alignment_left,
            is_alignment_top,
            is_list_visible,
            list,
            list_size,
            value,
            onItemSelection,
            setActiveIndex,
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
            [is_list_visible, active_index],
        );

        const [list_dimensions, setListDimensions] = React.useState([0, 0]);

        /**
         * Calculate the offset for the dropdown list based on its width
         *
         * @return {{transform: string}}
         */
        const computed_offset_left = () => {
            return {
                transform: `translate3d(calc(-${list_dimensions[0]}px - 12px), 0, 0px)`,
            };
        };

        /**
         * Calculate the offset for the dropdown list based on its height
         *
         * @return {{transform: string}}
         */
        const computed_offset_top = () => {
            return {
                transform: `translate3d(0, calc(-${list_dimensions[1]}px - 54px), 0px)`,
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
            if (is_alignment_left) return computed_offset_left();
            else if (is_alignment_top) return computed_offset_top();
        };

        const is_object = !Array.isArray(list) && typeof list === 'object';

        return (
            <CSSTransition
                appear={is_list_visible}
                in={is_list_visible}
                onEntered={setListDimension}
                timeout={100}
                classNames="list"
                unmountOnExit
            >
                <DropdownListContainer style={getDropDownAlignment()}>
                    <Scrollbars style={{ maxHeight: size[list_size], marginRight: 0 }} ref={dropdown_list_ref}>
                        {is_object ? (
                            Object.keys(list).map((items, idx) => (
                                <ListItems
                                    active_index={active_index}
                                    classNameItems={classNameItems}
                                    dark={dark}
                                    is_align_text_center={is_align_text_center}
                                    key={idx}
                                    list={list[items]}
                                    not_found_text="Not found"
                                    onItemSelection={onItemSelection}
                                    ref={list_item_ref}
                                    setActiveIndex={setActiveIndex}
                                    value={value}
                                />
                            ))
                        ) : (
                            <ListItems
                                active_index={active_index}
                                dark={dark}
                                classNameItems={classNameItems}
                                is_align_text_center={is_align_text_center}
                                list={list}
                                not_found_text="Not found"
                                onItemSelection={onItemSelection}
                                ref={list_item_ref}
                                setActiveIndex={setActiveIndex}
                                value={value}
                            />
                        )}
                    </Scrollbars>
                </DropdownListContainer>
            </CSSTransition>
        );
    },
);

DropdownList.displayName = 'DropdownList';

export default DropdownList;
