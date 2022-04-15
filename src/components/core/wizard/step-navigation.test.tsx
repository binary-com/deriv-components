import { render, screen } from 'test-setup';
import { StepData } from './desktop-wizard';
import StepNavigation from './step-navigation';
import {
    StepAddAppMain,
    StepChooseProductMain,
    StepComplete,
    TestLongRightUpperComponent,
    TestRightMiddleComponent,
    TestRightUpperComponent,
} from './stories/steps/steps-content';

describe('StepNavigation Component', () => {
    const mocked_steps: StepData[] = [
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

    const props = {
        dark: false,
        steps: mocked_steps,
        current_step_index: 0,
        complete_steps_indexes: [],
        disabled_steps_indexes: [],
        onClick: jest.fn(),
    };

    it('StepNavigation renders properly', () => {
        render(<StepNavigation {...props} />);

        const step_navigation = screen.getByTestId('step-navigation');
        const steps = screen.getAllByTestId('step-item');

        expect(step_navigation).toBeInTheDocument();
        expect(steps.length).toBe(3);
        expect(steps[0]).toHaveTextContent(/product/i);
        expect(steps[1]).toHaveTextContent(/app/i);
        expect(steps[2]).toHaveTextContent(/complete/i);
    });
});
