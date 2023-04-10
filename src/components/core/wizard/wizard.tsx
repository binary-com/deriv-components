import React from 'react';
import { WizardProps, StepProps, RightPanelProps } from '@core/wizard/types';
import { styled } from 'Styles/stitches.config';
import { DesktopWizard } from './desktop-wizard';
import { MobileWizard } from './mobile-wizard';
import { isDesktop, isMobile } from 'utils';
import DesktopStepNavigation from './desktop-wizard/step-navigation';
import DesktopStep from './desktop-wizard/step';
import DesktopRightPanel from './desktop-wizard/right-panel';
import DesktopWizardBody from './desktop-wizard/desktop-wizard-body';
import MobileStepNavigation from './mobile-wizard/step-navigation';
import MobileStep from './mobile-wizard/step';
import MobileRightPanel from './mobile-wizard/right-panel';
import MobileWizardBody from './mobile-wizard/mobile-wizard-body';
import useTheme from '@core/theme-context/use-theme';

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

const DesktopWizardContainer = styled('div', {
    position: 'relative',
    width: '1040px',
    height: '640px',
    backgroundColor: '$primary-background',
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
        show_header: {
            true: {
                height: '696px',
            },
        },
    },
});

const MobileWizardContainer = styled('div', {
    width: '100%',
    height: '100%',
    backgroundColor: '$primary-background',

    variants: {
        dark: {
            true: {
                backgroundColor: '#0E0E0E',
            },
        },
        is_right_panel: {
            false: {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                overflow: 'hidden',
            },
        },
        show_header: {
            true: {
                height: '688px',
            },
        },
    },
});

