import { Meta, Story } from '@storybook/react';
import React from 'react';
import Scrollbars, { ScrollbarsProps } from '../scrollbars';
import Text from '@core/text/text';

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

const BasicTemplate: Story<ScrollbarsProps> = (args, { globals: { theme } }) => {
    const isDark = theme === 'dark';

    return (
        <Scrollbars
            {...args}
            style={{
                width: '300px',
                height: '400px',
                borderRadius: '10px',
                background: isDark ? '#C15D5D' : '#F7F8F1',
            }}
        >
            {'275577587687785657687567'.split('').map((el, i) => (
                <Text key={i + 1} as="p" bold={false} css={{ color: isDark ? 'white' : 'black', marginRight: '400px' }}>
                    {el}
                </Text>
            ))}
        </Scrollbars>
    );
};
const TemplateWithOnScroll: Story<ScrollbarsProps> = (args, { globals: { theme } }) => {
    const [should_show_scrollbar, setShouldShowScrollbar] = React.useState(false);
    let scroll_timeout: NodeJS.Timeout;
    const isDark = theme === 'dark';

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
                background: isDark ? '#C15D5D' : '#F7F8F1',
            }}
        >
            {'275577587687785657687567'.split('').map((el, i) => (
                <Text key={i + 1} as="p" bold={false} css={{ color: isDark ? 'white' : 'black', marginRight: '400px' }}>
                    {el}
                </Text>
            ))}
        </Scrollbars>
    );
};

export const WithVerticalScrollbarOnly = BasicTemplate.bind({});
WithVerticalScrollbarOnly.args = {
    autohide: false,
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const WithHorizontalScrollbarOnly = BasicTemplate.bind({});
WithHorizontalScrollbarOnly.args = {
    autohide: false,
    has_horizontal: undefined,
    is_only_horizontal: true,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const WithBothScrollbars = BasicTemplate.bind({});
WithBothScrollbars.args = {
    autohide: false,
    has_horizontal: true,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const ShowingScrollbarOnScrollAndWhenHovered = TemplateWithOnScroll.bind({});
ShowingScrollbarOnScrollAndWhenHovered.args = {
    // onScroll and autohide are defined inside TemplateWithOnScroll above
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: false,
    has_y_scroll_on_drag_effect: false,
};

export const WithDragEffectAndHiddenScrollbar = BasicTemplate.bind({});
WithDragEffectAndHiddenScrollbar.args = {
    autohide: false,
    has_horizontal: false,
    is_only_horizontal: false,
    is_only_horizontal_overlay: false,
    is_scrollbar_hidden: true,
    has_y_scroll_on_drag_effect: true,
};
