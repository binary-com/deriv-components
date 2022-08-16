import { ComponentMeta, ComponentStory } from '@storybook/react';
import Modal from '../modal';

export default {
    title: 'Modal',
    component: Modal,
    argTypes: {
        type: {
            description: 'type of the modal container',
            control: { type: 'radio', options: ['dialog', 'page'] },
            defaultValue: 'dialog',
        },
        title: {
            description: 'Title of the Modal',
            control: 'text',
            defaultValue: 'Title',
        },
        close_icon: {
            description: 'having close icon on the header',
            defaultValue: true,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        button_block: {
            description: 'If set to `true`, button display will be set to block.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
        },
        children: {
            description: 'Content of the Modal',
            control: 'text',
            defaultValue: 'Modal',
        },
        action_buttons: {
            description: 'The Buttons to be displayed in dialog modal footer',
            defaultValue: [],
        },
        panel: {
            description: "Menu that should be visible on the left side and it's content",
            defaultValue: [],
        },
    },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const DefaultLightDialog = Template.bind({});
DefaultLightDialog.args = {
    type: 'dialog',
    title: 'Dialog',
    action_buttons: [
        {
            name: 'Secondary action',
            color: 'secondary',
            onClick: () => console.log('Secondary action'),
        },
        {
            name: 'Primary action',
            color: 'primary',
            onClick: () => console.log('Primary action'),
        },
    ],
};

export const DefaultLightPage = Template.bind({});
DefaultLightPage.args = {
    type: 'page',
    title: 'Page',
};

export const PageWithFooter = Template.bind({});
PageWithFooter.args = {
    type: 'page',
    title: 'Page',
    action_buttons: [
        {
            name: 'Secondary action',
            color: 'secondary',
            onClick: () => console.log('1'),
        },
        {
            name: 'Primary action',
            color: 'primary',
            onClick: () => console.log('2'),
        },
    ],
};

export const PageWithPanel = Template.bind({});
PageWithPanel.args = {
    type: 'page',
    title: 'Page',
    action_buttons: [
        {
            name: 'Secondary action',
            color: 'secondary',
            onClick: () => console.log('1'),
        },
        {
            name: 'Primary action',
            color: 'primary',
            onClick: () => console.log('2'),
        },
    ],
    panel: [
        {
            label: 'label1',
            content: 'content1',
        },
        {
            label: 'label2',
            content: 'content2',
        },
        {
            label: 'label3',
            content: 'content3',
        },
    ],
};
