import React from 'react';
import Scrollbars from '@core/scrollbars/scrollbars';
import { styled } from '@stitches/react';
import { RightPanelProps } from '@core/wizard/types';

const TopPanel = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 24px',
    backgroundColor: '#F2F3F4',
    flex: 'none',
    alignSelf: 'stretch',
    flexGrow: '0',

    variants: {
        dark: {
            true: {
                backgroundColor: '#151717',
            },
        },
    },
});

const RightPanelContainer = styled('div', {
    width: 'inherit',
    height: 'inherit',
    padding: '48px 24px 24px',
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    borderLeft: '2px solid #F2F3F4',
    boxSizing: 'border-box',

    variants: {
        dark: {
            true: {
                borderLeft: '2px solid #323738',
            },
        },
    },
});

type RightPane = Partial<RightPanelProps> & {
    dark?: boolean;
    onScroll?: () => void;
};

const RightPanel = ({ children, dark, onScroll, is_hidden }: RightPane) => {
    const [top_panel_height, setTopPanelHeight] = React.useState('88px');
    const animated_div_ref = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (animated_div_ref.current?.scrollTop != 0) {
            setTopPanelHeight('45px');
        } else {
            setTopPanelHeight('88px');
        }
    };

    if (is_hidden) return null;

    return (
        <>
            <TopPanel style={{ height: `${top_panel_height}` }} dark={dark}></TopPanel>
            <RightPanelContainer>
                <Scrollbars
                    ref={animated_div_ref}
                    is_scrollbar_hidden
                    has_y_scroll_on_drag_effect
                    onScroll={handleScroll}
                >
                    {children}
                </Scrollbars>
            </RightPanelContainer>
        </>
    );
};

export default RightPanel;
