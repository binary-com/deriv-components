import { Meta, Story } from '@storybook/react';
import React from 'react';
import Scrollbars, { ScrollbarsProps } from '../scrollbars';

export default {
    title: 'Scrollbars',
    component: Scrollbars,
    parameters: { controls: { sort: 'alpha' } },
    argTypes: {
        autohide: {
            description: "If set to `true` and there's content overflow, scrollbar thumb will be hidden until hovered.",
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        dark: {
            description: 'If set to `true`, scrollbar thumb color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        has_horizontal: {
            description:
                "If set to `true` and there's content overflow, horizontal scrollbar will appear in case of X-axis overflow.",
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        is_only_horizontal: {
            description:
                "If set to `true` and there's content overflow, horizontal scrollbar will appear in case of X-axis overflow but vertical scrollbar will not appear in case of Y-axis overflow.",
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        is_only_horizontal_overlay: {
            description:
                "If set to `true` and there's content overflow, horizontal scrollbar will appear on top of the content (not below it) in case of X-axis overflow.",
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        is_scrollbar_hidden: {
            description: "If set to `true` and there's content overflow, scrollbars will be hidden.",
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        onScroll: {
            description:
                'Optional. A callback that can be used in a parent to subscribe to the onScroll event fired in the Scrollbars component. Can be used together with "autohide" in order to define the moment of showing/hiding scrollbars.',
            table: {
                type: { summary: '(event: React.UIEvent<HTMLDivElement>) => void' },
            },
        },
        style: {
            description: 'An object with CSS styles for additional Scrollbars customization.',
            table: {
                type: { summary: 'Stitches.CSS' },
                defaultValue: { summary: {} },
            },
        },
        has_y_scroll_on_drag_effect: {
            description:
                "If set to `true` and there's content overflow, a feature of scrolling on Y axis by dragging the mouse will be enabled.",
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
    },
} as Meta<ScrollbarsProps>;

const BasicTemplate: Story<ScrollbarsProps> = (args) => (
    <Scrollbars
        {...args}
        style={{ width: '300px', height: '400px', borderRadius: '10px', background: args.dark ? '#C15D5D' : '#F7F8F1' }}
    >
        <div
            style={{
                width: '400px',
            }}
        >
            {'27557758768778565768756776576576567576567454'.split('').map((el, i) => (
                <p key={i + 1} style={{ color: args.dark ? 'white' : 'black' }}>
                    {el}
                </p>
            ))}
        </div>
    </Scrollbars>
);
const TemplateWithOnScroll: Story<ScrollbarsProps> = (args) => {
    const [should_show_scrollbar, setShouldShowScrollbar] = React.useState(false);
    let scroll_timeout: NodeJS.Timeout;

    const handleScroll = () => {
        clearTimeout(scroll_timeout);
        if (!should_show_scrollbar) {
            setShouldShowScrollbar(true);
            scroll_timeout = setTimeout(() => {
                setShouldShowScrollbar(false);
            }, 700);
        }
    };

    return (
        <Scrollbars
            {...args}
            onScroll={handleScroll}
            autohide={!should_show_scrollbar}
            style={{
                width: '300px',
                height: '400px',
                borderRadius: '10px',
                background: args.dark ? '#C15D5D' : '#F7F8F1',
            }}
        >
            <div
                style={{
                    width: '400px',
                }}
            >
                {'27557758768778565768756776576576567576567454'.split('').map((el, i) => (
                    <p key={i + 1} style={{ color: args.dark ? 'white' : 'black' }}>
                        {el}
                    </p>
                ))}
            </div>
        </Scrollbars>
    );
};

export const LightWithVerticalScrollbarOnly = BasicTemplate.bind({});
LightWithVerticalScrollbarOnly.args = {
    autohide: false,
    dark: false,
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const LightWithHorizontalScrollbarOnly = BasicTemplate.bind({});
LightWithHorizontalScrollbarOnly.args = {
    autohide: false,
    dark: false,
    has_horizontal: undefined,
    is_only_horizontal: true,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const DarkWithBothScrollbars = BasicTemplate.bind({});
DarkWithBothScrollbars.args = {
    autohide: false,
    dark: true,
    has_horizontal: true,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const LightShowingScrollbarOnScrollAndWhenHovered = TemplateWithOnScroll.bind({});
LightShowingScrollbarOnScrollAndWhenHovered.args = {
    // onScroll and autohide are defined inside TemplateWithOnScroll above
    dark: false,
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const DarkShowingScrollbarOnScrollAndWhenHovered = TemplateWithOnScroll.bind({});
DarkShowingScrollbarOnScrollAndWhenHovered.args = {
    // onScroll and autohide are defined inside TemplateWithOnScroll above
    dark: true,
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const LightWithDragEffectAndHiddenScrollbar = BasicTemplate.bind({});
LightWithDragEffectAndHiddenScrollbar.args = {
    autohide: false,
    dark: false,
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: true,
    has_y_scroll_on_drag_effect: true,
};

export const DarkWithDragEffectAndHiddenScrollbar = BasicTemplate.bind({});
DarkWithDragEffectAndHiddenScrollbar.args = {
    autohide: false,
    dark: true,
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: true,
    has_y_scroll_on_drag_effect: true,
};
