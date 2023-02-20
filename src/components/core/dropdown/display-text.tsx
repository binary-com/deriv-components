import React from 'react';
import Text from '@core/text/text';
import { TListItem } from './types';
import { styled } from 'Styles/stitches.config';

type TDisplayText = {
    dark: boolean;
    has_prefix_element?: boolean;
    list: TListItem[];
    placeholder?: string;
    value?: string;
};

export const getDisplayText = (list: TListItem[], value?: string): Partial<TListItem> => {
    const findItemInArray = (arr_list: TListItem[]) => arr_list.find((item) => item.value === value) || {};
    let item = {};
    if (Array.isArray(list)) {
        item = findItemInArray(list);
    } else {
        Object.keys(list).some((key) => {
            item = findItemInArray(list[key]);
            return item;
        });
    }
    return item;
};

/* 
    DisplayTextContainer - This acts as a wrapper and styles item value, subtitle and trailing label
*/
const DisplayTextContainer = styled('div', {
    width: '100%',
    display: 'flex',
    columnGap: '0.5rem',
    justifyContent: 'space-between',

    variants: {
        has_prefix_element: {
            true: {
                paddingLeft: '0.5rem',
                paddingRight: '1rem',
            },
            false: {
                paddingRight: '1rem',
            },
        },
        has_trailing_label: {
            true: {},
        },
    },

    compoundVariants: [
        {
            has_prefix_element: true,
            has_trailing_label: true,
            css: {
                paddingRight: '0.5rem',
            },
        },
    ],
});

/* 
    DisplaySection - This section displays item value and subtitle
*/
const DisplaySection = styled('div', {
    display: 'flex',
    flexDirection: 'column',
});

/* 
    TrailingLabel - This acts as a trailing label
*/
const TrailingLabel = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const DisplayText = ({ dark, has_prefix_element, list, value }: TDisplayText) => {
    const { subtitle, trailing_label, text } = getDisplayText(list, value);

    return (
        <DisplayTextContainer has_prefix_element={has_prefix_element} has_trailing_label={!!trailing_label}>
            {text && (
                <DisplaySection>
                    <Text
                        type="paragraph-2"
                        color={dark && !trailing_label ? 'general' : 'prominent'}
                        css={{ margin: 0 }}
                    >
                        {text}
                    </Text>
                    {subtitle && (
                        <Text type="extra-small" color="less-prominent" css={{ margin: 0 }}>
                            {subtitle}
                        </Text>
                    )}
                </DisplaySection>
            )}
            {trailing_label && (
                <TrailingLabel>
                    <Text type="paragraph-2" color="general" css={{ margin: 0 }}>
                        {trailing_label}
                    </Text>
                </TrailingLabel>
            )}
        </DisplayTextContainer>
    );
};

export default DisplayText;
