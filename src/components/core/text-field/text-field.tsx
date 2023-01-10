import React from 'react';
import Button from '@core/button/button';
import Badge from '@core/badge/badge';
import CircularCloseIcon from '@assets/svg/circular-close-icon.svg';
import { forwardRef, Fragment, InputHTMLAttributes, ReactNode, useState, useRef, useEffect } from 'react';
import { styled } from 'Styles/stitches.config';

type InputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea';
type TWordCountProps = { count: number; max_length: number };
type TPasswordStrengthProps = { user_input: string; disable_meter: boolean; dark: boolean };
type THintTextProps = { error: string; success: string; hint: string };
type TBadge = {
    id: string;
    label: string;
};

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    button_label?: string;
    inline_prefix_element?: ReactNode;
    inline_suffix_element?: ReactNode;
    is_borderless?: boolean;
    label?: string;
    type?: InputTypes;
    max_length?: number;
    hint_text?: THintTextProps;
    onButtonClickHandler?: () => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    dark?: boolean;
    error?: string;
    success?: string;
    with_badges?: boolean;
};

/* 
    PasswordStrengthMeter - This designs the section that displays the strength of password input 
*/
const StyledPasswordMeterWrapper = styled('div', {
    height: '0.25rem',
    width: '100%',
    // edges of strength meter is not align with border ?!?!?
    // borderBottomLeftRadius: '3px',
    // borderBottomRightRadius: '3px',

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
    width: '-webkit-fill-available',
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
        disabled: { true: { opacity: '0.32', pointerEvents: 'none' } },
        // disabled: { true: { color: '$greyLight500' } },
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
    TextFieldWrapper - This acts as a wrapper and styles the input field section
*/
const TextFieldWrapper = styled('section', {
    position: 'relative',
    width: '20%',
    display: 'inline-flex',
    flexDirection: 'column',
    borderRadius: '$default',
    borderWidth: '$1',
    borderStyle: 'solid',

    variants: {
        dark: {
            true: {
                borderColor: '$greyDark500',
                backgroundColor: '$greyDark700',
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
        // disabled: {
        //     true: {
        //         color: '$greyLight500',
        //         borderColor: 'greyLight400',
        //         pointerEvents: 'none',
        //     },
        // },
        disabled: { true: { opacity: '0.32', pointerEvents: 'none' } },
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
        //sss
        // is_borderless: {
        //     true: {
        //         borderColor: 'transparent',
        //     },
        // },
        // is_labelless: {
        //     true: {},
        // },
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
        //dark disabled
        // {
        //     dark: true,
        //     disabled: true,
        //     css: {
        //         borderColor: '$greyDark500',
        //         color: '$greyDark300',
        //     },
        // },

        //sss
        // {
        //     active: true,
        //     is_borderless: true,
        //     css: {
        //         borderColor: '$blue500',
        //     },
        // },

        // {
        //     dark: true,
        //     is_labelless: true,
        //     disabled: true,
        //     css: {
        //         opacity: '1',
        //     },
        // },
        // {
        //     dark: false,
        //     active: true,
        //     error: true,
        //     css: { borderColor: '$coral500' },
        // },
        // {
        //     dark: false,
        //     active: true,
        //     success: true,
        //     css: { borderColor: '$greenLight' },
        // },
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
    left: '0.78125rem',

    variants: {
        readonly: { true: { color: '$greyLight700' } },
        // disabled: { true: { color: '$greyLight500' } },
        dark: {
            true: {
                backgroundColor: '$greyDark700',
            },
            false: {
                backgroundColor: '$greyLight100',
            },
        },
        active: { true: {} },
        has_badges: { true: {} },
        // is_labelless: {
        //     true: { left: '1rem' },
        //     false: { fontSize: '$2xs' },
        // },
    },

    compoundVariants: [
        {
            dark: true,
            readonly: true,
            css: {
                color: '$greyDark100',
            },
        },
        {
            active: true,
            has_badges: true,
            css: {
                color: '$blue500',
            },
        },
        // {
        //     is_labelless: true,
        //     prefix: true,
        //     css: {
        //         left: '2rem',
        //     },
        // },
        // {
        //     is_labelless: true,
        //     prefix: false,
        //     css: {
        //         left: '0.5rem',
        //     },
        // },
        // {
        //     dark: false,
        //     is_labelless: true,
        //     css: { color: '$greyLight700' },
        // },
        // {
        //     dark: true,
        //     is_labelless: true,
        //     css: { color: '$greyDark100' },
        // },
        // {
        //     is_labelless: true,
        //     disabled: true,
        //     css: { color: '$greyDark300' },
        // },
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
        readonly: { true: { color: '$greyLight600' } },
        // disabled: { true: {} },
        prefix: { true: { paddingLeft: '0.5rem', display: 'flex' } },
        suffix: { true: { paddingRight: '1rem', display: 'flex' } },

        // is_labelless: {
        //     true: {
        //         paddingRight: '0.5rem',
        //     },
        // },
    },

    compoundVariants: [
        // {
        //     dark: false,
        //     disabled: true,
        //     suffix: true,
        //     css: {
        //         color: '$greyLight500',
        //     },
        // },
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
        // {
        //     dark: true,
        //     disabled: true,
        //     suffix: true,
        //     css: {
        //         color: '$greyDark300',
        //     },
        // },
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
        readonly: { true: {} },
        dark: {
            true: {
                color: '$greyDark100',
            },
            false: {
                color: '$greyLight700',
            },
        },
        // disabled: { true: { color: '$greyLight500' } },
    },

    compoundVariants: [
        {
            dark: false,
            readonly: true,
            css: {
                color: '$greyLight600',
            },
        },
        // {
        //     dark: true,
        //     disabled: true,
        //     css: {
        //         color: '$greyDark100',
        //     },
        // },
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
        readonly: { true: {} },
        dark: {
            true: {
                color: '$greyDark100',
            },
            false: {
                color: '$greyLight700',
            },
        },
        has_badges: {
            true: {
                padding: 0,
                height: '20px',
            },
        },
        // has_badges: {
        //     true: {
        //         paddingLeft: '0.5rem',
        //     },
        // },
        // disabled: { true: { color: '$greyLight500' } },
        // is_labelless: {
        //     true: {
        //         padding: '0 0.5rem',
        //         height: '1.875rem',
        //         fontSize: '$2xs',
        //     },
        // },
    },
    compoundVariants: [
        {
            dark: false,
            readonly: true,
            css: {
                color: '$greyLight600',
            },
        },
        {
            dark: true,
            readonly: true,
            css: {
                color: '$greyDark200',
            },
        },
        // {
        //     dark: true,
        //     disabled: true,
        //     css: {
        //         color: '$greyDark300',
        //     },
        // },
    ],
});

const TextField = forwardRef<HTMLInputElement & HTMLTextAreaElement, TextFieldProps>(
    (
        {
            button_label,
            dark,
            id,
            hint_text,
            inline_prefix_element,
            inline_suffix_element,
            label,
            is_borderless = false,
            max_length,
            type,
            with_badges = true,
            onBlur,
            onChange,
            onFocus,
            onButtonClickHandler,

            ...props
        },
        ref,
    ) => {
        const [is_active, setIsActive] = useState(false);
        const [is_enabled, setIsEnabled] = useState(false);
        const [value, setValue] = useState(props.value || '');
        const [count, setCount] = useState(0);
        const [show_label, setShowLabel] = useState(true);
        const [badges, setBadges] = useState<TBadge[]>([]);

        const input_ref = useRef();

        const { error, hint, success } = hint_text ?? {};

        const is_button_disabled = props.disabled || Boolean(error) || (Boolean(success) && !value) || !value;

        const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const text = e.target.value;
            if (props.disabled || props.readOnly) {
                return;
            }
            if (max_length && text.length > max_length) {
                return;
            }
            setValue(text);
            setCount(text.length);

            onChange?.(e);
        };

        const onBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setIsActive(false);

            // if (is_labelless) {
            //     !e.target.value && setShowLabel(true);
            // } else {
            //     e.target.value && !props.disabled && setIsEnabled(true);
            // }

            e.target.value && !props.disabled && setIsEnabled(true);

            onBlur?.(e);
        };

        const onFocusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setIsActive(true);
            setIsEnabled(false);
            // is_labelless && setShowLabel(false);

            onFocus?.(e);
        };

        const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                !!button_label && !is_button_disabled && onButtonClickHandler?.();
                e.currentTarget.blur();
            }
        };

        const onKeyUpHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (with_badges && e.key === ',') {
                setValue('');
                setBadges([...badges, { id: value.slice(0, -1), label: value.slice(0, -1) }]);
            }
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
                    top: !!badges.length && '0.75rem',
                };
            } else if ((is_active || value) && type === 'textarea') {
                return {
                    lineHeight: '$lineHeight14',
                    fontSize: '$4xs',
                    transform: 'translate(0, -1.05rem) scale(0.75)',
                    padding: '0 4px',
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

        const onIconBadgeClickHandler = (e: React.MouseEvent<HTMLImageElement>, id: string) => {
            e.stopPropagation();
            const filtered_badges = badges.filter((badge) => badge.id !== id);
            setBadges([...filtered_badges]);
        };

        const focusInput = () => {
            !!badges.length && input_ref.current.focus();
        };

        return (
            <Fragment>
                <TextFieldWrapper
                    active={is_active}
                    enabled={is_enabled}
                    error={Boolean(error)}
                    is_borderless={is_borderless}
                    is_labelless={!!label}
                    success={Boolean(success)}
                    disabled={props.disabled}
                    dark={dark}
                >
                    <InputFieldSection has_badges={!!badges.length} onClick={focusInput}>
                        {type === 'textarea' ? (
                            <TextAreaField
                                {...props}
                                ref={ref}
                                value={value}
                                dark={dark}
                                readonly={props.readOnly}
                                readOnly={props.readOnly}
                                disabled={props.disabled}
                                onChange={(e) => handleTextChange(e)}
                                onFocus={(e) => onFocusHandler(e)}
                                onBlur={(e) => onBlurHandler(e)}
                            />
                        ) : (
                            <Fragment>
                                {inline_prefix_element && (
                                    <SupportingInfoSection prefix>{inline_prefix_element}</SupportingInfoSection>
                                )}
                                {!!badges.length &&
                                    badges.map((badge) => {
                                        return (
                                            <Badge
                                                key={badge.label}
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
                                    ref={ref || input_ref}
                                    dark={dark}
                                    type={type}
                                    value={value}
                                    has_badges={!!badges.length}
                                    readonly={props.readOnly}
                                    readOnly={props.readOnly}
                                    disabled={props.disabled}
                                    onChange={handleTextChange}
                                    onFocus={onFocusHandler}
                                    onBlur={onBlurHandler}
                                    onKeyDown={onKeyDownHandler}
                                    onKeyUp={onKeyUpHandler}
                                />
                                {inline_suffix_element && (
                                    <SupportingInfoSection
                                        active={is_active}
                                        disabled={props.disabled}
                                        enabled={is_enabled}
                                        dark={dark}
                                        readonly={props.readOnly}
                                        is_labelless={!!label}
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
                        {show_label && label && (
                            <LabelSection
                                active={is_active}
                                has_badges={!!badges.length}
                                readonly={props.readOnly}
                                readOnly={props.readOnly}
                                disabled={props.disabled}
                                // is_labelless={!!label}
                                htmlFor={id}
                                dark={dark}
                                css={styleLabelFloat()}
                            >
                                {label}
                            </LabelSection>
                        )}
                    </InputFieldSection>
                    {type === 'password' && (
                        <PasswordStrengthMeter
                            dark={Boolean(dark)}
                            user_input={value}
                            disable_meter={(props.readOnly || props.disabled) ?? false}
                        />
                    )}
                </TextFieldWrapper>
                <HelperSection error={Boolean(error)} success={Boolean(success)} dark={dark} disabled={props.disabled}>
                    {generateHintText()}
                    {max_length && max_length > 0 && <WordCount count={count} max_length={max_length} />}
                </HelperSection>
            </Fragment>
        );
    },
);

TextField.displayName = 'TextField';

export default TextField;
