import React from 'react';
import { styled } from 'Styles/stitches.config';
import Button from '../../button/button';
import Text from '../../text/text';
import ProductCard, { TProductType } from './components/product-card';

const ProductsContainer = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
});

export const StepChooseProductMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit }) => {
    const [selected_product, setSelectedProduct] = React.useState<TProductType>();
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

    const handleSelect = (_selected_product: TProductType) => {
        setSelectedProduct(_selected_product);
        (onSubmit as (values?: { [key: string]: unknown }) => void)({ _selected_product });
    };

    return (
        <>
            <Text as="div" type="subtitle-1" bold css={{ color: dark ? '$white' : '#333333', marginBottom: '8px' }}>
                Choose a product
            </Text>
            <Text
                as="div"
                type="paragraph-1"
                bold={false}
                css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
            >
                Choose a product to start.
            </Text>
            <ProductsContainer>
                {Object.keys(products).map((product, idx) => (
                    <ProductCard
                        key={idx + 1}
                        active={product === selected_product}
                        description={products[product as keyof typeof products].description}
                        onProductSelect={handleSelect}
                        title={products[product as keyof typeof products].title}
                        type={product as TProductType}
                    />
                ))}
            </ProductsContainer>
        </>
    );
};

export const StepAddAppMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Add an app
            </Text>
            <div>
                <Text
                    as="div"
                    type="paragraph-1"
                    bold={false}
                    css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                >
                    Choose an app to start.
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

export const StepCreateWalletMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Create Wallet
            </Text>
            <div>
                <Text
                    as="div"
                    type="paragraph-1"
                    bold={false}
                    css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                >
                    Create a wallet that can be linked to your choosen app.
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

export const StepWalletsOptions: React.FC<{ [key: string]: unknown }> = ({
    dark,
    onSubmit,
    children,
    currency_type = 'fiat',
}) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Wallet Options
            </Text>
            <div>
                <Text
                    as="div"
                    type="paragraph-1"
                    bold={false}
                    css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                >
                    These are all the options you get when choosing {currency_type} wallet.
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

export const StepChooseCurrencyMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Choose Currency
            </Text>
            <div>
                <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', margin: '24px 0 16px' }}>
                    Fiat currencies.
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

export const StepPersonalDetailsMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Personal Details
            </Text>
            <div>
                <Text
                    as="div"
                    type="paragraph-1"
                    bold={false}
                    css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                >
                    Please provide your information for verification purposes. If you give us inaccurate information,
                    you may be unable to make deposits or withdrawals.
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

export const StepAddressInfoMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Address Information
            </Text>
            <div>
                <Text
                    as="div"
                    type="paragraph-1"
                    bold={false}
                    css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                >
                    We need this for verification. If the information you provide is fake or inaccurate, you won’t be
                    able to deposit and withdraw.
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

export const StepTermsOfUseMain: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Terms Of Use
            </Text>
            <div>
                <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', margin: '24px 0 16px' }}>
                    Jurisdiction and choice of law
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

export const StepComplete: React.FC<{ [key: string]: unknown }> = ({ dark, onSubmit, children }) => {
    return (
        <>
            <Text as="div" type="subtitle-1" bold>
                Complete
            </Text>
            <div>
                <Text
                    as="div"
                    type="paragraph-1"
                    bold={false}
                    css={{ color: dark ? '#C2C2C2' : '#333333', marginTop: '59.5px', textAlign: 'center' }}
                >
                    You can now use your USD wallet with your Deriv USD Apps.
                </Text>
                <Button onClick={onSubmit as React.MouseEventHandler<HTMLButtonElement>}>{children}</Button>
            </div>
        </>
    );
};

type TTestStepContentProps = {
    onSubmit: (values?: { [key: string]: unknown }) => void;
    dark?: boolean;
};

export const TestStepContent: React.FC<TTestStepContentProps | { [key: string]: unknown }> = ({
    dark,
    onSubmit,
    children,
}) => <StepChooseProductMain onSubmit={onSubmit} />;
