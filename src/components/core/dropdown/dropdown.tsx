import * as AddListDropdown from './dropdown-variants/add-list-dropdown';
import * as ComboboxDropdown from './dropdown-variants/combobox-dropdown';
import * as PromptDropdown from './dropdown-variants/prompt-dropdown';
import { FC } from 'react';

type TDropdown = FC &
    ComboboxDropdown.TComboboxDropdown &
    PromptDropdown.TPromptDropdown &
    AddListDropdown.TAddListDropdown;

const Dropdown: TDropdown = () => <></>;

Dropdown.AddListDropdown = AddListDropdown.AddListDropdown;
Dropdown.ComboboxDropdown = ComboboxDropdown.ComboboxDropdown;
Dropdown.PromptDropdown = PromptDropdown.PromptDropdown;

export default Dropdown;
