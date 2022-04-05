import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import DesktopWizard, { StepData } from './desktop-wizard';
import {
    StepAddAppMain,
    StepChooseProductMain,
    StepComplete,
    TestLongRightUpperComponent,
    TestRightMiddleComponent,
    TestRightUpperComponent,
    ToggleSwitcherComponent,
} from './stories/steps/steps-content';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('DesktopWizard Component', () => {
    const setState = jest.fn();

    const mocked_steps: StepData[] = [
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

    const props = {
        dark: false,
        has_dark_background: true,
        steps: mocked_steps,
        wizard_title: "Let's get you a new app.",
        onClose: jest.fn(),
        onComplete: jest.fn(),
    };

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation((init) => [init, setState]);
        jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('DesktopWizard renders properly with a 1st step header, step navigation and initially disabled Back and Next buttons', () => {
        render(<DesktopWizard {...props} />);

        const products = screen.getAllByTestId('product-card');

        expect(screen.getByTestId('desktop-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.queryByText("Let's get you a new wallet.")).not.toBeInTheDocument();
        expect(screen.getByTestId('step-navigation')).toBeInTheDocument();
        expect(screen.getAllByTestId('step-item').length).toBe(3);
        expect(products.length).toBe(3);
        expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('DesktopWizard Next button is enabled when a product is selected on the 1st step', () => {
        // mocking useState values in the order of declaration: current_step_index: 0, complete_steps_indexes: [0]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([0, () => {}])
            .mockReturnValueOnce([[0], () => {}]);

        render(<DesktopWizard {...props} />);

        const products = screen.getAllByTestId('product-card');

        expect(products.length).toBe(3);
        expect(screen.getByTestId('desktop-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText('Choose a product')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2);
        expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    });

    it('DesktopWizard renders the 2nd step properly with a header, step navigation and initially disabled Next button', () => {
        // mocking useState values in the order of declaration: current_step_index: 1, complete_steps_indexes: [0]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([1, () => {}])
            .mockReturnValueOnce([[0], () => {}]);

        render(<DesktopWizard {...props} />);

        expect(screen.getByTestId('desktop-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText('Add an app')).toBeInTheDocument();
        expect(screen.getByTestId('step-navigation')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Real' })).toBeEnabled();
        expect(screen.getByRole('button', { name: 'Demo' })).toBeEnabled();
        expect(screen.getByRole('button', { name: /back/i })).toBeEnabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /select a real app/i })).toBeEnabled();
    });

    it('DesktopWizard Next button is enabled when a real app is selected on the 2nd step', () => {
        // mocking useState values in the order of declaration: current_step_index: 1, complete_steps_indexes: [0, 1]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([1, () => {}])
            .mockReturnValueOnce([[0, 1], () => {}]);

        render(<DesktopWizard {...props} />);

        expect(screen.getByTestId('desktop-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText('Add an app')).toBeInTheDocument();
        expect(screen.getByTestId('step-navigation')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Real' })).toBeEnabled();
        expect(screen.getByRole('button', { name: 'Demo' })).toBeEnabled();
        expect(screen.getByRole('button', { name: /back/i })).toBeEnabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    });

    it('DesktopWizard Step 2: Long upper test blocks on the right panel displays a current step index', () => {
        // mocking useState values in the order of declaration: current_step_index: 1, complete_steps_indexes: [0, 1]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([1, () => {}])
            .mockReturnValueOnce([[0, 1], () => {}]);

        render(<DesktopWizard {...props} />);

        expect(screen.getByTestId('desktop-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText('Add an app')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(5);
        expect(screen.getAllByText(/current_step_index is: 1/i).length).toBe(1);
    });

    it('DesktopWizard "Complete" Step: Step is displayed fullwidth without right panel, and both buttons are enabled ', () => {
        // mocking useState values in the order of declaration: current_step_index: 2, complete_steps_indexes: [0, 1]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([2, () => {}])
            .mockReturnValueOnce([[0, 1], () => {}]);

        render(<DesktopWizard {...props} />);

        expect(screen.getByTestId('desktop-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText('Completed')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2);
        expect(screen.queryAllByText(/current_step_index is: 1/i).length).toBe(0);
    });
});
