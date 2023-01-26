import React from 'react';
import Button from '@core/button/button';
import Badge from '@core/badge/badge';
import CircularCloseIcon from '@assets/svg/circular-close-icon.svg';
import { forwardRef, Fragment, InputHTMLAttributes, ReactNode, useState, useRef, useEffect } from 'react';
import { createCanvas, getCanvasFont } from './utils';
import { styled } from 'Styles/stitches.config';

type InputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea';
type TWordCountProps = { count: number; max_length: number };
type TPasswordStrengthProps = { dark: boolean; disable_meter: boolean; user_input: string };
type THintTextProps = { error: string; hint: string; success: string };
type TBadge = {
    id: string;
    label: string;
};
type TAlignValue = 'left' | 'center' | 'right';

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    align_value?: TAlignValue;
    button_label?: string;
    currency_suffix_element?: string;
    dark?: boolean;
    default_badges: TBadge[];
    has_password_meter?: boolean;
    hint_text?: THintTextProps;
    inline_prefix_element?: ReactNode;
    inline_suffix_element?: ReactNode;
    is_borderless?: boolean;
    label?: string;
    max_length?: number;
    number_of_badges?: number;
    prefix_style?: { [key: string]: string };
    suffix_style?: { [key: string]: string };
    type?: InputTypes;
    with_badges?: boolean;
    onBadges?: (badges: TBadge[]) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onButtonClickHandler?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

/* 
    PasswordStrengthMeter - This designs the section that displays the strength of password input 
*/
const StyledPasswordMeterWrapper = styled('div', {
    height: '0.25rem',
    width: '100%',

    variants: {
        dark: {
            true: { background: '$greyDark500' },
            false: { background: '$greyLight300' },
        },
    },
});
const StyledPasswordMeter = styled(StyledPasswordMeterWrapper, {
    transition: 'width 0.25s ease-in-out',
});
const PasswordStrengthMeter = ({ user_input, disable_meter, dark }: TPasswordStrengthProps) => {
    const zxcvbn = useRef<any>();
    let test_result = { score: 0 };

    useEffect(() => {
        async function loadLibrary() {
            const { default: lib } = await import('zxcvbn');
            zxcvbn.current = lib;
        }
        loadLibrary();
    }, []);

    if (typeof zxcvbn.current === 'function') {
        test_result = zxcvbn.current(user_input);
    }
    const score: number = (test_result.score * 100) / 4;
    const meter_color: any = Object.freeze({
        0: dark ? '$greyDark500' : '$greyLight300',
        1: dark ? '$redDark' : '$redLight',
        2: dark ? '$yellowDark' : '$yellowLight',
        3: dark ? '$greenDark' : '$greenLight',
        4: dark ? '$greenDark' : '$greenLight',
    });
    const generatePasswordStrengthColor = () => {
        return {
            width: `${score}%`,
            background: meter_color[test_result.score],
            height: disable_meter ? '0' : '0.25rem',
        };
    };
    return (
        <StyledPasswordMeterWrapper dark={dark}>
            <StyledPasswordMeter css={generatePasswordStrengthColor()}></StyledPasswordMeter>
        </StyledPasswordMeterWrapper>
    );
};

const HintText = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

/* 
    Word Count component - Displays the total count of characters in the input field against a max allowed character length
*/
const StyledWordCount = styled('div', {
    marginLeft: 'auto',
});
const WordCount = ({ count, max_length }: TWordCountProps) => (
    <StyledWordCount>
        {count}/{max_length}
    </StyledWordCount>
);

/* 
    HelperSection - This section displays hint, error or success text
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
        error: {
            true: { color: '$coral500' },
        },
        success: {
            true: { color: '$greenLight' },
        },
    },

    compoundVariants: [
        {
            dark: true,
            success: true,
            css: {
                color: '$greenDark',
            },
        },
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
    TextFieldContainer - This acts as a wrapper and styles the input field section and Helper section
*/
const TextFieldContainer = styled('div', {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
});

