import { ReactElement } from 'react';
import { styled } from 'Styles/stitches.config';
import AccordionCollapseIcon from '@assets/svg/accordion-collapse.svg';
import AccordionExpandIcon from '@assets/svg/accordion-expand.svg';
import AccordionSmallCollapseIcon from '@assets/svg/accordion-small-collapse.svg';
import AccordionSmallExpandIcon from '@assets/svg/accordion-small-expand.svg';

export type AccordionTitleProps = {
    children: ReactElement[] | ReactElement;
    expand_section?: boolean;
    size: 'medium' | 'small';
    dark: boolean;
    handleClick?: (expand: boolean) => void;
};

const Svg = styled('svg', {
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: '$greyLight700',
    verticalAlign: 'middle',
    width: 14,
    height: 8,
    variants: {
        size: {
            small: {
                width: 12,
                height: 6.5,
            },
        },
        dark: {
            true: {
                fill: '$greyDark100',
            },
        },
    },
});

const IconDiv = styled('div', {
    float: 'right',
    variants: {
        size: {
            small: {
                padding: '0 1rem 0 1rem',
            },
            medium: {
                padding: '0 1.5rem 0 1.5rem',
            },
        },
    },
});

const Header = styled('div', {
    width: '100%',
    variants: {
        size: {
            small: {
                padding: '1rem 0 1rem 1rem',
                '@mobile': {
                    padding: '0.5rem 0 0.5rem 0.5rem',
                },
            },
            medium: {
                padding: '1.5rem 0 1.5rem 1.5rem',
                '@mobile': {
                    padding: '1rem 0 1rem 1rem',
                },
            },
        },
    },
});

const HeaderDiv = styled('div', {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
});

const AccordionTitle = ({ children, expand_section, size, dark, handleClick }: AccordionTitleProps) => {
    const getAccordionIcon = () => {
        if (expand_section) {
            if (size === 'small') return AccordionSmallCollapseIcon;
            return AccordionCollapseIcon;
        }
        return size === 'small' ? AccordionSmallExpandIcon : AccordionExpandIcon;
    };

    return (
        <HeaderDiv onClick={() => (handleClick ? handleClick(!expand_section) : '')}>
            <Header size={size}>{children}</Header>
            <IconDiv size={size}>
                <Svg dark={dark}>
                    <use href={`${getAccordionIcon()}#accordion`} />
                </Svg>
            </IconDiv>
        </HeaderDiv>
    );
};

export default AccordionTitle;
