import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import MobileWizard from '../mobile-wizard';
import MobileWizardBody from '../mobile-wizard-body';
import { StepTermsOfUseMain } from '../stories/steps/steps-content';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('MobileWizard Component', () => {
    const setState = jest.fn();
    (useState as jest.Mock).mockImplementation((init) => [init, setState]);
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
    const animated_div_ref = React.useRef<HTMLDivElement>(null);

    const props = {
        dark: false,
        animated_div_ref: animated_div_ref,
    };

    it('MobileWizard.Body renders properly with the 1st step content', () => {
        render(
            <MobileWizardBody
                current_step={
                    <MobileWizard.Step title="Terms of use">
                        <StepTermsOfUseMain />
                    </MobileWizard.Step>
                }
                {...props}
            />,
        );

        expect(screen.getByText('Jurisdiction and choice of law')).toBeInTheDocument();
    });
});
