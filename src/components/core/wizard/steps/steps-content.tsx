import Checkbox from '@core/checkbox/checkbox';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import Button from '../../button/button';
import Text from '../../text/text';
import ProductCard, { ProductType } from './components/product-card';

export type MainComponentProps = {
    dark?: boolean;
    more_details_type?: string;
    onSubmit: (values?: { [key: string]: unknown }) => void;
    setMoreDetailsType?: (more_details_type: string) => void;
    setIsNextStepDisabled?: (should_disable_next_step: boolean) => void;
    values?: { [key: string]: unknown };
};

const ProductsContainer = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
});

export const StepChooseProductMain = ({ onSubmit, values }: { [key: string]: unknown }) => {
    const products = [
        {
            title: 'CFDs',
            description: 'Trade with leverage and tight spreads for better returns on successful trades.',
        },
        {
            title: 'Multipliers',
            description: 'Combine the upside of CFDs with the simplicity of options.',
        },
        {
            title: 'Options',
            description: "Earn fixed payouts by predicting an asset's price movement.",
        },
    ];

    const handleSelect = (selected_product: ProductType) => {
        (onSubmit as (values?: { [key: string]: unknown }) => void)({ selected_product });
    };

    return (
        <ProductsContainer>
            {products.map(({ title, description }, idx) => (
                <ProductCard
                    key={idx + 1}
                    active={title.toLowerCase() === (values as { [key: string]: unknown })?.selected_product}
                    description={description}
                    onProductSelect={handleSelect}
                    title={title}
                    type={title.toLowerCase() as ProductType}
                />
            ))}
        </ProductsContainer>
    );
};

export const StepAddAppMain = ({ onSubmit }: { [key: string]: unknown }) => (
    <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
);

export const StepCreateWalletMain = ({
    dark,
    onSubmit,
    setIsNextStepDisabled,
    setMoreDetailsType,
    more_details_type,
    values,
}: {
    [key: string]: unknown;
}) => {
    const fiat_currencies = ['aud', 'eur', 'gbp', 'usd'];
    const crypto_currencies = ['btc', 'eth', 'ltc', 'eusdt', 'usdt', 'usdc'];

    const handleInfoIconClick = (details_type: string) => {
        (setMoreDetailsType as (more_details_type: string) => void)(details_type);
    };

    const onWalletSelection = (wallet_name: string) => {
        if (
            fiat_currencies.some((w) => w === wallet_name?.toLowerCase()) ||
            crypto_currencies.some((w) => w === wallet_name?.toLowerCase())
        ) {
            (setIsNextStepDisabled as (should_disable_next_step: boolean) => void)(true);
        } else {
            (setIsNextStepDisabled as (should_disable_next_step: boolean) => void)(false);
        }
        (onSubmit as (values?: { [key: string]: unknown }) => void)({ wallet_name });
    };

    const getMoreDetails = () => {
        if (more_details_type === 'fiat_currency_wallets') {
            return (
                <>
                    <Text
                        as="div"
                        type="paragraph-1"
                        css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                    >
                        E-wallets
                    </Text>
                    <Text
                        as="div"
                        type="paragraph-1"
                        css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}
                    >
                        Bankwire
                    </Text>
                </>
            );
        }
        return (
            <>
                <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', marginBottom: '24px' }}>
                    Some additional details
                </Text>
            </>
        );
    };

    return more_details_type ? (
        getMoreDetails()
    ) : (
        <>
            <Button
                color="secondary"
                dark={dark as boolean}
                onClick={() => handleInfoIconClick('fiat_currency_wallets')}
            >
                More Info about fiat currency wallets
            </Button>
            <Button color="secondary" dark={dark as boolean} onClick={() => handleInfoIconClick('something_else')}>
                More Info about something else
            </Button>
            <Text
                as="div"
                type="paragraph-2"
                bold={false}
                css={{ color: dark ? '#C2C2C2' : '#333333', margin: '24px' }}
            >
                If you choose a fiat or crypto wallet, the next step will be disabled (skipped). If you choose a payment
                agent wallet, the next step will be enabled.
            </Text>
            {['USD', 'BTC', 'payment_agent'].map((wallet_name, i) => (
                <label onClick={() => onWalletSelection(wallet_name)} key={i + 1}>
                    <Checkbox check={!!((values as { [key: string]: unknown })?.wallet_name === wallet_name)}>
                        <input style={{ visibility: 'hidden' }} type="radio" name={'wallet_name'} />
                        {wallet_name}
                    </Checkbox>
                </label>
            ))}
        </>
    );
};

export const StepChooseCurrencyMain = ({ onSubmit }: { [key: string]: unknown }) => (
    <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
);

export const StepPersonalDetailsMain = ({ dark, onSubmit }: { [key: string]: unknown }) => {
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

export const StepAddressInfoMain = ({ dark, onSubmit }: { [key: string]: unknown }) => {
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

export const StepTermsOfUseMain = ({ dark, onSubmit }: { [key: string]: unknown }) => {
    return (
        <>
            <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', margin: '24px 0 16px' }}>
                Jurisdiction and choice of law
            </Text>
            <Button onClick={() => (onSubmit as (values?: { [key: string]: unknown }) => void)()}>Submit</Button>
        </>
    );
};

export const StepComplete = ({ dark }: { [key: string]: unknown }) => (
    <Text
        as="div"
        type="paragraph-1"
        bold={false}
        css={{ color: dark ? '#C2C2C2' : '#333333', marginTop: '59.5px', textAlign: 'center' }}
    >
        You can now use your USD wallet with your Deriv USD Apps.
    </Text>
);

export const TestRightUpperComponent = ({ data, dark }: { [key: string]: unknown }) => (
    <Text as="div" type="paragraph-1" bold={false} css={{ color: dark ? '#C2C2C2' : '#333333' }}>
        Upper block test info. Data collected on each step can be used here.
        <div>Collected data: {JSON.stringify(data)}</div>
    </Text>
);

export const TestRightMiddleComponent = ({ data, dark }: { [key: string]: unknown }) => (
    <Text as="div" type="paragraph-1" bold={false} css={{ color: dark ? '#C2C2C2' : '#333333' }}>
        Middle block test info. Data collected on each step can be used here.
        <div>Collected data: {JSON.stringify(data)}</div>
    </Text>
);

export const TestRightLowerComponent = ({ data, dark }: { [key: string]: unknown }) => (
    <Text as="div" type="paragraph-1" bold={false} css={{ color: dark ? '#C2C2C2' : '#333333' }}>
        Lower block test info. Data collected on each step can be used here.
        <div>Collected data: {JSON.stringify(data)}</div>
    </Text>
);
