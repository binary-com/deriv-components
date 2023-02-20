import React, { ReactNode } from 'react';
import classNames from 'classnames';
import ChevronDownDark from '@assets/svg/chevron-down-dark.svg';
import ChevronDownLight from '@assets/svg/chevron-down-light.svg';
import DisplayText from './display-text';
import DropdownList from './dropdown-list';
import { TListItem } from './types';
import { useOnClickOutside } from 'hooks';
import { styled } from 'Styles/stitches.config';

const HintText = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

type THintTextProps = { error: string; hint: string };

type TExtendedHTMLElement = HTMLElement & { attributes: Element['attributes'] & { tabIndex?: number } };

type TTarget = {
    target: {
        value?: string;
    };
};

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
    handleBlur?: () => void;
    hint_text?: THintTextProps;
    is_align_text_center?: boolean;
    is_alignment_left?: boolean;
    is_alignment_top?: boolean;
    label?: string;
    list: TListItem[];
    onChange?: (target_obj: TTarget) => void;
    onClick?: VoidFunction;
    test_id?: string;
    value: string;
    list_size?: TListSize;
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
        is_list_visible: {
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
        //needs to show proper color for top label, when the user selected a value
        {
            active: true,
            enabled: false,
            error: false,
            is_list_visible: false,
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
            active: true,
            enabled: false,
            error: false,
            is_list_visible: false,
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

const findNextFocusableNode = (active_node: TExtendedHTMLElement): TExtendedHTMLElement | null => {
    console.log('active_node', active_node);
    if (!active_node) return null;
    if (active_node.attributes.tabIndex) return active_node;
    return findNextFocusableNode(active_node.nextSibling as TExtendedHTMLElement);
};

const findPreviousFocusableNode = (active_node: TExtendedHTMLElement): TExtendedHTMLElement | null => {
    if (!active_node) return null;
    if (active_node.attributes.tabIndex) return active_node;
    return findPreviousFocusableNode(active_node.previousSibling as TExtendedHTMLElement);
};

const Dropdown = ({
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
    handleBlur,
    hint_text,
    is_align_text_center,
    is_alignment_left,
    is_alignment_top,
    label,
    list,
    onChange,
    onClick,
    value,
    list_size = 'small',
}: TDropdown) => {
    const dropdown_ref = React.useRef<HTMLDivElement>(null);
    const wrapper_ref = React.useRef<HTMLDivElement>(null);
    const nodes = React.useRef<Map<string, React.MutableRefObject<HTMLDivElement>['current']>>(new Map());
    const list_ref = React.useRef<HTMLDivElement>(null);

    const [is_list_visible, setIsListVisible] = React.useState(false);
    const [is_active, setIsActive] = React.useState(false);
    const [is_enabled, setIsEnabled] = React.useState(false);

    const { error, hint } = hint_text ?? {};
    const has_helper_section = Boolean(error) || Boolean(hint);

    const initial_render = React.useRef(true);

    const onClickOutSide = () => {
        setIsListVisible(false);
        setIsActive(false);
        Boolean(value) && setIsEnabled(true);

        handleBlur?.();
    };

    useOnClickOutside(wrapper_ref, onClickOutSide);

    const is_single_option = list.length < 2;

    React.useEffect(() => {
        if (initial_render.current) {
            initial_render.current = false;
        }
    }, []);

    React.useEffect(() => {
        if (!initial_render.current && !is_list_visible && value) dropdown_ref.current?.focus();
    }, [is_list_visible]);

    const handleSelect = (item: TListItem) => {
        if (item.disabled) return;
        if (item.value !== value) onChange?.({ target: { value: item.value } });

        handleVisibility();
    };

    const handleVisibility = () => {
        setIsActive(true);
        setIsEnabled(false);

        if (typeof onClick === 'function') {
            setIsActive(true);
            onClick();

            return;
        }

        setIsListVisible(!is_list_visible);
    };

    const onKeyPressed = (event: React.KeyboardEvent<HTMLDivElement>, item?: TListItem) => {
        if (is_single_option) return;

        // Tab -> before preventDefault() to be able to go to the next tabIndex
        if (event.keyCode === 9 && !is_list_visible) return;

        event.preventDefault();
        event.stopPropagation();

        switch (event.keyCode) {
            case 27: // esc
                if (is_list_visible) handleVisibility();
                break;
            case 9: // Tab
            case 13: // Enter
            case 32: // Space
                if (!item) return;
                handleSelect(item);
                break;
            case 38: // Up Arrow
            case 40: // Down Arrow
                if (is_list_visible) {
                    focusNextListItem(event.keyCode);
                } else if (!is_alignment_left) {
                    handleVisibility();
                }
                break;
            case 37: // Left arrow
            case 39: // Right Arrow
                if (is_alignment_left) handleVisibility();
                break;
            default:
        }

        // For char presses, we do a search for the item:
        if (event.key.length === 1 && list.length) {
            const char = event.key.toLowerCase();
            const item_starting_with_char = list.find((li) => li.value && li.value[0].toLowerCase() === char);
            if (!item_starting_with_char) return;

            const item_ref = nodes.current.get(item_starting_with_char.value);
            if (item_ref) item_ref.focus();
        }
    };

    const focusNextListItem = (direction: React.KeyboardEvent<HTMLDivElement>['keyCode']) => {
        const { activeElement } = document;

        if (!activeElement) return;

        if (activeElement?.id === 'dropdown-display') {
            const el = Array.from(nodes.current.values())[0];
            if (el && el.focus instanceof Function) {
                el.focus();
            }
        } else {
            const active_node = nodes.current.get(activeElement.id);
            if (active_node) {
                if (direction === 40) {
                    const next_node = findNextFocusableNode(active_node.nextSibling as TExtendedHTMLElement);
                    if (next_node) next_node.focus();
                }
                if (direction === 38) {
                    const prev_node = findPreviousFocusableNode(active_node.previousSibling as TExtendedHTMLElement);
                    if (prev_node) prev_node.focus();
                }
            }
        }
    };

    const generateHintText = () => {
        if (error) return <HintText>{error}</HintText>;
        if (hint) return <HintText>{hint}</HintText>;
    };

    const styleLabelFloat = () => {
        if (is_active || value) {
            return {
                lineHeight: '$lineHeight14',
                fontSize: '$4xs',
                transform: 'translate(0, -1.2rem) scale(0.75)',
                padding: '0 4px',
                left: '0.78125rem',
            };
        }
    };

    return (
        <DropdownContainer ref={wrapper_ref} className={className}>
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
                is_list_visible={is_list_visible}
                onClick={handleVisibility}
            >
                <DisplaySection
                    className={classNameDisplay}
                    data-testid="dti_dropdown_display"
                    id="dropdown-display"
                    onKeyDown={onKeyPressed}
                    ref={dropdown_ref}
                    tabIndex={is_single_option ? -1 : 0}
                >
                    {inline_prefix_element && (
                        <SupportingInfoSection className={classNamePrefix}>
                            {inline_prefix_element}
                        </SupportingInfoSection>
                    )}
                    <DisplayText
                        dark={Boolean(dark)}
                        has_prefix_element={!!inline_prefix_element}
                        value={value ?? 0}
                        list={list}
                    />
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
                classNameItems={classNameItems}
                dark={Boolean(dark)}
                handleSelect={handleSelect}
                is_align_text_center={Boolean(is_align_text_center)}
                is_alignment_left={Boolean(is_alignment_left)}
                is_alignment_top={Boolean(is_alignment_top)}
                is_list_visible={is_list_visible}
                list={list}
                list_size={list_size}
                nodes={nodes}
                onKeyPressed={onKeyPressed}
                ref={list_ref}
                value={value}
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
