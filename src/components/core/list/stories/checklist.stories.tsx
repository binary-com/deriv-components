import List from '@core/list/list';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckListData, ListStoriesArgTypes, ListStoryDecorator } from './utils';

export default {
    title: 'List Items / Check List',
    component: List.CheckList,
    decorators: [ListStoryDecorator],
    argTypes: { ...ListStoriesArgTypes },
} as ComponentMeta<typeof List.CheckList>;

const CheckTemplate: ComponentStory<typeof List.CheckList> = (args) => <List.CheckList {...args} />;

export const Default = CheckTemplate.bind({});
Default.args = {
    items: CheckListData,
};
