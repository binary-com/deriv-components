import Checkbox from '@core/checkbox/checkbox';
import { styled } from 'Styles/stitches.config';
import Button from '@core/button/button';
import Text from '@core/text/text';
import ProductCard from './components/product-card';

type StepChooseProductMainProps = {
    product_type?: string;
    onSelect: (product_type: string) => void;
};

type StepAddAppMainProps = {
    account_type?: string;
    onSelect: (account_type: string) => void;
};

type StepCreateWalletMainProps = {
    wallet?: string;
    onSelect: (wallet: string) => void;
};

type RightPanelComponentProps = {
    current_step_index?: number;
};

const ProductsContainer = styled('div', {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
});

export const StepChooseProductMain = ({ product_type, onSelect }: StepChooseProductMainProps) => {
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

    const handleSelect = (selected_product: string) => {
        onSelect(selected_product);
    };

    return (
        <>
            <ProductsContainer>
                {products.map(({ title, description }, idx) => (
                    <ProductCard
                        key={idx + 1}
                        active={title.toLowerCase() === product_type}
                        description={description}
                        onProductSelect={handleSelect}
                        title={title}
                        type={title.toLowerCase()}
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

export const StepAddAppMain = ({ account_type, onSelect }: StepAddAppMainProps) => {
    return (
        <>
            <Text as="p" type="paragraph-1" bold={false}>
                Selected account type: {account_type}
            </Text>
            <Button onClick={() => onSelect('demo')}>Select Demo</Button>
        </>
    );
};

export const StepCreateWalletMain = ({ wallet, onSelect }: StepCreateWalletMainProps) => {
    const fiat_currencies = ['aud', 'eur', 'gbp', 'usd'];
    const crypto_currencies = ['btc', 'eth', 'ltc', 'eusdt', 'usdt', 'usdc'];

    const onWalletSelection = (wallet_name: string) => {
        if (
            fiat_currencies.some((w) => w === wallet_name?.toLowerCase()) ||
            crypto_currencies.some((w) => w === wallet_name?.toLowerCase())
        ) {
            onSelect(wallet_name);
        } else {
            onSelect(wallet_name);
        }
    };

    return (
        <>
            <Text as="p" type="paragraph-2" bold={false}>
                If you choose a fiat or crypto wallet, the next step will be disabled (skipped). If you choose a payment
                agent wallet, the next step will be enabled.
            </Text>
            {['USD', 'BTC', 'payment_agent'].map((wallet_name, i) => (
                <label onClick={() => onWalletSelection(wallet_name)} key={i + 1}>
                    <Checkbox check={!!(wallet === wallet_name)}>
                        <input style={{ visibility: 'hidden' }} type="radio" name="wallet_name" />
                        {wallet_name}
                    </Checkbox>
                </label>
            ))}
        </>
    );
};

export const StepPersonalDetailsMain = () => {
    return (
        <>
            <Text as="div" type="paragraph-2" bold={false} css={{ marginBottom: '24px' }}>
                Please provide your information for verification purposes. If you give us inaccurate information, you
                may be unable to make deposits or withdrawals.
            </Text>
        </>
    );
};

export const StepAddressInfoMain = () => {
    return (
        <>
            <Text as="div" type="paragraph-2" bold={false} css={{ marginBottom: '24px' }}>
                We need this for verification. If the information you provide is fake or inaccurate, you won’t be able
                to deposit and withdraw.
            </Text>
        </>
    );
};

export const StepTermsOfUseMain = () => {
    return (
        <>
            <Text as="div" type="paragraph-1" css={{ margin: '24px 0 16px' }}>
                Jurisdiction and choice of law
            </Text>
        </>
    );
};

export const StepComplete = () => (
    <Text as="div" type="paragraph-1" bold={false} css={{ marginTop: '59.5px', textAlign: 'center' }}>
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

export const TestRightUpperComponent = ({ current_step_index }: RightPanelComponentProps) => {
    return (
        <>
            <Text as="p" type="paragraph-2">
                Upper block test info. Data collected on each step can be used here.
            </Text>
            <p>And current_step_index is: {current_step_index}</p>
        </>
    );
};

export const TestRightMiddleComponent = ({ current_step_index }: RightPanelComponentProps) => (
    <Text as="div" type="paragraph-2">
        Middle block.
        <div>And current_step_index is: {current_step_index}</div>
    </Text>
);

export const TestRightLowerComponent = ({ current_step_index }: RightPanelComponentProps) => (
    <Text as="div" type="paragraph-2">
        Lower block.
        <div>And current_step_index is: {current_step_index}</div>
    </Text>
);
