import { styled } from 'Styles/stitches.config';
import Text from '@core/text/text';
import CFDsIcon from '@assets/svg/wizard/ic-cfds-logo.svg';
import CFDsBackground from '@assets/svg/wizard/cfds-background.svg';
import MultipliersIcon from '@assets/svg/wizard/ic-multipliers-logo.svg';
import MultipliersBackground from '@assets/svg/wizard/multipliers-background.svg';
import OptionsIcon from '@assets/svg/wizard/ic-options-logo.svg';
import OptionsBackground from '@assets/svg/wizard/options-background.svg';
import WhiteCircularCheckIcon from '@assets/svg/circular-check-icon-white.svg';

const ProductCardContainer = styled('div', {
    width: '200px',
    height: '120px',
    position: 'relative',
    borderRadius: '8px',
    padding: '16px',
    boxSizing: 'border-box',

    '&:hover': {
        cursor: 'pointer',
    },

    variants: {
        type: {
            cfds: {
                background: `url(${CFDsBackground}) no-repeat center`,
            },
            multipliers: {
                background: `url(${MultipliersBackground}) no-repeat center`,
            },
            options: {
                background: `url(${OptionsBackground}) no-repeat center`,
            },
        },
    },
});
const ProductCardCheckIcon = styled('div', {
    width: '16px',
    height: '16px',
    position: 'absolute',
    top: '8px',
    right: '8px',
    background: `transparent url(${WhiteCircularCheckIcon}) no-repeat center`,
    borderRadius: '50%',
    borderColor: '#FF444F',
});
const ProductCardIcon = styled('div', {
    width: '32px',
    height: '32px',

    variants: {
        type: {
            cfds: {
                background: `url(${CFDsIcon}) no-repeat center`,
            },
            multipliers: {
                background: `url(${MultipliersIcon}) no-repeat center`,
            },
            options: {
                background: `url(${OptionsIcon}) no-repeat center`,
            },
        },
    },
});
const ProductCardContentWrapper = styled('div', {
    display: 'flex',
    gap: '16px',
});

export type ProductType = 'cfds' | 'multipliers' | 'options';
type ProductCardProps = {
    active: boolean;
    description: string;
    onProductSelect: (selected_product: string) => void;
    title: string;
    type: string;
};

const ProductCard = ({ active, description, onProductSelect, title, type }: ProductCardProps) => {
    const handleClick = () => {
        onProductSelect(type);
    };

    return (
        <ProductCardContainer type={type as ProductType} onClick={handleClick} data-testid="product-card">
            <Text as="div" type="small" css={{ color: '$white', marginBottom: '8px' }}>
                {title}
            </Text>
            <ProductCardContentWrapper>
                <ProductCardIcon type={type as ProductType} />
                <Text as="div" type="extra-small" css={{ color: '$white', width: '128px', height: '56px' }}>
                    {description}
                </Text>
            </ProductCardContentWrapper>
            {active && <ProductCardCheckIcon />}
        </ProductCardContainer>
    );
};

export default ProductCard;
