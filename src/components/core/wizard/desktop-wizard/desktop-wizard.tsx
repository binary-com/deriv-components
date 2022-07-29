import React from 'react';
import CloseIconDark from '@assets/svg/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/ic-close-light.svg';
import Button from '@core/button/button';
import Text from '@core/text/text';
import { WizardProps, StepProps, RightPanelProps } from '@core/wizard/types';
import { styled } from 'Styles/stitches.config';
import StepNavigation from './step-navigation';
import DesktopWizardBody from './desktop-wizard-body';

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

type DesktopWizard = Partial<WizardProps> & {
    animated_div_ref: React.RefObject<HTMLDivElement | null>;
    current_step_index: number;
    complete_steps_indexes: number[];
    handleStepClick: (index: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    right_panel: React.ReactElement<RightPanelProps>;
    steps: React.ReactElement<StepProps>[];
};

const DesktopWizard = (props: DesktopWizard) => {
    const {
        animated_div_ref,
        current_step_index,
        complete_steps_indexes,
        dark,
        handleStepClick,
        onClose,
        wizard_title,
        primary_button_label,
        secondary_button_label,
        nextStep,
        prevStep,
        right_panel,
        steps,
    } = props;

    const getStepDetails = (_step: React.ReactElement<StepProps>) => ({
        title: _step.props.title,
        step_key: _step.props.step_key,
        is_disabled: _step.props.is_disabled,
        is_hidden: _step.props.is_hidden,
        is_submit_disabled: _step.props.is_submit_disabled,
    });

    const steps_config = steps.map((_step) => getStepDetails(_step));
    const current_step = steps[current_step_index];

    return (
        <>
            <LeftPanel dark={dark}>
                <Text
                    as="div"
                    type="subtitle-2"
                    bold
                    css={{ marginBottom: '24px', color: dark ? '$prominent-text' : '#333333' }}
                >
                    {wizard_title}
                </Text>
                <StepNavigation
                    steps={steps_config}
                    current_step_index={current_step_index}
                    complete_steps_indexes={complete_steps_indexes}
                    dark={dark}
                    onClick={handleStepClick}
                />
            </LeftPanel>
            <WizardBody>
                <ContentContainer>
                    <FixedWidthContainer is_fullwidth={current_step.props.is_fullwidth}>
                        <DesktopWizardBody
                            animated_div_ref={animated_div_ref}
                            current_step={steps[current_step_index]}
                            dark={dark}
                        />
                    </FixedWidthContainer>
                    {current_step.props.is_fullwidth ? null : right_panel}
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
        </>
    );
};

export default DesktopWizard;
