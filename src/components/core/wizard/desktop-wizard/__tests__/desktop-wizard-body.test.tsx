import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import DesktopWizard from '../desktop-wizard';
import DesktopWizardBody from '../desktop-wizard-body';
import { StepTermsOfUseMain } from '../stories/steps/steps-content';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('DesktopWizard Component', () => {
    const setState = jest.fn();
    (useState as jest.Mock).mockImplementation((init) => [init, setState]);
    jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
    const animated_div_ref = React.useRef<HTMLDivElement>(null);

    const props = {
        dark: false,
        animated_div_ref: animated_div_ref,
    };

    it('DesktopWizard.Body renders properly with the 1st step content', () => {
        render(
            <DesktopWizardBody
                current_step={
                    <DesktopWizard.Step title="Terms of use">
                        <StepTermsOfUseMain />
                    </DesktopWizard.Step>
                }
                {...props}
            />,
        );

        expect(screen.getByText('Jurisdiction and choice of law')).toBeInTheDocument();
    });
});
