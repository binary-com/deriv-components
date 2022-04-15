import Checkbox from '@core/checkbox/checkbox';
import { MainComponentProps, RightPanelComponentProps } from '@core/wizard/desktop-wizard';
import React from 'react';
import { styled } from 'Styles/stitches.config';
import Button from '@core/button/button';
import Text from '@core/text/text';
import ProductCard, { ProductType } from './components/product-card';

const ProductsContainer = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
});

export const StepChooseProductMain = ({ onSubmit, values }: MainComponentProps) => {
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
        onSubmit({ selected_product });
    };

    return (
        <>
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
            <Text
                as="div"
                type="paragraph-1"
                css={{
                    height: '600px',
                    marginTop: '10px',
                    backgroundColor: 'LightGrey',
                }}
            >
                A very long content for scroll feature test...
            </Text>
        </>
    );
};

export const StepAddAppMain = ({ dark, onSubmit }: MainComponentProps) => {
    return (
        <>
            <Text as="p" type="paragraph-1" bold={false} css={{ color: dark ? '#C2C2C2' : '#333333' }}>
                {is_real ? 'Real' : 'Demo'} apps:
            </Text>
            <Button onClick={() => onSubmit({ app_type: is_real ? 'real' : 'demo' })}>
                Select a {is_real ? 'real' : 'demo'} app
            </Button>
        </>
    );
};

export const StepCreateWalletMain = ({ dark, onSubmit, values }: MainComponentProps) => {
    const fiat_currencies = ['aud', 'eur', 'gbp', 'usd'];
    const crypto_currencies = ['btc', 'eth', 'ltc', 'eusdt', 'usdt', 'usdc'];

    const onWalletSelection = (wallet_name: string) => {
        if (
            fiat_currencies.some((w) => w === wallet_name?.toLowerCase()) ||
            crypto_currencies.some((w) => w === wallet_name?.toLowerCase())
        ) {
            onSubmit({ wallet_name }, [{ step_title: 'Currency', should_be_disabled: true }]);
        } else {
            onSubmit({ wallet_name }, [{ step_title: 'Currency', should_be_disabled: false }]);
        }
    };

    const getMoreDetails = () => {
        return (
            <>
                <Text as="p" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333' }}>
                    Some additional details
                </Text>
            </>
        );
    };

    return (
        <>
            <Text as="p" type="paragraph-2" bold={false} css={{ color: dark ? '#C2C2C2' : '#333333' }}>
                If you choose a fiat or crypto wallet, the next step will be disabled (skipped). If you choose a payment
                agent wallet, the next step will be enabled.
            </Text>
            {['USD', 'BTC', 'payment_agent'].map((wallet_name, i) => (
                <label onClick={() => onWalletSelection(wallet_name)} key={i + 1}>
                    <Checkbox check={!!((values as { [key: string]: unknown })?.wallet_name === wallet_name)}>
                        <input style={{ visibility: 'hidden' }} type="radio" name="wallet_name" />
                        {wallet_name}
                    </Checkbox>
                </label>
            ))}
        </>
    );
};

export const StepChooseCurrencyMain = ({ onSubmit }: MainComponentProps) => (
    <Button onClick={() => onSubmit()}>Submit</Button>
);

export const StepPersonalDetailsMain = ({ dark, onSubmit }: MainComponentProps) => {
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
            <Button onClick={() => onSubmit()}>Submit</Button>
        </>
    );
};

export const StepAddressInfoMain = ({ dark, onSubmit }: MainComponentProps) => {
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
            <Button onClick={() => onSubmit()}>Submit</Button>
        </>
    );
};

export const StepTermsOfUseMain = ({ dark, onSubmit }: MainComponentProps) => {
    return (
        <>
            <Text as="div" type="paragraph-1" css={{ color: dark ? '#C2C2C2' : '#333333', margin: '24px 0 16px' }}>
                Jurisdiction and choice of law
            </Text>
            <Button onClick={() => onSubmit()}>Submit</Button>
        </>
    );
};

export const StepComplete = ({ dark }: MainComponentProps) => (
    <Text
        as="div"
        type="paragraph-1"
        bold={false}
        css={{ color: dark ? '#C2C2C2' : '#333333', marginTop: '59.5px', textAlign: 'center' }}
    >
        You can now use your USD wallet with your Deriv USD Apps.
        <Text
            as="p"
            type="paragraph-1"
            css={{
                height: '600px',
                backgroundColor: 'LightGrey',
            }}
        >
            A very long content for scroll feature test...
        </Text>
    </Text>
);

export const TestRightUpperComponent = ({ data, dark, current_step_index }: RightPanelComponentProps) => {
    return (
        <>
            <Text as="p" type="paragraph-2" css={{ color: dark ? '#C2C2C2' : '#333333' }}>
                Upper block test info. Data collected on each step can be used here.
            </Text>
            <p>Collected data: {JSON.stringify(data)}</p>
            <p>And current_step_index is: {current_step_index}</p>
        </>
    );
};

export const TestLongRightUpperComponent = ({ data, dark, current_step_index }: RightPanelComponentProps) => (
    <>
        <Text as="p" type="paragraph-2" css={{ color: dark ? '#C2C2C2' : '#333333' }}>
            Long upper block test info. Data collected on each step can be used here.
        </Text>
        <p>Collected data: {JSON.stringify(data)}</p>
        <p>And current_step_index is: {current_step_index}</p>
        <Text
            as="p"
            type="paragraph-1"
            css={{
                height: '600px',
                backgroundColor: 'LightGrey',
            }}
        >
            A very long content for scroll feature test...
        </Text>
    </>
);

export const TestRightMiddleComponent = ({ data, dark, current_step_index }: RightPanelComponentProps) => (
    <Text as="div" type="paragraph-2" css={{ color: dark ? '#C2C2C2' : '#333333' }}>
        Middle block.
        <div>Collected data: {JSON.stringify(data)}</div>
        <div>And current_step_index is: {current_step_index}</div>
    </Text>
);

export const TestRightLowerComponent = ({ data, dark, current_step_index }: RightPanelComponentProps) => (
    <Text as="div" type="paragraph-2" css={{ color: dark ? '#C2C2C2' : '#333333' }}>
        Lower block.
        <div>Collected data: {JSON.stringify(data)}</div>
        <div>And current_step_index is: {current_step_index}</div>
    </Text>
);

const ToggleButton = styled('button', {
    width: '96px',
    height: '32px',
    borderRadius: '4px',
    background: 'transparent',
    color: '#999999',
    border: 'none',

    variants: {
        dark: {
            true: {
                background: 'transparent',

                '*': {
                    color: '#6E6E6E',
                },
            },
        },
        pressed: {
            true: {
                background: '$white',

                '*': {
                    color: '#333333',
                },
            },
        },
    },
    compoundVariants: [
        {
            dark: true,
            pressed: true,
            css: {
                background: '#323738',

                '*': {
                    color: '$white',
                },
            },
        },
    ],
});
