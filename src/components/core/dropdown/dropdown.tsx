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
    KEYDOWN: 40,
    KEYUP: 38,
    SPACE: 32,
    TAB: 9,
};

const HintText = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

type THintTextProps = { error: string; hint: string };

type TDirection = 'up' | 'down';

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
    const direction_ref = React.useRef<string>('');
    const dropdown_container_ref = React.useRef<HTMLDivElement>(null);
    const dropdown_list_ref = React.useRef<TRef>(null);
    const input_ref = React.useRef<HTMLInputElement>(null);
    const last_selected_index = React.useRef<number | null>(null);

    const [active_index, setActiveIndex] = React.useState<number | null>(null);
    const [filtered_items, setFilteredItems] = React.useState(list);
    const [input_value, setInputValue] = React.useState('');
    const [is_active, setIsActive] = React.useState(false);
    const [is_enabled, setIsEnabled] = React.useState(false);
    const [is_list_visible, setIsListVisible] = React.useState(false);
    const [selected_item, setSelectedItem] = React.useState<string | number | null>(null);
    const [should_focus_input, setShouldFocusInput] = React.useState(false);

    const is_all_items_disabled = React.useMemo(() => {
        const is_disabled = filtered_items.every((item) => item.disabled);
        if (is_disabled) setActiveIndex(null);
        return is_disabled;
    }, [filtered_items]);

    const array_with_enabled_indexes = React.useMemo(
        () =>
            filtered_items.reduce<number[]>((acc, el, idx) => {
                if (!el.disabled) acc.push(idx);
                return acc;
            }, []),
        [filtered_items],
    );

    const { error, hint } = hint_text ?? {};
    const has_helper_section = Boolean(error) || Boolean(hint);

    // Focuses on input field when the user tries to select disabled value
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
            const item_top = dropdown_list_ref.current.getBoundingClientRectOfListItem?.().top;
            const item_offset_top = dropdown_list_ref.current.itemOffsetTop;

            if (!item_height || !item_top || !item_offset_top) return;

            const item_top_full =
                direction_ref.current === 'down'
                    ? Math.floor(item_top) + item_height + item_height / 2
                    : Math.floor(item_top) - item_height / 2;

            const list_height = dropdown_list_ref.current.listClientHeight;

            if (!isListItemWithinView(item_top_full) && list_height) {
                if (direction_ref.current === 'down') {
                    const items_above = list_height / item_height - 1;
                    const bottom_of_list = item_offset_top - items_above * item_height;
                    dropdown_list_ref.current.scrollTo?.({ top: bottom_of_list, behavior: 'smooth' });
                } else {
                    dropdown_list_ref.current.scrollTo?.({ top: item_offset_top, behavior: 'smooth' });
                }
            }
        }
    }, [active_index]);

    // Shows selected item when the user uncollapsed the list (when item is not in visible area)
    React.useEffect(() => {
        if (is_list_visible && dropdown_list_ref.current) {
            const item_offset_top = dropdown_list_ref.current.itemOffsetTop;
            dropdown_list_ref.current.scrollTo?.({ top: item_offset_top, behavior: 'smooth' });
        }
    }, [is_list_visible]);

    const onClickOutSide = () => {
        setIsListVisible(false);
        setIsActive(false);
        // Boolean(input_value || value) && setIsEnabled(true);
        setFilteredItems(list);
        if (active_index === null) {
            setInputValue('');
            onItemSelection?.({ value: '', text: '' });
        }

        onBlurHandler?.();
    };

    useOnClickOutside(dropdown_container_ref, onClickOutSide);

    const isListItemWithinView = (item_top: number) => {
        const list_top = dropdown_list_ref.current?.getBoundingClientRectOfDropdownList?.().top;
        const list_height = dropdown_list_ref.current?.listClientHeight;

        if (!list_top || !list_height) return;

        const wrapper_top = Math.floor(list_top);
        const wrapper_bottom = Math.floor(list_top) + list_height;

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

        setActiveIndex(null);
        last_selected_index.current = null;
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
                if (is_list_visible) {
                    setIsListVisible(false);
                    last_selected_index.current = active_index;
                }
                break;
            case KEY_CODE.KEYDOWN:
                if (!is_list_visible) setIsListVisible(true);
                if (!is_all_items_disabled) setActiveDirection('down');
                break;
            case KEY_CODE.KEYUP:
                if (!is_list_visible) setIsListVisible(true);
                if (!is_all_items_disabled) setActiveDirection('up');
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
        }
    };

    const getNextEnabledIndex = React.useCallback(
        (index: number, direction: TDirection) => {
            if (direction === 'down') {
                return array_with_enabled_indexes.find((el) => el > index) || array_with_enabled_indexes[0];
            } else {
                const reversed_array = [...array_with_enabled_indexes].reverse();
                return reversed_array.find((el) => el < index) || reversed_array[0];
            }
        },
        [array_with_enabled_indexes],
    );

    const is_only_one_item_enabled = React.useMemo(() => {
        return filtered_items.filter((el) => !el.disabled).length === 1;
    }, [filtered_items]);

    const setActiveDirection = (direction: TDirection) => {
        if (is_only_one_item_enabled || active_index === null) {
            setActiveIndex(filtered_items.findIndex((el) => !el.disabled));
            return;
        }

        if (last_selected_index.current !== null) {
            setActiveIndex(last_selected_index.current);
            last_selected_index.current = null;
            return;
        }

        setActiveIndex(getNextEnabledIndex(active_index, direction));
        direction_ref.current = direction;
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

        setIsListVisible(false);

        setInputValue(item.text);
        setSelectedItem(item.value);

        const active_index = list.findIndex((el) => item.value === el.value);
        setActiveIndex(active_index);

        last_selected_index.current = active_index;
        setFilteredItems(list);

        if (typeof onItemSelection === 'function') {
            onItemSelection(item);
        }
    };

    return (
        <DropdownContainer className={className} ref={dropdown_container_ref}>
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
                            ref={input_ref}
                            value={input_value}
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
