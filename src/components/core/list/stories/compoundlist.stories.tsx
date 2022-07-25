import List from '@core/list/list';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CompoundListData, ListStoriesArgTypes, ListStoryDecorator } from './utils';

export default {
    title: 'List Items / Compound',
    component: List,
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
} as ComponentMeta<typeof List>;

const CompoundTemplate: ComponentStory<typeof List.CompoundList> = (args) => <List.CompoundList {...args} />;

export const CompoundList = CompoundTemplate.bind({});
CompoundList.argTypes = {
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
CompoundList.args = {
    label: 'default',
    items: CompoundListData,
};

export const DarkCompoundList = CompoundList.bind({});
DarkCompoundList.argTypes = {
    label: {
        control: {
            type: 'radio',
            options: ['default', 'pill'],
        },
        defaultValue: 'default',
    },
};
DarkCompoundList.args = {
    label: 'pill',
    items: CompoundListData,
    dark: true,
};
DarkCompoundList.parameters = {
    backgrounds: { default: 'dark' },
};
