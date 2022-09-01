import { keyframes } from 'Styles/stitches.config';

export const overlayShow = keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
});

export const contentShow = keyframes({
    from: { opacity: 0, transform: 'translate(-50%, -45%) ' },
    to: { opacity: 1, transform: 'translate(-50%, -50%) ' },
});

export const contentHide = keyframes({
    from: { opacity: 1, transform: 'translate(-50%, -50%) ' },
    to: { opacity: 0, transform: 'translate(-50%, -45%) ' },
});
