import zxcvbn from 'zxcvbn';
import { forwardRef, Fragment, InputHTMLAttributes, ReactNode, useState } from 'react';
import { styled } from 'Styles/stitches.config';

type InputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea';
type TWordCountProps = { count: number; max_length: number };
type TPasswordStrengthProps = { user_input: string; disable_meter: boolean; dark: boolean };

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
    inline_prefix_element?: ReactNode;
    inline_suffix_element?: ReactNode;
    show_character_limit?: boolean;
    label?: string;
    type?: InputTypes;
    required?: boolean;
    id?: string;
    max_length?: number;
    error?: string;
    success?: string;
    hint?: string;
    disabled?: boolean;
    readonly?: boolean;
    dark?: boolean;
};

/* PasswordStrengthMeter Component */
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
    const test_result: zxcvbn.ZXCVBNResult = zxcvbn(user_input);
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
        <StyledPasswordMeterWrapper dark={!!dark}>
            <StyledPasswordMeter css={generatePasswordStrengthColor()}></StyledPasswordMeter>
        </StyledPasswordMeterWrapper>
    );
};

const HintText = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

/* Word Count component */
const StyledWordCount = styled('div', {
    marginLeft: 'auto',
});
const WordCount = ({ count, max_length }: TWordCountProps) => (
    <StyledWordCount>
        {count}/{max_length}
    </StyledWordCount>
);

/* Helper component */
const HelperSection = styled('section', {
    paddingLeft: '1rem',
    fontSize: '$2xs',
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
    },
});

/* TextField component */
const TextFieldSection = styled('section', {
    position: 'relative',
    width: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    borderRadius: '$default',
    borderWidth: '$1',
    borderStyle: 'solid',
    variants: {
        dark: {
            true: {
                borderColor: '$greyDark400',
                backgroundColor: '$greyDark700',
                '&:hover': {
                    borderColor: '$greyDark200',
                },
            },
            false: {
                borderColor: '$greyLight400',
                backgroundColor: '$greyLight100',

                '&:hover': {
                    borderColor: '$greyLight600',
                },
            },
        },
        active: {
            true: {
                borderColor: '$blue500',
            },
        },
        error: {
            true: {
                borderColor: '$coral500',
                color: '$coral500',
            },
        },
        success: {
            true: {
                borderColor: '$greenLight',
                color: '$greenLight',
            },
        },
        disabled: {
            true: {
                opacity: '0.32',
                cursor: 'not-allowed',
            },
        },
    },
});

/* Label component */
const LabelSection = styled('label', {
    whiteSpace: 'nowrap',
    fontSize: '$xs',
    position: 'absolute',
    pointerEvents: 'none',
    left: '1rem',
    transition: '0.25s ease all',
    transformOrigin: 'top left',
    variants: {
        dark: {
            true: {
                color: '$greyDark100',
                backgroundColor: '$greyDark600',
            },
            false: {
                color: '$greyLight700',
                backgroundColor: '$greyLight100',
            },
        },
        error: {
            true: { color: '$coral500' },
        },
        success: {
            true: { color: '$greenLight' },
        },
    },
});

/* Input field */
const InputFieldWrapper = styled('div', {
    position: 'relative',
    display: 'inline-flex',
    width: '100%',
    alignItems: 'center',
    lineHeight: '$lineHeight20',
});

/* Supporting info component */
const SupportingInfo = styled('div', {
    display: 'block',
    variants: {
        prefix: { true: { paddingLeft: '1rem' } },
        suffix: { true: { paddingRight: '1rem' } },
    },
});

/* Text area */
const TextAreaField = styled('textarea', {
    resize: 'none',
    height: '6rem',
    overflow: 'auto',
    overflowWrap: 'break-word',
    padding: '1rem 1rem',
    textAlign: 'justify',
    borderRadius: '$default',
    background: 'none',
    fontSize: '$xs',
    fontWeight: '$regular',
    width: '100%',
    display: 'block',
    minWidth: '0',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',

    variants: {
        dark: {
            true: {
                color: '$greyLight100',

                // '&:readonly': {
                //     color: '$greyDark200',
                // },
            },
            false: {
                color: '$greyLight700',

                // '&:readonly': {
                //     color: '$greyLight600',
                // },
            },
        },
    },

    '& ~ label': {
        top: '1rem',
    },

    '&:focus:not(textarea:read-only) ~ label': {
        transform: 'translateY(-1.5rem) scale(0.75)',
        padding: '0 4px',
    },
});

