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
        toggleWizard: {
            description: 'Required. A callback used to inform a parent that the Wizard has been closed or open.',
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
    },
} as Meta<TWizardProps>;

const Template: Story<TWizardProps> = (args) => {
    const [is_wizard_open, setIsWizardOpen] = useState<boolean>(true);

    return (
        <>
            {is_wizard_open ? (
                <Wizard {...args} toggleWizard={() => setIsWizardOpen(false)} />
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
export const DarkAppWizardWithoutDarkBackground = Template.bind({});
DarkAppWizardWithoutDarkBackground.args = {
    dark: true,
    has_dark_background: false,
    steps: test_steps,
};
