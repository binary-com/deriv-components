import { useState, HtmlHTMLAttributes, ReactNode, useEffect } from 'react';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import Checkbox, { CheckboxProps } from '@core/checkbox/checkbox';

export interface CheckboxListProps extends HtmlHTMLAttributes<HTMLInputElement> {
    size?: 'default' | 'small';
    select_all_text?: string;
    dark?: boolean;
    handleChange: (check_boxes: CheckboxProps[]) => void;
    check_boxes: CheckboxProps[];
}

const CheckboxList = ({ check_boxes, size, dark, select_all_text = 'Select All', handleChange }: CheckboxListProps) => {
    const [check_boxes_array, setCheckBoxesArray] = useState(check_boxes);
    const [checked, setChecked] = useState(false);
    const [indetermine, setIndetermine] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const setSelectAllCheckBox = (checkbox_array: CheckboxProps[]) => {
        const checkCount = checkbox_array.filter((check_box) => check_box.check).length;
        if (checkCount === check_boxes.length || checkCount === 0) {
            setIndetermine(false);
            setChecked(checkCount ? true : false);
        } else {
            setChecked(false);
            setIndetermine(true);
        }
        checkbox_array.filter((check_box) => check_box.disabled).length === check_boxes.length
            ? setDisabled(true)
            : setDisabled(false);

        handleChange(check_boxes_array);
    };

    useEffect(() => {
        setSelectAllCheckBox(check_boxes_array);
    }, []);

    const handleIndividualCheckboxChange = (value_to_be_set: boolean, check_box_item: Partial<CheckboxProps>) => {
        const check_box_to_be_changed = check_boxes_array.find((check_box) => check_box === check_box_item);
        if (check_box_to_be_changed) {
            check_box_to_be_changed.check = value_to_be_set;
            setCheckBoxesArray(check_boxes_array);
            setSelectAllCheckBox(check_boxes_array);
        }
    };

    const handleSelectAllCheckbox = (check_status: boolean) => {
        const newCheckboxArray = [
            ...check_boxes_array.map((check_box_item) => {
                return {
                    ...check_box_item,
                    check: check_box_item.disabled ? check_box_item.check : check_status,
                };
            }),
        ];
        setCheckBoxesArray(newCheckboxArray);
        setSelectAllCheckBox(newCheckboxArray);
    };

    const SelectAllCheckBoxContainer = styled('div', {
        marginBottom: '1rem',
    });

    const CheckBoxListContainer = styled('div', {
        margin: '0 0 1rem 0.5rem',
    });

    return (
        <>
            <SelectAllCheckBoxContainer>
                <Checkbox
                    check={checked}
                    indetermine={indetermine}
                    dark={dark}
                    size={size}
                    disabled={disabled}
                    handleChange={(check: boolean) => handleSelectAllCheckbox(check)}
                >
                    {select_all_text}
                </Checkbox>
            </SelectAllCheckBoxContainer>
            {check_boxes_array.map((check_box: CheckboxProps, index: number) => (
                <CheckBoxListContainer key={index}>
                    <Checkbox
                        {...check_box}
                        check={check_box.check}
                        size={size}
                        dark={dark}
                        handleChange={(check: boolean) => handleIndividualCheckboxChange(check, check_box)}
                    >
                        {check_box.label}
                    </Checkbox>
                </CheckBoxListContainer>
            ))}
        </>
    );
};

export default CheckboxList;

type CheckboxListVariantProps = Stitches.VariantProps<typeof CheckboxList>;

export const CheckboxListStory = modifyVariantsForStory<
    CheckboxListVariantProps,
    CheckboxListProps,
    typeof CheckboxList
>(CheckboxList);
