import Scrollbars from '@core/scrollbars/scrollbars';
import React from 'react';
import { WizardProps, StepProps } from '@core/wizard/types';

type MobileWizardBody = Partial<WizardProps> & {
    animated_div_ref: React.RefObject<HTMLDivElement | null>;
    current_step: React.ReactElement<StepProps>;
    dark?: boolean;
    onScroll: () => void;
};

const MobileWizardBody = (props: MobileWizardBody) => {
    const { current_step, dark, animated_div_ref, onScroll } = props;

    if (!current_step) return null;

    const props_to_main_component = {
        dark,
    };

    return (
        <Scrollbars dark={dark} ref={animated_div_ref} onScroll={onScroll} autohide has_y_scroll_on_drag_effect>
            {React.cloneElement(current_step.props.children, props_to_main_component)}
        </Scrollbars>
    );
};

export default MobileWizardBody;
