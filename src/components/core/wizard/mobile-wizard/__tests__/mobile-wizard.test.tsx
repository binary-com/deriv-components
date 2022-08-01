import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import Wizard from '../../wizard';
import {
    StepAddAppMain,
    StepChooseProductMain,
    StepComplete,
    TestRightUpperComponent,
} from '../../stories/steps/steps-content';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('MobileWizard Component', () => {
    const setState = jest.fn();

    const props = {
        dark: false,
        has_dark_background: true,
        onClose: jest.fn(),
        onComplete: jest.fn(),
        wizard_title: "Let's get you a new app.",
        primary_button_label: 'Next',
        secondary_button_label: 'Back',
    };

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation((init) => [init, setState]);
        jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('MobileWizard renders properly with a 1st step header, step navigation and initially disabled Back and Next buttons', () => {
        render(
            <Wizard {...props}>
                <Wizard.Step title="Product" is_submit_disabled={true}>
                    <StepChooseProductMain product_type={'cfd'} onSelect={jest.fn} />
                </Wizard.Step>
                <Wizard.Step title="Complete">
                    <StepComplete />
                </Wizard.Step>
            </Wizard>,
        );

        const products = screen.getAllByTestId('product-card');

        expect(screen.getByTestId('mobile-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.queryByText("Let's get you a new wallet.")).not.toBeInTheDocument();
        expect(screen.getByTestId('step-navigation')).toBeInTheDocument();
        expect(screen.getAllByTestId('step-item').length).toBe(2);
        expect(products.length).toBe(3);
        expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('MobileWizard Next button is enabled when a product is selected on the 1st step', () => {
        // mocking useState values in the order of declaration: current_step_index: 0, complete_steps_indexes: [0]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([0, () => {}])
            .mockReturnValueOnce([[0], () => {}]);

        render(
            <Wizard {...props}>
                <Wizard.Step title="Product" is_submit_disabled={false}>
                    <StepChooseProductMain product_type={'cfd'} onSelect={jest.fn} />
                </Wizard.Step>
                <Wizard.Step title="Complete">
                    <StepComplete />
                </Wizard.Step>
            </Wizard>,
        );

        const products = screen.getAllByTestId('product-card');

        expect(products.length).toBe(3);
        expect(screen.getByTestId('mobile-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText(/A very long content for scroll/i)).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2);
        expect(screen.getByRole('button', { name: /back/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    });

    it('MobileWizard renders the 2nd step properly with a header, step navigation and initially disabled Next button', () => {
        // mocking useState values in the order of declaration: current_step_index: 1, complete_steps_indexes: [0]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([1, () => {}])
            .mockReturnValueOnce([[0], () => {}]);

        render(
            <Wizard {...props}>
                <Wizard.Step title="Product" is_submit_disabled={false}>
                    <StepChooseProductMain product_type={'cfd'} onSelect={jest.fn} />
                </Wizard.Step>
                <Wizard.Step title="App" is_submit_disabled={true}>
                    <StepAddAppMain account_type={'demo'} onSelect={jest.fn} />
                </Wizard.Step>
            </Wizard>,
        );

        expect(screen.getByTestId('mobile-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText(/Selected account type/i)).toBeInTheDocument();
        expect(screen.getByTestId('step-navigation')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /back/i })).toBeEnabled();
        expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    });

    it('MobileWizard: Long upper test blocks on the right panel displays a current step index', () => {
        // mocking useState values in the order of declaration: current_step_index: 1, complete_steps_indexes: [0, 1]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([0, () => {}])
            .mockReturnValueOnce([[0, 0], () => {}]);

        render(
            <Wizard {...props}>
                <Wizard.Step title="Product" is_submit_disabled={false}>
                    <StepChooseProductMain product_type={'cfd'} onSelect={jest.fn} />
                </Wizard.Step>
                <Wizard.RightPanel>
                    <TestRightUpperComponent current_step_index={1} />
                </Wizard.RightPanel>
            </Wizard>,
        );

        expect(screen.getByTestId('mobile-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getAllByText(/current_step_index is: 1/i).length).toBe(1);
    });

    it('MobileWizard "Complete" Step: Step is displayed fullwidth without right panel, and both buttons are enabled ', () => {
        // mocking useState values in the order of declaration: current_step_index: 2, complete_steps_indexes: [0, 1]:
        jest.spyOn(React, 'useState')
            .mockReturnValueOnce([1, () => {}])
            .mockReturnValueOnce([[0, 1], () => {}]);

        render(
            <Wizard {...props}>
                <Wizard.Step title="Product" is_submit_disabled={false}>
                    <StepChooseProductMain product_type={'cfd'} onSelect={jest.fn} />
                </Wizard.Step>
                <Wizard.Step title="Complete" is_fullwidth>
                    <StepComplete />
                </Wizard.Step>
                <Wizard.RightPanel>
                    <TestRightUpperComponent current_step_index={1} />
                </Wizard.RightPanel>
            </Wizard>,
        );

        expect(screen.getByTestId('mobile-wizard')).toBeInTheDocument();
        expect(screen.getByText("Let's get you a new app.")).toBeInTheDocument();
        expect(screen.getByText(/You can now use your USD wallet/i)).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toBe(2);
        expect(screen.queryAllByText(/current_step_index is: 1/i).length).toBe(0);
    });
});
