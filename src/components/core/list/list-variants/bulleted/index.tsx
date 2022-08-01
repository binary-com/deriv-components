import BaseList from '@core/list/base/base-list';
import { renderListItems } from '@core/list/render-functions';
import { TBulletedListProps } from '@core/list/types';

import { FC } from 'react';

export const BulletedList: FC<TBulletedListProps> = ({ items, ...rest }) => {
    return (
        <BaseList type="bulleted" {...rest}>
            {renderListItems(items, 'bulleted')}
        </BaseList>
    );
};

export type SimpleListType = { BulletedList: typeof BulletedList };
