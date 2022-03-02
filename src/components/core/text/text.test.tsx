import { render } from 'test-setup';
import Text from './text';

describe('Button Component', () => {
    it('Renders properly', () => {
        const button = render(<Text>Text</Text>);
        expect(button).toBeTruthy();
    });
    it('Renders children correctly', () => {
        const { container } = render(<Text>This is the text children</Text>);
        expect(container.textContent).toBe('This is the text children');
    });
});
