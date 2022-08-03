import BaseList from '@core/list/base/base-list';
import { renderCompoundListItems } from '@core/list/render-functions';
import { TCompoundProps } from '@core/list/types';
import useTheme from '@core/theme-context/use-theme';
import { FC } from 'react';

export const CompoundList: FC<TCompoundProps> = ({ items, onClickItem, label = 'default', ...rest }) => {
    const { isDark } = useTheme();

    return (
        <BaseList {...rest} type="compound" dark={isDark}>
            {renderCompoundListItems(items, label, isDark, onClickItem)}
        </BaseList>
    );
};

export type CompoundListType = { CompoundList: typeof CompoundList };
