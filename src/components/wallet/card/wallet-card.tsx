import classNames from 'classnames';
import css from './wallet-card.module.scss';
import DefaultBackground from '@assets/svg/card/default-background.svg';
import DemoBackground from '@assets/svg/card/demo-background.svg';
import SmallBackground from '@assets/svg/card/small-background.svg';
import CheckIcon from '@assets/svg/card/ic-check.svg';
import { useEffect, useState, useRef } from 'react';
import Text from '@core/text/text';
import SVG from 'react-inlinesvg';

type TWalletCardData = {
    [key: string]: {
        colors: {
            primary: string;
            secondary: string;
        };
        default_currency: string;
        display_name: string;
    };
};

const wallet_card_data: TWalletCardData = {
    aud: {
        colors: { primary: '#0DB43D', secondary: '#FFCD00' },
        default_currency: 'AUD',
        display_name: 'AUD',
    },
    bitcoin: {
        colors: { primary: '#F7931B', secondary: '#F7C71B' },
        default_currency: 'BTC',
        display_name: 'Bitcoin',
    },
    demo: {
        colors: { primary: '#FF6444', secondary: '#FF444F' },
        default_currency: 'USD',
        display_name: 'Demo',
    },
    deriv_p2p: {
        colors: { primary: '#FF444F', secondary: '#FF6444' },
        default_currency: 'USD',
        display_name: 'Deriv P2P',
    },
    ethereum: {
        colors: { primary: '#52567F', secondary: '#828CAD' },
        default_currency: 'ETH',
        display_name: 'Ethereum',
    },
    eur: {
        colors: { primary: '#283991', secondary: '#F8D12E' },
        default_currency: 'EUR',
        display_name: 'EUR',
    },
    gbp: {
        colors: { primary: '#283991', secondary: '#F44336' },
        default_currency: 'GBP',
        display_name: 'GBP',
    },
    litecoin: {
        colors: { primary: '#A5A8A9', secondary: '#C1CCCF' },
        default_currency: 'LTC',
        display_name: 'Litecoin',
    },
    payment_agent: {
        colors: { primary: '#979797', secondary: '#B2C2C4' },
        default_currency: 'USD',
        display_name: 'Payment Agent',
    },
    tether: {
        colors: { primary: '#009393', secondary: '#04D9D9' },
        default_currency: 'USDT',
        display_name: 'Tether',
    },
    usd: {
        colors: { primary: '#F44336', secondary: '#283991' },
        default_currency: 'USD',
        display_name: 'USD',
    },
    usd_coin: {
        colors: { primary: '#2775CA', secondary: '#224CE1' },
        default_currency: 'USDC',
        display_name: 'USD Coin',
    },
};

export interface WalletCardProps {
    active?: boolean;
    balance?: string;
    currency?: string;
    dark?: boolean;
    demo?: boolean;
    disabled?: boolean;
    faded?: boolean;
    size?: 'small' | 'medium' | 'large';
    wallet_name: string;
}

