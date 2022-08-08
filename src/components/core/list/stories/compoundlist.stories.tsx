import List from '@core/list/list';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CompoundListData, ListStoriesArgTypes, ListStoryDecorator } from './utils';

export default {
    title: 'List Items / Compound',
    component: List,
    decorators: [ListStoryDecorator],
    argTypes: { ...ListStoriesArgTypes },
} as ComponentMeta<typeof List>;

const CompoundTemplate: ComponentStory<typeof List.CompoundList> = (args) => <List.CompoundList {...args} />;

export const Default = CompoundTemplate.bind({});
Default.argTypes = {
    label: {
        control: {
            type: 'radio',
            options: ['default', 'pill'],
        },
        defaultValue: 'default',
    },
    onClickItem: {
        action: 'click',
    },
};
Default.args = {
    label: 'default',
    items: CompoundListData,
};
