import React from 'react';
import StyledLi from '../base/base-list-item';
import CheckListItem from '../composed/check-list-item';
import CompoundListItem from '../composed/compound-list-item';
import { ICheckListItem, ICompoundListItem, ISimpleListItem, TLabelType, TListType, TOnClickItem } from '../types';

export const renderListItems = (items: ISimpleListItem[], type: TListType, classNameItems?: string) => {
    return (
        <>
            {items.map((item) => (
                <StyledLi type={type} key={item.id} className={classNameItems}>
                    {item.title}
                </StyledLi>
            ))}
        </>
    );
};

export const renderCheckListItems = (items: ICheckListItem[], dark: boolean, classNameItems?: string) => {
    return (
        <>
            {items.map((item) => (
                <CheckListItem
                    key={item.id}
                    checked={item.checked}
                    classNameItems={classNameItems}
                    crossed={item.crossed}
                    dark={dark}
                >
                    {item.title}
                </CheckListItem>
            ))}
        </>
    );
};

export const renderCompoundListItems = (
    items: ICompoundListItem[],
    label: TLabelType,
    dark: boolean,
    onClickItem?: TOnClickItem,
    classNameItems?: string,
) => {
    return (
        <>
            {items.map((item) => (
                <CompoundListItem
                    key={item.id}
                    item={item}
                    label={label}
                    dark={dark}
                    onClickItem={onClickItem}
                    classNameItems={classNameItems}
                />
            ))}
        </>
    );
};
