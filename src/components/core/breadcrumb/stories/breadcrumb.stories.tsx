import { ComponentMeta, ComponentStory } from '@storybook/react';
import Breadcrumb, { BreadcrumbStory } from '../breadcrumb';

export default {
    title: 'Breadcrumb',
    component: Breadcrumb,
    argTypes: {
        items: {
            description: 'Items that need to be sent to breadcrumb to display the list',
            defaultValue: ['Home', 'About', 'CFD', 'mt5'],
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
