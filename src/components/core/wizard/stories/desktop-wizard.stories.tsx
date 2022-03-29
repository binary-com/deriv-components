import { Meta, Story } from '@storybook/react';
import DesktopWizard, { DesktopWizardProps } from '../desktop-wizard';
import Button from '../../button/button';
import { useState } from 'react';
import { test_steps } from '../steps/steps-data';

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
        toggleWizard: {
            description: 'Required. A callback used to inform a parent that the wizard has been closed or open.',
            table: {
                type: { summary: '() => void' },
            },
        },
        steps: {
            description:
                'Required. An array of objects containing the list of steps to render in the wizard. Please refer to the acceptable type below. Please note that right_panel_content.lower_block is absolutely positioned against the right panel bottom.',
            table: {
                type: {
                    summary: `Array<{
                        step_title: string;
                        toggle_switcher_buttons?: string[];
                        main_content_header: string;
                        subheader?: string;
                        main_content?: (props: { [key: string]: unknown }) => JSX.Element;
                        more_details?: {
                            [key: string]: {
                                header?: string;
                                subheader?: string;
                            };
                        };
                        right_panel_content?: {
                            upper_block?: (props: { [key: string]: unknown }) => JSX.Element;
                            middle_block?: (props: { [key: string]: unknown }) => JSX.Element;
                            lower_block?: (props: { [key: string]: unknown }) => JSX.Element;
                        };
                        is_fullwidth?: boolean;
                        cancel_button_name?: string;
                        submit_button_name?: string;
                    }>`,
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
    },
} as Meta<DesktopWizardProps>;

const Template: Story<DesktopWizardProps> = (args) => {
    const [is_wizard_open, setIsWizardOpen] = useState(true);
    const [data, setData] = useState('');
    const [button_name, setButtonName] = useState('');

    const onWizardOpening = () => {
        setIsWizardOpen(true);
        setData('');
        setButtonName('');
    };

    const handleComplete = (data: { [key: string]: { [key: string]: unknown } }, button_name: string) => {
        setIsWizardOpen(false);
        setData(JSON.stringify(data));
        setButtonName(button_name);
    };

    return (
        <>
            {is_wizard_open ? (
                <DesktopWizard {...args} toggleWizard={() => setIsWizardOpen(false)} onComplete={handleComplete} />
            ) : (
                <>
                    <Button onClick={onWizardOpening}>Open Desktop Wizard</Button>
                    <div>Collected data are: {data}</div>
                    <div>A clicked button name is: {button_name}</div>
                </>
            )}
        </>
    );
};

export const LightDesktopAppWizard = Template.bind({});
LightDesktopAppWizard.args = {
    dark: false,
    has_dark_background: true,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
export const LightDesktopAppWizardWithoutDarkBackground = Template.bind({});
LightDesktopAppWizardWithoutDarkBackground.args = {
    dark: false,
    has_dark_background: false,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
export const DarkDesktopAppWizard = Template.bind({});
DarkDesktopAppWizard.args = {
    dark: true,
    has_dark_background: true,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
export const DarkDesktopAppWizardWithoutDarkBackground = Template.bind({});
DarkDesktopAppWizardWithoutDarkBackground.args = {
    dark: true,
    has_dark_background: false,
    steps: test_steps,
    wizard_title: "Let's get you a new app.",
};
