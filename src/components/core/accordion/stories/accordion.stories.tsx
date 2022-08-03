import { ComponentMeta, ComponentStory } from '@storybook/react';
import Accordion, { AccordionStory } from '../accordion';

export default {
    title: 'Accordion',
    component: Accordion,
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
        size: {
            control: {
                type: 'select',
                options: {
                    medium: 'medium',
                    small: 'small',
                },
            },
            description: 'Controls the size of accordion.',
            defaultValue: 'medium',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
            },
        },
        type: {
            control: {
                type: 'select',
                options: {
                    'Bottom Border': 'bottomBorder',
                    Container: 'container',
                    'Container With Border': 'containerWithBorder',
                    'Container With Shadow': 'containerWithShadow',
                },
            },
            description: 'Controls the types of accordion.',
            defaultValue: 'bottomBorder',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'bottomBorder' },
            },
        },
        elevation_type: {
            control: {
                type: 'select',
                options: {
                    xs: 'xs',
                    sm: 'sm',
                    md: 'md',
                    lg: 'lg',
                    xl: 'xl',
                    xxl: 'xxl',
                    xxxl: 'xxxl',
                },
            },
            description: 'Controls the types of elevation.',
            defaultValue: 'xs',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'xs' },
            },
        },
        dark: {
            description: 'If set to `true`, accordion color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        title_content: {
            defaultValue: <div>Title</div>,
        },
        main_content: {
            defaultValue: <div>Content</div>,
        },
    },
} as ComponentMeta<typeof AccordionStory>;

const Template: ComponentStory<typeof AccordionStory> = (args) => <Accordion {...args} />;

export const LightAccordion = Template.bind({});
LightAccordion.args = {
    dark: false,
};

export const DarkAccordion = Template.bind({});
DarkAccordion.args = {
    dark: true,
};

DarkAccordion.parameters = {
    backgrounds: { default: 'dark' },
};
