import Button from '@core/button/button';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import Modal from '..';
import { TModalActionButton } from '../types';

export default {
    title: 'Modal / Dialog / Controlled',
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
        content: {
            control: {
                type: 'text',
            },
            description: 'The Text content inside of the dialog',
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

const ModalTemplate: ComponentStory<typeof Modal & typeof Modal.DialogContent> = (args) => {
    const [open, setOpen] = useState(false);

    const actionButtons: TModalActionButton[] = [
        {
            id: 1,
            text: 'Primary',
            color: 'primary',
            onClick: () => {
                setOpen(false);
            },
        },
        {
            id: 1,
            text: 'Secondary',
            color: 'monochrome',
            onClick: () => {
                setOpen(false);
            },
        },
    ];

    return (
        <Modal open={open} onOpenChange={setOpen}>
            <Modal.Trigger asChild>
                <Button>Open</Button>
            </Modal.Trigger>
            <Modal.Portal>
                <Modal.Overlay />
                <Modal.DialogContent
                    title={args.title}
                    content={args.content}
                    has_close_button={args.has_close_button}
                    action_buttons={actionButtons}
                    block_action_buttons={args.block_action_buttons}
                />
            </Modal.Portal>
        </Modal>
    );
};

export const Default = ModalTemplate.bind({});
Default.args = {
    title: 'Insufficient balance',
    content: 'Your account balance (0.00 USD) is insufficient to buy this contract (100.00 USD).',
    has_close_button: false,
    block_action_buttons: false,
};

export const WithCloseButton = ModalTemplate.bind({});
WithCloseButton.args = {
    title: 'Insufficient balance',
    content: 'Your account balance (0.00 USD) is insufficient to buy this contract (100.00 USD).',
    has_close_button: true,
    block_action_buttons: false,
};

export const WithBlockActionButtons = ModalTemplate.bind({});

WithBlockActionButtons.args = {
    title: 'Insufficient balance',
    content: 'Your account balance (0.00 USD) is insufficient to buy this contract (100.00 USD).',
    has_close_button: false,
    block_action_buttons: true,
};
