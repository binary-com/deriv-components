import { ComponentMeta, ComponentStory } from '@storybook/react';
import Badge from '../badge';
import CheckIconSVG from '@assets/svg/circular-check-icon.svg';

export default {
    title: 'Badge',
    component: Badge,
    argTypes: {
        children: {
            description: 'Content of badge label',
            control: 'text',
            defaultValue: 'Badge',
        },
        size: {
            description: 'size of the badge container',
            control: { type: 'radio', options: ['small', 'medium', 'large'] },
            defaultValue: 'small',
        },
        spacing: {
            description: 'padding size of the badge container',
            control: { type: 'radio', options: ['loose', 'tight'] },
            defaultValue: 'loose',
        },
        label: {
            description: 'font weight of the label',
            control: { type: 'radio', options: ['regular', 'bold'] },
            defaultValue: 'regular',
        },
        visiblity: {
            description: 'controls which parts of the badge component should be visible',
            control: {
                type: 'radio',
                options: ['icon-only', 'label-only', 'icon-and-label'],
            },
            defaultValue: 'icon-and-label',
        },
        icon_src: {
            table: {
                disable: true,
            },
        },
        icon_class: {
            table: {
                disable: true,
            },
        },
        iconAlt: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge icon_src={CheckIconSVG} {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const IconOnly = Template.bind({});
IconOnly.args = {
    visiblity: 'icon-only',
};

export const LabelOnly = Template.bind({});
LabelOnly.args = {
    visiblity: 'label-only',
};

export const LongText = Template.bind({});
LongText.args = {
    children:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur amet tempore molestiae dolorem odit id quod repellendus quos dolorum. Sit debitis tempora ullam officiis animi ipsa itaque. Laudantium, similique necessitatibus? Optio ratione, deleniti molestias odit magni aliquid nostrum cumque pariatur. Quidem dolor deleniti voluptates ut molestias sit, enim quae. Omnis soluta officiis cumque corrupti illum magnam, labore fuga quam similique.',
};

export const TightSpacing = Template.bind({});

TightSpacing.args = {
    children: 'This is a long text for badge just to see how it looks in actual page',
    spacing: 'tight',
};
