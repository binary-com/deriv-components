import { useState } from 'react';
import classNames from 'classnames';
import css from './wallet-card.module.scss';
import DefaultLightBackground from '@assets/svg/card/default-light-background.svg';
import DefaultDarkBackground from '@assets/svg/card/default-dark-background.svg';
import LogoPlaceholderLight from '@assets/svg/card/ic-logo-placeholder-light.svg';
import LogoPlaceholderDark from '@assets/svg/card/ic-logo-placeholder-dark.svg';

export const wallet_card_sizes = ['small', 'medium', 'large'];

export interface WalletCardProps {
    background_image?: string;
    balance?: string;
    currency?: string;
    dark?: boolean;
    faded?: boolean;
    logo?: string;
    size?: typeof wallet_card_sizes[number];
    wallet_name?: string;
}

const WalletCard = ({
    background_image,
    balance,
    currency,
    dark,
    faded,
    logo,
    size = 'large',
    wallet_name,
}: WalletCardProps) => {
    const [is_hovered, setIsHovered] = useState(false);
    const background = background_image || (dark ? DefaultDarkBackground : DefaultLightBackground);
    const payment_method_logo = logo || (dark ? LogoPlaceholderDark : LogoPlaceholderLight);

    const getCardInfo = () => {
        if (size !== 'small' && balance) {
            return (
                <div>
                    <div className={css.title}>
                        {wallet_name} {currency} wallet
                    </div>
                    <div className={css.balance}>
                        {balance} {currency}
                    </div>
                </div>
            );
        } else if (size !== 'small' && !balance) {
            return <div className={css.title__large}>{wallet_name} wallet</div>;
        }
    };

    return (
        <div
            className={classNames(css[size], css.container, dark && css.dark, faded && css.faded)}
            style={{
                background: `${
                    is_hovered && !faded
                        ? `linear-gradient(180deg, ${
                              dark
                                  ? 'rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.16)'
                                  : 'rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.16)'
                          } 100%), `
                        : ''
                }url(${background})`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img className={css.logo} src={payment_method_logo} alt={'payment_method_logo'} />
            <div>{getCardInfo()}</div>
        </div>
    );
};

export default WalletCard;
