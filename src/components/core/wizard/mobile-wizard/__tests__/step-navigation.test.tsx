import { render, screen } from 'test-setup';
import { StepNavigationProps } from '@core/wizard/types';
import StepNavigation from '../step-navigation';

describe('StepNavigation Component', () => {
    const props: StepNavigationProps = {
        steps: [
            {
                title: 'Product',
            },
            {
                title: 'App',
            },
            {
                title: 'Complete',
            },
        ],
        current_step_index: 0,
        complete_steps_indexes: [],
        onClick: jest.fn(),
    };

    it('StepNavigation renders properly', () => {
        render(<StepNavigation {...props} />);

        const step_navigation = screen.getByTestId('step-navigation');
        const steps = screen.getAllByTestId('step-item');

        expect(step_navigation).toBeInTheDocument();
        expect(steps.length).toBe(1);
        expect(steps[0]).toHaveTextContent(/product/i);
    });
});
