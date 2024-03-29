import { ComponentMeta, ComponentStory } from '@storybook/react';
import { styled } from '@stitches/react';
import CheckIconSVG from '@assets/svg/circular-check-icon.svg';
import ArrowTooltip, { ArrowTooltipStory } from '../arrow-tooltip';

const TooltipContainer = styled('div', {
    position: 'relative',
    top: 200,
    left: 200,
});

export default {
    title: 'Tooltip / ArrowTooltip',
    component: ArrowTooltip,
    argTypes: {
        arrow_direction: {
            description: 'controls the direction of arrow',
            control: {
                type: 'select',
                options: [
                    'top_left',
                    'top_center',
                    'top_right',
                    'right_top',
                    'right_center',
                    'right_bottom',
                    'bottom_right',
                    'bottom_center',
                    'bottom_left',
                    'left_top',
                    'left_center',
                    'left_bottom',
                ],
            },
            defaultValue: 'top_left',
        },
        arrow_size: {
            type: 'number',
        },
        is_fixed_width: {
            description: 'If set to `true`, width will be fixed.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
        open_tooltip: {
            description: 'If set to `true`, tooltip will be visible.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
        },
    },
} as ComponentMeta<typeof ArrowTooltipStory>;

const Template: ComponentStory<typeof ArrowTooltipStory> = (args) => (
    <TooltipContainer>
        <ArrowTooltip {...args}>
            <span>This is arrow tooltip content</span>
        </ArrowTooltip>
    </TooltipContainer>
);

export const DefaultArrowTooltip = Template.bind({});
DefaultArrowTooltip.args = {
    is_fixed_width: false,
};

export const ArrowTooltipWithIcon = Template.bind({});
ArrowTooltipWithIcon.args = {
    icon: CheckIconSVG,
};

export const ArrowTooltipWithDifferentColor = Template.bind({});
ArrowTooltipWithDifferentColor.args = {
    arrow_color: 'black',
};

export const ArrowTooltipWithAdjustableSizeOfArraow = Template.bind({});
ArrowTooltipWithAdjustableSizeOfArraow.args = {
    arrow_size: 20,
};
