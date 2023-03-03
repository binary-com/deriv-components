import React from 'react';
import Text from '@core/text/text';
import { TListItem } from './types';
import { styled } from 'Styles/stitches.config';

type TDisplayText = {
    dark: boolean;
    has_prefix_element?: boolean;
    list: TListItem[];
    value?: string;
};

export const getDisplayText = (list: TListItem[], value?: string): Partial<TListItem> => {
    return list.find((item) => item.value === value) || {};
};

/* 
    DisplayTextContainer - This acts as a wrapper and styles icon, item value, subtitle and trailing label
*/
const DisplayTextContainer = styled('div', {
    width: '100%',
    display: 'flex',
    columnGap: '0.5rem',

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
    marginLeft: 'auto',
});

/* 
    IconWrapper - This acts as an icon wrapper
*/
const IconWrapper = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const DisplayText = ({ dark, has_prefix_element, list, value }: TDisplayText) => {
    const { icon, subtitle, text, trailing_label } = getDisplayText(list, value);

    return (
        <DisplayTextContainer has_prefix_element={has_prefix_element} has_trailing_label={!!trailing_label}>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            {text && (
                <DisplaySection>
                    <Text
                        color={dark && !trailing_label ? 'general' : 'prominent'}
                        css={{ margin: 0 }}
                        type="paragraph-2"
                    >
                        {text}
                    </Text>
                    {subtitle && (
                        <Text color="less-prominent" css={{ margin: 0 }} type="extra-small">
                            {subtitle}
                        </Text>
                    )}
                </DisplaySection>
            )}
            {trailing_label && (
                <TrailingLabel>
                    <Text color="general" css={{ margin: 0 }} type="paragraph-2">
                        {trailing_label}
                    </Text>
                </TrailingLabel>
            )}
        </DisplayTextContainer>
    );
};

export default DisplayText;
