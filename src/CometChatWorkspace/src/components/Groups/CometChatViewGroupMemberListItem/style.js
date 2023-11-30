export const modalRowStyle = (context) => {
	return {
		display: "flex",
		width: "100%",
		fontSize: "14px",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	};
};

export const nameColumnStyle = (context, participantView) => {
	const mq = context.theme.breakPoints.map((x) => `@media ${x}`);

	const widthProp = participantView
		? {
				width: "100%",
				[mq[1]]: {
					width: "100%",
				},
				[mq[2]]: {
					width: "100%",
				},
		  }
		: {
				width: "100%",
				[mq[1]]: {
					width: "100%",
				},
				[mq[2]]: {
					width: "100%",
				},
				[mq[3]]: {
					width: "100%",
				},
		  };

	return {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		...widthProp,
	};
};

export const avatarStyle = (context, participantView) => {
	const mq = context.theme.breakPoints.map((x) => `@media ${x}`);

	const marginProp = participantView
		? {
				marginRight: "8px",
		  }
		: {
				marginRight: "8px",
				[mq[1]]: {
					marginRight: "0",
				},
		  };

	return {
		width: "36px",
		height: "36px",
		borderRadius:"50%",
		flexShrink: "0",
		...marginProp,
	};
};

export const nameStyle = (context, participantView) => {
	const mq = context.theme.breakPoints.map((x) => `@media ${x}`);

	const widthProp = participantView
		? {
				width: "100%",
		  }
		: {
				width: "calc(100% - 50px)",
		  };

	const displayProp = participantView
		? {
				display: "inline",
				[mq[1]]: {
					display: "inline",
				},
		  }
		: {
				display: "inline",
				[mq[1]]: {
					display: "none",
				},
		  };

	return {
		overflow: 'visible', 
		marginTop: '10px',
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		...widthProp,
		...displayProp,
	};
};

export const scopeColumnStyle = (context) => {
	const mq = context.theme.breakPoints.map((x) => `@media ${x}`);

	return {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "180px",
		img: {
			width: "24px",
			height: "24px",
			cursor: "pointer",
		},
		[mq[1]]: {
			width: "140px",
		},
		[mq[2]]: {
			width: "180px",
		},
		[mq[3]]: {
			width: "120px",
		},
	};
};

export const scopeWrapperStyle = () => {
	return {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		transition: "opacity .1s linear",
		img: {
			margin: "0px 4px",
		},
	};
};

export const scopeSelectionStyle = () => {
	return {
		width: "65%",
		border: "0",
		boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
		borderRadius: "8px",
		backgroundColor: `rgba(20, 20, 20, 0.04)`,
		padding: "8px",
		color: `rgba(20, 20, 20, 0.6)`,
		float: "left",
	};
};

export const scopeIconStyle = (img, context) => {
	return {
		width: "24px",
		height: "24px",
		display: "inline-block",
		cursor: "pointer",
		mask: `url(${img}) center center no-repeat`,
		backgroundColor: `${context.theme.secondaryTextColor}`,
	};
};

export const roleStyle = () => {
	return {
		fontSize: "12px",
		maxWidth: "calc(100% - 20px)",
	};
};

export const actionColumnStyle = (context) => {
	const mq = context.theme.breakPoints.map((x) => `@media ${x}`);

	return {
		[mq[1]]: {
			width: "40px",
		},
		[mq[2]]: {
			width: "40px",
		},
	};
};

export const banIconStyle = (img, context) => {
	return {
		width: "24px",
		height: "24px",
		display: "inline-block",
		cursor: "pointer",
		mask: `url(${img}) center center no-repeat`,
		backgroundColor: `${context.theme.secondaryTextColor}`,
	};
};

export const namePStyle = () => {
	return {
		color:"#5E5873",
		fontSize:"15px",
		fontWeight:600,
		lineHeight:"0px"
	};
};
export const desStyle = () => {
	return {
		color:"#B9B9C3",
		fontSize:"14px",
		marginTop:"20px",
		lineHeight:"0px"
	};
};
export const kickIconStyle = (img, context) => {
	return {
		width: "20px",
		height: "20px",
		paddingRight:"30px",
		display: "inline-block",
		cursor: "pointer",
		background: `url(${img}) center center no-repeat`,
	};
};
