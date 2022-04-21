import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Button from '../../../button/button';
import DesktopWizard, { DesktopWizardProps } from '../desktop-wizard';
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
    title: 'DesktopWizard',
    component: DesktopWizard,
    parameters: { controls: { sort: 'alpha' } },
    argTypes: {
        dark: {
            description: 'Optional. If set to `true`, the wizard will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: false },
            },
        },
        has_dark_background: {
            description:
                'Optional. If set to false`, the wizard will be displayed without dark background surrounding it.',
            defaultValue: true,
            table: {
                type: { summary: 'boolean | undefined' },
                defaultValue: { summary: true },
            },
        },
        onComplete: {
            description:
                'Required. A callback triggered on the last step and used to send collected data to a parent together with the clicked button name providing opportunity to choose what to do with the received data depending on the button. ' +
                'Data object contains values collected for each step index starting with 0, e.g.: {"0":{"selected_product":"multipliers"},"1":{"selected_app":"real_mt5_financial"},"2":{"wallet_name":"BTC"}, ...}. ' +
                'Collected values are the values you submit using onSubmit() inside child components that you add to the steps as main content or right panel content.',
            table: {
                type: { summary: '(data: { [key: string]: { [key: string]: unknown } }, button_name: string) => void' },
            },
        },
        onClose: {
            description: 'Required. A callback used to inform a parent that the wizard has been closed.',
            table: {
                type: { summary: '() => void' },
            },
        },
        steps: {
            description: `Required. An array of objects containing the list of steps to render in the wizard. Please refer to the acceptable type below. Please note that right_panel_content.lower_block is absolutely positioned against the right panel bottom.
                Below are also mentioned the types of child components' props.`,
            table: {
                type: {
                    summary: `**STEPS: ** Array<{
                        step_title: string;
                        main_content?: {
                            component: (props: MainComponentProps) => JSX.Element;
                            header?: string;
                            subheader?: string;
                        }
                        right_panel_content?: {
                            upper_block?: (props: RightPanelComponentProps) => JSX.Element;
                            middle_block?: (props: RightPanelComponentProps) => JSX.Element;
                            lower_block?: (props: RightPanelComponentProps) => JSX.Element;
                        };
                        is_fullwidth?: boolean;
                        secondary_button_label?: string;
                        primary_button_label?: string;
                    }>
                    **MAIN COMPONENT PROPS: {
                        dark?: boolean;
                        onSubmit: (
                            values?: { [key: string]: unknown },
                        ) => void;
                        values?: { [key: string]: unknown };
                    };
                    **RIGHT PANEL COMPONENT PROPS: ** {
                        data: { [key: string]: { [key: string]: unknown } };
                        dark?: boolean;
                        current_step_index: number;
                    };
                    **TOGGLE SWITCHER PROPS: ** {
                        button_labels?: string[];
                        dark?: boolean;
                        defaultValue: string;
                        onToggle: (value: string) => void;
                    };`,
                },
                defaultValue: { summary: '[{...}]' },
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
    },
} as Meta<DesktopWizardProps>;

type CreateAppState = {
    product_type?: string;
    account_type?: string;
    wallet?: string;
};

const Template: Story<DesktopWizardProps> = (args) => {
    const [is_wizard_open, setIsWizardOpen] = useState(true);
    const [create_app_state, setCreateAppState] = useState<CreateAppState>({});
    const [current_step, setCurrentStep] = useState<number>();

    const onWizardOpening = () => {
        setIsWizardOpen(true);
    };

    const handleComplete = () => {
        setCreateAppState({});
        setIsWizardOpen(false);
    };

    const updateCreateAppState = (new_state: Partial<CreateAppState>) => {
        setCreateAppState({
            ...create_app_state,
            ...new_state,
        });
    };

    return (
        <>
            {is_wizard_open ? (
                <DesktopWizard
                    onClose={() => setIsWizardOpen(false)}
                    onComplete={handleComplete}
                    wizard_title="Let's get you a new app."
                    primary_button_label="Next"
                    secondary_button_label="Back"
                    onChangeStep={setCurrentStep}
                    lock_final_step
                    {...args}
                >
                    <DesktopWizard.Step title="Product" is_submit_disabled={!create_app_state.product_type}>
                        <StepChooseProductMain
                            product_type={create_app_state.product_type}
                            onSelect={(product_type: string) => updateCreateAppState({ product_type })}
                        />
                    </DesktopWizard.Step>
                    <DesktopWizard.Step title="App" is_submit_disabled={!create_app_state.account_type}>
                        <StepAddAppMain
                            account_type={create_app_state.account_type}
                            onSelect={(account_type: string) => updateCreateAppState({ account_type })}
                        />
                    </DesktopWizard.Step>
                    <DesktopWizard.Step title="Wallet" is_submit_disabled={!create_app_state.wallet}>
                        <StepCreateWalletMain
                            wallet={create_app_state.wallet}
                            onSelect={(wallet: string) => updateCreateAppState({ wallet })}
                        />
                    </DesktopWizard.Step>
                    <DesktopWizard.Step title="Personal details">
                        <StepPersonalDetailsMain />
                    </DesktopWizard.Step>
                    <DesktopWizard.Step title="Address">
                        <StepAddressInfoMain />
                    </DesktopWizard.Step>
                    <DesktopWizard.Step title="Terms of use">
                        <StepTermsOfUseMain />
                    </DesktopWizard.Step>
                    <DesktopWizard.Step
                        title="Complete"
                        primary_button_label="Deposit"
                        secondary_button_label="Maybe later"
                    >
                        <StepComplete />
                    </DesktopWizard.Step>
                    <DesktopWizard.RightPanel>
                        <TestRightUpperComponent current_step_index={current_step} />
                        <TestRightMiddleComponent current_step_index={current_step} />
                        <TestRightLowerComponent current_step_index={current_step} />
                    </DesktopWizard.RightPanel>
                </DesktopWizard>
            ) : (
                <>
                    <Button onClick={onWizardOpening}>Open Desktop Wizard</Button>
                </>
            )}
        </>
    );
};

export const LightDesktopAppWizard = Template.bind({});
LightDesktopAppWizard.args = {
    dark: false,
    has_dark_background: true,
    wizard_title: "Let's get you a new app.",
};
export const LightDesktopAppWizardWithoutDarkBackground = Template.bind({});
LightDesktopAppWizardWithoutDarkBackground.args = {
    dark: false,
    has_dark_background: false,
    wizard_title: "Let's get you a new app.",
};

export const DesktopWizardWithoutLockedFinalStep = Template.bind({});
DesktopWizardWithoutLockedFinalStep.args = {
    dark: false,
    has_dark_background: false,
    wizard_title: "Let's get you a new app.",
    lock_final_step: false,
};
