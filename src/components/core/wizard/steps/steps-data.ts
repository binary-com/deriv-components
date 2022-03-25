import { TItemsState } from '../wizard';
import {
    StepAddAppMain,
    StepAddressInfoMain,
    StepChooseCurrencyMain,
    StepChooseProductMain,
    StepComplete,
    StepCreateWalletMain,
    StepPersonalDetailsMain,
    StepTermsOfUseMain,
    TestStepContent,
} from './steps-content';

type TStepsData = {
    [key: string]: {
        titles: {
            main_content_title: string;
            step_title?: string;
        };
        main_content?: {
            component?: React.FC<{ [key: string]: unknown }> & React.ReactNode;
            children?: string | (React.FC<{ [key: string]: unknown }> & React.ReactNode);
            passthrough_props?: string[];
            is_fullwidth?: boolean;
        };
        additional_steps?: string[];
        right_panel_content?: string | (React.FC<{ [key: string]: unknown }> & React.ReactNode);
        cancel_button_name?: string;
        submit_button_name?: string;
    };
};

// will apply this object later:
export const add_app_before_wallet_steps: TStepsData = {
    product: {
        titles: {
            main_content_title: 'Choose a product',
            step_title: 'Product',
        },
        main_content: {
            component: StepChooseProductMain,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    app: {
        titles: {
            main_content_title: 'Add an app',
            step_title: 'App',
        },
        main_content: {
            component: StepAddAppMain,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    wallet: {
        titles: {
            main_content_title: 'Create a wallet',
            step_title: 'Wallet',
        },
        main_content: {
            component: StepCreateWalletMain,
            children: 'Submit & Disable next step',
        },
        additional_steps: ['wallets_options'],
        right_panel_content: 'Some info',
    },
    currency: {
        titles: {
            main_content_title: "Choose your wallet's currency",
            step_title: 'Currency',
        },
        main_content: {
            component: StepChooseCurrencyMain,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    personal_details: {
        titles: {
            main_content_title: 'Personal details',
            step_title: 'Personal details',
        },
        main_content: {
            component: StepPersonalDetailsMain,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    address: {
        titles: {
            main_content_title: 'Address information',
            step_title: 'Address',
        },
        main_content: {
            component: StepAddressInfoMain,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    terms_of_use: {
        titles: {
            main_content_title: 'Terms of use',
            step_title: 'Terms of use',
        },
        main_content: {
            component: StepTermsOfUseMain,
            children: 'Submit',
        },
        right_panel_content: 'Some info',
    },
    complete: {
        titles: {
            main_content_title: 'Completed',
            step_title: 'Complete',
        },
        main_content: {
            component: StepComplete,
            children: 'Submit',
            is_fullwidth: true,
        },
        cancel_button_name: 'Maybe later',
        submit_button_name: 'Deposit',
    },
};

export const test_steps: TItemsState[] = [
    {
        titles: {
            main_content_title: 'Choose a product',
            step_title: 'Product',
        },
        main_content: {
            component: TestStepContent,
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
            component: StepAddAppMain,
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
            component: StepCreateWalletMain,
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
            component: StepChooseCurrencyMain,
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
            component: StepPersonalDetailsMain,
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
            component: StepAddressInfoMain,
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
            component: StepTermsOfUseMain,
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
            component: StepComplete,
            children: 'Submit',
            is_fullwidth: true,
        },
        cancel_button_name: 'Maybe later',
        submit_button_name: 'Deposit',
    },
];
