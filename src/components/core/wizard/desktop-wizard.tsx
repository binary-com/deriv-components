import CloseIconDark from '@assets/svg/modal/ic-close-dark.svg';
import CloseIconLight from '@assets/svg/modal/ic-close-light.svg';
import Button from '@core/button/button';
import Text from '@core/text/text';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import Scrollbars from '@core/scrollbars/scrollbars';
import StepNavigation from './step-navigation';
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

export type MainComponentProps = Partial<DesktopWizardProps> & {
    dark?: boolean;
    more_details_type?: string;
    onSubmit: (
        values?: { [key: string]: unknown },
        steps_disabling_params?: Array<{ step_title: string; should_be_disabled: boolean }>,
    ) => void;
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
    main_content?: {
        component: (props: MainComponentProps) => JSX.Element;
        header?: string;
        subheader?: string;
        props_to_pass_through_wizard?: string[];
    };
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
    onClose: () => void;
    steps: StepData[];
    wizard_title: string;
};

const DesktopWizard = (props: DesktopWizardProps) => {
    const {
        dark,
        has_dark_background = true,
        onComplete,
        onClose,
        steps,
        wizard_title = "Let's get you a new app.",
    } = props;
    const [current_step_index, setCurrentStepIndex] = React.useState(0);
    const [complete_steps_indexes, setCompleteStepsIndexes] = React.useState<number[]>([]);
    const [disabled_steps_indexes, setDisabledStepsIndexes] = React.useState<number[]>([]);
    const [collected_values, setCollectedValues] = React.useState<{ [key: string]: { [key: string]: unknown } }>({});
    const [more_details_type, setMoreDetailsType] = React.useState('');
    const default_toggle_value = steps[current_step_index].toggle_switcher?.defaultValue;
    const current_left_button_name = steps[current_step_index].cancel_button_name || 'Back';
    const current_right_button_name = steps[current_step_index].submit_button_name || 'Next';
    const animated_div_ref = React.useRef<HTMLDivElement>(null);
    const steps_indexes = steps.map((_step, idx) => idx);
    const incomplete_steps_indexes = steps_indexes.filter(
        (idx) =>
            complete_steps_indexes.every((i) => i !== idx) &&
            disabled_steps_indexes.every((i) => i !== idx) &&
            idx < steps.length - 1,
    );
    const next_incomplete_step_index = steps_indexes.find(
        (i) =>
            i > current_step_index &&
            disabled_steps_indexes.every((index) => i !== index) &&
            complete_steps_indexes.every((idx) => i !== idx),
    );
    const previous_enabled_step_index = steps_indexes
        .slice()
        .reverse()
        .find((i) => i < current_step_index && disabled_steps_indexes.every((index) => i !== index));
    const last_complete_step_index = steps_indexes.filter((idx) => complete_steps_indexes.some((i) => i === idx)).pop();
    const passThroughProps = steps[current_step_index].main_content?.props_to_pass_through_wizard?.reduce(
        (arr, item) => {
            return { ...arr, [item]: props[item as keyof DesktopWizardProps] };
        },
        {},
    );
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

    const slide = (from: string, to: string) => {
        // new_step_timeout times should be equal to this animation duration:
        animated_div_ref.current?.animate({ transform: [from, to], easing: ['ease'] }, 250);
    };

    const prevStep = () => {
        clearTimeout(new_step_timeout);
        slide('translateY(0)', 'translateY(100vh)');
        if (current_step_index === steps.length - 1) {
            onComplete(collected_values, current_left_button_name);
        } else {
            new_step_timeout = setTimeout(() => {
                setCurrentStepIndex(Number(previous_enabled_step_index));
                slide('translateY(-100vh)', 'translateY(0)');
            }, 250);
        }
    };

    const nextStep = () => {
        clearTimeout(new_step_timeout);
        slide('translateY(0)', 'translateY(-100vh)');
        if (current_step_index === steps.length - 1) {
            onComplete(collected_values, current_right_button_name);
            return;
        }
        if (Number(next_incomplete_step_index) < steps.length) {
            new_step_timeout = setTimeout(() => {
                setCurrentStepIndex(Number(next_incomplete_step_index));
                // last step is always 'Complete' and has to be completed automatically unless some incomplete steps are left:
                if (incomplete_steps_indexes.length === 0)
                    setCompleteStepsIndexes([...complete_steps_indexes, steps.length - 1]);
                if (Number(next_incomplete_step_index) === steps.length - 1 && incomplete_steps_indexes.length > 0) {
                    // switch from second-to-last step before 'Complete' to the first incomplete step if any incomplete steps are left:
                    setCurrentStepIndex(incomplete_steps_indexes[0] as number);
                }
                slide('translateY(100vh)', 'translateY(0)');
            }, 250);
        } else {
            setCurrentStepIndex(steps.length - 1);
        }
    };

    const handleStepClick = (index: number) => {
        if (
            disabled_steps_indexes.every((i) => i !== index) &&
            (index <= Number(last_complete_step_index) + 1 ||
                index === Number(next_incomplete_step_index) ||
                complete_steps_indexes.some((i) => i === current_step_index)) &&
            (index < steps.length - 1 ||
                (incomplete_steps_indexes.length === 0 && complete_steps_indexes.some((i) => i === index)))
        ) {
            clearTimeout(new_step_timeout);
            if (index < current_step_index) slide('translateY(0)', 'translateY(100vh)');
            if (index > current_step_index) slide('translateY(0)', 'translateY(-100vh)');
            new_step_timeout = setTimeout(() => {
                setCurrentStepIndex(index);
                if (index < current_step_index) slide('translateY(-100vh)', 'translateY(0)');
                if (index > current_step_index) slide('translateY(100vh)', 'translateY(0)');
            }, 250);
        }
    };

    const handleDataSubmit = (
        values?: { [key: string]: unknown },
        steps_disabling_params?: Array<{ step_title: string; should_be_disabled: boolean }>,
    ) => {
        const steps_indexes_to_disable = steps_disabling_params
            ?.map((t) => steps.findIndex((step) => t.should_be_disabled && step.step_title === t.step_title))
            .filter((i) => i > -1);
        const steps_indexes_to_enable = steps_disabling_params
            ?.map((t) => steps.findIndex((step) => !t.should_be_disabled && step.step_title === t.step_title))
            .filter((i) => i > -1);
        setCollectedValues({ ...collected_values, [current_step_index]: values });
        if (
            (steps_indexes_to_disable && steps_indexes_to_disable.length > 0) ||
            (steps_indexes_to_enable && steps_indexes_to_enable.length > 0)
        ) {
            setDisabledStepsIndexes([
                ...disabled_steps_indexes.filter((idx) => (steps_indexes_to_enable || []).every((i) => idx !== i)),
                ...(steps_indexes_to_disable || []),
            ]);
            if (steps_indexes_to_disable && steps_indexes_to_disable.length > 0) {
                // remove disabled steps from completed and clear their data in case they were completed previously:
                setCompleteStepsIndexes([
                    ...complete_steps_indexes.filter((s) => steps_indexes_to_disable.every((i) => s !== i)),
                    current_step_index,
                ]);
                setCollectedValues({
                    ...collected_values,
                    [current_step_index]: values,
                    ...steps_indexes_to_disable.reduce((acc, i) => ({ ...acc, [i]: undefined }), {}),
                });
            } else if (steps_indexes_to_enable && steps_indexes_to_enable.length > 0) {
                // make last 'Complete' step incomplete when a previously disabled step gets enabled:
                setCompleteStepsIndexes([
                    ...complete_steps_indexes.filter((s) => s !== steps.length - 1),
                    current_step_index,
                ]);
            }
        } else {
            setCompleteStepsIndexes([...complete_steps_indexes, current_step_index]);
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
                    <DesktopWizard.StepNavigation
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
                        <FixedWidthContainer is_fullwidth={steps[current_step_index].is_fullwidth}>
                            <DesktopWizard.Body
                                animated_div_ref={animated_div_ref}
                                current_step={steps[current_step_index]}
                                current_step_collected_values={collected_values[current_step_index]}
                                dark={dark}
                                default_toggle_value={default_toggle_value}
                                handleDataSubmit={handleDataSubmit}
                                more_details_type={more_details_type}
                                setMoreDetailsType={setMoreDetailsType}
                                {...passThroughProps}
                            />
                        </FixedWidthContainer>
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
                <CloseIcon dark={dark} onClick={onClose} />
            </WizardContainer>
        </DarkBackgroundContainer>
    );
};

// DesktopWizard.Body is where the main_content of the step is rendered:
DesktopWizard.Body = DesktopWizardBody;
DesktopWizard.StepNavigation = StepNavigation;

export default DesktopWizard;
