import { useState, useEffect } from 'react';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import AccordionCollapseIcon from '@assets/svg/accordion-collapse.svg';
import AccordionExpandIcon from '@assets/svg/accordion-expand.svg';
import AccordionSmallCollapseIcon from '@assets/svg/accordion-small-collapse.svg';
import AccordionSmallExpandIcon from '@assets/svg/accordion-small-expand.svg';

type AccordionProps = {
    title_content: React.ReactNode;
    main_content: React.ReactNode;
    dark: boolean;
    elevation_type: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
    is_expanded: boolean;
    size: 'medium' | 'small';
    type: 'bottomBorder' | 'container' | 'containerWithBorder' | 'containerWithShadow';
};

const AccordionDiv = styled('div', {
    variants: {
        elevation_type: {
            xs: {
                boxShadow: 'none',
            },
            sm: {
                boxShadow: 'none',
            },
            md: {
                boxShadow: 'none',
            },
            lg: {
                boxShadow: 'none',
            },
            xl: {
                boxShadow: 'none',
            },
            xxl: {
                boxShadow: 'none',
            },
            xxxl: {
                boxShadow: 'none',
            },
        },
        type: {
            bottomBorder: {
                borderBottom: '1px solid $greyLight300',
            },
            container: {
                borderRadius: '24px',
            },
            containerWithBorder: {
                borderRadius: '8px',
                border: '1px solid $greyLight300',
            },
            containerWithShadow: {
                boxShadow: '$xs',
            },
        },
        dark: {
            true: {
                borderColor: '$greyDark500',
            },
        },
    },
    compoundVariants: [
        {
            type: 'bottomBorder',
            dark: true,
            css: {
                borderColor: '$greyDark500',
            },
        },
        {
            type: 'containerWithBorder',
            dark: true,
            css: {
                borderColor: '$greyDark500',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'xs',
            css: {
                boxShadow: '$xs',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'sm',
            css: {
                boxShadow: '$sm',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'md',
            css: {
                boxShadow: '$md',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'lg',
            css: {
                boxShadow: '$lg',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'xl',
            css: {
                boxShadow: '$xl',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'xxl',
            css: {
                boxShadow: '$xxl',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'xxxl',
            css: {
                boxShadow: '$xxxl',
            },
        },
    ],
});

const Svg = styled('svg', {
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/2000/svg',
    fill: '$greyLight700',
    verticalAlign: 'middle',
    width: 14,
    height: 8,
    variants: {
        dark: {
            true: {
                fill: '$greyDark100',
            },
        },
    },
});

const IconDiv = styled('div', {
    float: 'right',
    cursor: 'pointer',
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

const Content = styled('div', {
    display: 'none',
    opacity: 0,
    variants: {
        expand: {
            true: {
                display: 'block',
                opacity: 1,
            },
        },
        size: {
            small: {
                padding: '0 1rem 1rem',
                '@mobile': {
                    padding: '0 0.5rem 0.5rem',
                },
            },
            medium: {
                padding: '0 1.5rem 1.5rem',
                '@mobile': {
                    padding: '0 1rem 1rem',
                },
            },
        },
    },
});

const HeaderDiv = styled('div', {
    display: 'flex',
    alignItems: 'center',
});

const Accordion = ({
    title_content,
    type,
    size,
    dark,
    is_expanded = false,
    main_content,
    elevation_type = 'xs',
}: AccordionProps) => {
    const [expand_section, setExpandSection] = useState(is_expanded);

    useEffect(() => {
        setExpandSection(expand_section);
    }, [expand_section]);

    const getAccordionIcon = () => {
        if (expand_section) {
            if (size === 'small') return AccordionSmallCollapseIcon;
            return AccordionCollapseIcon;
        }

        return size === 'small' ? AccordionSmallExpandIcon : AccordionExpandIcon;
    };

    return (
        <AccordionDiv type={type} dark={dark} elevation_type={elevation_type}>
            <HeaderDiv>
                <Header size={size}>{title_content}</Header>
                <IconDiv size={size} onClick={() => setExpandSection(!expand_section)}>
                    <Svg dark={dark}>
                        <use href={`${getAccordionIcon()}#accordion`} />
                    </Svg>
                </IconDiv>
            </HeaderDiv>
            <Content expand={expand_section} size={size}>
                {main_content}
            </Content>
        </AccordionDiv>
    );
};

export default Accordion;

type AccordionVariantProps = Stitches.VariantProps<typeof Accordion>;

export const AccordionStory = modifyVariantsForStory<AccordionVariantProps, AccordionProps, typeof Accordion>(
    Accordion,
);
