import { Meta, Story } from '@storybook/react';
import Wizard, { TItemsState, TWizardProps } from '../wizard';
import Button from '../../button/button';
import { styled } from '../../../../Styles/stitches.config';

type TFormProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Form: React.FC<TFormProps | { [key: string]: unknown | undefined }> = ({ onClick, children }) => {
    return (
        <div>
            <div>Form</div>
            <Button onClick={onClick}>{children}</Button>
        </div>
    );
};

const steps: TItemsState[] = [
    {
        titles: {
            main_content_title: 'Choose a product',
            step_title: 'Product',
        },
        main_content: {
            component: Form,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: 'Add an app',
            step_title: 'App',
        },
        main_content: {
            component: Form,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: 'Create a password',
            step_title: 'Password',
        },
        main_content: {
            component: Form,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: 'Create a wallet',
            step_title: 'Wallet',
        },
        main_content: {
            component: Form,
            children: 'Submit & Disable next step',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: "Choose your wallet's currency",
            step_title: 'Currency',
        },
        main_content: {
            component: Form,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: 'Personal details',
            step_title: 'Personal details',
        },
        main_content: {
            component: Form,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: 'Address information',
            step_title: 'Address',
        },
        main_content: {
            component: Form,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: 'Terms of use',
            step_title: 'Terms of use',
        },
        main_content: {
            component: Form,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    {
        titles: {
            main_content_title: 'Completed',
            step_title: 'Complete',
        },
        main_content: {
            component: Form,
            children: 'Submit',
            is_fullwidth: true,
        },
        cancel_button_name: 'Maybe later',
        submit_button_name: 'Deposit',
    },
];

const DarkBackgroundContainer = styled('div', {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.72)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

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
            description: 'Required. An array of objects containing the list of steps to render in the wizard.',
            table: {
                type: {
                    summary: `Array<{
                    titles: {
                    main_content_title: string;
                    step_title: string;
                };
                main_content?: {
                    component: React.FC<{[key: string]: unknown | undefined}> & React.ReactNode;
                    children?: string | React.FC<{[key: string]: unknown | undefined}> & React.ReactNode;
                    passthrough_props?: string[];
                    is_fullwidth?: boolean;
                };
                right_panel_content?: string | React.FC<{[key: string]: unknown | undefined}> & React.ReactNode;
                cancel_button_name?: string;
                submit_button_name?: string;
            }>`,
                },
                defaultValue: { summary: '[{}]' },
            },
        },
    },
} as Meta<TWizardProps>;

const TemplateWithBackground: Story<TWizardProps> = (args) => (
    <DarkBackgroundContainer>
        <Wizard {...args} />
    </DarkBackgroundContainer>
);

export const LightWithBackground = TemplateWithBackground.bind({});
LightWithBackground.args = {
    steps,
    dark: false,
};
export const DarkWithBackground = TemplateWithBackground.bind({});
DarkWithBackground.args = {
    steps,
    dark: true,
};

const TemplateWithoutBackground: Story<TWizardProps> = (args) => <Wizard {...args} />;

export const LightWithoutBackground = TemplateWithoutBackground.bind({});
LightWithoutBackground.args = {
    steps,
    dark: false,
};
export const DarkWithoutBackground = TemplateWithoutBackground.bind({});
DarkWithoutBackground.args = {
    steps,
    dark: true,
};
