import React from 'react';
import { styled } from 'Styles/stitches.config';
import Button from '../../button/button';
import Text from '../../text/text';
import ProductCard, { TProductType } from './components/product-card';

export type TBodyComponentProps = {
    dark?: boolean;
    is_more_info_shown?: boolean;
    onSubmit: (values?: { [key: string]: unknown }) => void;
    setIsMoreInfoShown?: (is_more_info_shown: boolean) => void;
    setIsNextStepDisabled?: (should_disable_next_step: boolean) => void;
    values?: { [key: string]: unknown };
};

const ProductsContainer = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
});

export const StepChooseProductMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, values }) => {
    const products = {
        cfds: {
            title: 'CFDs',
            description: 'Trade with leverage and tight spreads for better returns on successful trades.',
        },
        multipliers: {
            title: 'Multipliers',
            description: 'Combine the upside of CFDs with the simplicity of options.',
        },
        options: {
            title: 'Options',
            description: "Earn fixed payouts by predicting an asset's price movement.",
        },
    };

    const handleSelect = (selected_product: TProductType) => {
        (onSubmit as (values?: { [key: string]: unknown }) => void)({ selected_product });
    };

    return (
        <ProductsContainer>
            {Object.keys(products).map((product, idx) => (
                <ProductCard
                    key={idx + 1}
                    active={product === (values as { [key: string]: unknown })?.selected_product}
                    description={products[product as keyof typeof products].description}
                    onProductSelect={handleSelect}
                    title={products[product as keyof typeof products].title}
                    type={product as TProductType}
                />
            ))}
        </ProductsContainer>
    );
};

export const StepAddAppMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit }) => (
    <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
);

export const StepCreateWalletMain: React.FC<{ [key: string]: unknown }> = ({
    dark,
    onSubmit,
    setIsNextStepDisabled,
    setIsMoreInfoShown,
    is_more_info_shown,
}) => {
    const handleInfoIconClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        (setIsMoreInfoShown as (is_more_info_shown: boolean) => void)(true);
    };
    const onFiatOrCryptoClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        (onSubmit as (values?: { [key: string]: unknown }) => void)();
        (setIsNextStepDisabled as (should_disable_next_step: boolean) => void)(true);
    };
    const onPaymentAgentClick: React.MouseEventHandler<HTMLButtonElement> = () => {
        (onSubmit as (values?: { [key: string]: unknown }) => void)();
        (setIsNextStepDisabled as (should_disable_next_step: boolean) => void)(false);
    };

    return is_more_info_shown ? (
        <>
            <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}>
                E-wallets
            </Text>
            <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}>
                Bankwire
            </Text>
        </>
    ) : (
        <>
            <Button color={'secondary'} dark={dark as boolean} onClick={handleInfoIconClick}>
                More Info
            </Button>
            <Button onClick={onFiatOrCryptoClick}>Choose fiat or crypto to disable next step</Button>
            <Button onClick={onPaymentAgentClick}>Choose payment agent wallet</Button>
        </>
    );
};

export const StepChooseCurrencyMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => (
    <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
);

export const StepPersonalDetailsMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text
                as="div"
                type="paragraph-2"
                bold={false}
                css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
            >
                Please provide your information for verification purposes. If you give us inaccurate information, you
                may be unable to make deposits or withdrawals.
            </Text>
            <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
        </>
    );
};

export const StepAddressInfoMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text
                as="div"
                type="paragraph-2"
                bold={false}
                css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
            >
                We need this for verification. If the information you provide is fake or inaccurate, you won’t be able
                to deposit and withdraw.
            </Text>
            <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
        </>
    );
};

export const StepTermsOfUseMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', margin: '24px 0 16px' }}>
                Jurisdiction and choice of law
            </Text>
            <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
        </>
    );
};

export const StepComplete: React.FC<{ [key: string]: unknown }> = ({ dark }) => (
    <Text
        as="div"
        type="paragraph-1"
        bold={false}
        css={{ color: dark ? '#C2C2C2' : '#333333', marginTop: '59.5px', textAlign: 'center' }}
    >
        You can now use your USD wallet with your Deriv USD Apps.
    </Text>
);
