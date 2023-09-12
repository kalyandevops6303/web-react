export const conversationActionStyle = (context) => {
	return {
		display: "flex",
		listStyleType: "none",
		padding: "8px",
		margin: "0",
		marginTop:"25px",
		width: "24px",
		backgroundColor: `transparent`,
		borderRadius: "4px",
		alignItems: "center",
		justifyContent: "flex-end",
		position: "absolute",
		right: "30px",
		height: "24px",
	};
};

export const groupButtonStyle = (
	actionInProgress,
	progressIcon,
	actionIcon
) => {
	const backgroundImage = actionInProgress ? progressIcon : actionIcon;

	return {
		outline: "0",
		border: "0",
		height: "20px",
		width: "20px",
		borderRadius: "4px",
		alignItems: "center",
		display: "inline-flex",
		justifyContent: "center",
		position: "relative",
		background: `url(${backgroundImage}) center center no-repeat`,
	};
};
