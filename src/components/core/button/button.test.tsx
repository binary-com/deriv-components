import { render, screen, fireEvent } from 'test-setup';
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
    it('Should be clickable by default', () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Button</Button>);
        fireEvent.click(screen.getByText(/Button/i));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('Shoule not be clickable when disabled', () => {
        const onClick = jest.fn();
        render(
            <Button onClick={onClick} disabled>
                Button
            </Button>,
        );
        fireEvent.click(screen.getByText(/Button/i));
        expect(onClick).toHaveBeenCalledTimes(0);
    });
});
