import React, { HTMLAttributes } from 'react';

export type ButtonProps = 'primary' | 'primary-light' | 'secondary' | 'tertiary' | 'monochrome';

export type ActionButtonProps = {
    name: string;
    color: ButtonProps;
    onClick?: (arg: any) => void;
};

export type PanelProps = { label: string; icon?: string; content: HTMLElement | any };

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    close_icon?: boolean;
    action_buttons?: ActionButtonProps[];
    dark?: boolean;
    button_block?: boolean;
}

export interface DialogProps extends ModalProps {
    is_open: boolean;
    setIsOpen: (arg: boolean) => void;
}

export interface PageProps extends ModalProps {
    is_open: boolean;
    setIsOpen: (arg: boolean) => void;
    panel?: PanelProps[];
}

export interface ModalContainerProps extends ModalProps {
    type: 'dialog' | 'page';
    panel?: PanelProps[];
}
