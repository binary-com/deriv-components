import type * as Stitches from '@stitches/react';
import React from 'react';
import { styled } from 'Styles/stitches.config';

const ScrollbarsContainer = styled('div', {
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: '100%',
    marginRight: '-14px',
    paddingRight: '10px',
    scrollBehavior: 'smooth',

    '&::-webkit-scrollbar': {
        width: '4px',
        height: '4px',
        backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        borderRadius: '4px',
        backgroundColor: '#D6DADB',
        opacity: '0.16',
    },

    variants: {
        dark: {
            true: {
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#333333',
                },
            },
        },
        autohide: {
            true: {
                '&::-webkit-scrollbar-thumb': {
                    display: 'none',

                    '&:hover': {
                        display: 'unset',
                    },
                },
            },
        },
        has_horizontal: {
            true: {
                overflowX: 'auto',
            },
        },
        is_scrollbar_hidden: {
            true: {
                marginRight: '0',
                paddingRight: '0',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            },
        },
        is_only_horizontal: {
            true: {
                marginRight: '0',
                paddingRight: '0',
                overflowY: 'hidden',
                overflowX: 'auto',
            },
        },
        is_only_horizontal_overlay: {
            true: {
                marginRight: '0',
                paddingRight: '0',
                overflowY: 'hidden',
                overflowX: 'overlay',
            },
        },
    },
    defaultVariants: {
        dark: false,
        autohide: false,
        has_horizontal: false,
        is_only_horizontal: false,
        is_only_horizontal_overlay: false,
        is_scrollbar_hidden: false,
    },
});

export type ScrollbarsProps = {
    dark?: boolean;
    autohide?: boolean;
    children?: React.ReactNode | React.ReactNode[];
    has_horizontal?: boolean;
    is_only_horizontal?: boolean;
    is_only_horizontal_overlay?: boolean;
    is_scrollbar_hidden?: boolean;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
    style?: Stitches.CSS;
    has_y_scroll_on_drag_effect?: boolean;
};

const Scrollbars = React.forwardRef(
    ({ children, has_y_scroll_on_drag_effect, style, ...props }: ScrollbarsProps, ref) => {
        const scroll_ref = (ref as React.RefObject<HTMLDivElement>) || React.useRef<HTMLDivElement>(null);
        const [is_mouse_down, setIsMouseDown] = React.useState(false);
        const [start_clientY, setStartClientY] = React.useState<number | undefined>(undefined);
        const [current_clientY, setCurrentClientY] = React.useState<number | undefined>(undefined);

        const scrollYAxisOnDrag: React.MouseEventHandler<HTMLDivElement> = (e) => {
            if (!has_y_scroll_on_drag_effect) return;
            if (e.type === 'mousedown') {
                setIsMouseDown(true);
                setStartClientY(e.clientY);
            } else if (e.type === 'mousemove' && is_mouse_down && scroll_ref.current) {
                setCurrentClientY(e.clientY);
            } else if (e.type === 'mouseup') {
                setIsMouseDown(false);
            }
            if (scroll_ref.current && is_mouse_down && current_clientY && start_clientY) {
                scroll_ref.current.scrollTop -= current_clientY - start_clientY;
            }
        };

        return (
            <>
                <ScrollbarsContainer
                    {...props}
                    css={style}
                    onMouseDown={scrollYAxisOnDrag}
                    onMouseUp={scrollYAxisOnDrag}
                    onMouseMove={scrollYAxisOnDrag}
                    ref={scroll_ref}
                >
                    {children}
                </ScrollbarsContainer>
            </>
        );
    },
);

export default Scrollbars;