const WalletCard = ({
    active,
    balance,
    currency,
    dark,
    demo,
    disabled,
    faded,
    size = 'large',
    wallet_name,
}: WalletCardProps) => {
    const [is_content_shown, setIsContentShown] = useState<boolean>(false);
    const logo_src = `./modal/lg-${wallet_name?.replace('_', '-')}-${dark ? 'dark' : 'light'}.svg`;
    const background =
        size === 'small' ? SmallBackground : demo || wallet_name === 'demo' ? DemoBackground : DefaultBackground;
    const fiat_wallets = ['aud', 'eur', 'gbp', 'usd'];
    const wallet_title = wallet_card_data[wallet_name]?.display_name || wallet_name;
    const wallet_currency = currency || wallet_card_data[wallet_name]?.default_currency;
    const div_ref = useRef<HTMLDivElement>(null);

    const updateBackground = () => {
        // here we set background and pattern colors of svg background:
        const default_primary_color = dark ? '#303030' : '#CFCFCF';
        const default_secondary_color = dark ? '#323738' : '#d6dadb';
        const custom_primary_color = demo ? '#FF6444' : wallet_card_data[wallet_name]?.colors.primary;
        const custom_secondary_color = demo ? '#FF444F' : wallet_card_data[wallet_name]?.colors.secondary;
        const svg = div_ref.current?.querySelector('svg');
        if (svg) {
            svg.querySelectorAll('path')[0].setAttribute('fill', dark ? '#151717' : '#fff');
            if (!demo && wallet_name !== 'demo' && size !== 'small') {
                svg.querySelectorAll('path')[1]?.setAttribute('stroke', dark ? '#fff' : '#0E0E0E');
            }
            svg.querySelectorAll('circle').forEach((circle: SVGCircleElement, index: number) => {
                // For large & medium size background: Primary color paints the 1st circle in the bottom-right corner & the 3rd circle in the top-left corner,
                // and Secondary color paints the 2nd circle in the top-right corner,
                // For small size background: Primary color paints the 1st circle on the left side of the background,
                // and Secondary color paints the 2nd circle on the right side of the background:
                if (index === 1) {
                    circle.setAttribute('fill', custom_secondary_color || default_secondary_color);
                } else circle.setAttribute('fill', custom_primary_color || default_primary_color);
            });
        }
        // show card content when the background svg has loaded:
        if (!is_content_shown) setIsContentShown(true);
    };

    useEffect(() => {
        if (is_content_shown) updateBackground();
    }, [dark, wallet_name, demo]);

    const getCardText = () => {
        if (balance) {
            return (
                <div>
                    <Text as="div" type="extra-small" bold={false}>
                        {demo ? 'Demo' : wallet_title} {fiat_wallets.every((f) => wallet_name !== f) && wallet_currency}{' '}
                        wallet
                    </Text>
                    <Text as="div" type="paragraph-2" bold>
                        {balance} {wallet_currency}
                    </Text>
                </div>
            );
        }
        return (
            <Text as="div" type="paragraph-2" bold={false}>
                {demo ? 'Demo' : wallet_title} wallet
            </Text>
        );
    };

    return (
        <div
            data-testid="wallet-card"
            className={classNames(
                css.container,
                css[size],
                dark && css.dark,
                disabled && css.disabled,
                active && !disabled && is_content_shown && css.active,
                faded && css.faded,
            )}
        >
            <div ref={div_ref} className={css.background}>
                <SVG
                    src={background}
                    viewBox={size === 'small' ? '0 0 64 40' : '0 0 240 144'}
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                    onLoad={updateBackground}
                    preProcessor={(code) => {
                        // A workaround to ensure that main elements' ids in svg <defs> are unique to avoid issues with rendering in Storybook Docs:
                        const unique_id = size !== 'small' ? '1' : demo || wallet_name === 'demo' ? '2' : '3';
                        return code
                            .replace('url(#a)', `url(#a${unique_id})`)
                            .replace('id="a"', `id="a${unique_id}"`)
                            .replace('url(#b)', `url(#b${unique_id})`)
                            .replace('id="b"', `id="b${unique_id}"`)
                            .replace('url(#c)', `url(#c${unique_id})`)
                            .replace('id="c"', `id="c${unique_id}"`);
                    }}
                />
            </div>
            {active && !disabled && is_content_shown && (
                <img className={css.active__icon} src={CheckIcon} alt={'active_icon'} />
            )}
            {is_content_shown && (
                <div className={css.card_content}>
                    {wallet_card_data[wallet_name] ? (
                        <div
                            className={classNames(css.logo, css[`logo__${wallet_name}`])}
                            aria-label="payment_method_logo"
                        >
                            <SVG
                                src={logo_src}
                                width="100%"
                                height="100%"
                                preProcessor={(code) =>
                                    !code.includes('viewBox') ? code.replace('svg', 'svg viewBox="0 0 64 40"') : code
                                }
                            />
                        </div>
                    ) : (
                        <div className={classNames(css.logo, css.logo__placeholder)}></div>
                    )}
                    {size !== 'small' && getCardText()}
                </div>
            )}
        </div>
    );
};

export default WalletCard;
