import { ComponentMeta, ComponentStory } from '@storybook/react';
import { styled } from '@stitches/react';
import CheckIconSVG from '@assets/svg/circular-check-icon.svg';
import Tooltip, { TooltipStory } from '../tooltip';

const TooltipContainer = styled('div', {
    position: 'relative',
    top: 200,
    left: 200,
    variants: {
        dark: {
            true: {
                color: 'white',
            },
        },
    },
});

export default {
    title: 'Tooltip / Tooltip',
    component: Tooltip,
    argTypes: {
        type: {
            description: 'controls the type of tooltip ',
            control: {
                type: 'select',
                options: ['default', 'error'],
            },
            defaultValue: 'error',
        },
        tooltip_content: {
            defaultValue: <span>this is a tooltip</span>,
        },
        side: {
            description: 'controls the side of tooltip ',
            control: {
                type: 'select',
                options: ['top', 'bottom', 'left', 'right'],
            },
            defaultValue: 'top',
        },
        is_fixed_width: {
            description: 'If set to `true`, width will be fixed.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
    },
} as ComponentMeta<typeof TooltipStory>;

const Template: ComponentStory<typeof TooltipStory> = (args, { globals: { theme } }) => {
    const isDark = theme === 'dark';
    return (
        <TooltipContainer dark={isDark}>
            <Tooltip {...args}>
                <span>Hover over this content</span>
            </Tooltip>
        </TooltipContainer>
    );
};

export const DefaultTooltip = Template.bind({});
DefaultTooltip.args = {
    is_fixed_width: false,
};

export const TooltipWithIcon = Template.bind({});
TooltipWithIcon.args = {
    icon: CheckIconSVG,
};
