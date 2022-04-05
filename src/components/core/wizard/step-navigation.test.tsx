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
    ToggleSwitcherComponent,
} from './stories/steps/steps-content';

describe('StepNavigation Component', () => {
    const mocked_steps: StepData[] = [
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
            main_content: StepAddAppMain,
            right_panel_content: { upper_block: TestLongRightUpperComponent },
            toggle_switcher: {
                component: ToggleSwitcherComponent,
                defaultValue: 'real',
                button_labels: ['Real', 'Demo'],
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

        const steps = screen.getByTestId('step-navigation');

        expect(steps).toBeInTheDocument();
        expect(screen.getAllByTestId('step-item').length).toBe(3);
        expect(steps).toHaveTextContent(/product/i);
        expect(steps).toHaveTextContent(/app/i);
        expect(steps).toHaveTextContent(/complete/i);
    });
});
