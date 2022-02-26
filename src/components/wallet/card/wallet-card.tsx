import classNames from 'classnames';
import css from './wallet-card.module.scss';
import BackgroundTemplate from '@assets/svg/card/background-template.svg';
import LogoPlaceholderLight from '@assets/svg/card/ic-logo-placeholder-light.svg';
import LogoPlaceholderDark from '@assets/svg/card/ic-logo-placeholder-dark.svg';
import { useEffect, useState, useRef } from 'react';

export const wallet_card_sizes = ['small', 'medium', 'large'];

export interface WalletCardProps {
    background_color?: string;
    balance?: string;
    currency?: string;
    dark?: boolean;
    faded?: boolean;
    logo?: string;
    size?: typeof wallet_card_sizes[number];
    wallet_name?: string;
}

const WalletCard = ({
    background_color,
    balance,
    currency,
    dark,
    faded,
    logo,
    size = 'large',
    wallet_name,
}: WalletCardProps) => {
    const [svg, setSVG] = useState<SVGSVGElement>();
    const payment_method_logo = logo || (dark ? LogoPlaceholderDark : LogoPlaceholderLight);
    const div_ref = useRef<HTMLDivElement>(null);
    const object_ref = useRef<HTMLObjectElement>(null);

    const updateBackground = () => {
        // here we set a fill and pattern colors of svg & extract it from non-zoomable object:
        const fill_color = dark ? '#252525' : '#fff';
        const pattern_color = background_color || (dark ? '#323738' : '#d6dadb');
        const svg = object_ref.current?.contentDocument?.querySelector('svg') || div_ref.current?.querySelector('svg');
        if (svg) {
            svg.querySelectorAll('path')[0].setAttribute('fill', fill_color);
            svg.querySelectorAll('circle').forEach((circle: SVGCircleElement) =>
                circle.setAttribute('fill', pattern_color),
            );
        }
        if (object_ref.current && div_ref.current && svg) {
            setSVG(svg);
            div_ref.current.appendChild(svg);
            object_ref.current.parentNode?.removeChild(object_ref.current);
        }
    };

    useEffect(() => {
        if (svg) updateBackground();
    }, [background_color, dark, svg]);

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
            <div id="background" ref={div_ref} className={css.background}>
                <object
                    id="svg_object"
                    ref={object_ref}
                    type="image/svg+xml"
                    data={BackgroundTemplate}
                    onLoad={updateBackground}
                ></object>
            </div>
            {/* show card content only after the background svg has loaded:  */}
            {svg && (
                <div className={css.inner_wrapper}>
                    <img className={css.logo} src={payment_method_logo} alt={'payment_method_logo'} />
                    <div>{getCardInfo()}</div>
                </div>
            )}
        </div>
    );
};

export default WalletCard;
