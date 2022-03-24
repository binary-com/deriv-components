import React from 'react';
import { styled } from 'Styles/stitches.config';
import Text from '../../../text/text';
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

export type TProductType = 'cfds' | 'multipliers' | 'options';
type TProductCard = {
    active: boolean;
    onProductSelect: (selected_product: 'cfds' | 'multipliers' | 'options') => void;
    type: TProductType;
};

const ProductCard = ({ active, onProductSelect, type }: TProductCard) => {
    let title, description;

    if (type === 'cfds') {
        title = 'CFDs';
        description = 'Trade with leverage and tight spreads for better returns on successful trades.';
    } else if (type === 'multipliers') {
        title = 'Multipliers';
        description = 'Combine the upside of CFDs with the simplicity of options.';
    } else if (type === 'options') {
        title = 'Options';
        description = "Earn fixed payouts by predicting an asset's price movement.";
    }

    const handleClick = () => {
        onProductSelect(type);
    };

    return (
        <ProductCardContainer type={type} onClick={handleClick}>
            <Text as="div" type="small" css={{ color: '$white', marginBottom: '8px' }}>
                {title}
            </Text>
            <ProductCardContentWrapper>
                <ProductCardIcon type={type} />
                <Text as="div" type="extra-small" css={{ color: '$white', width: '128px', height: '56px' }}>
                    {description}
                </Text>
            </ProductCardContentWrapper>
            {active && <ProductCardCheckIcon />}
        </ProductCardContainer>
    );
};

export default ProductCard;
