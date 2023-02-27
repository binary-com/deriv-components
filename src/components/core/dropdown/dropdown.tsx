import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ChevronDownDark from '@assets/svg/chevron-down-dark.svg';
import ChevronDownLight from '@assets/svg/chevron-down-light.svg';
import DisplayText from './display-text';
import DropdownList from './dropdown-list';
import { TListItem } from './types';
import { useOnClickOutside } from 'hooks';
import { TRef } from './dropdown-list';
import { styled } from 'Styles/stitches.config';

const KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27,
    TAB: 9,
    KEYDOWN: 40,
    KEYUP: 38,
    SPACE: 32,
};

const HintText = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

type THintTextProps = { error: string; hint: string };

type TListSize = 'small' | 'medium' | 'large';

type TDropdown = {
    className?: string;
    classNameDisplay?: string;
    // classNameHint,
    classNameItems?: string;
    // classNameLabel,
    // classNameIcon,
    classNamePrefix?: string;
    classNameSuffix?: string;
    inline_prefix_element?: ReactNode;
    inline_suffix_element?: ReactNode;
    id?: string;
    dark?: boolean;
    disabled?: boolean;
    dropdown_type?: 'prompt' | 'combobox';
    hint_text?: THintTextProps;
    is_align_text_center?: boolean;
    is_alignment_left?: boolean;
    is_alignment_top?: boolean;
    label?: string;
    list: TListItem[];
    list_size?: TListSize;
    onBlurHandler?: VoidFunction;
    onClickHandler?: VoidFunction;
    onItemSelection?: (item: TListItem) => void;
    test_id?: string;
    value: string;
};

/* 
    HelperSection - This section displays hint and error text
*/
const HelperSection = styled('section', {
    paddingLeft: '1rem',
    fontSize: '$3xs',
    lineHeight: '$lineHeight18',
    display: 'inline-flex',
    marginTop: '0.125rem',

    variants: {
        dark: {
            true: { color: '$greyDark200' },
            false: { color: '$greyLight600' },
        },
        disabled: {
            true: {
                opacity: 0.32,
                pointerEvents: 'none',
            },
        },
        error: {
            true: { color: '$coral500' },
        },
    },

    compoundVariants: [
        {
            dark: true,
            error: true,
            css: {
                color: '$redDark',
            },
        },
    ],
});

/* 
    DropdownContainer - This acts as a wrapper and styles the Dropdown menu and Helper section
*/
const DropdownContainer = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
});

/* 
    DropdownWrapper - This acts as a wrapper and styles the Dropdown menu
*/
const DropdownWrapper = styled('div', {
    display: 'flex',
    position: 'relative',
    borderRadius: '$default',
    borderWidth: '$1',
    borderStyle: 'solid',
    height: '2.375rem',
    padding: '0 1rem',
    cursor: 'pointer',

    variants: {
        active: {
            true: {},
        },
        dark: {
            true: {
                borderColor: '$greyDark500',
                backgroundColor: '$greyDark800',
                color: '$greyDark200',

                '&:not(.nohover):hover': {
                    borderColor: '$greyDark200',
                },
            },
            false: {
                borderColor: '$greyLight400',
                backgroundColor: '$greyLight100',
                color: '$greyLight600',

                '&:not(.nohover):hover': {
                    borderColor: '$greyLight600',
                },
            },
        },
        disabled: {
            true: {
                opacity: 0.32,
                pointerEvents: 'none',
            },
        },
        enabled: {
            true: {},
        },
        error: {
            true: {
                borderColor: '$redLight',
                color: '$redLight',
            },
        },
        has_value: {
            true: {},
        },
    },

    compoundVariants: [
        {
            active: true,
            enabled: false,
            error: false,
            css: {
                borderColor: '$blue500',
                color: '$blue500',
            },
        },
        {
            active: false,
            enabled: true,
            error: false,
            css: {
                color: '$greyLight700',
            },
        },
        //needs to show proper color for top label, when Dropdown menu first renders with predefined value
        {
            active: false,
            enabled: false,
            error: false,
            has_value: true,
            css: {
                color: '$greyLight700',
            },
        },
        {
            dark: true,
            active: false,
            enabled: true,
            error: false,
            css: {
                color: '$greyDark100',
            },
        },
        {
            dark: true,
            active: false,
            enabled: false,
            error: false,
            has_value: true,
            css: {
                color: '$greyDark100',
            },
        },
    ],
});

