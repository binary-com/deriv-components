import * as DialogPrimitive from '@radix-ui/react-dialog';
import CloseIconButton, { CloseIconButtonType } from './components/close-icon-button';
import DialogContent, { DialogContentType } from './components/dialog-content';
import Overlay, { OverlayType } from './components/overlay';
import PageContent, { PageContentType } from './components/page-content';
import TextTitle, { TextTitleType } from './components/text-title';

type TModalComponents = {
    Trigger: typeof DialogPrimitive.Trigger;
    Portal: typeof DialogPrimitive.Portal;
    Content: typeof DialogPrimitive.Content;
    Close: typeof DialogPrimitive.Close;
    Title: typeof DialogPrimitive.Title;
    Description: typeof DialogPrimitive.Description;
};

type TModal = typeof DialogPrimitive.Root &
    TModalComponents &
    OverlayType &
    DialogContentType &
    PageContentType &
    CloseIconButtonType &
    TextTitleType;

const Modal: TModal = (props) => {
    return <DialogPrimitive.Root {...props} />;
};

Modal.Trigger = DialogPrimitive.Trigger;
Modal.Portal = DialogPrimitive.Portal;
Modal.Overlay = Overlay;
Modal.Content = DialogPrimitive.Content;
Modal.DialogContent = DialogContent;
Modal.PageContent = PageContent;
Modal.Close = DialogPrimitive.Close;
Modal.CloseIconButton = CloseIconButton;
Modal.Title = DialogPrimitive.Title;
Modal.TextTitle = TextTitle;
Modal.Description = DialogPrimitive.Description;

export default Modal;
