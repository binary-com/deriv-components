import React from 'react';
import Text from '@core/text/text';
import { styled } from 'Styles/stitches.config';

/* 
    DisplayTextContainer - This acts as a wrapper and styles icon, item value, subtitle and trailing label
*/
const DisplayTextContainer = styled('div', {
    width: '100%',
    display: 'flex',
});

/* 
    DisplaySection - This section displays item value and subtitle
*/
const DisplaySection = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '0.5rem',
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

type TAccountoption = {
    dark: boolean;
    icon: JSX.Element;
    trailing_label: string;
    title: string;
    subtitle: string;
};

const AccountOption = ({ dark, icon, trailing_label, title, subtitle }: TAccountoption) => {
    return (
        <DisplayTextContainer>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            {title && (
                <DisplaySection>
                    <Text
                        color={dark && !trailing_label ? 'general' : 'prominent'}
                        css={{ margin: 0 }}
                        type="paragraph-2"
                    >
                        {title}
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

export default AccountOption;
