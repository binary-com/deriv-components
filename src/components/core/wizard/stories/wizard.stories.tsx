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
                <Wizard onClose={() => setIsWizardOpen(false)} {...args} />
            ) : (
                <Button onClick={() => setIsWizardOpen(true)}>Open Wizard</Button>
            )}
        </>
    );
};

export const LightAppWizard = Template.bind({});
LightAppWizard.args = {
    steps: test_steps,
    dark: false,
};
export const DarkAppWizard = Template.bind({});
DarkAppWizard.args = {
    steps: test_steps,
    dark: true,
};

export const LightWalletWizard = Template.bind({});
LightWalletWizard.args = {
    steps: test_steps,
    dark: false,
};
export const DarkWalletWizard = Template.bind({});
DarkWalletWizard.args = {
    steps: test_steps,
    dark: true,
};
