import CloseIconDark from '@assets/svg/modal/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/modal/ic-close-light.svg';
import BackArrowIconDark from '@assets/svg/wizard/ic-back-arrow-dark.svg';
import BackArrowIconLight from '@assets/svg/wizard/ic-back-arrow-light.svg';
import Button from '@core/button/button';
import Text from '@core/text/text';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import Scrollbars from '@core/scrollbars/scrollbars';
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

const MainTitleContainer = styled('div', {
    position: 'relative',
    display: 'flex',
    gap: '10px',
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

const ToggleSwitcherContainer = styled('div', {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '200px',
    height: '40px',
    background: '#F2F3F4',
    borderRadius: '6px',
    padding: '4px',

    variants: {
        dark: {
            true: {
                background: '#151717',
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
});

const FixedWidthContainer = styled('div', {
    width: '472px',
    height: '568px',
    padding: '48px 24px 24px',
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
});

const RightPanel = styled('div', {
    width: '312px',
    height: '568px',
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

type RightPanelBlockType = 'upper' | 'middle' | 'lower';

const RightPanelBlock = styled('div', {
    variants: {
        placement: {
            upper: {
                minHeight: '170px',
                paddingBottom: '24px',
                borderBottom: '1px solid #D6DADB',
            },
            middle: {
                paddingTop: '24px',
            },
            lower: {
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                minHeight: '26px',
                borderTop: '1px solid #D6DADB',
            },
        },
        dark: {
            true: {},
        },
    },
    compoundVariants: [
        {
            placement: 'upper',
            dark: true,
            css: {
                borderBottom: '1px solid #323738',
            },
        },
        {
            placement: 'lower',
            dark: true,
            css: {
                borderTop: '1px solid #323738',
            },
        },
    ],
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

export type ToggleSwitcherProps = {
    button_labels?: string[];
    dark?: boolean;
    defaultValue: string;
    onToggle: (value: string) => void;
};

type RightPanelComponentType = (props: RightPanelComponentProps) => JSX.Element;

export type RightPanelComponentProps = {
    data: { [key: string]: { [key: string]: unknown } };
    dark?: boolean;
    current_step_index: number;
};

export type MainComponentProps = {
    dark?: boolean;
    more_details_type?: string;
    onSubmit: (values?: { [key: string]: unknown }, should_disable_next_step?: boolean) => void;
    setMoreDetailsType?: (more_details_type: string) => void;
    values?: { [key: string]: unknown };
    selected_toggle_value?: string;
};

export type StepData = {
    step_title: string;
    toggle_switcher?: {
        component: (props: ToggleSwitcherProps) => JSX.Element;
        defaultValue: string;
        button_labels?: string[];
    };
    main_content_header: string;
    main_content_subheader?: string;
    main_content?: (props: MainComponentProps) => JSX.Element;
    more_details?: {
        [key: string]: {
            header?: string;
            subheader?: string;
        };
    };
    right_panel_content?: {
        upper_block?: RightPanelComponentType;
        middle_block?: RightPanelComponentType;
        lower_block?: RightPanelComponentType;
    };
    is_fullwidth?: boolean;
    cancel_button_name?: string;
    submit_button_name?: string;
};

export type DesktopWizardProps = {
    dark?: boolean;
    has_dark_background?: boolean;
    onComplete: (data: { [key: string]: { [key: string]: unknown } }, button_name: string) => void;
    toggleWizard: () => void;
    steps: StepData[];
    wizard_title: string;
};

const DesktopWizard = ({
    dark,
    has_dark_background = true,
    onComplete,
    toggleWizard,
    steps,
    wizard_title = "Let's get you a new app.",
}: DesktopWizardProps) => {
    const [current_step_index, setCurrentStepIndex] = React.useState(0);
    const [complete_steps_indexes, setCompleteStepsIndexes] = React.useState<number[]>([]);
    const [disabled_steps_indexes, setDisabledStepsIndexes] = React.useState<number[]>([]);
    const [collected_values, setCollectedValues] = React.useState<{ [key: string]: { [key: string]: unknown } }>({});
    const [more_details_type, setMoreDetailsType] = React.useState('');
    const [selected_toggle_value, setSelectedToggleValue] = React.useState('');
    const default_toggle_value = steps[current_step_index].toggle_switcher?.defaultValue;
    const current_left_button_name = steps[current_step_index].cancel_button_name || 'Back';
    const current_right_button_name = steps[current_step_index].submit_button_name || 'Next';
    const BodyComponent = steps[current_step_index].main_content;
    const ToggleSwitcher = steps[current_step_index].toggle_switcher?.component;
    const steps_indexes = steps.map((_step, idx) => idx);
    const next_enabled_step_index = steps_indexes.find(
        (i) => i > current_step_index && disabled_steps_indexes.every((index) => i !== index),
    );
    const previous_enabled_step_index = steps_indexes
        .slice()
        .reverse()
        .find((i) => i < current_step_index && disabled_steps_indexes.every((index) => i !== index));
    const last_complete_step_index = steps_indexes.filter((idx) => complete_steps_indexes.some((i) => i === idx)).pop();
    const incomplete_steps_indexes = steps_indexes.filter(
        (idx) =>
            complete_steps_indexes.every((i) => i !== idx) &&
            disabled_steps_indexes.every((i) => i !== idx) &&
            idx < steps.length - 1,
    );

    const prevStep = () => {
        setCurrentStepIndex(Number(previous_enabled_step_index));
        if (current_step_index === steps.length - 1) {
            onComplete(collected_values, current_left_button_name);
        }
    };

    const nextStep = () => {
        if (Number(next_enabled_step_index) < steps.length) {
            setCurrentStepIndex(Number(next_enabled_step_index));
            // last step is always 'Complete' and has to be completed automatically unless some incomplete steps are left:
            if (incomplete_steps_indexes.length === 0)
                setCompleteStepsIndexes([...complete_steps_indexes, steps_indexes.length - 1]);
            if (Number(next_enabled_step_index) === steps.length - 1 && incomplete_steps_indexes.length > 0) {
                // switch to first incomplete step from second-to-last step before 'Complete' if any incomplete steps are left:
                setCurrentStepIndex(incomplete_steps_indexes[0] as number);
            }
        } else if (current_step_index === steps.length - 1) {
            onComplete(collected_values, current_right_button_name);
        }
    };

    const handleStepClick = (index: number) => {
        if (
            disabled_steps_indexes.every((i) => i !== index) &&
            (index <= Number(last_complete_step_index) + 1 ||
                (index === Number(next_enabled_step_index) &&
                    complete_steps_indexes.some((i) => i === current_step_index))) &&
            (index < steps.length - 1 ||
                (incomplete_steps_indexes.length === 0 && complete_steps_indexes.some((i) => i === index)))
        ) {
            setCurrentStepIndex(index);
        }
    };

    const getBody = () => {
        const handleDataSubmit = (values?: { [key: string]: unknown }, should_disable_next_step?: boolean) => {
            if (should_disable_next_step) {
                setDisabledStepsIndexes([...disabled_steps_indexes, current_step_index + 1]);
                // clear next step data in case it was completed previously:
                setCompleteStepsIndexes(complete_steps_indexes.filter((s) => s !== current_step_index + 1));
                setCollectedValues({ ...collected_values, [current_step_index + 1]: undefined });
            } else {
                setDisabledStepsIndexes(disabled_steps_indexes.filter((s) => s !== current_step_index + 1));
            }
            setCompleteStepsIndexes([...complete_steps_indexes, current_step_index]);
            setCollectedValues({ ...collected_values, [current_step_index]: values });
        };

        return (
            <Scrollbars dark={dark}>
                <MainTitleContainer>
                    {more_details_type ? (
                        <GoBackArrow dark={dark as boolean} onClick={() => setMoreDetailsType('')} />
                    ) : null}
                    <div>
                        <Text
                            as="div"
                            type="subtitle-1"
                            bold
                            css={{ marginBottom: '8px', color: dark ? '$white' : '#333333' }}
                        >
                            {more_details_type
                                ? steps[current_step_index].more_details?.[more_details_type].header
                                : steps[current_step_index].main_content_header}
                        </Text>
                        <Text
                            as="div"
                            type="paragraph-1"
                            bold={false}
                            css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                        >
                            {more_details_type
                                ? steps[current_step_index].more_details?.[more_details_type].subheader
                                : steps[current_step_index].main_content_subheader}
                        </Text>
                    </div>
                    {ToggleSwitcher && (
                        <ToggleSwitcherContainer dark={dark}>
                            <ToggleSwitcher
                                button_labels={steps[current_step_index].toggle_switcher?.button_labels}
                                dark={dark}
                                defaultValue={default_toggle_value as string}
                                onToggle={setSelectedToggleValue}
                            />
                        </ToggleSwitcherContainer>
                    )}
                </MainTitleContainer>
                {BodyComponent && (
                    <BodyComponent
                        onSubmit={handleDataSubmit}
                        dark={dark}
                        values={collected_values[current_step_index]}
                        setMoreDetailsType={setMoreDetailsType}
                        more_details_type={more_details_type}
                        selected_toggle_value={selected_toggle_value || default_toggle_value}
                    />
                )}
            </Scrollbars>
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
                        {steps[current_step_index].right_panel_content && (
                            <RightPanel dark={dark}>
                                <Scrollbars dark={dark} is_scrollbar_hidden has_y_scroll_on_drag_effect>
                                    {['upper', 'middle', 'lower'].map((placement, i) => {
                                        const RightPanelComponent = steps[current_step_index].right_panel_content?.[
                                            `${placement}_block` as keyof StepData['right_panel_content']
                                        ] as RightPanelComponentType | undefined;

                                        return (
                                            RightPanelComponent && (
                                                <RightPanelBlock
                                                    key={i + 1}
                                                    placement={placement as RightPanelBlockType}
                                                    dark={dark}
                                                >
                                                    <RightPanelComponent
                                                        data={collected_values}
                                                        dark={dark}
                                                        current_step_index={current_step_index}
                                                    />
                                                </RightPanelBlock>
                                            )
                                        );
                                    })}
                                </Scrollbars>
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
                            {current_left_button_name}
                        </Button>
                        <Button
                            size="large"
                            onClick={nextStep}
                            disabled={
                                complete_steps_indexes.every((i) => i !== current_step_index) &&
                                current_step_index !== steps.length - 1
                            }
                            dark={dark}
                        >
                            {current_right_button_name}
                        </Button>
                    </Footer>
                </WizardBody>
                <CloseIcon dark={dark} onClick={toggleWizard} />
            </WizardContainer>
        </DarkBackgroundContainer>
    );
};

export default DesktopWizard;