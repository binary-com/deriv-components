import { TItemsState } from '../wizard';
import { TestForm } from './steps-content';

export const test_steps: TItemsState[] = [
    {
        titles: {
            main_content_title: 'Choose a product',
            step_title: 'Product',
        },
        main_content: {
            component: TestForm,
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
            component: TestForm,
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
            component: TestForm,
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
            component: TestForm,
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
            component: TestForm,
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
            component: TestForm,
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
            component: TestForm,
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
            component: TestForm,
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
            component: TestForm,
            children: 'Submit',
            is_fullwidth: true,
        },
        cancel_button_name: 'Maybe later',
        submit_button_name: 'Deposit',
    },
];