/* 
    TextFieldWrapper - This acts as a wrapper and styles the input field section
*/
const TextFieldWrapper = styled('section', {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'column',
    borderRadius: '$default',
    borderWidth: '$1',
    borderStyle: 'solid',

    variants: {
        dark: {
            true: {
                borderColor: '$greyDark500',
                backgroundColor: '$greyDark800',
                color: '$greyDark200',

                '&:hover': {
                    borderColor: '$greyDark200',
                },
            },
            false: {
                borderColor: '$greyLight400',
                backgroundColor: '$greyLight100',
                color: '$greyLight600',

                '&:hover': {
                    borderColor: '$greyLight600',
                },
            },
        },
        active: {
            true: {},
        },
        enabled: {
            true: {},
        },
        disabled: {
            true: {
                color: '$greyLight500',
                borderColor: 'greyLight400',
                pointerEvents: 'none',
            },
        },
        error: {
            true: {
                borderColor: '$redLight',
                color: '$redLight',
            },
        },
        success: {
            true: {
                borderColor: '$greenLight',
                color: '$greenLight',
            },
        },
        is_borderless: {
            true: {
                borderColor: 'transparent',
            },
        },
        is_labelless: {
            true: {},
        },
    },

    compoundVariants: [
        {
            dark: true,
            error: true,
            css: {
                borderColor: '$redDark',
                color: '$redDark',
            },
        },
        {
            dark: true,
            success: true,
            css: {
                borderColor: '$greenDark',
                color: '$greenDark',
            },
        },
        {
            active: true,
            enabled: false,
            error: false,
            success: false,
            css: {
                borderColor: '$blue500',
                color: '$blue500',
            },
        },
        {
            active: false,
            enabled: true,
            error: false,
            success: false,
            css: {
                borderColor: '$greyLight400',
                color: '$greyLight700',
            },
        },
        {
            dark: true,
            active: false,
            enabled: true,
            error: false,
            success: false,
            css: {
                borderColor: '$greyDark500',
                color: '$greyDark100',
            },
        },
        {
            dark: true,
            disabled: true,
            css: {
                borderColor: '$greyDark500',
                color: '$greyDark300',
            },
        },
        {
            is_borderless: true,
            enabled: true,
            css: {
                borderColor: 'transparent',
            },
        },
        {
            dark: true,
            is_borderless: true,
            active: false,
            css: {
                borderColor: 'transparent',
            },
        },
        {
            dark: true,
            is_borderless: true,
            enabled: true,
            css: {
                borderColor: 'transparent',
                color: '$greyDark100',
            },
        },
        {
            is_borderless: false,
            is_labelless: true,
            css: {
                backgroundColor: 'transparent',
            },
        },
    ],
});

/* 
    LabelSection - Styles the input field label 
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
        readonly: { true: { color: '$greyLight700' } },
        dark: {
            true: {
                backgroundColor: '$greyDark800',
            },
            false: {
                backgroundColor: '$greyLight100',
            },
        },
        active: { true: {} },
        has_badges: { true: {} },
    },

    compoundVariants: [
        {
            dark: true,
            readonly: true,
            css: {
                color: '$greyDark200',
            },
        },
        {
            active: true,
            has_badges: true,
            css: {
                color: '$blue500',
            },
        },
    ],
});

/* 
    InputFieldSection - Styles the input field and wraps prefix, suffix and input field
*/
const InputFieldSection = styled('div', {
    position: 'relative',
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    lineHeight: '$lineHeight20',
    variants: {
        has_badges: {
            true: {
                paddingX: '1rem',
                paddingY: '0.5rem',
                flexWrap: 'wrap',
                gap: '0.5rem',
                width: 'unset',
                color: '$greyLight700',
                wordBreak: 'break-all',
            },
        },
    },
});

