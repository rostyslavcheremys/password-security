import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

import "./DialogMessage.css";

export const DialogMessage = ({ open, onClose, title, text }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="dialog-message__title">{title}</DialogTitle>
            <DialogContent>
                <label className="dialog-message__label">{text}</label>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};
