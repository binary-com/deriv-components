import Scrollbars from '@core/scrollbars/scrollbars';
import React from 'react';
import Text from '@core/text/text';
import { styled } from 'Styles/stitches.config';
import BackArrowIconDark from '@assets/svg/wizard/ic-back-arrow-dark.svg';
import BackArrowIconLight from '@assets/svg/wizard/ic-back-arrow-light.svg';
import { DesktopWizardProps, StepData } from './desktop-wizard';

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

type DesktopWizardBody = Partial<DesktopWizardProps> & {
    animated_div_ref: React.RefObject<HTMLDivElement | null>;
    current_step: StepData;
    current_step_collected_values: { [key: string]: unknown };
    dark?: boolean;
    default_toggle_value?: string;
    handleDataSubmit: (
        values?: { [key: string]: unknown },
        steps_disabling_params?: Array<{ step_title: string; should_be_disabled: boolean }>,
    ) => void;
    more_details_type: string;
    setMoreDetailsType: (more_details_type: string) => void;
};

const DesktopWizardBody = React.memo((props: DesktopWizardBody) => {
    const {
        current_step,
        current_step_collected_values,
        handleDataSubmit,
        dark,
        default_toggle_value,
        animated_div_ref,
        more_details_type,
        setMoreDetailsType,
        ...passThroughProps
    } = props;
    const [selected_toggle_value, setSelectedToggleValue] = React.useState('');
    const [should_show_scrollbar, setShouldShowScrollbar] = React.useState(false);
    const BodyComponent = current_step.main_content?.component;
    const ToggleSwitcher = current_step.toggle_switcher?.component;
    let scroll_timeout: NodeJS.Timeout;

    const handleScroll = () => {
        clearTimeout(scroll_timeout);
        if (!should_show_scrollbar) {
            setShouldShowScrollbar(true);
            scroll_timeout = setTimeout(() => {
                setShouldShowScrollbar(false);
            }, 700);
        }
    };

    return (
        <Scrollbars dark={dark} ref={animated_div_ref} onScroll={handleScroll} autohide={!should_show_scrollbar}>
            <MainTitleContainer data-testid="body-heading">
                {more_details_type && <GoBackArrow dark={dark as boolean} onClick={() => setMoreDetailsType('')} />}
                <div>
                    <Text
                        as="div"
                        type="subtitle-1"
                        bold
                        css={{ marginBottom: '8px', color: dark ? '$white' : '#333333' }}
                    >
                        {more_details_type
                            ? current_step.more_details?.[more_details_type].header
                            : current_step.main_content?.header}
                    </Text>
                    <Text
                        as="div"
                        type="paragraph-1"
                        bold={false}
                        css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                    >
                        {more_details_type
                            ? current_step.more_details?.[more_details_type].subheader
                            : current_step.main_content?.subheader}
                    </Text>
                </div>
                {ToggleSwitcher && (
                    <ToggleSwitcherContainer dark={dark} data-testid="toggle-switcher">
                        <ToggleSwitcher
                            button_labels={current_step.toggle_switcher?.button_labels}
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
                    values={current_step_collected_values}
                    setMoreDetailsType={setMoreDetailsType}
                    more_details_type={more_details_type}
                    selected_toggle_value={selected_toggle_value || default_toggle_value}
                    {...passThroughProps}
                />
            )}
        </Scrollbars>
    );
});

export default DesktopWizardBody;
