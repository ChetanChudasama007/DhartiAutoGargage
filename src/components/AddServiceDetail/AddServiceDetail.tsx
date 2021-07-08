import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import GarageServiceModal from "../../modals/GarageServiceModal";
import SaveIcon from "@material-ui/icons/Save";
import firebaseCustom from "../firebaseCustom";
import InputMask from "react-input-mask";

type GarageServiceModalType =
	| "bikeNumber"
	| "jobCardNumber"
	| "customerName"
	| "mobileNumber"
	| "bikeModal"
	| "serviceDate"
	| "bikeKiloMeter"
	| "serviceType"
	| "alternativeMobileNumber"
	| "address";

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

interface AddServiceDetailProps {
	garageServiceDetailsProps?: GarageServiceModal;
	onCloseEdit: () => void;
}

export const AddServiceDetail: React.FC<AddServiceDetailProps> = (props) => {
	const classes = useStyles();
	const [garageServiceDetails, setGarageServiceDetails] = useState(
		new GarageServiceModal()
	);

	useEffect(() => {
		if (props.garageServiceDetailsProps && props.garageServiceDetailsProps.id) {
			setGarageServiceDetails(props.garageServiceDetailsProps);
		} else {
			const garageServiceDetailsTemp = { ...garageServiceDetails };
			garageServiceDetailsTemp.serviceDate = new Date();
			setGarageServiceDetails(garageServiceDetailsTemp);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const serviceTypeList = [
		{
			value: "Accident",
			label: "Accident",
		},
		{
			value: "General",
			label: "General",
		},
		{ value: "Others", label: "Others" },
	];

	const onUpdateGarageServiceDetail = (
		value: string | number | Date,
		propertyName: GarageServiceModalType
	) => {
		const garageServiceDetailsTemp = { ...garageServiceDetails };
		(garageServiceDetailsTemp as any)[propertyName] = value;
		setGarageServiceDetails(garageServiceDetailsTemp);
	};

	const clearGarageServiceDetail = () => {
		const garageServiceDetailTemp = new GarageServiceModal();
		garageServiceDetailTemp.serviceDate = new Date();
		if (garageServiceDetails.id) {
			props.onCloseEdit();
		}
		setGarageServiceDetails(garageServiceDetailTemp);
	};

	const saveServiceDetails = () => {
		const garageServiceDetailTemp = new GarageServiceModal();
		garageServiceDetailTemp.serviceDate = new Date();
		let message = firebaseCustom.database().ref("service-list").orderByKey()
			.limitToLast;
		garageServiceDetails.serviceDate = new Date(
			garageServiceDetails.serviceDate
		).toLocaleString("en-GB", { hour12: false });
		if (props.garageServiceDetailsProps && props.garageServiceDetailsProps.id) {
			firebaseCustom
				.database()
				.ref("service-list")
				.child(props.garageServiceDetailsProps.id)
				.update({
					...garageServiceDetails,
				});
			props.onCloseEdit();
			setGarageServiceDetails(garageServiceDetailTemp);
		} else {
			firebaseCustom.database().ref("service-list").push(garageServiceDetails);
			setGarageServiceDetails(garageServiceDetailTemp);
		}
	};

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Grid container spacing={5}>
					<Grid item xs={12}>
						<Typography variant="h4" component="h1" gutterBottom>
							Add Service Detail
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						{/* <TextField
							id="standard-basic"
							label="Bike Number"
							value={garageServiceDetails.bikeNumber}
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value,	 "bikeNumber")
							}
							fullWidth
						/> */}
						<InputMask
							mask="aa 99 aa 9999"
							maskPlaceholder="GJ-04-BG-1234"
							value={garageServiceDetails.bikeNumber}
							onChange={(event) =>
								onUpdateGarageServiceDetail(
									typeof event.target.value === "number"
										? event.target.value
										: event.target.value.toUpperCase(),
									"bikeNumber"
								)
							}
						>
							{() => (
								<TextField fullWidth id="standard-basic" label="Bike Number" />
							)}
						</InputMask>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="job-card"
							label="Job Card Number"
							fullWidth
							value={garageServiceDetails.jobCardNumber}
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value, "jobCardNumber")
							}
							type="number"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="input-with-icon-textfield"
							label="Customer Name"
							fullWidth
							value={garageServiceDetails.customerName}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								),
							}}
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value, "customerName")
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="standard-basic"
							label="Mobile Number"
							fullWidth
							value={garageServiceDetails.mobileNumber}
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value, "mobileNumber")
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="standard-basic"
							label="Bike Modal Name"
							fullWidth
							value={garageServiceDetails.bikeModal}
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value, "bikeModal")
							}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDateTimePicker
								value={garageServiceDetails.serviceDate}
								label="Select Service Date and Time"
								onError={console.log}
								minDate={new Date("2018-01-01T00:00")}
								format="dd/MM/yyyy hh:mm a"
								fullWidth
								onChange={(date) => {
									onUpdateGarageServiceDetail(date ? date : "", "serviceDate");
								}}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="standard-basic"
							label="Bike Kilo-Meter"
							value={garageServiceDetails.bikeKiloMeter}
							fullWidth
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value, "bikeKiloMeter")
							}
							type="number"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="standard-select-bike-type"
							select
							label="Service Type"
							value={garageServiceDetails.serviceType}
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value, "serviceType")
							}
							fullWidth
						>
							{serviceTypeList.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="standard-multiline-static"
							label="Customer Address"
							fullWidth
							value={garageServiceDetails.address}
							multiline
							rows={3}
							defaultValue="Address Here"
							onChange={(event) =>
								onUpdateGarageServiceDetail(event.target.value, "address")
							}
						/>
					</Grid>
				</Grid>
				<CardActions>
					<Grid
						item
						lg={12}
						md={12}
						sm={12}
						style={{
							textAlign: "right", // this does the magic
						}}
					>
						<Button
							variant="contained"
							color="primary"
							size="large"
							startIcon={<SaveIcon />}
							onClick={saveServiceDetails}
						>
							Save
						</Button>
						&nbsp;&nbsp;
						<Button
							variant="contained"
							color="secondary"
							size="large"
							onClick={clearGarageServiceDetail}
						>
							Clear
						</Button>
					</Grid>
				</CardActions>
			</CardContent>
		</Card>
	);
};
