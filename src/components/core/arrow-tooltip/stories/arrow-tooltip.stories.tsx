import { ComponentMeta, ComponentStory } from '@storybook/react';
import ArrowTooltip, { ArrowTooltipStory } from '../arrow-tooltip';

const handleOnClick = (item: string) => item;

export default {
    title: 'Tooltip',
    component: ArrowTooltip,
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#0E0E0E' },
            ],
        },
    },
    argTypes: {
        items: {
            description: 'Items that need to be sent to ArrowTooltip to display the list',
            defaultValue: ['Home', 'About', 'CFD', 'mt5'],
        },
        dark: {
            description: 'If set to `true`, ArrowTooltip color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        handleOnClick: {
            defaultValue: handleOnClick,
        },
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
    },
} as ComponentMeta<typeof ArrowTooltipStory>;

const Template: ComponentStory<typeof ArrowTooltipStory> = (args) => <ArrowTooltip {...args} />;

export const LightArrowTooltip = Template.bind({});
LightArrowTooltip.args = {
    dark: false,
};

export const DarkArrowTooltip = Template.bind({});
DarkArrowTooltip.args = {
    dark: true,
};

DarkArrowTooltip.parameters = {
    backgrounds: { default: 'dark' },
};
