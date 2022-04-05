import React, { useState } from 'react';
import { render, screen } from 'test-setup';
import Scrollbars from './scrollbars';
import Text from '@core/text/text';

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

    it('Scrollbars renders properly', () => {
        render(
            <Scrollbars
                {...props}
                style={{
                    width: '300px',
                    height: '400px',
                    borderRadius: '10px',
                    background: props.dark ? '#C15D5D' : '#F7F8F1',
                }}
            >
                {'275577587687785657687567'.split('').map((el, i) => (
                    <Text
                        key={i + 1}
                        as="p"
                        bold={false}
                        css={{ color: props.dark ? 'white' : 'black', marginRight: '400px' }}
                    >
                        {el}
                    </Text>
                ))}
            </Scrollbars>,
        );

        expect(screen.getByTestId('scrollbars')).toBeInTheDocument();
    });
});
