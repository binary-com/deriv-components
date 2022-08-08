import CircularCheckIcon from '@assets/svg/circular-check-icon.svg';
import Text from '@core/text/text';
import useTheme from '@core/theme-context/use-theme';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import { StepNavigationProps } from '../types';

const Bullet = styled('div', {
    width: '16px',
    height: '16px',
    border: '2px solid #D6DADB',
    boxSizing: 'border-box',
    borderRadius: '50%',
    background: '$primary-background',

    variants: {
        status: {
            active: {
                border: '2px solid #FF444F',
            },
            complete: {
                border: '2px solid #FF444F',
                background: `#FF444F url(${CircularCheckIcon}) no-repeat center`,
            },
            disabled: {
                backgroundColor: '#D6D6D6',
                border: '2px solid #D6D6D6',
            },
        },
        dark: {
            true: {
                border: '2px solid #323738',
                backgroundColor: '#0E0E0E',
            },
        },
    },
    compoundVariants: [
        {
            status: 'active',
            dark: true,
            css: {
                backgroundColor: '#0E0E0E',
                border: '2px solid #FF444F',
            },
        },
        {
            status: 'disabled',
            dark: true,
            css: {
                backgroundColor: '#3E3E3E',
                border: '2px solid #3E3E3E',
            },
        },
        {
            status: 'complete',
            dark: true,
            css: {
                border: '2px solid #FF444F',
            },
        },
    ],
    defaultVariants: {
        status: undefined,
        dark: false,
    },
});

const Before = styled('div', {
    bottom: '20px',
    content: '',
    left: '7px',
    position:
        'absolute' /* positioning must be absolute here, and relative positioning must be applied to the parent */,
    top: '20px',
    borderLeft: '2px solid #D6DADB',

    variants: {
        dark: {
            true: {
                borderLeft: '2px solid #323738',
            },
        },
    },
});

const After = styled('div', {
    borderLeft: '2px solid #FF444F',
    bottom: '20px',
    content: '',
    left: '7px',
    position:
        'absolute' /* positioning must be absolute here, and relative positioning must be applied to the parent */,
    top: '20px',
    transition: 'height 0.3s ease',
});

const StepBreadcrumb = styled('div', {
    width: '100%',
    height: '40px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    zIndex: '1',
    position: 'relative',

    '*': {
        color: '#333333',
    },

    variants: {
        dark: {
            true: {
                '*': {
                    color: '#C2C2C2',
                },
            },
        },
        disabled: {
            true: {
                '*': {
                    color: '#D6D6D6',
                },
            },
        },
    },
    compoundVariants: [
        {
            disabled: true,
            dark: true,
            css: {
                '*': {
                    color: '#3E3E3E',
                },
            },
        },
    ],
});

const StepNavigation = React.memo(
    ({ steps, current_step_index, complete_steps_indexes, onClick }: StepNavigationProps) => {
        const filtered_steps = steps.filter((step) => !step.is_hidden);

        const getNavLineHeight = () => {
            const no_of_hidden_index = steps.filter((step, idx) => step.is_hidden && idx < current_step_index).length;
            return (current_step_index - no_of_hidden_index) * (100 / filtered_steps.length);
        };

        const { isDark } = useTheme();

        return (
            <div style={{ position: 'relative' }} data-testid="step-navigation">
                <Before
                    dark={isDark}
                    css={{
                        height: `calc(100% * ${filtered_steps.length - 1} / ${filtered_steps.length})`,
                    }}
                />
                {steps.map((step, idx) => {
                    if (step.is_hidden) return null;

                    const active = idx === current_step_index;
                    const { is_disabled } = steps[idx];
                    return (
                        <StepBreadcrumb
                            key={idx + 1}
                            onClick={() => onClick?.(idx)}
                            disabled={is_disabled}
                            dark={isDark}
                            data-testid="step-item"
                        >
                            <Bullet
                                status={
                                    (complete_steps_indexes?.some((i) => i === idx) && 'complete') ||
                                    (is_disabled && 'disabled') ||
                                    (active && 'active') ||
                                    undefined
                                }
                                dark={isDark}
                            />
                            <Text
                                as="label"
                                type="paragraph-2"
                                bold={active}
                                css={{
                                    cursor: 'pointer',
                                }}
                            >
                                {step.title}
                            </Text>
                        </StepBreadcrumb>
                    );
                })}
                <After
                    css={{
                        height: `${getNavLineHeight()}%`,
                    }}
                />
            </div>
        );
    },
);

export default StepNavigation;
