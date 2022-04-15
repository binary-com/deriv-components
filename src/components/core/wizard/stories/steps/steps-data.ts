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
    ToggleSwitcherComponent,
} from './steps-content';

export const test_steps: StepData[] = [
    {
        step_title: 'Product',
        main_content: {
            component: StepChooseProductMain,
            header: 'Choose a product',
            subheader: 'Choose a product to start.',
            props_to_pass_through_wizard: ['dark'],
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
            props_to_pass_through_wizard: ['dark'],
        },
        right_panel_content: { upper_block: TestLongRightUpperComponent },
        toggle_switcher: {
            component: ToggleSwitcherComponent,
            defaultValue: 'real',
            button_labels: ['Real', 'Demo'],
        },
    },
    {
        step_title: 'Wallet',
        main_content: {
            component: StepCreateWalletMain,
            header: 'Create a wallet',
            subheader: 'Create a wallet that can be linked to your choosen app.',
            props_to_pass_through_wizard: ['dark'],
        },
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
        main_content: {
            component: StepChooseCurrencyMain,
            header: "Choose your wallet's currency",
            subheader: 'Fiat currencies.',
            props_to_pass_through_wizard: ['dark'],
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
            props_to_pass_through_wizard: ['dark'],
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
            props_to_pass_through_wizard: ['dark'],
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
            props_to_pass_through_wizard: ['dark'],
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
            props_to_pass_through_wizard: ['dark'],
        },
        is_fullwidth: true,
        cancel_button_name: 'Maybe later',
        submit_button_name: 'Deposit',
    },
];
