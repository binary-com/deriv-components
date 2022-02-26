import { render } from 'test-setup';
import WalletCard from './wallet-card';

describe('WalletCard Component', () => {
    it('Renders properly', () => {
        const wallet_card = render(<WalletCard />);
        expect(wallet_card).toBeTruthy();
    });
});
