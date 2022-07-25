import List from '@core/list/list';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckListData, ListStoriesArgTypes, ListStoryDecorator } from './utils';

export default {
    title: 'List Items / Check List',
    component: List.CheckList,
    parameters: {
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#0E0E0E' },
            ],
        },
    },
    decorators: [ListStoryDecorator],
    argTypes: { ...ListStoriesArgTypes },
} as ComponentMeta<typeof List.CheckList>;

const CheckTemplate: ComponentStory<typeof List.CheckList> = (args) => <List.CheckList {...args} />;

export const CheckList = CheckTemplate.bind({});
CheckList.args = {
    items: CheckListData,
};

export const DarkCheckList = CheckTemplate.bind({});
DarkCheckList.parameters = {
    backgrounds: { default: 'dark' },
};
DarkCheckList.args = {
    items: CheckListData,
    dark: true,
};
