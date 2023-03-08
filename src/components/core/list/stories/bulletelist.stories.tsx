import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BulletedList } from '../list-variants/bulleted';
import { ListStoriesArgTypes, ListStoryDecorator, SimpleListData } from './utils';
import Dropdown from '@core/dropdown/dropdown';

export default {
    title: 'List Items / Bullet List',
    component: BulletedList,
    decorators: [ListStoryDecorator],
    argTypes: { ...ListStoriesArgTypes },
} as ComponentMeta<typeof BulletedList>;

const BulletedTemplate: ComponentStory<typeof BulletedList> = (args) => <BulletedList {...args} />;

export const Default = BulletedTemplate.bind({});
Default.args = {
    items: SimpleListData,
};
