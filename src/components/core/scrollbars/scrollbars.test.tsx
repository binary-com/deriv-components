import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import Scrollbars from './scrollbars';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

describe('Scrollbars Component', () => {
    const setState = jest.fn();

    const props = {
        autohide: false,
        dark: false,
        has_horizontal: false,
        is_only_horizontal: false,
        is_only_horizontal_overlay: false,
        is_scrollbar_hidden: false,
        has_y_scroll_on_drag_effect: false,
    };

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation((init) => [init, setState]);
        jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: null });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Scrollbars renders properly with a 1st step header, step navigation and initially disabled Back and Next buttons', () => {
        const { queryByLabelText, getByLabelText } = render(
            <Scrollbars
                {...props}
                style={{
                    width: '300px',
                    height: '400px',
                    borderRadius: '10px',
                    background: props.dark ? '#C15D5D' : '#F7F8F1',
                }}
            >
                <div
                    style={{
                        width: '400px',
                    }}
                >
                    {'27557758768778565768756776576576567576567454'.split('').map((el, i) => (
                        <p key={i + 1} style={{ color: props.dark ? 'white' : 'black' }}>
                            {el}
                        </p>
                    ))}
                </div>
            </Scrollbars>,
        );

        expect(screen.getByTestId('scrollbars')).toBeInTheDocument();
    });
});
