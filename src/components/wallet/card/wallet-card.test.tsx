import { render, screen, fireEvent } from 'test-setup';
import WalletCard from './wallet-card';

describe('WalletCard Component', () => {
    const props = {
        active: false,
        balance: '',
        currency: '',
        dark: false,
        faded: false,
        size: '',
        wallet_name: '[Name]',
    };

    it('Large WalletCard without balance renders properly', () => {
        const { container } = render(<WalletCard {...props} size="large" />);

        const object_with_svg = container.querySelector('object');
        expect(object_with_svg).toBeInTheDocument();
        expect(screen.getByTestId('wallet-card')).toHaveClass('container large');

        object_with_svg && fireEvent.load(object_with_svg);

        expect(screen.getByAltText('payment_method_logo')).toBeInTheDocument();
        expect(screen.getByText('[Name] wallet')).toBeInTheDocument();
        expect(screen.queryByText('0.00 [Currency]')).not.toBeInTheDocument();
    });

    it('Large WalletCard with balance renders properly', () => {
        const { container } = render(<WalletCard {...props} size="large" balance="0.00" currency="[Currency]" />);

        const object_with_svg = container.querySelector('object');
        expect(object_with_svg).toBeInTheDocument();
        expect(screen.getByTestId('wallet-card')).toHaveClass('container large');

        object_with_svg && fireEvent.load(object_with_svg);

        expect(screen.getByAltText('payment_method_logo')).toBeInTheDocument();
        expect(screen.getByText('[Name] [Currency] wallet')).toBeInTheDocument();
        expect(screen.getByText('0.00 [Currency]')).toBeInTheDocument();
        expect(screen.queryByText('[Name] wallet')).not.toBeInTheDocument();
    });

    it('Medium WalletCard without balance renders properly', () => {
        const { container } = render(<WalletCard {...props} size="medium" />);

        const object_with_svg = container.querySelector('object');
        expect(object_with_svg).toBeInTheDocument();
        expect(screen.getByTestId('wallet-card')).toHaveClass('container medium');

        object_with_svg && fireEvent.load(object_with_svg);

        expect(screen.getByAltText('payment_method_logo')).toBeInTheDocument();
        expect(screen.getByText('[Name] wallet')).toBeInTheDocument();
        expect(screen.queryByText('0.00 [Currency]')).not.toBeInTheDocument();
    });

    it('Medium WalletCard with balance renders properly', () => {
        const { container } = render(<WalletCard {...props} size="medium" balance="0.00" currency="[Currency]" />);

        const object_with_svg = container.querySelector('object');
        expect(object_with_svg).toBeInTheDocument();
        expect(screen.getByTestId('wallet-card')).toHaveClass('container medium');

        object_with_svg && fireEvent.load(object_with_svg);

        expect(screen.getByAltText('payment_method_logo')).toBeInTheDocument();
        expect(screen.getByText('[Name] [Currency] wallet')).toBeInTheDocument();
        expect(screen.getByText('0.00 [Currency]')).toBeInTheDocument();
        expect(screen.queryByText('[Name] wallet')).not.toBeInTheDocument();
    });

    it('Small WalletCard renders properly', () => {
        const { container } = render(<WalletCard {...props} size="small" balance="0.00" currency="[Currency]" />);

        const object_with_svg = container.querySelector('object');
        expect(object_with_svg).toBeInTheDocument();
        expect(screen.getByTestId('wallet-card')).toHaveClass('container small');

        object_with_svg && fireEvent.load(object_with_svg);

        expect(screen.getByAltText('payment_method_logo')).toBeInTheDocument();
        expect(screen.queryByText('[Name] [Currency] wallet')).not.toBeInTheDocument();
        expect(screen.queryByText('0.00 [Currency]')).not.toBeInTheDocument();
        expect(screen.queryByText('[Name] wallet')).not.toBeInTheDocument();
    });

    it('Large Active WalletCard with balance renders properly', () => {
        const { container } = render(
            <WalletCard {...props} size="large" balance="0.00" currency="[Currency]" active />,
        );

        const object_with_svg = container.querySelector('object');
        expect(object_with_svg).toBeInTheDocument();
        expect(screen.getByTestId('wallet-card')).toHaveClass('container large');

        object_with_svg && fireEvent.load(object_with_svg);

        expect(screen.getByAltText('payment_method_logo')).toBeInTheDocument();
        expect(screen.getByAltText('active_icon')).toBeInTheDocument();
        expect(screen.getByText('[Name] [Currency] wallet')).toBeInTheDocument();
        expect(screen.getByText('0.00 [Currency]')).toBeInTheDocument();
        expect(screen.queryByText('[Name] wallet')).not.toBeInTheDocument();
    });
});
