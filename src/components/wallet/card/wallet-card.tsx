import classNames from 'classnames';
import css from './wallet-card.module.scss';
import BackgroundTemplate from '@assets/svg/card/background-template.svg';
import LogoPlaceholderLight from '@assets/svg/card/ic-logo-placeholder-light.svg';
import LogoPlaceholderDark from '@assets/svg/card/ic-logo-placeholder-dark.svg';

export const wallet_card_sizes = ['small', 'medium', 'large'];

export interface WalletCardProps {
    balance?: string;
    currency?: string;
    dark?: boolean;
    faded?: boolean;
    logo?: string;
    size?: typeof wallet_card_sizes[number];
    wallet_name?: string;
}

const WalletCard = ({ balance, currency, dark, faded, logo, size = 'large', wallet_name }: WalletCardProps) => {
    const fill_color = dark ? '#252525' : '#fff';
    const pattern_color = '' || (dark ? '#323738' : '#d6dadb');
    const payment_method_logo = logo || (dark ? LogoPlaceholderDark : LogoPlaceholderLight);

    const onSVGLoad = () => {
        const svg_object = document && (document.getElementById('svg-object') as HTMLObjectElement)?.contentDocument;
        if (svg_object) {
            svg_object.querySelectorAll('path')[0].setAttribute('fill', fill_color);
            svg_object
                .querySelectorAll('circle')
                .forEach((circle: SVGCircleElement) => circle.setAttribute('fill', pattern_color));
        }
    };

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
        <div className={classNames(css.container, css[size], dark && css.dark, faded && css.faded)}>
            <object
                id="svg-object"
                className={css.background}
                type="image/svg+xml"
                data={BackgroundTemplate}
                onLoad={onSVGLoad}
            ></object>
            <div className={css.inner_wrapper}>
                <img className={css.logo} src={payment_method_logo} alt={'payment_method_logo'} />
                <div>{getCardInfo()}</div>
            </div>
        </div>
    );
};

export default WalletCard;
