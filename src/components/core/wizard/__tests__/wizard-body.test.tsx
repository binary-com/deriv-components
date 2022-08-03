import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import Wizard from '../wizard';
import DesktopWizardBody from '../desktop-wizard/desktop-wizard-body';
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
        animated_div_ref: animated_div_ref,
    };

    it('MobileWizard.Body renders properly with the 1st step content', () => {
        render(
            <DesktopWizardBody
                current_step={
                    <Wizard.Step title="Terms of use">
                        <StepTermsOfUseMain />
                    </Wizard.Step>
                }
                {...props}
            />,
        );

        expect(screen.getByText('Jurisdiction and choice of law')).toBeInTheDocument();
    });
});
