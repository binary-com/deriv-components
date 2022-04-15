import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import DesktopWizard, { StepData } from './desktop-wizard';
import {
    StepAddAppMain,
    StepChooseProductMain,
    TestLongRightUpperComponent,
    TestRightMiddleComponent,
    TestRightUpperComponent,
} from './stories/steps/steps-content';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('DesktopWizard Component', () => {
    const setState = jest.fn();
    (useState as jest.Mock).mockImplementation((init) => [init, setState]);
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
    const animated_div_ref = React.useRef<HTMLDivElement>(null);

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
    ];

    const props = {
        dark: false,
        current_step: mocked_steps[0],
        animated_div_ref: animated_div_ref,
    };

    it('DesktopWizard.Body renders properly with the 1st step content', () => {
        render(<DesktopWizard.Body {...props} />);

        const body_heading = screen.getByTestId('body-heading');
        const toggle_switcher = screen.queryByTestId('toggle-switcher');
        const products = screen.getAllByTestId('product-card');

        expect(body_heading).toBeInTheDocument();
        expect(toggle_switcher).not.toBeInTheDocument();
        expect(screen.getByText('Choose a product')).toBeInTheDocument();
        expect(screen.getByText('Choose a product to start.')).toBeInTheDocument();
        expect(products.length).toBe(3);
    });

    it('DesktopWizard.Body renders properly with the 2nd step content', () => {
        render(<DesktopWizard.Body {...props} current_step={mocked_steps[1]} />);

        const body_heading = screen.getByTestId('body-heading');
        const toggle_switcher = screen.getByTestId('toggle-switcher');

        expect(body_heading).toBeInTheDocument();
        expect(toggle_switcher).toBeInTheDocument();
        expect(screen.getByText('Add an app')).toBeInTheDocument();
        expect(screen.getByText('Choose an app to start.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Real' })).toBeEnabled();
        expect(screen.getByRole('button', { name: 'Demo' })).toBeEnabled();
        expect(screen.getByRole('button', { name: /select a demo app/i })).toBeEnabled();
    });
});
