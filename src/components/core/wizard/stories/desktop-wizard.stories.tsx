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
        toggleWizard: {
            description: 'Required. A callback used to inform a parent that the wizard has been closed or open.',
            table: {
                type: { summary: '() => void' },
            },
        },
        steps: {
            description:
                'Required. An array of objects containing the list of steps to render in the wizard. Please refer to the acceptable type below.',
            table: {
                type: {
                    summary: `Array<{
                        step_title: string;
                        toggle_switcher_buttons?: string[];
                        main_content_header: string;
                        subheader?: string;
                        main_content?: React.FC<{ [key: string]: unknown }> & React.ReactNode;
                        more_info_header?: string;
                        more_info_subheader?: string;
                        right_panel_upper_block?: string | (React.FC<{ [key: string]: unknown }> & React.ReactNode);
                        right_panel_lower_block?: string | (React.FC<{ [key: string]: unknown }> & React.ReactNode);
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

    return (
        <>
            {is_wizard_open ? (
                <DesktopWizard {...args} toggleWizard={() => setIsWizardOpen(false)} />
            ) : (
                <Button onClick={() => setIsWizardOpen(true)}>Open Desktop Wizard</Button>
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
