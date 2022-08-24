import { ReactNode } from 'react';

type TButtonColor = 'primary' | 'primary-light' | 'secondary' | 'tertiary' | 'monochrome';

export type TModalActionButton = {
    id: number;
    text: string;
    color: TButtonColor;
    onClick: () => void;
};

export type TPanelItem = {
    id: number;
    title: string;
    icon_src?: string;
};

export type TDialogContent = {
    content?: string;
    title?: string | ReactNode;
    has_close_button?: boolean;
    action_buttons?: TModalActionButton[];
    block_action_buttons?: boolean;
};

export type TPageContentProps = {
    children?: ReactNode;
    title?: string | ReactNode;
    has_close_button?: boolean;
    has_title_separator?: boolean;
    has_footer_separator?: boolean;
    action_buttons?: TModalActionButton[];
    block_action_buttons?: boolean;
};

export type TPanelContentProps = {
    title?: string | ReactNode;
    action_buttons?: TModalActionButton[];
    panel_items: TPanelItem[];
    renderItemContent?: (panelItem: TPanelItem) => ReactNode;
};

export type TModalType = 'page' | 'dialog';

export type TCloseIconButtonProps = {
    is_absolute?: boolean;
    type: TModalType;
};

export type TTextTitleProps = {
    children?: ReactNode;
    icon_src?: string;
    has_close_button?: boolean;
    has_title_separator?: boolean;
    type: TModalType;
};

export type TModalFooterContainer = {
    has_footer_separator?: boolean;
    action_buttons?: TModalActionButton[];
    block_action_buttons?: boolean;
    type: TModalType;
};
