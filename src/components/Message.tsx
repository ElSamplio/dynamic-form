import React from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface MessageProps extends SnackbarProps {
    handleClose: () => void
}

const Message: React.FC<MessageProps> = (props: MessageProps) => {

    const messageAction = <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={props.handleClose}
    >
        <CloseIcon fontSize="small" />
    </IconButton>

    return <>
        <Snackbar
            open={props.open}
            autoHideDuration={4000}
            onClose={() => { }}
            message={props.message}
            action={messageAction}
        />
    </>
}

export default Message;