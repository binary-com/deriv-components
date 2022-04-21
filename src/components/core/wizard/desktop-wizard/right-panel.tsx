import React from 'react';
import Scrollbars from '@core/scrollbars/scrollbars';
import { styled } from '@stitches/react';

export type RightPanelProps = {
    is_hidden?: boolean;
    children: React.ReactElement | React.ReactElement[];
};

const RightPanelContainer = styled('div', {
    width: '312px',
    height: '568px',
    padding: '48px 24px 24px',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    borderLeft: '2px solid #F2F3F4',

    variants: {
        dark: {
            true: {
                borderLeft: '2px solid #323738',
            },
        },
    },
});

const RightPanel = ({ children, is_hidden }: RightPanelProps) => {
    if (is_hidden) return null;

    return (
        <RightPanelContainer>
            <Scrollbars is_scrollbar_hidden has_y_scroll_on_drag_effect>
                {children}
            </Scrollbars>
        </RightPanelContainer>
    );
};

export default RightPanel;
