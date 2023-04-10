import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { WizardProps } from '@core/wizard/types';
import Button from '@core/button/button';
import Wizard from '../wizard';
import {
    StepChooseProductMain,
    StepAddAppMain,
    StepComplete,
    TestRightMiddleComponent,
    TestRightUpperComponent,
    StepCreateWalletMain,
    TestRightLowerComponent,
    StepPersonalDetailsMain,
    StepTermsOfUseMain,
    StepAddressInfoMain,
} from './steps/steps-content';

export default {
    title: 'Wizard',
    component: Wizard,
    parameters: { controls: { sort: 'alpha' } },
    argTypes: {
        has_dark_background: {
            description:
                'Optional. If set to false, the wizard will be displayed without dark background surrounding it.',
            defaultValue: true,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: true },
            },
        },
        lock_final_step: {
            description:
                'Optional. If set to true, the wizard will lock the navigation when you reach the final step and you wont be able to go to other steps.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        onComplete: {
            description: 'A callback triggered on the last step and used to send the clicked button typee',
            table: {
                type: { summary: '(button_type: "primary" | "secondary") => void' },
            },
        },
        onClose: {
            description: 'Required. A callback used to inform a parent that the wizard has been closed.',
            table: {
                type: { summary: '() => void' },
            },
        },
        wizard_title: {
            description: 'Optional. Sets the wizard title.',
            defaultValue: "Let's get you a new app.",
            table: {
                type: { summary: 'string | undefined' },
                defaultValue: { summary: "Let's get you a new app." },
            },
            control: {
                type: 'select',
                options: [
                    "Let's get you a new app.",
                    "Let's get you a new wallet.",
                    "Let's get you a new Deriv MT5 Synthetics app in new region.",
                ],
            },
        },
        secondary_button_label: {
            defaultValue: 'Back',
            description: 'Optional. Cancel button label',
            control: {
                type: 'text',
            },
        },
        primary_button_label: {
            defaultValue: 'Next',
            description: 'Optional. Submit button label',
            control: {
                type: 'text',
            },
        },
        show_steps: {
            description: 'If it is set to true, the wizard will display the steps on the left side of the wizard.',
            defaultValue: true,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: true },
            },
        },
        show_header: {
            description: 'If it is set to true, the wizard will display the header',
            defaultValue: true,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: true },
            },
        },
    },
} as Meta<WizardProps>;

type CreateAppState = {
    product_type?: string;
    account_type?: string;
    wallet?: string;
};

const Template: Story<WizardProps> = (args) => {
    const [is_wizard_open, setIsWizardOpen] = useState(true);
    const [create_app_state, setCreateAppState] = useState<CreateAppState>({});
    const [current_step, setCurrentStep] = useState<number>();
    const [current_step_key, setCurrentStepKey] = useState<string>();

    const onWizardOpening = () => {
        setIsWizardOpen(true);
    };

    const handleComplete = () => {
        setCreateAppState({});
        setIsWizardOpen(false);
    };

    const onChangeStep = (_current_step: number, _current_step_key?: string) => {
        setCurrentStep(_current_step);
        setCurrentStepKey(_current_step_key);
    };

    const updateCreateAppState = (new_state: Partial<CreateAppState>) => {
        setCreateAppState({
            ...create_app_state,
            ...new_state,
        });
    };

    const is_final_step = current_step_key === 'complete_step';

    return (
        <>
            {is_wizard_open ? (
                <Wizard
                    {...args}
                    onClose={() => setIsWizardOpen(false)}
                    onComplete={handleComplete}
                    wizard_title="Let's get you a new app."
                    primary_button_label={is_final_step ? 'Deposit' : 'Next'}
                    secondary_button_label={is_final_step ? 'Maybe later' : 'Back'}
                    onChangeStep={onChangeStep}
                >
                    <Wizard.Step title="Product" is_submit_disabled={!create_app_state.product_type}>
                        <StepChooseProductMain
                            product_type={create_app_state.product_type}
                            onSelect={(product_type: string) => updateCreateAppState({ product_type })}
                        />
                    </Wizard.Step>
                    <Wizard.Step
                        title="App"
                        is_submit_disabled={!create_app_state.account_type}
                        hide_steps_panel_in_mobile
                    >
                        <StepAddAppMain
                            account_type={create_app_state.account_type}
                            onSelect={(account_type: string) => updateCreateAppState({ account_type })}
                        />
                    </Wizard.Step>
                    <Wizard.Step title="Wallet" is_submit_disabled={!create_app_state.wallet} is_hidden>
                        <StepCreateWalletMain
                            wallet={create_app_state.wallet}
                            onSelect={(wallet: string) => updateCreateAppState({ wallet })}
                        />
                    </Wizard.Step>
                    <Wizard.Step title="Personal details" is_fullwidth>
                        <StepPersonalDetailsMain />
                    </Wizard.Step>
                    <Wizard.Step title="Address" is_fullwidth>
                        <StepAddressInfoMain />
                    </Wizard.Step>
                    <Wizard.Step title="Terms of use" is_fullwidth>
                        <StepTermsOfUseMain />
                    </Wizard.Step>
                    <Wizard.Step step_key="complete_step" title="Complete" is_fullwidth>
                        <StepComplete />
                    </Wizard.Step>
                    <Wizard.RightPanel>
                        <TestRightUpperComponent current_step_index={current_step} />
                        <TestRightMiddleComponent current_step_index={current_step} />
                        <TestRightLowerComponent current_step_index={current_step} />
                    </Wizard.RightPanel>
                </Wizard>
            ) : (
                <>
                    <Button onClick={onWizardOpening}>Open Wizard</Button>
                </>
            )}
        </>
    );
};

export const LightWizard = Template.bind({});
LightWizard.args = {
    has_dark_background: true,
    wizard_title: "Let's get you a new app.",
    lock_final_step: true,
    show_steps: true,
    show_header: false,
};
export const LightWizardWithoutDarkBackground = Template.bind({});
LightWizardWithoutDarkBackground.args = {
    has_dark_background: false,
    wizard_title: "Let's get you a new app.",
    lock_final_step: true,
    show_steps: true,
    show_header: false,
};

export const WizardWithoutLockedFinalStep = Template.bind({});
WizardWithoutLockedFinalStep.args = {
    has_dark_background: false,
    wizard_title: "Let's get you a new app.",
    show_steps: true,
    show_header: false,
};
