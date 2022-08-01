import { styled } from 'Styles/stitches.config';

const StyledLi = styled('li', {
    padding: 0,
    variants: {
        type: {
            numbered: {
                listStyleType: 'decimal',
                paddingLeft: '4px',
            },
            bulleted: {
                listStyleType: 'disc',
                paddingLeft: '4px',
            },
            checklist: {
                listStyleType: 'none',
                paddingLeft: '4px',
            },
            compound: {
                listStyleType: 'none',
            },
        },
    },

    defaultVariants: {
        type: 'bulleted',
    },
});

export default StyledLi;