/* 
    SupportingInfoSection - Styles the prefix and suffix elements of input field
*/
const SupportingInfoSection = styled('div', {
    display: 'block',
    fontSize: '$2xs',

    variants: {
        dark: { true: {} },
        active: { true: {} },
        enabled: { true: {} },
        disabled: { true: {} },
        readonly: { true: { color: '$greyLight600' } },
        prefix: { true: { paddingLeft: '0.5rem', display: 'flex' } },
        suffix: { true: { paddingRight: '1rem', display: 'flex' } },
        currency_suffix: { true: { paddingRight: '0.5rem', display: 'flex', color: '$greyLight700' } },
        is_labelless: {
            true: {
                paddingRight: '0.5rem',
            },
        },
    },

    compoundVariants: [
        {
            dark: false,
            active: true,
            suffix: true,
            css: {
                color: '$greyLight700',
            },
        },
        {
            dark: false,
            enabled: true,
            suffix: true,
            css: {
                color: '$greyLight700',
            },
        },
        {
            dark: false,
            active: true,
            suffix: true,
            readonly: true,
            css: {
                color: '$greyLight600',
            },
        },
        {
            dark: false,
            enabled: true,
            suffix: true,
            readonly: true,
            css: {
                color: '$greyLight600',
            },
        },
        {
            dark: true,
            active: true,
            suffix: true,
            readonly: true,
            css: {
                color: '$greyDark200',
            },
        },
        {
            dark: true,
            enabled: true,
            suffix: true,
            readonly: true,
            css: {
                color: '$greyDark200',
            },
        },
        {
            dark: true,
            active: true,
            suffix: true,
            css: {
                color: '$greyDark100',
            },
        },
        {
            dark: true,
            enabled: true,
            suffix: true,
            css: {
                color: '$greyDark100',
            },
        },
        {
            currency_suffix: true,
            disabled: true,
            css: {
                color: '$greyLight500',
            },
        },
        {
            dark: true,
            currency_suffix: true,
            css: {
                color: '$greyDark100',
            },
        },
        {
            dark: true,
            currency_suffix: true,
            css: {
                color: '$greyDark100',
            },
        },
        {
            dark: true,
            currency_suffix: true,
            disabled: true,
            css: {
                color: '$greydark300',
            },
        },
    ],
});

/* 
    TextAreaField - Styles the Text area field
*/
const TextAreaField = styled('textarea', {
    resize: 'vertical',
    height: '4.875rem',
    overflow: 'auto',
    overflowWrap: 'break-word',
    padding: '0.625rem 1rem',
    textAlign: 'justify',
    borderRadius: '$default',
    background: 'none',
    fontSize: '$2xs',
    fontWeight: '$regular',
    width: '100%',
    display: 'block',
    minWidth: '0',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    fontFamily: '$regular',

    variants: {
        readonly: { true: { color: '$greyLight600' } },
        dark: {
            true: {
                color: '$greyDark100',
            },
            false: {
                color: '$greyLight700',
            },
        },
        disabled: { true: { color: '$greyLight500' } },
    },

    compoundVariants: [
        {
            dark: true,
            readonly: true,
            css: {
                color: '$greyDark200',
            },
        },
        {
            dark: true,
            disabled: true,
            css: {
                color: '$greyDark300',
            },
        },
    ],

    '& ~ label': {
        top: '0.625rem',
    },
});

/* 
    InputField - Styles the input field
*/
const InputField = styled('input', {
    borderRadius: '$default',
    background: 'none',
    fontSize: '$2xs',
    fontWeight: '$regular',
    width: '100%',
    height: '2.375rem',
    display: 'block',
    minWidth: '0',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    padding: '0 1rem',
    textOverflow: 'ellipsis',

    variants: {
        // if we use readOnly we can put the cursor inside the input
        alignment: {
            left: {
                textAlign: 'left',
            },
            center: {
                textAlign: 'center',
            },
            right: {
                textAlign: 'right',
            },
        },
        readonly: { true: { color: '$greyLight600' } },
        dark: {
            true: {
                color: '$greyDark100',
                '&::placeholder': {
                    color: '$greyDark200',
                },
            },
            false: {
                color: '$greyLight700',
                '&::placeholder': {
                    color: '$greyLight600',
                },
            },
        },
        has_badges: {
            true: {
                flex: 1,
                padding: 0,
                height: '20px',
            },
        },
        disabled: {
            true: {
                color: '$greyLight500',
                '&::placeholder': {
                    color: '$greyLight500',
                },
            },
        },
        is_labelless: {
            true: {
                padding: '0 0.5rem',
                height: '1.875rem',
                fontSize: '$2xs',
            },
        },
    },
    compoundVariants: [
        {
            dark: true,
            readonly: true,
            css: {
                color: '$greyDark200',
            },
        },
        {
            dark: true,
            disabled: true,
            css: {
                color: '$greyDark300',
            },
        },
        {
            dark: true,
            disabled: true,
            css: {
                '&::placeholder': {
                    color: '$greyDark300',
                },
            },
        },
    ],
});

