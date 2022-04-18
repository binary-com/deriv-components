import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import Button from '../../button/button';
import DesktopWizard, { DesktopWizardProps } from '../desktop-wizard';
import { test_steps } from './steps/steps-data';

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
                        cancel_button_label?: string;
                        submit_button_label?: string;
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
        cancel_button_label: {
            defaultValue: 'Back',
            description: 'Optional. Cancel button label',
            control: {
                type: 'text',
            },
        },
        submit_button_label: {
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
};

const Template: Story<DesktopWizardProps> = (args) => {
    const [is_wizard_open, setIsWizardOpen] = useState(true);
    const [product_type, setProductType] = useState('');

    console.log('Template render');

    const onWizardOpening = () => {
        setIsWizardOpen(true);
    };

    const handleComplete = () => {
        setIsWizardOpen(false);
    };

    const updateState = (product_type: string) => {
        setProductType(product_type);
    };

    const test_steps: StepData[] = [
        {
            step_title: 'Product',
            main_content: {
                component: <></>,
                header: 'Choose a product',
                subheader: 'Choose a product to start.',
            },
            // right_panel_content: {
            //     upper_block: TestRightUpperComponent,
            //     middle_block: TestRightMiddleComponent,
            // },
        },
        // {
        //     step_title: 'App',
        //     main_content: {
        //         component: StepAddAppMain,
        //         header: 'Add an app',
        //         subheader: 'Choose an app to start.',
        //     },
        //     right_panel_content: { upper_block: TestLongRightUpperComponent },
        // },
        // {
        //     step_title: 'Wallet',
        //     main_content: {
        //         component: StepCreateWalletMain,
        //         header: 'Create a wallet',
        //         subheader: 'Create a wallet that can be linked to your choosen app.',
        //     },
        //     right_panel_content: {
        //         upper_block: TestRightUpperComponent,
        //         middle_block: TestRightMiddleComponent,
        //         lower_block: TestRightLowerComponent,
        //     },
        // },
        // {
        //     step_title: 'Currency',
        //     main_content: {
        //         component: StepChooseCurrencyMain,
        //         header: "Choose your wallet's currency",
        //         subheader: 'Fiat currencies.',
        //     },
        //     right_panel_content: {
        //         upper_block: TestRightUpperComponent,
        //         middle_block: TestRightMiddleComponent,
        //     },
        // },
        // {
        //     step_title: 'Personal details',
        //     main_content: {
        //         component: StepPersonalDetailsMain,
        //         header: 'Personal details',
        //     },
        //     right_panel_content: {
        //         upper_block: TestRightUpperComponent,
        //         middle_block: TestRightMiddleComponent,
        //     },
        // },
        // {
        //     step_title: 'Address',
        //     main_content: {
        //         component: StepAddressInfoMain,
        //         header: 'Address information',
        //     },
        //     right_panel_content: {
        //         upper_block: TestRightUpperComponent,
        //         middle_block: TestRightMiddleComponent,
        //     },
        // },
        // {
        //     step_title: 'Terms of use',
        //     main_content: {
        //         component: StepTermsOfUseMain,
        //         header: 'Terms of use',
        //     },
        //     right_panel_content: {
        //         upper_block: TestRightUpperComponent,
        //         middle_block: TestRightMiddleComponent,
        //     },
        // },
        // {
        //     step_title: 'Complete',
        //     main_content: {
        //         component: StepComplete,
        //         header: 'Completed',
        //     },
        //     is_fullwidth: true,
        //     cancel_button_label: 'Maybe later',
        //     submit_button_label: 'Deposit',
        // },
    ];

    return (
        <>
            {is_wizard_open ? (
                <DesktopWizard
                    steps={test_steps}
                    onClose={() => setIsWizardOpen(false)}
                    onComplete={handleComplete}
                    component={<StepChooseProductMain product_type={product_type} onSelect={updateState} />}
                    wizard_title="Let's get you a new app."
                />
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
export const DarkDesktopAppWizard = Template.bind({});
DarkDesktopAppWizard.args = {
    dark: true,
    has_dark_background: true,
    wizard_title: "Let's get you a new app.",
};
export const DarkDesktopAppWizardWithoutDarkBackground = Template.bind({});
DarkDesktopAppWizardWithoutDarkBackground.args = {
    dark: true,
    has_dark_background: false,
    wizard_title: "Let's get you a new app.",
};
