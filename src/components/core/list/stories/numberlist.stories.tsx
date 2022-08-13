import List from '@core/list/list';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListStoriesArgTypes, ListStoryDecorator, SimpleListData } from './utils';

export default {
    title: 'List Items / Number List',
    component: List.NumberList,
    decorators: [ListStoryDecorator],
    argTypes: { ...ListStoriesArgTypes },
} as ComponentMeta<typeof List.NumberList>;

const NumberTemplate: ComponentStory<typeof List.NumberList> = (args) => <List.NumberList {...args} />;

export const Default = NumberTemplate.bind({});

Default.args = {
    items: SimpleListData,
};