/* Input field */
const InputField = styled('input', {
    borderRadius: '$default',
    background: 'none',
    fontSize: '$xs',
    fontWeight: '$regular',
    width: '100%',
    height: '2.5rem',
    display: 'block',
    minWidth: '0',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    padding: '0 1rem',
    textOverflow: 'ellipsis',

    variants: {
        dark: {
            true: {
                color: '$greyLight100',

                '&:readonly': {
                    color: '$greyDark200',
                },
            },
            false: {
                color: '$greyLight700',

                '&:readonly': {
                    color: '$greyLight600',
                },
            },
        },
    },

    '&:focus:not(input:read-only) ~ label': {
        transform: 'translateY(-1.2rem) scale(0.75)',
        padding: '0 4px',
    },
});

const TextField = forwardRef(
    (
        {
            inline_prefix_element,
            inline_suffix_element,
            show_character_limit,
            label,
            type,
            id,
            max_length,
            error,
            success,
            hint,
            dark,
            ...props
        }: TextFieldProps,
        ref: any,
    ) => {
        const [isActive, setIsActive] = useState(false);
        const [value, setValue] = useState('');
        const [count, setCount] = useState(0);

        const handleTextChange = (text: string) => {
            if (props.disabled || props.readonly) {
                return;
            }
            if (max_length && text.length > max_length) {
                return;
            }
            setValue(text);
            setCount(text.length);
            if (text !== '') {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        };

        const generateHintText = () => {
            if (!!success) return <HintText>{success}</HintText>;
            else if (!!error) return <HintText>{error}</HintText>;
            else if (!!hint) return <HintText>{hint}</HintText>;
        };

        const styleLabelFloat = () => {
            if (isActive && type !== 'textarea') {
                return {
                    transform: 'translate(0, -1.2rem) scale(0.75)',
                    padding: '0 4px',
                };
            } else if (isActive && type === 'textarea') {
                return {
                    transform: 'translate(0, -1.5rem) scale(0.75)',
                    padding: '0 4px',
                };
            }
        };

        return (
            <Fragment>
                <TextFieldSection
                    active={!!isActive}
                    error={!!error}
                    success={!!success}
                    disabled={!!props.disabled}
                    dark={!!dark}
                >
                    <InputFieldWrapper>
                        {type !== 'textarea' && !!inline_prefix_element && (
                            <SupportingInfo prefix>{inline_prefix_element}</SupportingInfo>
                        )}
                        {type === 'textarea' ? (
                            <TextAreaField
                                {...props}
                                value={value}
                                dark={!!dark}
                                readOnly={props.readonly}
                                disabled={props.disabled}
                                onChange={(e) => handleTextChange(e.target.value)}
                            />
                        ) : (
                            <InputField
                                {...props}
                                dark={!!dark}
                                type={type}
                                value={value}
                                readOnly={props.readonly}
                                disabled={props.disabled}
                                onChange={(e) => handleTextChange(e.target.value)}
                            />
                        )}
                        {!!label && (
                            <LabelSection
                                htmlFor={id}
                                error={!!error}
                                success={!!success}
                                dark={!!dark}
                                css={styleLabelFloat()}
                            >
                                {label}
                            </LabelSection>
                        )}
                        {type !== 'textarea' && !!inline_suffix_element && (
                            <SupportingInfo suffix>{inline_suffix_element}</SupportingInfo>
                        )}
                    </InputFieldWrapper>
                    {type === 'password' && (
                        <PasswordStrengthMeter
                            dark={!!dark}
                            user_input={value}
                            disable_meter={(props.readonly || props.disabled) ?? false}
                        />
                    )}
                </TextFieldSection>
                <HelperSection error={!!error} success={!!success} dark={!!dark}>
                    {generateHintText()}
                    {max_length && max_length > 0 && <WordCount count={count} max_length={max_length} />}
                </HelperSection>
            </Fragment>
        );
    },
);

export default TextField;
