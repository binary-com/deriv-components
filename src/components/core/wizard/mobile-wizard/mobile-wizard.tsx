import React from 'react';
import CloseIconDark from '@assets/svg/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/ic-close-light.svg';
import Button from '@core/button/button';
import { WizardProps, StepProps, RightPanelProps } from '@core/wizard/types';
import { styled } from 'Styles/stitches.config';
import StepNavigation from './step-navigation';
import Step from './step';
import RightPanel from './right-panel';
import MobileWizardBody from './mobile-wizard-body';

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
    width: '360px',
    height: '100%',
    // height: '640px',
    backgroundColor: '$primary-background',

    variants: {
        dark: {
            true: {
                backgroundColor: '#0E0E0E',
            },
        },

        is_fullwidth: {
            true: {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden',
            },
        },
    },
});

const TopPanel = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 24px',
    // gap: '16px',
    backgroundColor: '#F2F3F4',
    flex: 'none',
    // order: '0',
    alignSelf: 'stretch',
    flexGrow: '0',

    variants: {
        dark: {
            true: {
                backgroundColor: '#151717',
            },
        },
    },
});

const WizardBody = styled('div', {
    variants: {
        is_fullwidth: {
            true: {
                padding: '24px',
                // height: '432px',
            },
            false: {
                // height: '568px',
                zIndex: '100',
                top: '0',
                position: 'absolute',
            },
        },
    },
});

const ContentContainer = styled('div', {
    width: '312px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});

const Footer = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 24px',
    gap: '8px',
    width: '312px',
    height: '72px',
    position: 'fixed',
    bottom: '0',

    variants: {
        dark: {
            true: {
                boxShadow: 'inset 0px 2px 0px #151717',
            },
            false: {
                boxShadow: 'inset 0px 2px 0px #F2F3F4',
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

const MobileWizard = (props: WizardProps) => {
    const {
        dark,
        lock_final_step,
        has_dark_background = true,
        onComplete,
        onChangeStep,
        onClose,
        primary_button_label,
        secondary_button_label,
        children,
    } = props;
    const [current_step_index, setCurrentStepIndex] = React.useState(0);
    const [complete_steps_indexes, setCompleteStepsIndexes] = React.useState<number[]>([]);
    const [is_completed, setIsCompleted] = React.useState(false);
    const [top_panel_height, setTopPanelHeight] = React.useState('88px');

    const animated_div_ref = React.useRef<HTMLDivElement>(null);

    const steps: React.ReactElement<StepProps>[] = React.Children.toArray(children).filter((child) => {
        const step_element = child as React.ReactElement;
        return step_element?.type === MobileWizard.Step;
    }) as React.ReactElement<StepProps>[];

    const right_panel: React.ReactElement<RightPanelProps> = React.Children.toArray(children).find((child) => {
        const step_element = child as React.ReactElement;
        return step_element?.type === MobileWizard.RightPanel;
    }) as React.ReactElement<RightPanelProps>;

    const getStepDetails = (_step: React.ReactElement<StepProps>) => ({
        title: _step.props.title,
        step_key: _step.props.step_key,
        is_disabled: _step.props.is_disabled,
        is_hidden: _step.props.is_hidden,
        is_submit_disabled: _step.props.is_submit_disabled,
    });

    const steps_config = steps.map((_step) => getStepDetails(_step));

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
            onComplete?.('secondary');
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
            onComplete?.('primary');
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

            if (lock_final_step && !is_completed && index === steps.length - 1) {
                setIsCompleted(true);
            }
        }
    };

    const handleScroll = () => {
        if (animated_div_ref.current?.scrollTop != 0 && !current_step.props.is_fullwidth) {
            setTopPanelHeight('64px');
        } else {
            setTopPanelHeight('88px');
        }
    };

    return (
        <DarkBackgroundContainer visible={has_dark_background}>
            <WizardContainer dark={dark} is_fullwidth={!!current_step.props.is_fullwidth} data-testid="mobile-wizard">
                <TopPanel style={{ height: `${top_panel_height}` }} dark={dark}>
                    {current_step.props.is_fullwidth && (
                        <StepNavigation
                            steps={steps_config}
                            current_step_index={current_step_index}
                            complete_steps_indexes={complete_steps_indexes}
                            dark={dark}
                            onClick={handleStepClick}
                        />
                    )}
                </TopPanel>
                <WizardBody
                    style={{
                        height: current_step.props.is_fullwidth
                            ? `calc(100% - 72px - 48px - ${top_panel_height})`
                            : `calc(100% - 72px)`,
                    }}
                    is_fullwidth={!!current_step.props.is_fullwidth}
                >
                    <ContentContainer>
                        <MobileWizardBody
                            animated_div_ref={animated_div_ref}
                            current_step={steps[current_step_index]}
                            dark={dark}
                            onScroll={handleScroll}
                        />
                    </ContentContainer>
                </WizardBody>
                <Footer dark={dark}>
                    {current_step.props.is_fullwidth && (
                        <Button
                            color="secondary"
                            size="large"
                            onClick={prevStep}
                            disabled={current_step_index < 1}
                            dark={dark}
                            block
                        >
                            {secondary_button_label}
                        </Button>
                    )}
                    <Button
                        size="large"
                        onClick={nextStep}
                        disabled={current_step.props.is_submit_disabled}
                        dark={dark}
                        block
                    >
                        {primary_button_label}
                    </Button>
                </Footer>
                {current_step.props.is_fullwidth && <CloseIcon dark={dark} onClick={onClose} />}
            </WizardContainer>
        </DarkBackgroundContainer>
    );
};

MobileWizard.Body = MobileWizardBody;
MobileWizard.StepNavigation = StepNavigation;
MobileWizard.Step = Step;
MobileWizard.RightPanel = RightPanel;

export default MobileWizard;
