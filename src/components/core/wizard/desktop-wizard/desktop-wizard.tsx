import CloseIconDark from '@assets/svg/modal/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/modal/ic-close-light.svg';
import Button from '@core/button/button';
import Text from '@core/text/text';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import StepNavigation from './step-navigation';
import Step, { StepProps } from './step';
import RightPanel, { RightPanelProps } from './right-panel';
import DesktopWizardBody from './desktop-wizard-body';

const DarkBackgroundContainer = styled('div', {
    position: 'absolute',
    inset: '0',
    background: 'rgba(0, 0, 0, 0.72)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    variants: {
        visible: {
            false: {
                display: 'unset',
                background: 'unset',
            },
        },
    },
});

const WizardContainer = styled('div', {
    position: 'relative',
    width: '1040px',
    height: '640px',
    backgroundColor: '$white',
    borderRadius: '16px',
    display: 'flex',
    overflow: 'hidden',
    boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.08), 0px 24px 24px rgba(0, 0, 0, 0.08)',
    boxSizingForAllChildren: 'border-box',

    variants: {
        dark: {
            true: {
                backgroundColor: '#0E0E0E',
            },
        },
    },
});

const LeftPanel = styled('div', {
    width: '256px',
    height: '640px',
    backgroundColor: '#F2F3F4',
    padding: '48px 24px',

    variants: {
        dark: {
            true: {
                backgroundColor: '#151717',
            },
        },
    },
});

const WizardBody = styled('div', {
    width: '784px',
    height: '640px',
});

const ContentContainer = styled('div', {
    width: '784px',
    height: '568px',
    position: 'relative',
    padding: '48px 24px 24px',
    overflow: 'hidden',
});

const FixedWidthContainer = styled('div', {
    width: '472px',
    height: '568px',
    padding: '48px 24px 24px',
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',

    variants: {
        is_fullwidth: {
            true: {
                overflow: 'inherit',
                right: '0',
                width: 'inherit',
                height: 'inherit',
            },
        },
    },
});

const Footer = styled('div', {
    width: '784px',
    height: '72px',
    padding: '16px 24px',
    borderTop: '2px solid #F2F3F4',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',

    variants: {
        dark: {
            true: {
                borderTop: '2px solid #323738',
            },
        },
    },
});

const CloseIcon = styled('div', {
    position: 'absolute',
    width: '12px',
    height: '12px',
    top: '34px',
    right: '34px',
    cursor: 'pointer',
    zIndex: '1',
    background: `url(${CloseIconLight}) no-repeat center`,

    '&:hover': {
        width: '32px',
        height: '32px',
        right: '24px',
        top: '24px',
        borderRadius: '4px',
        backgroundColor: '#E6E9E9',
    },

    variants: {
        dark: {
            true: {
                background: `url(${CloseIconDark}) no-repeat center`,

                '&:hover': {
                    backgroundColor: '#242828',
                },
            },
        },
    },
});

export type DesktopWizardProps = {
    dark?: boolean;
    lock_final_step?: boolean;
    has_dark_background?: boolean;
    onComplete: (button_type: 'primary' | 'secondary') => void;
    onClose: () => void;
    onChangeStep?: (current_step_index: number, current_step_key?: string) => void;
    wizard_title: string;
    primary_button_label?: string;
    secondary_button_label?: string;
    children: React.ReactElement | React.ReactElement[];
};

