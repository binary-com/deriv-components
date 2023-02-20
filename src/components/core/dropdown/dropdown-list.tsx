import React from 'react';
import Items from './items';
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
    classNameItems?: string;
    dark: boolean;
    handleSelect: (item: TListItem) => void;
    is_align_text_center: boolean;
    is_alignment_left: boolean;
    is_alignment_top: boolean;
    is_list_visible: boolean;
    list: TListItem[];
    list_size: 'small' | 'medium' | 'large';
    nodes?: React.MutableRefObject<Map<string, React.MutableRefObject<HTMLDivElement>['current']>>;
    onKeyPressed: (e: React.KeyboardEvent<HTMLDivElement>, item: TListItem) => void;
    value: string;
};

/* 
    DropdownListContainer - This acts as a wrapper and styles list of items
*/
const DropdownListContainer = styled('div', {
    left: 0,
    bottom: '-0.4rem',
    height: 0,
    width: '100%',
    position: 'absolute',
    transition: 'transform 0.25s ease, opacity 0.25s linear',
    userSelect: 'none',
    opacity: 0,
    transform: 'scale(1, 0)',
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

const DropdownList = React.forwardRef<HTMLDivElement, TDropdownList>((props, list_ref) => {
    const {
        classNameItems,
        dark,
        handleSelect,
        is_align_text_center,
        is_alignment_left,
        is_alignment_top,
        is_list_visible,
        list,
        list_size,
        nodes,
        onKeyPressed,
        value,
    } = props;

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
    const setListDimension = () =>
        setListDimensions([
            (list_ref as React.MutableRefObject<HTMLDivElement>).current.offsetWidth,
            (list_ref as React.MutableRefObject<HTMLDivElement>).current.offsetHeight,
        ]);

    const getDropDownAlignment = () => {
        if (is_alignment_left) return computed_offset_left();
        else if (is_alignment_top) return computed_offset_top();
    };

    const el_dropdown_list = (
        <CSSTransition in={is_list_visible} timeout={100} classNames="list" onEntered={setListDimension} unmountOnExit>
            <DropdownListContainer>
                <List
                    dark={dark}
                    style={getDropDownAlignment()}
                    aria-expanded={is_list_visible}
                    role="list"
                    ref={list_ref}
                >
                    <Scrollbars style={{ maxHeight: list_dimensions[1] || size[list_size], marginRight: 0 }}>
                        <Items
                            className={classNameItems}
                            dark={dark}
                            handleSelect={handleSelect}
                            is_align_text_center={is_align_text_center}
                            items={list}
                            nodes={nodes?.current}
                            onKeyPressed={onKeyPressed}
                            value={value}
                        />
                    </Scrollbars>
                </List>
            </DropdownListContainer>
        </CSSTransition>
    );

    return el_dropdown_list;
});

DropdownList.displayName = 'DropdownList';

export default DropdownList;
