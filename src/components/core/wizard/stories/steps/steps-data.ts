import { StepData } from '../../desktop-wizard';
import {
    StepAddAppMain,
    StepAddressInfoMain,
    StepChooseCurrencyMain,
    StepChooseProductMain,
    StepComplete,
    StepCreateWalletMain,
    StepPersonalDetailsMain,
    StepTermsOfUseMain,
    TestLongRightUpperComponent,
    TestRightLowerComponent,
    TestRightMiddleComponent,
    TestRightUpperComponent,
} from './steps-content';

export const test_steps: StepData[] = [
    {
        step_title: 'Product',
        main_content: {
            component: StepChooseProductMain,
            header: 'Choose a product',
            subheader: 'Choose a product to start.',
        },
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'App',
        main_content: {
            component: StepAddAppMain,
            header: 'Add an app',
            subheader: 'Choose an app to start.',
        },
        right_panel_content: { upper_block: TestLongRightUpperComponent },
    },
    {
        step_title: 'Wallet',
        main_content: {
            component: StepCreateWalletMain,
            header: 'Create a wallet',
            subheader: 'Create a wallet that can be linked to your choosen app.',
        },
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
            lower_block: TestRightLowerComponent,
        },
    },
    {
        step_title: 'Currency',
        main_content: {
            component: StepChooseCurrencyMain,
            header: "Choose your wallet's currency",
            subheader: 'Fiat currencies.',
        },
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Personal details',
        main_content: {
            component: StepPersonalDetailsMain,
            header: 'Personal details',
        },
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Address',
        main_content: {
            component: StepAddressInfoMain,
            header: 'Address information',
        },
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Terms of use',
        main_content: {
            component: StepTermsOfUseMain,
            header: 'Terms of use',
        },
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Complete',
        main_content: {
            component: StepComplete,
            header: 'Completed',
        },
        is_fullwidth: true,
        cancel_button_name: 'Maybe later',
        submit_button_name: 'Deposit',
    },
];
