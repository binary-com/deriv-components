import CircularCheckIcon from '@assets/svg/circular-check-icon.svg';
import Button from '@core/button/button';
import Text from '@core/text/text';
import React from 'react';
import { styled } from 'Styles/stitches.config';

const WizardContainer = styled('div', {
    width: '1040px',
    height: '640px',
    background: '$white',
    borderRadius: '16px',
    display: 'flex',
    overflow: 'hidden',
});

const LeftPanel = styled('div', {
    width: '256px',
    height: '640px',
    background: '#F2F3F4',
    boxSizing: 'border-box',
    padding: '48px 24px',
});
const Title = styled('div', {
    marginBottom: '24px',
});

const WizardBody = styled('div', {
    width: '784px',
    height: '640px',
});

const ContentContainer = styled('div', {
    width: '784px',
    height: '568px',
    position: 'relative',
    boxSizing: 'border-box',
    padding: '48px 24px 24px',
});

const FixedWidthContainer = styled('div', {
    width: '472px',
    height: '568px',
    boxSizing: 'border-box',
    padding: '48px 24px 24px',
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
});

const RightPanel = styled('div', {
    width: '312px',
    height: '568px',
    boxSizing: 'border-box',
    padding: '48px 24px 24px',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    borderLeft: '2px solid #F2F3F4',
});

const Footer = styled('div', {
    width: '784px',
    height: '72px',
    boxSizing: 'border-box',
    padding: '16px 24px',
    borderTop: '2px solid #F2F3F4',
    display: 'flex',
    justifyContent: 'end',
    gap: '8px',
});