/*
    LabelSection - Styles the Dropdown label 
*/
const LabelSection = styled('label', {
    whiteSpace: 'nowrap',
    fontSize: '$2xs',
    position: 'absolute',
    pointerEvents: 'none',
    transition: '0.25s ease all',
    transformOrigin: 'top left',
    left: '1rem',

    variants: {
        dark: {
            true: {
                backgroundColor: '$greyDark800',
            },
            false: {
                backgroundColor: '$greyLight100',
            },
        },
    },
});

/*
    SupportingInfoSection - Styles the prefix and suffix elements of Dropdown menu
*/
const SupportingInfoSection = styled('div', {
    display: 'flex',
    fontSize: '$2xs',
});

/* 
    DisplaySection - Styles the Dropdown menu and wraps prefix, suffix and display text
*/
const DisplaySection = styled('div', {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: '$lineHeight20',
    outline: 'none',
});

/* 
    InputTextField - 
*/
const InputTextField = styled('input', {
    width: '100%',
    lineHeight: '$lineHeight20',
    outline: 'none',
    border: 'none',
});

/* 
    ChevronIcon - Icon to open/close the Dropdown menu
*/
const ChevronIcon = styled('img', {
    transition: 'transform 0.2s ease',
    transform: 'rotate(0deg)',
    transformOrigin: '50% 45%',

    variants: {
        is_list_visible: {
            true: {
                transform: 'rotate(-180deg)',
            },
        },
    },
});

