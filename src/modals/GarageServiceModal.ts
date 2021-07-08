export default class GarageServiceModal {
	public id: string;
	public bikeNumber: string;
	public jobCardNumber: number;
	public customerName: string;
	public mobileNumber: string;
	public bikeModal: string;
	public serviceDate: Date | string;
	public bikeKiloMeter: number;
	public serviceType: string;
	public alternativeMobileNumber: string;
	public address: string;

	public constructor() {
		this.id = "";
		this.bikeNumber = "";
		this.jobCardNumber = 0;
		this.customerName = "";
		this.mobileNumber = "";
		this.bikeModal = "";
		this.serviceDate = "";
		this.bikeKiloMeter = 0;
		this.serviceType = "";
		this.alternativeMobileNumber = "";
		this.address = "";
	}
}
