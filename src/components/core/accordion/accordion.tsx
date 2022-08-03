import { useState, useEffect, ReactElement } from 'react';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import AccordionTitle from './accordion-title';
import AccordionContent from './accordion-content';

type AccordionProps = {
    title_content: ReactElement;
    main_content: ReactElement;
    children?: ReactElement[] | ReactElement;
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

    return (
        <AccordionDiv type={type} dark={dark} elevation_type={elevation_type}>
            <Accordion.Title
                size={size}
                dark={dark}
                expand_section={expand_section}
                handleClick={() => setExpandSection(!expand_section)}
            >
                {title_content}
            </Accordion.Title>
            <Accordion.Content expand_section={expand_section} size={size}>
                {main_content}
            </Accordion.Content>
        </AccordionDiv>
    );
};

Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

export default Accordion;

type AccordionVariantProps = Stitches.VariantProps<typeof Accordion>;

export const AccordionStory = modifyVariantsForStory<AccordionVariantProps, AccordionProps, typeof Accordion>(
    Accordion,
);
