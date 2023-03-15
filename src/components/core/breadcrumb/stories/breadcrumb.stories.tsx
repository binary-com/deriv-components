import { ComponentMeta, ComponentStory } from '@storybook/react';
import Breadcrumb, { BreadcrumbStory } from '../breadcrumb';

export default {
    title: 'Breadcrumb',
    component: Breadcrumb,
    argTypes: {
        items: {
            description: 'Items that need to be sent to breadcrumb to display the list',
            defaultValue: [
                { value: 0, text: 'Home' },
                { value: 1, text: 'About' },
                { value: 2, text: 'CFD' },
                { value: 3, text: 'mt5' },
            ],
        },
        handleOnClick: {
            control: false,
            action: 'handleOnClick',
        },
    },
} as ComponentMeta<typeof BreadcrumbStory>;

const Template: ComponentStory<typeof BreadcrumbStory> = (args) => <Breadcrumb {...args} />;

export const DefaultBreadcrumb = Template.bind({});
DefaultBreadcrumb.args = {};
