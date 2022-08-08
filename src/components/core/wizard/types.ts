export type WizardProps = {
    // TODO: remove dark props. It should be configured in context so that it's available throughout all the components
    dark?: boolean;
    lock_final_step?: boolean;
    has_dark_background?: boolean;
    onComplete?: (button_type: 'primary' | 'secondary') => void;
    onClose: () => void;
    onChangeStep?: (current_step_index: number, current_step_key?: string) => void;
    wizard_title: string;
    primary_button_label?: string;
    secondary_button_label?: string;
    children: React.ReactElement | React.ReactElement[];
};

export type StepProps = {
    hide_steps_panel_in_mobile?: boolean;
    title: string;
    step_key?: string;
    is_fullwidth?: boolean;
    is_disabled?: boolean;
    is_hidden?: boolean;
    is_submit_disabled?: boolean;
    children: React.ReactElement;
};

export type RightPanelProps = {
    is_hidden?: boolean;
    children: React.ReactElement | React.ReactElement[];
};

export type StepsConfig = {
    title: string;
    step_key?: StepProps['step_key'];
    is_disabled?: StepProps['is_disabled'];
    is_hidden?: StepProps['is_hidden'];
    is_submit_disabled?: StepProps['is_submit_disabled'];
}[];

export type StepNavigationProps = {
    steps: StepsConfig;
    current_step_index: number;
    complete_steps_indexes?: number[];
    dark?: boolean;
    onClick?: (idx: number) => void;
};
