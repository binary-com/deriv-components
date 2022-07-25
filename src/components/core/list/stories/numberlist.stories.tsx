import List from '@core/list/list';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListStoriesArgTypes, ListStoryDecorator, SimpleListData } from './utils';

export default {
    title: 'List Items / Number List',
    component: List.NumberList,
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
} as ComponentMeta<typeof List.NumberList>;

const NumberTemplate: ComponentStory<typeof List.NumberList> = (args) => <List.NumberList {...args} />;

export const NumberList = NumberTemplate.bind({});

NumberList.args = {
    items: SimpleListData,
};

export const DarkNumberList = NumberTemplate.bind({});
DarkNumberList.parameters = {
    backgrounds: { default: 'dark' },
};
DarkNumberList.args = {
    dark: true,
    items: SimpleListData,
};
