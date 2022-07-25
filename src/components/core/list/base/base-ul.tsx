import { styled } from 'Styles/stitches.config';

const BaseUnorderedList = styled('ul', {
    margin: 0,
    padding: 0,
    color: '$greyLight700',
    '& li': {
        margin: '8px 0px',
        '@mobile': {
            margin: '4px 0px',
        },
    },

    variants: {
        size: {
            small: {
                fontSize: '$3xs',
                '@mobile': {
                    fontSize: '$4xs',
                },
            },
            medium: {
                fontSize: '$2xs',
                '@mobile': {
                    fontSize: '$3xs',
                },
            },
            large: {
                fontSize: '$xs',
                '@mobile': {
                    fontSize: '$2xs',
                },
            },
        },
        dark: {
            true: {
                color: '$greyDark100',
            },
        },
    },
    defaultVariants: {
        size: 'medium',
        dark: false,
    },
});

export default BaseUnorderedList;
