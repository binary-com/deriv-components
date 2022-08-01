import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BulletedList } from '../list-variants/bulleted';
import { ListStoriesArgTypes, ListStoryDecorator, SimpleListData } from './utils';

export default {
    title: 'List Items / Bullet List',
    component: BulletedList,
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
} as ComponentMeta<typeof BulletedList>;

const BulletedTemplate: ComponentStory<typeof BulletedList> = (args) => <BulletedList {...args} />;

export const LightBulletedList = BulletedTemplate.bind({});
LightBulletedList.args = {
    items: SimpleListData,
};

export const DarkBulletedList = BulletedTemplate.bind({});
DarkBulletedList.parameters = {
    backgrounds: { default: 'dark' },
};
DarkBulletedList.args = {
    items: SimpleListData,
    dark: true,
};
