import { Children, useState, useEffect, ReactElement, cloneElement, HTMLAttributes } from 'react';
import * as Stitches from '@stitches/react';
import { styled } from 'Styles/stitches.config';
import { modifyVariantsForStory } from 'Styles/type-utils';
import AccordionTitle from './accordion-title';
import AccordionContent from './accordion-content';
import useTheme from '@core/theme-context/use-theme';
import { TElevationType } from 'types/elevation.type';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactElement[];
    expand_section: boolean;
    elevation_type: TElevationType;
    type: 'bottomBorder' | 'container' | 'containerWithBorder' | 'containerWithShadow';
    onToggle: (expand: boolean) => void;
}

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
                elevationBoxShadow: 'xs',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'sm',
            css: {
                elevationBoxShadow: 'sm',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'md',
            css: {
                elevationBoxShadow: 'md',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'lg',
            css: {
                elevationBoxShadow: 'lg',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'xl',
            css: {
                elevationBoxShadow: 'xl',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'xxl',
            css: {
                elevationBoxShadow: 'xxl',
            },
        },
        {
            type: 'containerWithShadow',
            elevation_type: 'xxxl',
            css: {
                elevationBoxShadow: 'xxxl',
            },
        },
    ],
});

const Accordion = ({ type, children, elevation_type = 'xs', expand_section, onToggle, ...props }: AccordionProps) => {
    const [toggle_accordion, setToggleAccordion] = useState(expand_section);
    const { isDark } = useTheme();

    useEffect(() => {
        setToggleAccordion(expand_section);
    }, [expand_section]);

    const handleClick = () => {
        const current_state = toggle_accordion;
        setToggleAccordion((prev_state) => !prev_state);
        onToggle(!current_state);
    };

    return (
        <AccordionDiv type={type} dark={isDark} elevation_type={elevation_type} {...props}>
            {Children.map(children, (child) => {
                if (child) {
                    return cloneElement(child, { expand_section: toggle_accordion, onClick: handleClick });
                }
            })}
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
