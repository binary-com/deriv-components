import { Content as PrimitiveContent } from '@radix-ui/react-dialog';
import { styled } from 'Styles/stitches.config';
import { contentHide, contentShow } from '../keyframes';

const ModalContentContainer = styled(PrimitiveContent, {
    backgroundColor: '$greyLight100',
    borderRadius: 6,
    boxShadow: '0 32px 64px rgba(14,14,14,0.14)',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90vw',
    padding: '0px',

    '@media (prefers-reduced-motion: no-preference)': {
        '&[data-state="open"]': {
            animation: `${contentShow} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
        },
        '&[data-state="closed"]': {
            animation: `${contentHide} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
        },
    },
    '&:focus': { outline: 'none' },

    // TODO: remove this after setting up the css reset
    '& > *': {
        boxSizing: 'border-box',
    },
    // TODO: remove this after setting up the css reset
    '& > hr': {
        margin: 0,
    },

    variants: {
        dark: {
            true: {
                backgroundColor: '$greyDark600',
            },
        },
        type: {
            dialog: {
                width: '440px',
                '@mobile': {
                    width: '328px',
                },
            },
            page: {},
        },
    },
    defaultVariants: {
        type: 'dialog',
    },
});

export default ModalContentContainer;
