import { Overlay as PrimitiveOverlay } from '@radix-ui/react-dialog';
import { styled } from 'Styles/stitches.config';
import { overlayShow } from '../keyframes';

const Overlay = styled(PrimitiveOverlay, {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    inset: 0,
    '@media (prefers-reduced-motion: no-preference)': {
        animation: `${overlayShow} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
});

export default Overlay;

export type OverlayType = { Overlay: typeof Overlay };
