import { StepData } from '../desktop-wizard';
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
        main_content_header: 'Choose a product',
        main_content_subheader: 'Choose a product to start.',
        main_content: StepChooseProductMain,
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'App',
        main_content_header: 'Add an app',
        main_content_subheader: 'Choose a product to start.',
        toggle_switcher_buttons: ['real', 'demo'],
        main_content: StepAddAppMain,
        right_panel_content: { upper_block: TestLongRightUpperComponent },
    },
    {
        step_title: 'Wallet',
        main_content_header: 'Create a wallet',
        main_content_subheader: 'Create a wallet that can be linked to your choosen app.',
        main_content: StepCreateWalletMain,
        more_details: {
            fiat_currency_wallets: {
                header: 'Fiat currency wallets',
                subheader: 'These are all the options you get when choosing fiat wallet.',
            },
            something_else: {
                header: 'Some additional info',
                subheader: 'Some extra details.',
            },
        },
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
            lower_block: TestRightLowerComponent,
        },
    },
    {
        step_title: 'Currency',
        main_content_header: "Choose your wallet's currency",
        main_content_subheader: 'Fiat currencies.',
        main_content: StepChooseCurrencyMain,
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Personal details',
        main_content_header: 'Personal details',
        main_content: StepPersonalDetailsMain,
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Address',
        main_content_header: 'Address information',
        main_content: StepAddressInfoMain,
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Terms of use',
        main_content_header: 'Terms of use',
        main_content: StepTermsOfUseMain,
        right_panel_content: {
            upper_block: TestRightUpperComponent,
            middle_block: TestRightMiddleComponent,
        },
    },
    {
        step_title: 'Complete',
        main_content_header: 'Completed',
        main_content: StepComplete,
        is_fullwidth: true,
        cancel_button_name: 'Maybe later',
        submit_button_name: 'Deposit',
    },
];
