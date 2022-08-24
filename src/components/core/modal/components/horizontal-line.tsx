import { styled } from 'Styles/stitches.config';

const HorizontalLine = styled('hr', {
    border: 0,
    borderTop: '1px solid $greyLight200',
    variants: {
        dark: {
            true: {
                borderTopColor: '$greyDark800',
            },
        },
    },
});

export default HorizontalLine;
