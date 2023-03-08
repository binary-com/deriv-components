import BaseList from '@core/list/base/base-list';
import { renderCheckListItems } from '@core/list/render-functions';
import { TCheckListProps } from '@core/list/types';
import useTheme from '@core/theme-context/use-theme';

export const CheckList = ({ classNameItems, items, ...rest }: TCheckListProps) => {
    const { isDark } = useTheme();

    return (
        <BaseList {...rest} type="checklist" dark={isDark}>
            {renderCheckListItems(items, isDark, classNameItems)}
        </BaseList>
    );
};

export type CheckListType = { CheckList: typeof CheckList };
