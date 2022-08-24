import Button from '@core/button/button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { styled } from 'Styles/stitches.config';
import Modal from '..';
import { TModalActionButton } from '../types';

export default {
    title: 'Modal / Page / Page',
    argTypes: {
        title: {
            control: {
                type: 'text',
            },
            description: 'The Dialog Title Text',
        },
        has_close_button: {
            control: {
                type: 'boolean',
            },
            description: 'If you pass `true` the dialog will have a close button on top right corner',
        },
        has_title_separator: {
            control: {
                type: 'boolean',
            },
            description: 'If you pass `true` the `hr` separator under the title will be visible',
        },
        has_footer_separator: {
            control: {
                type: 'boolean',
            },
            description: 'If you pass `true` the `hr` separator on top of the footer will be visible',
        },
        block_action_buttons: {
            control: {
                type: 'boolean',
            },
            description: 'If you pass `true` the action buttons will have block display',
        },
    },
    component: Modal,
} as ComponentMeta<typeof Modal>;

const Box = styled('div', {
    width: '30rem',
    height: '30rem',
});

const actionButtons: TModalActionButton[] = [
    {
        id: 1,
        text: 'Primary',
        color: 'primary',
        onClick: () => {
            console.log('primary clicked');
        },
    },
    {
        id: 1,
        text: 'Secondary',
        color: 'monochrome',
        onClick: () => {
            console.log('secondary clicked');
        },
    },
];

const PageTemplate: ComponentStory<typeof Modal & typeof Modal.PageContent> = (args) => {
    return (
        <Modal>
            <Modal.Trigger asChild>
                <Button>Open Page </Button>
            </Modal.Trigger>
            <Modal.Portal>
                <Modal.Overlay />
                <Modal.PageContent
                    title={args.title}
                    has_close_button={args.has_close_button}
                    has_title_separator={args.has_title_separator}
                    has_footer_separator={args.has_footer_separator}
                    block_action_buttons={args.block_action_buttons}
                    action_buttons={actionButtons}
                >
                    <Box></Box>
                </Modal.PageContent>
            </Modal.Portal>
        </Modal>
    );
};

export const Default = PageTemplate.bind({});
Default.args = {
    title: 'Title',
    has_close_button: false,
    has_title_separator: false,
    has_footer_separator: false,
    block_action_buttons: false,
};

export const WithBlockActionButtons = PageTemplate.bind({});
WithBlockActionButtons.args = {
    title: 'Title',
    has_close_button: false,
    has_title_separator: false,
    has_footer_separator: false,
    block_action_buttons: true,
};

export const WithCloseIcon = PageTemplate.bind({});
WithCloseIcon.args = {
    title: 'Title',
    has_close_button: true,
    has_title_separator: false,
    has_footer_separator: false,
    block_action_buttons: false,
};

export const WithTitleSeparator = PageTemplate.bind({});
WithTitleSeparator.args = {
    title: 'Title',
    has_close_button: false,
    has_title_separator: true,
    has_footer_separator: false,
    block_action_buttons: false,
};

export const WithFooterSeparator = PageTemplate.bind({});
WithFooterSeparator.args = {
    title: 'Title',
    has_close_button: false,
    has_title_separator: false,
    has_footer_separator: true,
    block_action_buttons: false,
};

export const WithBothSeparator = PageTemplate.bind({});
WithBothSeparator.args = {
    title: 'Title',
    has_close_button: false,
    has_title_separator: true,
    has_footer_separator: true,
    block_action_buttons: false,
};
