import BaseList from '@core/list/base/base-list';
import { renderListItems } from '@core/list/render-functions';
import { TSimpleListProps } from '@core/list/types';
import useTheme from '@core/theme-context/use-theme';

export const NumberList = ({ items, ...rest }: TSimpleListProps) => {
    const { isDark } = useTheme();

    return (
        <BaseList {...rest} type="numbered" dark={isDark}>
            {renderListItems(items, 'numbered')}
        </BaseList>
    );
};

export type NumberListType = { NumberList: typeof NumberList };
