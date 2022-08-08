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
    height: '88px',
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
    boxSizing: 'border-box',

    variants: {
        is_right_panel: {
            true: {
                zIndex: '100',
                top: '0',
            },
            false: {
                paddingLeft: '24px',
                paddingRight: '24px',
                paddingBottom: '24px',
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
    width: '100%',
    height: '72px',
    bottom: '0',
    boxSizing: 'border-box',

    variants: {
        dark: {
            true: {
                boxShadow: 'inset 0px 2px 0px #151717',
            },
            false: {
                boxShadow: 'inset 0px 2px 0px #F2F3F4',
            },
        },
        is_right_panel: {
            true: {
                position: 'absolute',
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

    const [content_container_padding_top, setContentContainerPaddingTop] = React.useState('24px');

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
        if (animated_div_ref.current?.scrollTop != 0) {
            setContentContainerPaddingTop('2px');
        } else {
            setContentContainerPaddingTop('24px');
        }
    };

    return (
        <>
            {!current_step.props?.hide_steps_panel_in_mobile && !is_right_panel && (
                <TopPanel dark={isDark}>
                    {!is_right_panel && (
                        <StepNavigation
                            steps={steps_config}
                            current_step_index={current_step_index}
                            complete_steps_indexes={complete_steps_indexes}
                            next_step_index={next_step_index}
                        />
                    )}
                </TopPanel>
            )}
            <WizardBody
                style={{
                    height:
                        is_right_panel || current_step.props?.hide_steps_panel_in_mobile
                            ? `calc(100% - 72px)`
                            : `calc(100% - 72px - 88px)`,
                    paddingTop: is_right_panel ? '0px' : `${content_container_padding_top}`,
                }}
                is_right_panel={is_right_panel}
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
            <Footer dark={isDark} is_right_panel={is_right_panel}>
                {!is_right_panel && (
                    <Button color="secondary" size="large" onClick={prevStep} disabled={current_step_index < 1} block>
                        {secondary_button_label}
                    </Button>
                )}
                <Button size="large" onClick={nextStep} disabled={current_step.props.is_submit_disabled} block>
                    {primary_button_label}
                </Button>
            </Footer>
            {!is_right_panel && !current_step.props?.hide_steps_panel_in_mobile && (
                <CloseIcon dark={isDark} onClick={onClose} />
            )}
        </>
    );
};

export default MobileWizard;
