import React from 'react';
import CloseIconDark from '@assets/svg/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/ic-close-light.svg';
import Button from '@core/button/button';
import { WizardProps, StepProps, RightPanelProps } from '@core/wizard/types';
import { styled } from 'Styles/stitches.config';
import StepNavigation from './step-navigation';
import MobileWizardBody from './mobile-wizard-body';
import useTheme from '@core/theme-context/use-theme';

const TopPanel = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 24px',
    backgroundColor: '#F2F3F4',
    flex: 'none',
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
        is_right_panel: {
            true: {
                padding: '24px',
            },
            false: {
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

type MobileWizard = Partial<WizardProps> & {
    animated_div_ref: React.RefObject<HTMLDivElement | null>;
    current_step_index: number;
    complete_steps_indexes: number[];
    handleStepClick: (index: number) => void;
    is_right_panel: boolean;
    nextStep: () => void;
    next_step_index?: number;
    prevStep: () => void;
    right_panel: React.ReactElement<RightPanelProps>;
    steps: React.ReactElement<StepProps>[];
};

const MobileWizard = (props: MobileWizard) => {
    const {
        animated_div_ref,
        current_step_index,
        complete_steps_indexes,
        handleStepClick,
        is_right_panel,
        onClose,
        primary_button_label,
        secondary_button_label,
        nextStep,
        next_step_index,
        prevStep,
        right_panel,
        steps,
    } = props;

    const [top_panel_height, setTopPanelHeight] = React.useState('88px');

    const getStepDetails = (_step: React.ReactElement<StepProps>) => ({
        title: _step.props.title,
        step_key: _step.props.step_key,
        is_disabled: _step.props.is_disabled,
        is_hidden: _step.props.is_hidden,
        is_submit_disabled: _step.props.is_submit_disabled,
    });

    const { isDark } = useTheme();

    const steps_config = steps.map((_step) => getStepDetails(_step));
    const current_step = steps[current_step_index];

    const handleScroll = () => {
        if (animated_div_ref.current?.scrollTop != 0 && !current_step.props.is_fullwidth) {
            setTopPanelHeight('64px');
        } else {
            setTopPanelHeight('88px');
        }
    };

    return (
        <>
            <TopPanel style={{ height: `${top_panel_height}` }} dark={isDark}>
                {!is_right_panel && (
                    <StepNavigation
                        steps={steps_config}
                        current_step_index={current_step_index}
                        complete_steps_indexes={complete_steps_indexes}
                        next_step_index={next_step_index}
                        onClick={handleStepClick}
                    />
                )}
            </TopPanel>
            <WizardBody
                style={{
                    height: is_right_panel ? `calc(100% - 72px)` : `calc(100% - 72px - 48px - ${top_panel_height})`,
                }}
                is_right_panel={!is_right_panel}
            >
                {!is_right_panel && (
                    <ContentContainer>
                        <MobileWizardBody
                            animated_div_ref={animated_div_ref}
                            current_step={steps[current_step_index]}
                            dark={isDark}
                            onScroll={handleScroll}
                        />
                    </ContentContainer>
                )}
                {is_right_panel && right_panel}
            </WizardBody>
            <Footer dark={isDark}>
                {!is_right_panel && (
                    <Button color="secondary" size="large" onClick={prevStep} disabled={current_step_index < 1} block>
                        {secondary_button_label}
                    </Button>
                )}
                <Button size="large" onClick={nextStep} disabled={current_step.props.is_submit_disabled} block>
                    {primary_button_label}
                </Button>
            </Footer>
            {!is_right_panel && <CloseIcon dark={isDark} onClick={onClose} />}
        </>
    );
};

export default MobileWizard;
