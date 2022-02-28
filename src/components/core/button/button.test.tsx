import { render } from 'test-setup';
import Button from './button';

describe('Button Component', () => {
    it('Renders properly', () => {
        const button = render(<Button>Button</Button>);
        expect(button).toBeTruthy();
    });
    it('Renders children correctly', () => {
        const { container } = render(<Button>This is the button children</Button>);
        expect(container.textContent).toBe('This is the button children');
    });
});
