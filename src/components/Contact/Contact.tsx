import React, { CSSProperties } from "react";

export const Contact: React.FC = () => {
	const contact: CSSProperties = {
		padding: "50px",
		textAlign: "center",
		backgroundColor: "#46282d",
		color: "white",
	};
	return (
		<div style={contact}>
			<h1>Contact Us Page</h1>

			<p>Some text about how to contact us.</p>
		</div>
	);
};
