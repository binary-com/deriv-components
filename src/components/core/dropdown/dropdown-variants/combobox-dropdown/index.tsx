import React from 'react';
import DropdownBase from '@core/dropdown/dropdown-base/dropdown-base';
import { TDropdownBase } from '@core/dropdown/types';

export const ComboboxDropdown = ({ ...props }: Omit<TDropdownBase, 'dropdown_type'>) => {
    return <DropdownBase {...props} dropdown_type="combobox" is_alignment_top={false} />;
};

export type TComboboxDropdown = { ComboboxDropdown: typeof ComboboxDropdown };