const Dropdown = ({
    onItemSelection,
    className,
    classNameDisplay,
    // classNameHint,
    // classNameIcon,
    // classNameLabel,
    classNameItems,
    classNamePrefix,
    classNameSuffix,
    inline_prefix_element,
    inline_suffix_element,
    id,
    dark,
    disabled,
    dropdown_type = 'prompt',
    onBlurHandler,
    hint_text,
    is_align_text_center,
    is_alignment_left,
    is_alignment_top,
    label,
    list,
    onClickHandler,
    value,
    list_size = 'small',
}: TDropdown) => {
    const container_ref = React.useRef<HTMLDivElement>(null);
    const dropdown_list_ref = React.useRef<TRef>(null);
    const input_ref = React.useRef<HTMLInputElement>(null);
    const move_ref = React.useRef<boolean>();
    const enabled_item_index = React.useRef(0);

    const [active_index, setActiveIndex] = React.useState<number | null>(null);
    const [filtered_items, setFilteredItems] = React.useState(list);
    const [input_value, setInputValue] = React.useState('');
    const [is_active, setIsActive] = React.useState(false);
    const [is_enabled, setIsEnabled] = React.useState(false);
    const [is_list_visible, setIsListVisible] = React.useState(false);
    const [selected_item, setSelectedItem] = React.useState('');
    const [should_focus_input, setShouldFocusInput] = React.useState(false);

    const is_all_items_disabled = React.useMemo(() => {
        const is_disabled = filtered_items.every((item) => item.disabled);
        if (is_disabled) setActiveIndex(null);
        return is_disabled;
    }, [filtered_items]);

    const list_with_enabled_items = React.useMemo(() => {
        return filtered_items.reduce<number[]>((acc, el, idx) => {
            if (!el.disabled) acc.push(idx);
            return acc;
        }, []);
    }, [filtered_items]);

    const { error, hint } = hint_text ?? {};
    const has_helper_section = Boolean(error) || Boolean(hint);

    React.useEffect(() => {
        if (should_focus_input) {
            input_ref.current?.focus();
        }
        setShouldFocusInput(false);
    }, [should_focus_input]);

    // Shows selected item if it's not in visible area of the dropdown list
    React.useEffect(() => {
        if (is_list_visible && dropdown_list_ref.current) {
            const item_height = dropdown_list_ref.current.getBoundingClientRectOfListItem?.().height;

            const item_top = move_ref.current
                ? Math.floor(dropdown_list_ref.current.getBoundingClientRectOfListItem?.().top) +
                  item_height +
                  item_height / 2
                : Math.floor(dropdown_list_ref.current.getBoundingClientRectOfListItem?.().top) - item_height / 2;
            const list_height = dropdown_list_ref.current.clientHeight;
            if (!isListItemWithinView(item_top) && list_height) {
                if (move_ref.current) {
                    const items_above = list_height / item_height - 1;
                    const bottom_of_list = dropdown_list_ref.current.offsetTop - items_above * item_height;
                    dropdown_list_ref.current.scrollTo?.({ top: bottom_of_list, behavior: 'smooth' });
                } else {
                    const top_of_list = dropdown_list_ref.current.offsetTop;
                    dropdown_list_ref.current.scrollTo?.({ top: top_of_list, behavior: 'smooth' });
                }
            }
        }
    }, [active_index]);

    // Shows selected item when the user uncollapsed the list (when item is not in visible area)
    React.useEffect(() => {
        if (is_list_visible && dropdown_list_ref.current) {
            const item = dropdown_list_ref.current.offsetTop;
            dropdown_list_ref.current.scrollTo?.({ top: item, behavior: 'smooth' });
        }
    }, [is_list_visible]);

    const onClickOutSide = () => {
        setIsListVisible(false);
        setIsActive(false);
        // Boolean(input_value || value) && setIsEnabled(true);
        setFilteredItems(list);

        onBlurHandler?.();
    };

    useOnClickOutside(container_ref, onClickOutSide);

    const isListItemWithinView = (item_top: number) => {
        let wrapper_top = 0,
            wrapper_bottom = 0;

        if (dropdown_list_ref.current) {
            const list_height = dropdown_list_ref.current.clientHeight;
            wrapper_top = Math.floor(dropdown_list_ref.current.getBoundingClientRectOfDropdownList?.().top);
            wrapper_bottom =
                Math.floor(dropdown_list_ref.current.getBoundingClientRectOfDropdownList?.().top) + list_height;
        }

        if (item_top >= wrapper_bottom) return false;
        return item_top > wrapper_top;
    };

    const getFilteredItems = (text: string, list: TListItem[]) => {
        return list.filter((item) => item.text?.toLowerCase().includes(text));
    };

    const filterList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value.toLowerCase();
        setInputValue(e.target.value);

        const new_filtered_items = getFilteredItems(text, list);
        setFilteredItems(new_filtered_items);

        enabled_item_index.current = 0;
        setActiveIndex(null);
    };

    const handleVisibility = () => {
        setIsActive(true);
        setIsEnabled(false);

        if (typeof onClickHandler === 'function') {
            setIsActive(true);
            setIsEnabled(false);
            onClickHandler();

            return;
        }

        setIsListVisible(!is_list_visible);
    };

    const onKeyPressed = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();

        switch (e.keyCode) {
            case KEY_CODE.ENTER:
            case KEY_CODE.TAB:
                e.preventDefault();
                if (is_list_visible) setIsListVisible(false);
                typeof active_index === 'number' && onSelectItem(filtered_items[active_index]);
                break;
            case KEY_CODE.ESCAPE:
                e.preventDefault();
                if (is_list_visible) setIsListVisible(false);
                break;
            case KEY_CODE.KEYDOWN:
                if (!is_list_visible) setIsListVisible(true);
                if (!is_all_items_disabled) setActiveDown();
                break;
            case KEY_CODE.KEYUP:
                if (!is_list_visible) setIsListVisible(true);
                if (!is_all_items_disabled) setActiveUp();
                break;
            default:
                if (dropdown_type === 'combobox' && !is_list_visible) setIsListVisible(true);
                break;
        }

        // For char presses, we do a search for the item (avaliable only for prompt dropdown type):
        if (dropdown_type === 'prompt' && e.key.length === 1 && list.length) {
            const char = e.key.toLowerCase();
            const item_starting_with_char = filtered_items
                .filter((el) => !el.disabled)
                .find((li) => li.value && li.value[0].toLowerCase() === char);
            if (!item_starting_with_char) return;

            const index = filtered_items.findIndex((el) => el.value === item_starting_with_char.value);
            setActiveIndex(index);
            enabled_item_index.current = list_with_enabled_items.findIndex((el) => el === index);
        }
    };

    const setActiveUp = () => {
        if (list_with_enabled_items.length === 1 || active_index === null) {
            setActiveIndex(list_with_enabled_items[0]);
            return;
        }

        if (!dropdown_list_ref.current && active_index !== null) {
            setActiveIndex(active_index > filtered_items.length ? list_with_enabled_items[0] : active_index);
        } else if (typeof active_index === 'number') {
            const up = list_with_enabled_items[enabled_item_index.current - 1];
            enabled_item_index.current -= 1;
            const should_scroll_to_last = up === undefined || up < 0;

            if (should_scroll_to_last) {
                enabled_item_index.current = list_with_enabled_items.length - 1;
                setActiveIndex(list_with_enabled_items[enabled_item_index.current]);
            } else {
                setActiveIndex(up);
            }
        }
        move_ref.current = false;
    };

    console.log('dropdown_list_ref.current', dropdown_list_ref.current);

    const setActiveDown = () => {
        if (list_with_enabled_items.length === 1 || active_index === null) {
            setActiveIndex(list_with_enabled_items[0]);
            return;
        }

        if (!dropdown_list_ref.current && active_index !== null) {
            enabled_item_index.current;
            setActiveIndex(active_index > filtered_items.length ? list_with_enabled_items[0] : active_index);
        } else if (typeof active_index === 'number') {
            const down = list_with_enabled_items[enabled_item_index.current + 1];
            enabled_item_index.current += 1;
            const should_scroll_to_first = enabled_item_index.current >= list_with_enabled_items.length;

            if (should_scroll_to_first) {
                enabled_item_index.current = 0;
                setActiveIndex(list_with_enabled_items[enabled_item_index.current]);
            } else {
                setActiveIndex(down);
            }
        }
        move_ref.current = true;
    };

    const generateHintText = () => {
        if (error) return <HintText>{error}</HintText>;
        if (hint) return <HintText>{hint}</HintText>;
    };

    const styleLabelFloat = () => {
        if (is_active || input_value || value) {
            return {
                lineHeight: '$lineHeight14',
                fontSize: '$4xs',
                transform: 'translate(0, -1.2rem) scale(0.75)',
                padding: '0 4px',
                left: '0.78125rem',
            };
        }
    };

    const onSelectItem = (item: TListItem) => {
        if (item.disabled) {
            setShouldFocusInput(true);
            return;
        }
        if (!item) return;

        setInputValue(item.text);

        setIsListVisible(false);
        setSelectedItem(item.text);

        const active_index = list.findIndex((el) => item.text === el.text);
        setActiveIndex(active_index);

        /*
            We need to save current enabled_item_index to have right start point,
            when the user opens list using click and starts move between the items using arrow keys.

            If current_list_with_enabled_items < original_list_with_enabled_items we should save enabled_item_index properly
            to avoid wrong swithcing between the items when the user opens list using arrows keys and starts move between the items
        */

        enabled_item_index.current =
            list_with_enabled_items.length < list.filter((el) => !el.disabled).length
                ? list.filter((el) => !el.disabled).findIndex((el) => el.value === item.value)
                : list_with_enabled_items.findIndex((el) => el === active_index);
        setFilteredItems(list);

        if (typeof onItemSelection === 'function') {
            onItemSelection(item);
        }
    };

    return (
        <DropdownContainer className={className} ref={container_ref}>
            <DropdownWrapper
                className={classNames({
                    nohover: is_active || Boolean(error),
                })}
                active={is_active}
                dark={dark}
                data-testid="dt_dropdown_container"
                disabled={Boolean(disabled)}
                enabled={is_enabled}
                error={Boolean(error)}
                has_value={Boolean(value)}
                onClick={handleVisibility}
            >
                <DisplaySection
                    className={classNameDisplay}
                    data-testid="dti_dropdown_display"
                    id="dropdown-display"
                    onKeyDown={onKeyPressed}
                    tabIndex={0}
                >
                    {inline_prefix_element && (
                        <SupportingInfoSection className={classNamePrefix}>
                            {inline_prefix_element}
                        </SupportingInfoSection>
                    )}
                    {dropdown_type === 'prompt' ? (
                        <DisplayText
                            dark={Boolean(dark)}
                            has_prefix_element={!!inline_prefix_element}
                            value={(input_value || value) ?? 0}
                            list={list}
                        />
                    ) : (
                        <InputTextField
                            id="dropdown-input-field"
                            onInput={filterList}
                            value={
                                // This allows us to let control of value externally (from <Form/>) or internally if used without form
                                typeof onItemSelection === 'function' ? value : input_value
                            }
                            ref={input_ref}
                        />
                    )}

                    <SupportingInfoSection className={classNameSuffix}>
                        {inline_suffix_element || (
                            <ChevronIcon
                                alt="chevron-icon"
                                is_list_visible={is_list_visible}
                                src={dark ? ChevronDownDark : ChevronDownLight}
                            />
                        )}
                    </SupportingInfoSection>
                    {label && (
                        <LabelSection htmlFor={id} dark={dark} css={styleLabelFloat()}>
                            {label}
                        </LabelSection>
                    )}
                </DisplaySection>
            </DropdownWrapper>
            <DropdownList
                active_index={active_index}
                classNameItems={classNameItems}
                dark={Boolean(dark)}
                is_align_text_center={Boolean(is_align_text_center)}
                is_alignment_left={Boolean(is_alignment_left)}
                is_alignment_top={Boolean(is_alignment_top)}
                is_list_visible={is_list_visible}
                list={filtered_items}
                list_size={list_size}
                onItemSelection={onSelectItem}
                ref={dropdown_list_ref}
                value={selected_item}
                setActiveIndex={setActiveIndex}
            />
            {!is_list_visible && has_helper_section && (
                <HelperSection error={Boolean(error)} dark={dark} disabled={Boolean(disabled)}>
                    {generateHintText()}
                </HelperSection>
            )}
        </DropdownContainer>
    );
};

export default Dropdown;
