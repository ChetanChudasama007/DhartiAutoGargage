import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyD0srrrkIIwranUT_b9YFtu-OoaDV7OUBc",
	authDomain: "dharti-auto-garage.firebaseapp.com",
	projectId: "dharti-auto-garage",
	storageBucket: "dharti-auto-garage.appspot.com",
	messagingSenderId: "589575407488",
	appId: "1:589575407488:web:31c0e815bd83d7bf76e365",
	measurementId: "G-ZJ74CQYS43",
};
// Initialize Firebase
var firebaseCustom = firebase.initializeApp(firebaseConfig);
export default firebaseCustom;
