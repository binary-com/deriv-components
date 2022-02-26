import classNames from 'classnames';
import css from './wallet-card.module.scss';
import BackgroundTemplate from '@assets/svg/card/background-template.svg';
import LogoPlaceholderLight from '@assets/svg/card/ic-logo-placeholder-light.svg';
import LogoPlaceholderDark from '@assets/svg/card/ic-logo-placeholder-dark.svg';
import { useEffect, useState, useRef } from 'react';
import Text from '@core/text/text';

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
    const [is_content_shown, setIsContentShown] = useState<boolean>(false);
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
        if (div_ref.current && div_ref.current === object_ref.current?.parentNode && svg) {
            div_ref.current.appendChild(svg);
            object_ref.current.parentNode?.removeChild(object_ref.current);
            // show card content once the background svg has loaded:
            if (!is_content_shown) setIsContentShown(true);
        }
    };

    useEffect(() => {
        if (is_content_shown) updateBackground();
    }, [background_color, dark]);

    const getCardInfo = () => {
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
            {is_content_shown && (
                <div className={css.card_content}>
                    <img className={css.logo} src={payment_method_logo} alt={'payment_method_logo'} />
                    {getCardInfo()}
                </div>
            )}
        </div>
    );
};

export default WalletCard;
