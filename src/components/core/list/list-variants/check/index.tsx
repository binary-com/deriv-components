import BaseList from '@core/list/base/base-list';
import { renderCheckListItems } from '@core/list/render-functions';
import { TCheckListProps } from '@core/list/types';
import { FC } from 'react';

export const CheckList: FC<TCheckListProps> = ({ items, dark = false, ...rest }) => {
    return (
        <BaseList type="checklist" dark={dark} {...rest}>
            {renderCheckListItems(items, dark)}
        </BaseList>
    );
};

export type CheckListType = { CheckList: typeof CheckList };
