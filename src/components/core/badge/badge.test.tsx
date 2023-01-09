import { render } from 'test-setup';
import Badge from './badge';
import CheckIconSVG from '@assets/svg/circular-check-icon.svg';

describe('Badge Component', () => {
    it('Should render properly with default values and text as children', () => {
        const badge = render(<Badge>Badge</Badge>);
        expect(badge).toBeTruthy();
    });

    it('Should render both icon and label', () => {
        const { container } = render(
            <Badge visiblity="icon-and-label" prefix_icon_src={CheckIconSVG}>
                Badge Text Content
            </Badge>,
        );
        const icon = container.querySelector('img') as HTMLImageElement;
        expect(container.textContent).toBe('Badge Text Content');
        expect(icon).toBeInTheDocument();
    });

    it('Should render only the label', () => {
        const { container } = render(
            <Badge visiblity="label-only" prefix_icon_src={CheckIconSVG}>
                Badge Text Content
            </Badge>,
        );
        const icon = container.querySelector('img') as HTMLImageElement;
        expect(container.textContent).toBe('Badge Text Content');
        expect(icon).toBeFalsy();
    });

    it('Should render only the icon', () => {
        const { container } = render(
            <Badge visiblity="icon-only" prefix_icon_src={CheckIconSVG}>
                Badge Text Content
            </Badge>,
        );
        const icon = container.querySelector('img') as HTMLImageElement;
        expect(icon).toBeInTheDocument();
        expect(container.textContent).toBeFalsy();
    });

    it('Should render small badge', () => {
        const { container } = render(<Badge size="small">Badge Text Content</Badge>);
        const badgeContainer = container.querySelector('span');
        expect(badgeContainer).toHaveAttribute('class', expect.stringContaining('size-small'));
    });

    it('Should render medium badge', () => {
        const { container } = render(<Badge size="medium">Badge Text Content</Badge>);
        const badgeContainer = container.querySelector('span');
        expect(badgeContainer).toHaveAttribute('class', expect.stringContaining('size-medium'));
    });

    it('Should render large badge', () => {
        const { container } = render(<Badge size="large">Badge Text Content</Badge>);
        const badgeContainer = container.querySelector('span');
        expect(badgeContainer).toHaveAttribute('class', expect.stringContaining('size-large'));
    });

    it('Should render badge with regular font weight', () => {
        const { container } = render(<Badge label="regular">Badge Text Content</Badge>);
        const badgeContainer = container.querySelector('span');
        expect(badgeContainer).toHaveAttribute('class', expect.stringContaining('label-regular'));
    });

    it('Should render badge with bold font weight', () => {
        const { container } = render(<Badge label="bold">Badge Text Content</Badge>);
        const badgeContainer = container.querySelector('span');
        expect(badgeContainer).toHaveAttribute('class', expect.stringContaining('label-bold'));
    });

    it('Should render badge with tight spacing', () => {
        const { container } = render(<Badge spacing="tight">Badge Text Content</Badge>);
        const badgeContainer = container.querySelector('span');
        expect(badgeContainer).toHaveAttribute('class', expect.stringContaining('padding-tight'));
    });

    it('Should render badge with loose spacing', () => {
        const { container } = render(<Badge spacing="loose">Badge Text Content</Badge>);
        const badgeContainer = container.querySelector('span');
        expect(badgeContainer).toHaveAttribute('class', expect.stringContaining('padding-loose'));
    });
});
