export type WizardProps = {
    dark?: boolean;
    lock_final_step?: boolean;
    has_dark_background?: boolean;
    onComplete: (button_type: 'primary' | 'secondary') => void;
    onClose: () => void;
    onChangeStep?: (current_step_index: number, current_step_key?: string) => void;
    wizard_title: string;
    primary_button_label?: string;
    secondary_button_label?: string;
    children: React.ReactElement | React.ReactElement[];
};

export type StepProps = {
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
