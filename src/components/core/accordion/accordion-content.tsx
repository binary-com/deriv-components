import { ReactElement } from 'react';
import { styled } from 'Styles/stitches.config';

export type AccordionContentProps = {
    children: ReactElement[] | ReactElement;
    expand_section: boolean;
    size: 'medium' | 'small';
};

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

const AccordionContent = ({ children, expand_section, size }: AccordionContentProps) => {
    return (
        <Content expand={expand_section} size={size}>
            {children}
        </Content>
    );
};

export default AccordionContent;
