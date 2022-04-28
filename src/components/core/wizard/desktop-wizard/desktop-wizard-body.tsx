import Scrollbars from '@core/scrollbars/scrollbars';
import React from 'react';
import { WizardProps, StepProps } from '@core/wizard/types';

type DesktopWizardBody = Partial<WizardProps> & {
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
            {React.cloneElement(current_step.props.children, props_to_main_component)}
        </Scrollbars>
    );
};

export default DesktopWizardBody;
