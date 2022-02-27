import classNames from 'classnames';
import css from './wallet-card.module.scss';
import BackgroundTemplate from '@assets/svg/card/background-template.svg';
import LogoPlaceholderLight from '@assets/svg/card/ic-logo-placeholder-light.svg';
import LogoPlaceholderDark from '@assets/svg/card/ic-logo-placeholder-dark.svg';
import CheckIcon from '@assets/svg/card/ic-check.svg';
import { useEffect, useState, useRef } from 'react';
import Text from '@core/text/text';
import { wallets_data } from '@wallet/wallets_data';

export interface WalletCardProps {
    active?: boolean;
    balance?: string;
    currency?: string;
    dark?: boolean;
    faded?: boolean;
    size?: 'small' | 'medium' | 'large';
    wallet_name: string;
}

const WalletCard = ({ active, balance, currency, dark, faded, size = 'large', wallet_name }: WalletCardProps) => {
    const [is_content_shown, setIsContentShown] = useState<boolean>(false);
    const logo = wallets_data[wallet_name]?.logo || (dark ? LogoPlaceholderDark : LogoPlaceholderLight);
    const div_ref = useRef<HTMLDivElement>(null);
    const object_ref = useRef<HTMLObjectElement>(null);

    const updateBackground = () => {
        // here we set a fill and pattern colors of svg & extract it from non-zoomable object:
        const pattern_color_default = dark ? '#323738' : '#d6dadb';
        const svg = object_ref.current?.contentDocument?.querySelector('svg') || div_ref.current?.querySelector('svg');
        if (svg) {
            svg.querySelectorAll('path')[0].setAttribute('fill', dark ? '#252525' : '#fff');
            svg.querySelector('#squares')?.setAttribute('fill', dark ? '#fff' : '#0E0E0E');
            svg.querySelectorAll('circle').forEach((circle: SVGCircleElement, index: number) => {
                // primary color is for the 1st circle in the bottom-right corner & for the 3rd circle in the top-left corner,
                // 2nd circle in the top-right corner has secondary color:
                if (index === 1) {
                    circle.setAttribute('fill', wallets_data[wallet_name]?.colors.secondary || pattern_color_default);
                } else circle.setAttribute('fill', wallets_data[wallet_name]?.colors.primary || pattern_color_default);
            });
        }
        if (div_ref.current && div_ref.current === object_ref.current?.parentNode && svg) {
            div_ref.current.appendChild(svg);
            object_ref.current.parentNode?.removeChild(object_ref.current);
        }
        // show card content when the background svg has loaded:
        if (!is_content_shown) setIsContentShown(true);
    };

    useEffect(() => {
        if (is_content_shown) updateBackground();
    }, [wallet_name, dark]);

    const getCardText = () => {
        if (size !== 'small' && balance) {
            return (
                <div>
                    <Text as="div" type="extra-small" bold={false}>
                        {wallet_name} {currency} wallet
                    </Text>
                    <Text as="div" type="paragraph-2" bold>
                        {balance} {currency}
                    </Text>
                </div>
            );
        } else if (size !== 'small' && !balance) {
            return (
                <Text as="div" type="paragraph-2" bold={false}>
                    {wallet_name} wallet
                </Text>
            );
        }
    };

    return (
        <div
            data-testid="wallet-card"
            className={classNames(
                css.container,
                css[size],
                dark && css.dark,
                active && !faded && is_content_shown && css.active,
                faded && css.faded,
            )}
        >
            <div ref={div_ref} className={css.background}>
                <object
                    ref={object_ref}
                    type="image/svg+xml"
                    data={BackgroundTemplate}
                    onLoad={updateBackground}
                ></object>
            </div>
            {active && !faded && is_content_shown && (
                <img className={css.active__icon} src={CheckIcon} alt={'active_icon'} />
            )}
            {is_content_shown && (
                <div className={css.card_content}>
                    <img className={css.logo} src={logo} alt={'payment_method_logo'} />
                    {getCardText()}
                </div>
            )}
        </div>
    );
};

export default WalletCard;
