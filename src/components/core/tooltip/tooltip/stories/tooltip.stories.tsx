import { ComponentMeta, Story } from '@storybook/react';
import { styled } from '@stitches/react';
import CheckIconSVG from '@assets/svg/circular-check-icon.svg';
import Tooltip, { TooltipProps } from '../tooltip';
import { TTooltipContentProps } from '../tooltip-content';
import { TTooltipTriggerProps } from '../tooltip-trigger';

const TooltipContainer = styled('div', {
    position: 'relative',
    top: 200,
    left: 300,
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
            control: {
                type: 'boolean',
            },
            defaultValue: false,
        },
    },
} as ComponentMeta<typeof Tooltip>;

const Template: Story<TooltipProps & TTooltipTriggerProps & TTooltipContentProps> = (args, { globals: { theme } }) => {
    const isDark = theme === 'dark';
    return (
        <TooltipContainer dark={isDark}>
            <Tooltip.Provider>
                <Tooltip>
                    <Tooltip.Trigger>
                        <span>Hover over this content</span>
                    </Tooltip.Trigger>
                    <Tooltip.Content {...args}>
                        <span>This is tooltip</span>
                    </Tooltip.Content>
                </Tooltip>
            </Tooltip.Provider>
        </TooltipContainer>
    );
};

export const DefaultTooltip = Template.bind({});

export const TooltipWithIcon = Template.bind({});
TooltipWithIcon.args = {
    icon: CheckIconSVG,
};
