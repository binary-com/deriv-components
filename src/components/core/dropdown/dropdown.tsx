import React, { forwardRef, Fragment, InputHTMLAttributes, ReactNode, useState, useRef, useEffect } from 'react';
import { styled } from 'Styles/stitches.config';

const DropdownContainer = styled('div', {});

const DropdownFieldSection = styled('section', {});

const HelperSection = styled('section', {});

const SupportingInfoSection = styled('div', {});

const InputField = styled('input', {});

const Dropdown = ({ inline_prefix_element, label, list }) => {
    return (
        <DropdownContainer>
            <DropdownFieldSection>
                {inline_prefix_element && <SupportingInfoSection>{inline_prefix_element}</SupportingInfoSection>}
                <InputField
                    {...props}
                    dark={dark}
                    type="text"
                    value={value}
                    readonly={Boolean(props.readOnly)}
                    readOnly={Boolean(props.readOnly)}
                    disabled={Boolean(props.disabled)}
                    onChange={handleTextChange}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                    onKeyDown={onKeyDownHandler}
                    onKeyUp={onKeyUpHandler}
                />
                {inline_suffix_element && <SupportingInfoSection>{inline_suffix_element}</SupportingInfoSection>}
                <SupportingInfoSection>{inline_suffix_element}</SupportingInfoSection>
                {label && (
                    <LabelSection
                        active={is_active}
                        has_badges={Boolean(badges.length)}
                        readonly={Boolean(props.readOnly)}
                        htmlFor={id}
                        dark={dark}
                        css={styleLabelFloat()}
                    >
                        {label}
                    </LabelSection>
                )}
            </DropdownFieldSection>
            {has_helper_section && (
                <HelperSection error={Boolean(error)} dark={dark}>
                    {generateHintText()}
                </HelperSection>
            )}
        </DropdownContainer>
    );
};

export default Dropdown;
