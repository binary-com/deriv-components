import { ComponentMeta, ComponentStory } from '@storybook/react';
import Breadcrumb, { BreadcrumbStory } from '../breadcrumb';

const handleOnClick = (item: string) => item;

export default {
    title: 'Breadcrumb',
    component: Breadcrumb,
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
            description: 'Items that need to be sent to breadcrumb to display the list',
            defaultValue: ['Home', 'About', 'CFD', 'mt5'],
        },
        dark: {
            description: 'If set to `true`, breadcrumb color will be set to dark theme.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        handleOnClick: {
            defaultValue: handleOnClick,
        },
    },
} as ComponentMeta<typeof BreadcrumbStory>;

const Template: ComponentStory<typeof BreadcrumbStory> = (args) => <Breadcrumb {...args} />;

export const LightBreadcrumb = Template.bind({});
LightBreadcrumb.args = {
    dark: false,
};

export const DarkBreadcrumb = Template.bind({});
DarkBreadcrumb.args = {
    dark: true,
};

DarkBreadcrumb.parameters = {
    backgrounds: { default: 'dark' },
};
