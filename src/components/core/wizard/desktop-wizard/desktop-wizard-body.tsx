import Scrollbars from '@core/scrollbars/scrollbars';
import React from 'react';
import Text from '@core/text/text';
import { styled } from 'Styles/stitches.config';
import BackArrowIconDark from '@assets/svg/wizard/ic-back-arrow-dark.svg';
import BackArrowIconLight from '@assets/svg/wizard/ic-back-arrow-light.svg';
import { DesktopWizardProps } from './desktop-wizard';
import { StepProps } from './step';

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

type DesktopWizardBody = Partial<DesktopWizardProps> & {
    animated_div_ref: React.RefObject<HTMLDivElement | null>;
    current_step: React.ReactElement<StepProps>;
    dark?: boolean;
};

const DesktopWizardBody = (props: DesktopWizardBody) => {
    const { current_step, dark, animated_div_ref } = props;
    const [should_show_scrollbar, setShouldShowScrollbar] = React.useState(false);

    if (!current_step) return null;

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

    const props_to_main_component = {
        dark,
    };

    return (
        <Scrollbars dark={dark} ref={animated_div_ref} onScroll={handleScroll} autohide={!should_show_scrollbar}>
            {/* <MainTitleContainer data-testid="body-heading">
                <div>
                    <Text
                        as="div"
                        type="subtitle-1"
                        bold
                        css={{ marginBottom: '8px', color: dark ? '$white' : '#333333' }}
                    >
                        {header}
                    </Text>
                    <Text
                        as="div"
                        type="paragraph-1"
                        bold={false}
                        css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                    >
                        {subheader}
                    </Text>
                </div>
            </MainTitleContainer> */}
            {React.cloneElement(current_step.props.children, props_to_main_component)}
        </Scrollbars>
    );
};

export default DesktopWizardBody;