const DesktopWizard = (props: DesktopWizardProps) => {
    const {
        dark,
        lock_final_step,
        has_dark_background = true,
        onComplete,
        onChangeStep,
        onClose,
        wizard_title,
        primary_button_label,
        secondary_button_label,
        children,
    } = props;
    const [current_step_index, setCurrentStepIndex] = React.useState(0);
    const [complete_steps_indexes, setCompleteStepsIndexes] = React.useState<number[]>([]);
    const [is_completed, setIsCompleted] = React.useState(false);

    const animated_div_ref = React.useRef<HTMLDivElement>(null);

    const steps: React.ReactElement<StepProps>[] = React.Children.toArray(children).filter((child) => {
        const step_element = child as React.ReactElement;
        return step_element?.type === DesktopWizard.Step;
    }) as React.ReactElement<StepProps>[];

    const right_panel: React.ReactElement<RightPanelProps> = React.Children.toArray(children).find((child) => {
        const step_element = child as React.ReactElement;
        return step_element?.type === DesktopWizard.RightPanel;
    }) as React.ReactElement<RightPanelProps>;

    const getStepDetails = (_step: React.ReactElement<StepProps>) => ({
        step_key: _step.props.step_key,
        is_disabled: _step.props.is_disabled,
        is_hidden: _step.props.is_hidden,
        is_submit_disabled: _step.props.is_submit_disabled,
    });

    const current_step = steps[current_step_index];
    const current_step_key = getStepDetails(current_step).step_key;

    let new_step_timeout: NodeJS.Timeout;

    React.useEffect(() => {
        const handleEscKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscKeyPress);

        return () => {
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, []);

    React.useEffect(() => {
        onChangeStep?.(current_step_index, current_step_key);
    }, [current_step_index]);

    const slide = (from: string, to: string) => {
        // new_step_timeout times should be equal to this animation duration:
        animated_div_ref.current?.animate({ transform: [from, to], easing: ['ease'] }, 250);
    };

    const getPrevStepIndex = () => {
        for (let i = current_step_index - 1; i >= 0; i--) {
            const step_details = getStepDetails(steps[i]);
            if (!step_details.is_disabled && !step_details.is_hidden) {
                return i;
            }
        }
    };

    const getNextStepIndex = () => {
        for (let i = current_step_index + 1; i < steps.length; i++) {
            const step_details = getStepDetails(steps[i]);
            if (!step_details.is_disabled && !step_details.is_hidden) {
                return i;
            }
        }
    };

    const prevStep = () => {
        clearTimeout(new_step_timeout);

        // Final step secondary button
        if (lock_final_step && current_step_index === steps.length - 1) {
            onComplete('secondary');
            return;
        }

        slide('translateY(0)', 'translateY(100vh)');

        const prev_step_index = getPrevStepIndex();

        if (typeof prev_step_index === 'number') {
            new_step_timeout = setTimeout(() => {
                setCurrentStepIndex(prev_step_index);
                slide('translateY(-100vh)', 'translateY(0)');
            }, 250);
        }
    };

    const nextStep = () => {
        clearTimeout(new_step_timeout);

        // Final step primary button
        if (current_step_index === steps.length - 1) {
            onComplete('primary');
            return;
        }

        slide('translateY(0)', 'translateY(-100vh)');

        const next_step_index = getNextStepIndex();

        if (typeof next_step_index === 'number') {
            new_step_timeout = setTimeout(() => {
                setCurrentStepIndex(next_step_index);
                setCompleteStepsIndexes([...new Set([...complete_steps_indexes, current_step_index])]);
                slide('translateY(100vh)', 'translateY(0)');
            }, 250);

            if (lock_final_step && next_step_index === steps.length - 1) {
                setIsCompleted(true);
            }
        }
    };

    const handleStepClick = (index: number) => {
        if (lock_final_step && is_completed) return;

        if (
            complete_steps_indexes.includes(index) ||
            (getNextStepIndex() === index && !getStepDetails(current_step).is_submit_disabled)
        ) {
            clearTimeout(new_step_timeout);
            if (index < current_step_index) slide('translateY(0)', 'translateY(100vh)');
            if (index > current_step_index) slide('translateY(0)', 'translateY(-100vh)');
            new_step_timeout = setTimeout(() => {
                setCurrentStepIndex(index);
                setCompleteStepsIndexes([...new Set([...complete_steps_indexes, current_step_index])]);

                if (index < current_step_index) slide('translateY(-100vh)', 'translateY(0)');
                if (index > current_step_index) slide('translateY(100vh)', 'translateY(0)');
            }, 250);
        }
    };

    return (
        <DarkBackgroundContainer visible={has_dark_background}>
            <WizardContainer dark={dark} data-testid="desktop-wizard">
                <LeftPanel dark={dark}>
                    <Text
                        as="div"
                        type="subtitle-2"
                        bold
                        css={{ marginBottom: '24px', color: dark ? '$white' : '#333333' }}
                    >
                        {wizard_title}
                    </Text>
                    <StepNavigation
                        steps={steps}
                        current_step_index={current_step_index}
                        complete_steps_indexes={complete_steps_indexes}
                        dark={dark}
                        onClick={handleStepClick}
                    />
                </LeftPanel>
                <WizardBody>
                    <ContentContainer>
                        <FixedWidthContainer is_fullwidth={current_step.props.is_fullwidth}>
                            <DesktopWizard.Body
                                animated_div_ref={animated_div_ref}
                                current_step={steps[current_step_index]}
                                dark={dark}
                            />
                        </FixedWidthContainer>
                        {right_panel}
                    </ContentContainer>
                    <Footer dark={dark}>
                        <Button
                            color="secondary"
                            size="large"
                            onClick={prevStep}
                            disabled={current_step_index < 1}
                            dark={dark}
                        >
                            {secondary_button_label}
                        </Button>
                        <Button
                            size="large"
                            onClick={nextStep}
                            disabled={current_step.props.is_submit_disabled}
                            dark={dark}
                        >
                            {primary_button_label}
                        </Button>
                    </Footer>
                </WizardBody>
                <CloseIcon dark={dark} onClick={onClose} />
            </WizardContainer>
        </DarkBackgroundContainer>
    );
};

// DesktopWizard.Body is where the main_content of the step is rendered:
DesktopWizard.Body = DesktopWizardBody;
DesktopWizard.StepNavigation = StepNavigation;
DesktopWizard.Step = Step;
DesktopWizard.RightPanel = RightPanel;

export default DesktopWizard;