const getTextWidth = createCanvas();

const TextField = forwardRef<HTMLInputElement & HTMLTextAreaElement, TextFieldProps>(
    (
        {
            align_value = 'left',
            button_label,
            currency_suffix_element,
            dark,
            default_badges,
            has_password_meter = false,
            hint_text,
            id,
            inline_prefix_element,
            inline_suffix_element,
            is_borderless = false,
            label,
            max_length,
            number_of_badges,
            prefix_style,
            suffix_style,
            type,
            with_badges,
            onBadges,
            onButtonClickHandler,
            ...props
        },
        ref,
    ) => {
        const [is_active, setIsActive] = useState(false);
        const [is_enabled, setIsEnabled] = useState(false);
        const [value, setValue] = useState(props.value || '');
        const [count, setCount] = useState(0);
        const [badges, setBadges] = useState<TBadge[]>(default_badges || []);

        const input_ref = useRef<HTMLInputElement | null>(null);

        const { error, hint, success } = hint_text ?? {};

        const is_button_disabled = Boolean(props.disabled) || Boolean(error) || (Boolean(success) && !value) || !value;
        const has_helper_section = Boolean(error) || Boolean(hint) || Boolean(success) || Boolean(max_length);

        React.useEffect(() => {
            onBadges?.(badges);
        }, [badges]);

        React.useEffect(() => {
            if (input_ref.current) {
                if (badges.length) {
                    input_ref.current.style.flexBasis = `${getTextWidth(
                        value.toString(),
                        getCanvasFont(input_ref.current),
                    )}px`;
                } else {
                    input_ref.current.style.removeProperty('flex-basis');
                }
            }
        }, [value, badges]);

        const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const text = e.target.value;
            if (Boolean(props.disabled) || Boolean(props.readOnly)) {
                return;
            }
            if (max_length && text.length > max_length) {
                return;
            }
            if (with_badges && badges.length === number_of_badges) {
                return;
            }

            setValue(with_badges ? text.replaceAll(',', '') : text);
            setCount(text.length);

            props.onChange?.(e);
        };

        const onBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setIsActive(false);

            e.target.value && !Boolean(props.disabled) && setIsEnabled(true);
            setValue(value.toString().trim());

            props.onBlur?.(e);
        };

        const onFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setIsActive(true);
            setIsEnabled(false);

            props.onFocus?.(e);
        };

        const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                !!button_label && !is_button_disabled && onButtonClickHandler?.();
                e.currentTarget.blur();
            }

            props.onKeyDown?.(e);
        };

        const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (with_badges) {
                if (e.key !== ',') return;
                if (value.toString().trim().length === 0) return;
                setBadges([...badges, { id: Date.now().toString(), label: value.toString().trim() }]);
                setValue('');
            }

            props.onKeyUp?.(e);
        };

        const onIconBadgeClickHandler = (_e: React.MouseEvent<HTMLImageElement>, id?: string) => {
            const filtered_badges = badges.filter((badge) => badge.id !== id);
            setBadges([...filtered_badges]);
            input_ref.current?.focus();
        };

        const generateHintText = () => {
            if (success) return <HintText>{success}</HintText>;
            else if (error) return <HintText>{error}</HintText>;
            else if (hint) return <HintText>{hint}</HintText>;
        };

        const styleLabelFloat = () => {
            if ((is_active || value || badges.length) && type !== 'textarea') {
                return {
                    lineHeight: '$lineHeight14',
                    fontSize: '$4xs',
                    transform: 'translate(0, -1.2rem) scale(0.75)',
                    padding: '0 4px',
                    top: badges.length ? '0.75rem' : '',
                    left: '0.78125rem',
                };
            } else if ((is_active || value) && type === 'textarea') {
                return {
                    lineHeight: '$lineHeight14',
                    fontSize: '$4xs',
                    transform: 'translate(0, -1.05rem) scale(0.75)',
                    padding: '0 4px',
                    left: '0.78125rem',
                };
            }
        };

        const styleButton = () => ({
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginRight: '-1px',
            marginBottom: '-1px',
            marginTop: '-1px',
        });

        return (
            <TextFieldContainer>
                <TextFieldWrapper
                    active={is_active}
                    enabled={is_enabled}
                    error={Boolean(error)}
                    is_borderless={is_borderless}
                    is_labelless={!Boolean(label)}
                    success={Boolean(success)}
                    disabled={Boolean(props.disabled)}
                    dark={dark}
                >
                    <InputFieldSection
                        has_badges={Boolean(badges.length)}
                        onClick={() => with_badges && input_ref.current?.focus()}
                    >
                        {type === 'textarea' ? (
                            <TextAreaField
                                {...props}
                                ref={ref}
                                value={value}
                                dark={dark}
                                readonly={Boolean(props.readOnly)}
                                readOnly={Boolean(props.readOnly)}
                                disabled={Boolean(props.disabled)}
                                onChange={handleTextChange}
                                onFocus={onFocusHandler}
                                onBlur={onBlurHandler}
                            />
                        ) : (
                            <Fragment>
                                {inline_prefix_element && (
                                    <SupportingInfoSection css={prefix_style} prefix>
                                        {inline_prefix_element}
                                    </SupportingInfoSection>
                                )}
                                {Boolean(badges.length) &&
                                    badges.map((badge) => {
                                        return (
                                            <Badge
                                                key={badge.id}
                                                id={badge.id}
                                                suffix_icon_src={CircularCloseIcon}
                                                suffix_icon_alt="close-icon"
                                                suffixIconOnClickHandler={onIconBadgeClickHandler}
                                                visiblity="label-and-icon"
                                            >
                                                {badge.label}
                                            </Badge>
                                        );
                                    })}
                                <InputField
                                    {...props}
                                    alignment={align_value}
                                    ref={ref || input_ref}
                                    dark={dark}
                                    type={type}
                                    value={value}
                                    is_labelless={!Boolean(label)}
                                    has_badges={Boolean(badges.length)}
                                    readonly={Boolean(props.readOnly)}
                                    readOnly={Boolean(props.readOnly)}
                                    disabled={Boolean(props.disabled)}
                                    onChange={handleTextChange}
                                    onFocus={onFocusHandler}
                                    onBlur={onBlurHandler}
                                    onKeyDown={onKeyDownHandler}
                                    onKeyUp={onKeyUpHandler}
                                />
                                {currency_suffix_element && (
                                    <SupportingInfoSection
                                        dark={dark}
                                        disabled={Boolean(props.disabled)}
                                        readonly={Boolean(props.readOnly)}
                                        currency_suffix
                                    >
                                        {currency_suffix_element}
                                    </SupportingInfoSection>
                                )}
                                {inline_suffix_element && (
                                    <SupportingInfoSection
                                        active={is_active}
                                        css={suffix_style}
                                        enabled={is_enabled}
                                        dark={dark}
                                        readonly={Boolean(props.readOnly)}
                                        is_labelless={!Boolean(label)}
                                        suffix
                                    >
                                        {inline_suffix_element}
                                    </SupportingInfoSection>
                                )}
                                {button_label && (
                                    <Button
                                        color="primary"
                                        size="large"
                                        disabled={is_button_disabled}
                                        onClick={() => onButtonClickHandler?.()}
                                        css={styleButton()}
                                    >
                                        {button_label}
                                    </Button>
                                )}
                            </Fragment>
                        )}
                        {label && (
                            <LabelSection
                                active={is_active}
                                has_badges={Boolean(badges.length)}
                                readonly={Boolean(props.readOnly)}
                                htmlFor={id}
                                dark={dark}
                                css={styleLabelFloat()}
                            >
                                {label}
                            </LabelSection>
                        )}
                    </InputFieldSection>
                    {type === 'password' && has_password_meter && (
                        <PasswordStrengthMeter
                            dark={Boolean(dark)}
                            user_input={value.toString()}
                            disable_meter={(Boolean(props.readOnly) || Boolean(props.disabled)) ?? false}
                        />
                    )}
                </TextFieldWrapper>
                {has_helper_section && (
                    <HelperSection error={Boolean(error)} success={Boolean(success)} dark={dark}>
                        {generateHintText()}
                        {max_length && max_length > 0 && <WordCount count={count} max_length={max_length} />}
                    </HelperSection>
                )}
            </TextFieldContainer>
        );
    },
);

TextField.displayName = 'TextField';

export default TextField;
