import { Meta, Story } from '@storybook/react';
import Wizard, { TWizardProps } from '../wizard';
import Button from '../../button/button';
import { useState } from 'react';
import { test_steps } from '../steps/steps-data';

export default {
    title: 'Wizard',
    component: Wizard,
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
        onClose: {
            description: 'Required. A callback used to inform a parent that the Wizard has been closed.',
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
                    titles: {
                    main_content_title: string;
                    step_title: string;
                };
                main_content?: {
                    component: React.FC<{[key: string]: unknown }> & React.ReactNode;
                    children?: string | React.FC<{[key: string]: unknown }> & React.ReactNode;
                    passthrough_props?: string[];
                    is_fullwidth?: boolean;
                };
                right_panel_content?: string | React.FC<{[key: string]: unknown }> & React.ReactNode;
                cancel_button_name?: string;
                submit_button_name?: string;
            }>`,
                },
                defaultValue: { summary: '[{}]' },
            },
        },
    },
} as Meta<TWizardProps>;

const Template: Story<TWizardProps> = (args) => {
    const [is_wizard_open, setIsWizardOpen] = useState<boolean>(true);

    return (
        <>
            {is_wizard_open ? (
                <Wizard {...args} onClose={() => setIsWizardOpen(false)} />
            ) : (
                <Button onClick={() => setIsWizardOpen(true)}>Open Wizard</Button>
            )}
        </>
    );
};

export const LightAppWizard = Template.bind({});
LightAppWizard.args = {
    dark: false,
    has_dark_background: true,
    steps: test_steps,
};
export const LightAppWizardWithoutDarkBackground = Template.bind({});
LightAppWizardWithoutDarkBackground.args = {
    dark: false,
    has_dark_background: false,
    steps: test_steps,
};
export const DarkAppWizard = Template.bind({});
DarkAppWizard.args = {
    dark: true,
    has_dark_background: true,
    steps: test_steps,
};

export const LightWalletWizard = Template.bind({});
LightWalletWizard.args = {
    dark: false,
    has_dark_background: true,
    steps: test_steps,
};
export const LightWalletWizardWithoutDarkBackground = Template.bind({});
LightWalletWizardWithoutDarkBackground.args = {
    dark: false,
    has_dark_background: false,
    steps: test_steps,
};
export const DarkWalletWizard = Template.bind({});
DarkWalletWizard.args = {
    dark: true,
    has_dark_background: true,
    steps: test_steps,
};
