import React from 'react';
import { render } from 'test-setup';
import Button from './button';

describe('Button Component', () => {
    it('Renders properly', () => {
        const button = render(<Button />);
        expect(button).toBeTruthy();
    });
});
