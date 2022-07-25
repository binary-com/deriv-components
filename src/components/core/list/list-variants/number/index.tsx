import BaseList from '@core/list/base/base-list';
import { renderListItems } from '@core/list/render-functions';
import { TSimpleListProps } from '@core/list/types';
import { FC } from 'react';

export const NumberList: FC<TSimpleListProps> = ({ items, ...rest }) => {
    return (
        <BaseList type="numbered" {...rest}>
            {renderListItems(items, 'numbered')}
        </BaseList>
    );
};

export type NumberListType = { NumberList: typeof NumberList };
