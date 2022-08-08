import BaseList from '@core/list/base/base-list';
import { renderListItems } from '@core/list/render-functions';
import { TBulletedListProps } from '@core/list/types';
import useTheme from '@core/theme-context/use-theme';

export const BulletedList = ({ items, ...rest }: TBulletedListProps) => {
    const { isDark } = useTheme();
    return (
        <BaseList {...rest} dark={isDark} type="bulleted">
            {renderListItems(items, 'bulleted')}
        </BaseList>
    );
};

export type SimpleListType = { BulletedList: typeof BulletedList };
