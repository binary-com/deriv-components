import BaseList from '@core/list/base/base-list';
import { renderCompoundListItems } from '@core/list/render-functions';
import { TCompoundProps } from '@core/list/types';
import { FC } from 'react';

export const CompoundList: FC<TCompoundProps> = ({ items, onClickItem, dark = false, label = 'default', ...rest }) => {
    return (
        <BaseList type="compound" dark={dark} {...rest}>
            {renderCompoundListItems(items, label, dark, onClickItem)}
        </BaseList>
    );
};

export type CompoundListType = { CompoundList: typeof CompoundList };
