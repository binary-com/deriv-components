import React, { HTMLAttributes } from 'react';

export type TListType = 'numbered' | 'bulleted' | 'checklist' | 'compound';
export type TLabelType = 'default' | 'pill';
export type TSizeType = 'small' | 'medium' | 'large';

export type TOnClickItem = (item: ICompoundListItem, event: React.MouseEvent<HTMLLIElement>) => void;

export interface ISimpleListItem {
    id: number;
    title: string;
}

export interface ICompoundListItem extends ISimpleListItem {
    subtitle?: string;
    label?: string;
    icon_src?: string;
    action_icon_src?: string;
}

export interface ICheckListItem extends ISimpleListItem {
    checked?: boolean;
    crossed?: boolean;
}
export interface ListItemProps extends HTMLAttributes<HTMLUListElement | HTMLLIElement> {
    type: TListType;
    size?: TSizeType;
    dark?: boolean;
}

export type TCompoundListItemProps = {
    item: ICompoundListItem;
    label?: TLabelType;
    dark?: boolean;
    onClickItem?: TOnClickItem;
};

export type TCheckListItemProps = {
    checked?: boolean;
    crossed?: boolean;
    dark?: boolean;
};

export type TSimpleListProps = { items: ISimpleListItem[]; size?: TSizeType };

export type TBulletedListProps = { items: ISimpleListItem[]; size?: TSizeType };

export type TCheckListProps = {
    items: ICheckListItem[];
    size?: TSizeType;
};

export type TCompoundProps = {
    items: ICompoundListItem[];
    label?: TLabelType;
    size?: TSizeType;
    onClickItem?: TOnClickItem;
};