const Wizard = (props: WizardProps) => {
    const {
        lock_final_step,
        has_dark_background = true,
        onComplete,
        onChangeStep,
        onClose,
        children,
        show_steps = true,
        show_header,
    } = props;

    const [current_step_index, setCurrentStepIndex] = React.useState<number>(0);
    const [complete_steps_indexes, setCompleteStepsIndexes] = React.useState<number[]>([]);
    const [is_completed, setIsCompleted] = React.useState(false);
    const [is_right_panel, setIsRightPanel] = React.useState(false);

    const animated_div_ref = React.useRef<HTMLDivElement>(null);

    const { isDark } = useTheme();

    let new_step_timeout: NodeJS.Timeout;

    const steps: React.ReactElement<StepProps>[] = React.Children.toArray(children).filter((child) => {
        const step_element = child as React.ReactElement;
        return step_element?.type === Wizard.Step;
    }) as React.ReactElement<StepProps>[];

    const right_panel: React.ReactElement<RightPanelProps> = React.Children.toArray(children).find((child) => {
        const step_element = child as React.ReactElement;
        return step_element?.type === Wizard.RightPanel;
    }) as React.ReactElement<RightPanelProps>;

    const getStepDetails = (_step: React.ReactElement<StepProps>) => ({
        title: _step.props.title,
        step_key: _step.props.step_key,
        is_disabled: _step.props.is_disabled,
        is_hidden: _step.props.is_hidden,
        is_submit_disabled: _step.props.is_submit_disabled,
    });

    const current_step = steps[current_step_index];
    const current_step_key = getStepDetails(current_step).step_key;

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

    const getPrevStepIndex = () => {
        for (let i = current_step_index - 1; i >= 0; i--) {
            const step_details = getStepDetails(steps[i]);
            if (!step_details.is_disabled && !step_details.is_hidden) {
                return i;
            }
        }
    };

    const slide = (from: string, to: string) => {
        // new_step_timeout times should be equal to this animation duration:
        animated_div_ref.current?.animate({ transform: [from, to], easing: ['ease'] }, 250);
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
        setIsRightPanel(false);
        clearTimeout(new_step_timeout);

        // Final step secondary button
        if (lock_final_step && current_step_index === steps.length - 1) {
            onComplete?.('secondary');
            return;
        }

        if (isDesktop()) {
            slide('translateY(0)', 'translateY(100vh)');
        }

        if (isMobile()) {
            slide('translateX(0)', 'translateX(100vw)');
        }

        const prev_step_index = getPrevStepIndex();

        if (typeof prev_step_index === 'number') {
            new_step_timeout = setTimeout(() => {
                setCurrentStepIndex(prev_step_index);
                if (isDesktop()) {
                    slide('translateY(-100vh)', 'translateY(0)');
                }

                if (isMobile()) {
                    slide('translateX(-100vw)', 'translatex(0)');

                    const has_current_step_right_panel: boolean = !!React.Children.toArray(
                        right_panel?.props?.children,
                    )[current_step_index];
                    const is_current_step_complete: boolean = complete_steps_indexes.includes(current_step_index);
                    if (has_current_step_right_panel && !is_current_step_complete) {
                        setIsRightPanel(true);
                        return;
                    }
                }
            }, 250);
        }
    };

    const nextStep = () => {
        setIsRightPanel(false);
        clearTimeout(new_step_timeout);

        // Final step primary button
        if (current_step_index === steps.length - 1) {
            onComplete?.('primary');
            return;
        }
        if (isDesktop()) {
            slide('translateY(0)', 'translateY(-100vh)');
        }
        if (isMobile()) {
            slide('translateX(0)', 'translateX(-100vw)');
        }

        const next_step_index = getNextStepIndex();

        if (typeof next_step_index === 'number') {
            new_step_timeout = setTimeout(
                () => {
                    setCompleteStepsIndexes([...new Set([...complete_steps_indexes, current_step_index])]);
                    if (isDesktop()) {
                        slide('translateY(100vh)', 'translateY(0)');
                    }

                    if (isMobile()) {
                        slide('translateX(100vw)', 'translateX(0)');

                        const has_current_step_right_panel: boolean = !!React.Children.toArray(
                            right_panel?.props?.children,
                        )[current_step_index];
                        const is_current_step_complete: boolean = complete_steps_indexes.includes(current_step_index);
                        if (has_current_step_right_panel && !is_current_step_complete) {
                            setIsRightPanel(true);
                            return;
                        }
                    }

                    setCurrentStepIndex(next_step_index);
                },
                isMobile() ? 0 : 250,
            );

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

    return (
        <DarkBackgroundContainer visible={has_dark_background}>
            {isDesktop() && (
                <DesktopWizardContainer dark={isDark} show_header={show_header} data-testid="desktop-wizard">
                    <DesktopWizard
                        {...props}
                        animated_div_ref={animated_div_ref}
                        steps={steps}
                        current_step_index={current_step_index}
                        complete_steps_indexes={complete_steps_indexes}
                        handleStepClick={handleStepClick}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        right_panel={right_panel}
                        show_steps={show_steps}
                        show_header={show_header}
                    />
                </DesktopWizardContainer>
            )}
            {isMobile() && (
                <MobileWizardContainer dark={isDark} is_right_panel={is_right_panel} data-testid="mobile-wizard">
                    <MobileWizard
                        {...props}
                        animated_div_ref={animated_div_ref}
                        steps={steps}
                        current_step_index={current_step_index}
                        complete_steps_indexes={complete_steps_indexes}
                        is_right_panel={is_right_panel}
                        nextStep={nextStep}
                        next_step_index={getNextStepIndex()}
                        prevStep={prevStep}
                        right_panel={right_panel}
                        show_steps={show_steps}
                        show_header={show_header}
                    />
                </MobileWizardContainer>
            )}
        </DarkBackgroundContainer>
    );
};

Wizard.Body = isMobile() ? MobileWizardBody : DesktopWizardBody;
Wizard.StepNavigation = isMobile() ? MobileStepNavigation : DesktopStepNavigation;
Wizard.Step = isMobile() ? MobileStep : DesktopStep;
Wizard.RightPanel = isMobile() ? MobileRightPanel : DesktopRightPanel;

export default Wizard;
