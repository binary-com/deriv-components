import React from 'react';
import Text from '@core/text/text';
import { TListItem } from '../types';
import { styled } from 'Styles/stitches.config';
import { TDisplayText } from '../types';

const getDisplayText = (list: TListItem[], value?: string | number): Partial<TListItem> => {
    return list.find((item) => item.value === value) || {};
};

/* 
    DisplayTextContainer - This acts as a wrapper and styles icon, item value, subtitle and trailing label
*/
const DisplayTextContainer = styled('div', {
    width: '100%',

    variants: {
        is_text_string_type: {
            true: {
                paddingRight: '1rem',
            },
            false: {
                paddingRight: '0.5rem',
            },
        },
    },
});

const DisplayText = ({ dark, list, value }: TDisplayText) => {
    const { text } = getDisplayText(list, value);

    return (
        <DisplayTextContainer is_text_string_type={typeof text === 'string'}>
            {text && (
                <Text color={dark ? 'general' : 'prominent'} css={{ margin: 0 }} type="paragraph-2">
                    {text}
                </Text>
            )}
        </DisplayTextContainer>
    );
};

export default DisplayText;
