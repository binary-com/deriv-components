import React from 'react';

export type StepProps = {
    title: string;
    key?: string;
    is_fullwidth?: boolean;
    is_disabled?: boolean;
    is_hidden?: boolean;
    is_submit_disabled?: boolean;
    children: React.ReactElement;
};

const Step = ({ children }: StepProps) => {
    return children;
};

export default Step;