const Bullet = styled('div', {
    width: '16px',
    height: '16px',
    border: '2px solid #D6DADB',
    boxSizing: 'border-box',
    borderRadius: '50%',
    background: '$white',

    variants: {
        active: {
            true: {
                border: '2px solid #FF444F',
            },
        },
        complete: {
            true: {
                border: '2px solid #FF444F',
                background: `#FF444F url(${CircularCheckIcon}) no-repeat center`,
            },
        },
        disabled: {
            true: {
                backgroundColor: '#D6D6D6',
                border: '2px solid #D6D6D6',
            },
        },
        dark: {
            true: {},
        },
    },
    compoundVariants: [
        {
            active: true,
            dark: true,
            css: {
                backgroundColor: '#0E0E0E',
                border: '2px solid #FF444F',
            },
        },
        {
            disabled: true,
            dark: true,
            css: {
                backgroundColor: '#3E3E3E',
                border: '2px solid #3E3E3E',
            },
        },
    ],
    defaultVariants: {
        active: false,
        complete: false,
        disabled: false,
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

const Step = styled('div', {
    width: '100%',
    height: '40px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    zIndex: '1',
    position: 'relative',
});

type TStepsProps = {
    steps: TItemsState[];
    current_step_index: number;
    complete_steps_indexes?: number[];
    disabled_steps_indexes?: number[];
    dark?: boolean;
    onClick?: (idx: number) => void;
};

const Steps = React.memo(
    ({ steps, current_step_index, complete_steps_indexes, disabled_steps_indexes, dark, onClick }: TStepsProps) => {
        return (
            <div
                style={{
                    position: 'relative',
                }}
            >
                <Before
                    css={{
                        height: `calc(100% * ${steps.length - 1} / ${steps.length})`,
                    }}
                />
                {steps.map((step, idx) => {
                    const active = idx === current_step_index;
                    const disabled = disabled_steps_indexes?.some((i) => i === idx);
                    return (
                        <Step key={idx + 1} onClick={() => onClick?.(idx)}>
                            <Bullet
                                active={active}
                                complete={complete_steps_indexes?.some((i) => i === idx)}
                                disabled={disabled}
                                dark={dark}
                            />
                            <label>
                                <Text
                                    as="div"
                                    type="paragraph-2"
                                    bold={active}
                                    css={{
                                        color: disabled ? (dark ? '#3E3E3E' : '#999999') : dark ? '$white' : '#333333',
                                    }}
                                >
                                    {step.titles.step_title}
                                </Text>
                            </label>
                        </Step>
                    );
                })}
                <After
                    css={{
                        height: `${current_step_index * (100 / steps.length)}%`,
                    }}
                />
            </div>
        );
    },
);

export type TItemsState = {
    titles: {
        main_content_title: string;
        step_title: string;
    };
    main_content?: {
        component: React.FC<{ [key: string]: unknown | undefined }> & React.ReactNode;
        children?: string | (React.FC<{ [key: string]: unknown | undefined }> & React.ReactNode);
        passthrough_props?: string[];
        is_fullwidth?: boolean;
    };
    right_panel_content?: string | (React.FC<{ [key: string]: unknown | undefined }> & React.ReactNode);
    cancel_button_name?: string;
    submit_button_name?: string;
};

export type TWizardProps = {
    dark?: boolean;
    steps: TItemsState[];
};

const Wizard = ({ dark, steps }: TWizardProps) => {
    const wizard_title = 'app'; // temporary stub
    const [current_step_index, setCurrentStepIndex] = React.useState<number>(0);
    const [complete_steps_indexes, setCompleteStepsIndexes] = React.useState<number[]>([]);
    const [disabled_steps_indexes, setDisabledStepsIndexes] = React.useState<number[]>([]);
    const next_enabled_step_index = steps
        .map((_step, idx) => idx)
        .find((i) => i > current_step_index && disabled_steps_indexes.every((index) => i !== index));
    const previous_enabled_step_index = steps
        .map((_step, idx) => idx)
        .reverse()
        .find((i) => i < current_step_index && disabled_steps_indexes.every((index) => i !== index));
    const last_complete_step_index = steps
        .map((_step, idx) => (complete_steps_indexes.some((i) => i === idx) ? idx : null))
        .filter((i) => i !== null)
        .pop();

    const nextStep = () => {
        if (Number(next_enabled_step_index) < steps.length) {
            setCurrentStepIndex(Number(next_enabled_step_index));
        }
    };

    const prevStep = () => {
        setCurrentStepIndex(Number(previous_enabled_step_index));
    };

    const handleStepClick = (index: number) => {
        if (
            disabled_steps_indexes.every((i) => i !== index) &&
            (index <= Number(last_complete_step_index) + 1 ||
                (index === Number(next_enabled_step_index) &&
                    complete_steps_indexes.some((i) => i === current_step_index)))
        ) {
            setCurrentStepIndex(index);
        }
    };

    const BodyComponent = steps[current_step_index].main_content?.component;

    const getBody = () => {
        const handleClick = () => {
            setCompleteStepsIndexes([...complete_steps_indexes, current_step_index]);
            // temporary condition to test disabling of the next step
            if (steps[current_step_index].main_content?.children === 'Submit & Disable next step') {
                setDisabledStepsIndexes([...disabled_steps_indexes, current_step_index + 1]);
            }
        };

        return (
            <>
                <Text as="div" type="subtitle-1" bold css={{ marginBottom: '24px' }}>
                    {steps[current_step_index].titles.main_content_title}
                </Text>
                {BodyComponent && (
                    <BodyComponent onClick={handleClick}>
                        {steps[current_step_index].main_content?.children}
                    </BodyComponent>
                )}
            </>
        );
    };

    return (
        <WizardContainer>
            <LeftPanel>
                <Title>
                    <Text as="div" type="subtitle-2" bold>
                        Let's get you a new {wizard_title}.
                    </Text>
                </Title>
                <Steps
                    steps={steps}
                    current_step_index={current_step_index}
                    complete_steps_indexes={complete_steps_indexes}
                    dark={dark}
                    disabled_steps_indexes={disabled_steps_indexes}
                    onClick={handleStepClick}
                />
            </LeftPanel>
            <WizardBody>
                <ContentContainer>
                    {steps[current_step_index].main_content?.is_fullwidth ? (
                        getBody()
                    ) : (
                        <FixedWidthContainer>{getBody()}</FixedWidthContainer>
                    )}
                    {steps[current_step_index].right_panel_content && (
                        <RightPanel>{steps[current_step_index].right_panel_content}</RightPanel>
                    )}
                </ContentContainer>
                <Footer>
                    <Button
                        color="secondary"
                        size="large"
                        onClick={prevStep}
                        disabled={current_step_index < 1}
                        dark={dark}
                    >
                        {steps[current_step_index].cancel_button_name || 'Back'}
                    </Button>
                    <Button
                        size="large"
                        onClick={nextStep}
                        disabled={complete_steps_indexes.every((i) => i !== current_step_index)}
                        dark={dark}
                    >
                        {steps[current_step_index].submit_button_name || 'Next'}
                    </Button>
                </Footer>
            </WizardBody>
        </WizardContainer>
    );
};

export default Wizard;
