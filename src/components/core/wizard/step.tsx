import React from 'react';

export type StepProps = {
    title: string;
    key?: string;
    header?: string;
    subheader?: string;
    is_fullwidth?: boolean;
    is_disabled?: boolean;
    is_hidden?: boolean;
    is_submit_disabled?: boolean;
    secondary_button_label?: string;
    primary_button_label?: string;
    children: React.ReactElement;
};

const Step = ({ children }: StepProps) => {
    return children;
};

export default Step;
