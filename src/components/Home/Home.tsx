import {
	Card,
	CardContent,
	Grid,
	makeStyles,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebaseCustom from "../firebaseCustom";
import GarageServiceModal from "../../modals/GarageServiceModal";
import MUIDataTable, { SelectableRows } from "mui-datatables";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ConfirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { AddServiceDetail } from "../AddServiceDetail/AddServiceDetail";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "80%",
		position: "absolute",
		left: "10%",
		padding: 10,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export const Home: React.FC = () => {
	const classes = useStyles();
	const [rows, setRows] = useState<GarageServiceModal[]>([]);
	const [isConfirmOpenDialog, setIsConfirmOpenDialog] = useState<boolean>(
		false
	);
	const [selectedId, setSelectedId] = useState<string>("");
	const [
		selectedGarageRecord,
		setSelectedGarageRecord,
	] = useState<GarageServiceModal>(new GarageServiceModal());

	const columns = [
		{
			name: "jobCardNumber",
			label: "Job Card Number",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "bikeNumber",
			label: "Bike Number",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "serviceDate",
			label: "Service Date",
			options: {
				filter: true,
				sort: true,
				customBodyRender: (value: any) => {
					return value;
				},
			},
		},
		{
			name: "customerName",
			label: "Customer Name",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "mobileNumber",
			label: "Mobile Number",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "Edit",
			options: {
				empty: true,
				customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
					return (
						<EditIcon
							fontSize="large"
							color="primary"
							onClick={() => {
								editRecordFirebase(dataIndex);
							}}
						/>
					);
				},
			},
		},
		{
			name: "Delete",
			options: {
				empty: true,
				customBodyRenderLite: (dataIndex: any, rowIndex: any) => {
					return (
						<DeleteIcon
							fontSize="large"
							color="secondary"
							onClick={() => {
								deleteRecordOnFirebase(dataIndex);
							}}
						/>
					);
				},
			},
		},
	];

	useEffect(() => {
		getGarageServiceDetail();
	}, []);

	const getGarageServiceDetail = async () => {
		let ref = firebaseCustom.database().ref("service-list/");
		ref.on(
			"value",
			function (snapshot) {
				const response = snapshot.val();
				if (response) {
					const result: GarageServiceModal[] = Object.values(response);
					const itemId: string[] = Object.keys(response);
					for (let i = 0; i < itemId.length; i++) {
						result[i].id = itemId[i];
					}
					setRows(result);
				}
			},
			function (error: any) {
				console.log("Error: " + error.code);
			}
		);
	};

	const options = {
		print: false,
		selectableRows: "none" as SelectableRows,
	};

	const deleteRecordOnFirebase = (rowsIndex: number) => {
		setSelectedId(rows[rowsIndex].id);
		setIsConfirmOpenDialog(true);
	};

	const deleteRecord = () => {
		setIsConfirmOpenDialog(false);
		let userRef = firebaseCustom.database().ref("/service-list");
		userRef.child(selectedId).remove();
	};

	const editRecordFirebase = (rowIndex: number) => {
		setSelectedGarageRecord(rows[rowIndex] as GarageServiceModal);
	};

	const onCloseEdit = () => {
		setSelectedGarageRecord(new GarageServiceModal());
	};

	return (
		<>
			{!selectedGarageRecord.id ? (
				<Card className={classes.root} variant="outlined">
					<CardContent>
						<Grid container spacing={5}>
							<Grid item xs={12}>
								<Typography variant="h4" component="h1" gutterBottom>
									Search Job Card
								</Typography>
							</Grid>
							<Grid item xs={12}>
								{/* <div style={{ height: 400, width: "100%" }}>
							<DataGrid rows={rows} columns={columns} pageSize={5} />
						</div> */}
								<MUIDataTable
									title={"service details list"}
									data={rows}
									columns={columns}
									options={options}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			) : (
				<AddServiceDetail
					garageServiceDetailsProps={selectedGarageRecord}
					onCloseEdit={onCloseEdit}
				/>
			)}
			{isConfirmOpenDialog && (
				<ConfirmDialog
					handleClose={setIsConfirmOpenDialog}
					deleteRecord={deleteRecord}
				/>
			)}
		</>
	);
};
