import React from 'react';
import DropdownBase from '@core/dropdown/dropdown-base/dropdown-base';
import { TDropdownBase } from '@core/dropdown/types';

export const PromptDropdown = ({ ...props }: Omit<TDropdownBase, 'dropdown_type'>) => {
    return <DropdownBase {...props} dropdown_type="prompt" />;
};

export type TPromptDropdown = { PromptDropdown: typeof PromptDropdown };
