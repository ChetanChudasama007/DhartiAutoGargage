import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

interface ConfirmDialogProps {
	handleClose: (isClosed: boolean) => void;
	deleteRecord: () => void;
}
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	handleClose,
	deleteRecord,
}) => {
	return (
		<div>
			<Dialog
				open={true}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure you want to delete? "}
				</DialogTitle>
				<DialogActions>
					<Button onClick={() => handleClose(false)} color="primary">
						No
					</Button>
					<Button onClick={deleteRecord} color="secondary" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
