import CloseIconDark from '@assets/svg/modal/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/modal/ic-close-light.svg';
import BackArrowIconLight from '@assets/svg/wizard/ic-back-arrow-light.svg';
import BackArrowIconDark from '@assets/svg/wizard/ic-back-arrow-dark.svg';
import Button from '@core/button/button';
import Text from '@core/text/text';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import StepNavigation from './step-navigation';

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
    boxSizing: 'border-box',
    padding: '48px 24px',

    variants: {
        dark: {
            true: {
                backgroundColor: '#151717',
            },
        },
    },
});

const MainTitleContainer = styled('div', {
    display: 'flex',
    gap: '10px',
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

    variants: {
        dark: {
            true: {
                borderLeft: '2px solid #323738',
            },
        },
    },
});

const RightPanelBlock = styled('div', {
    boxSizing: 'border-box',

    variants: {
        location: {
            upper: {
                minHeight: '272px',
                paddingBottom: '24px',
                borderBottom: '1px solid #D6DADB',
            },
            lower: {
                paddingTop: '24px',
            },
        },
        dark: {
            true: {},
        },
    },
    compoundVariants: [
        {
            location: 'upper',
            dark: true,
            css: {
                borderBottom: '1px solid #323738',
            },
        },
    ],
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

    variants: {
        dark: {
            true: {
                borderTop: '2px solid #323738',
            },
        },
    },
});

const GoBackArrow = styled('div', {
    marginTop: '14px',
    width: '12px',
    height: '8px',
    background: `url(${BackArrowIconDark}) no-repeat center`,

    '&:hover': {
        cursor: 'pointer',
    },

    variants: {
        dark: {
            true: {
                background: `url(${BackArrowIconLight}) no-repeat center`,
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

export type ItemsState = {
    step_title: string;
    toggle_switcher_buttons?: string[];
    main_content_header: string;
    subheader?: string;
    main_content?: React.FC<{ [key: string]: unknown }> & React.ReactNode;
    more_info_header?: string;
    more_info_subheader?: string;
    right_panel_upper_block?: string | (React.FC<{ [key: string]: unknown }> & React.ReactNode);
    right_panel_lower_block?: string | (React.FC<{ [key: string]: unknown }> & React.ReactNode);
    is_fullwidth?: boolean;
    cancel_button_name?: string;
    submit_button_name?: string;
};

export type DesktopWizardProps = {
    dark?: boolean;
    has_dark_background?: boolean;
    toggleWizard: () => void;
    steps: ItemsState[];
    wizard_title: string;
};

const DesktopWizard = ({
    dark,
    has_dark_background = true,
    toggleWizard,
    steps,
    wizard_title = "Let's get you a new app.",
}: DesktopWizardProps) => {
    const [current_step_index, setCurrentStepIndex] = React.useState(0);
    const [complete_steps_indexes, setCompleteStepsIndexes] = React.useState<number[]>([]);
    const [disabled_steps_indexes, setDisabledStepsIndexes] = React.useState<number[]>([]);
    const [is_more_info_shown, setIsMoreInfoShown] = React.useState(false);
    const [steps_values, setStepsValues] = React.useState<{ [key: string]: unknown }>({});
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

    const BodyComponent = steps[current_step_index].main_content;

    const getBody = () => {
        const handleDataSubmit = (values?: { [key: string]: unknown }) => {
            setCompleteStepsIndexes([...complete_steps_indexes, current_step_index]);
            setStepsValues({ ...steps_values, [current_step_index]: values });
        };

        return (
            <>
                <MainTitleContainer>
                    {is_more_info_shown ? (
                        <GoBackArrow dark={dark as boolean} onClick={() => setIsMoreInfoShown(false)} />
                    ) : null}
                    <div>
                        <Text
                            as="div"
                            type="subtitle-1"
                            bold
                            css={{ marginBottom: '8px', color: dark ? '$white' : '#333333' }}
                        >
                            {is_more_info_shown
                                ? steps[current_step_index].more_info_header
                                : steps[current_step_index].main_content_header}
                        </Text>
                        <Text
                            as="div"
                            type="paragraph-1"
                            bold={false}
                            css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                        >
                            {is_more_info_shown
                                ? steps[current_step_index].more_info_subheader
                                : steps[current_step_index].subheader}
                        </Text>
                    </div>
                </MainTitleContainer>
                {BodyComponent && (
                    <BodyComponent
                        onSubmit={handleDataSubmit}
                        setIsNextStepDisabled={(should_disable_next_step: boolean) => {
                            if (should_disable_next_step) {
                                setDisabledStepsIndexes([...disabled_steps_indexes, current_step_index + 1]);
                                // clear next step data in case it was completed previously:
                                setCompleteStepsIndexes(
                                    complete_steps_indexes.filter((s) => s !== current_step_index + 1),
                                );
                                setStepsValues({ ...steps_values, [current_step_index + 1]: undefined });
                            } else {
                                setDisabledStepsIndexes(
                                    disabled_steps_indexes.filter((s) => s !== current_step_index + 1),
                                );
                            }
                        }}
                        dark={dark}
                        values={steps_values[current_step_index]}
                        setIsMoreInfoShown={setIsMoreInfoShown}
                        is_more_info_shown={is_more_info_shown}
                    />
                )}
            </>
        );
    };

    return (
        <DarkBackgroundContainer visible={has_dark_background}>
            <WizardContainer dark={dark}>
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
                        disabled_steps_indexes={disabled_steps_indexes}
                        onClick={handleStepClick}
                    />
                </LeftPanel>
                <WizardBody>
                    <ContentContainer>
                        {steps[current_step_index].is_fullwidth ? (
                            getBody()
                        ) : (
                            <FixedWidthContainer>{getBody()}</FixedWidthContainer>
                        )}
                        {steps[current_step_index].right_panel_upper_block && (
                            <RightPanel dark={dark}>
                                <RightPanelBlock location="upper" dark={dark}>
                                    {steps[current_step_index].right_panel_upper_block}
                                </RightPanelBlock>
                                <RightPanelBlock location="lower">
                                    {steps[current_step_index].right_panel_lower_block}
                                </RightPanelBlock>
                            </RightPanel>
                        )}
                    </ContentContainer>
                    <Footer dark={dark}>
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
                <CloseIcon dark={dark} onClick={toggleWizard} />
            </WizardContainer>
        </DarkBackgroundContainer>
    );
};

export default DesktopWizard;
