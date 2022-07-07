import classNames from 'classnames';
import zxcvbn from 'zxcvbn';
import * as Stitches from '@stitches/react';
import { forwardRef, Fragment, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import css from './text-field.module.scss';

type InputTypes = 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea';
type TUserInputProps = { user_input: string };
type TWordCountProps = { count: number; max_length: number };
type TPasswordStrengthProps = { user_input: string; disable_meter: boolean };

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
};

const PasswordStrengthMeter = ({ user_input, disable_meter }: TPasswordStrengthProps) => {
    const test_result: zxcvbn.ZXCVBNResult = zxcvbn(user_input);
    const score: number = (test_result.score * 100) / 4;
    const meter_color: any = Object.freeze({
        0: '#E6E9E9',
        1: '#EC3F3F',
        2: '#FFAD3A',
        3: '#4BB4B3',
        4: '#4BB4B3',
    });

    const generatePasswordStrengthColor = () => {
        return {
            width: `${score}%`,
            background: meter_color[test_result.score],
            height: disable_meter ? '0' : '0.25rem',
        };
    };
    return (
        <div className={css['password-meter']}>
            <div className={css['password-meter__container']} style={generatePasswordStrengthColor()}></div>
        </div>
    );
};

const HintText = ({ user_input }: TUserInputProps) => {
    return <div className={css['dc-text-field__helper--message']}>{user_input}</div>;
};

const WordCount = ({ count, max_length }: TWordCountProps) => (
    <div className={css['dc-text-field__helper--character-count']}>
        {count}/{max_length}
    </div>
);

const TextField = forwardRef(
    (
        {
            inline_prefix_element,
            inline_suffix_element,
            show_character_limit,
            label,
            type,
            required,
            id,
            max_length,
            error,
            success,
            hint,
            disabled,
            readonly,
            ...props
        }: TextFieldProps,
        ref: any,
    ) => {
        const [isActive, setIsActive] = useState(false);
        const [value, setValue] = useState('');
        const [count, setCount] = useState(0);

        const handleTextChange = (text: string) => {
            if (disabled || readonly) {
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
            if (!!success) return <HintText user_input={success} />;
            else if (!!error) return <HintText user_input={error} />;
            else if (!!hint) return <HintText user_input={hint} />;
        };

        return (
            <Fragment>
                <section
                    className={classNames(css['dc-text-field'], {
                        [css['dc-text-field--active']]: isActive,
                        [css['dc-text-field--error-border']]: !!error,
                        [css['dc-text-field--success-border']]: !!success,
                        [css['dc-text-field--disabled']]: disabled,
                    })}
                >
                    <div className={css['dc-text-field__wrapper']}>
                        {type !== 'textarea' && !!inline_prefix_element && (
                            <div className={css['dc-text-field__prefix']}>{inline_prefix_element}</div>
                        )}
                        {type === 'textarea' ? (
                            <textarea
                                {...props}
                                className={css['dc-text-field__text-area']}
                                value={value}
                                readOnly={readonly}
                                disabled={disabled}
                                onChange={(e) => handleTextChange(e.target.value)}
                            />
                        ) : (
                            <input
                                className={css['dc-text-field__input']}
                                type={type}
                                value={value}
                                readOnly={readonly}
                                disabled={disabled}
                                {...props}
                                onChange={(e) => handleTextChange(e.target.value)}
                            />
                        )}
                        {!!label && (
                            <label
                                htmlFor={id}
                                className={classNames(css['dc-text-field__label'], {
                                    [css['dc-text-field__label--active-input']]: isActive && type !== 'textarea',
                                    [css['dc-text-field__label--active-textarea']]: isActive && type === 'textarea',
                                    [css['dc-text-field--error-text']]: !!error,
                                    [css['dc-text-field--success-text']]: !!success,
                                })}
                            >
                                {label}
                            </label>
                        )}
                        {type !== 'textarea' && !!inline_suffix_element && (
                            <div className={css['dc-text-field__suffix']}>{inline_suffix_element}</div>
                        )}
                    </div>
                    {type === 'password' && (
                        <PasswordStrengthMeter user_input={value} disable_meter={(readonly || disabled) ?? false} />
                    )}
                </section>
                <section
                    className={classNames(css['dc-text-field__helper'], {
                        [css['dc-text-field--error-text']]: !!error,
                        [css['dc-text-field--success-text']]: !!success,
                    })}
                >
                    {generateHintText()}
                    {max_length && max_length > 0 && <WordCount count={count} max_length={max_length} />}
                </section>
            </Fragment>
        );
    },
);

export default TextField;
