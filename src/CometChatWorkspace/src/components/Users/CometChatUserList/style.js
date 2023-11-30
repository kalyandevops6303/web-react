export const contactWrapperStyle = (props, theme) => {
	const mq = [...theme.breakPoints];

	const style =
		props.type !== "group"
			? {
					border: `1px solid ${theme.borderColor.primary}`,
					height: "100%",
			  }
			: {
					height:"380px",
					[`@media ${mq[3]}`]: {
						height:"340px"
					}
				};
	return {
		display: "flex",
		flexDirection: "column",
		boxSizing: "border-box",
		...style,
		"*": {
			boxSizing: "border-box",
			"::-webkit-scrollbar": {
				width: "8px",
				height: "4px",
			},
			"::-webkit-scrollbar-track": {
				background: "#ffffff00",
			},
			"::-webkit-scrollbar-thumb": {
				background: "#ccc",
				"&:hover": {
					background: "#aaa",
				},
			},
		},
	};
};

export const contactHeaderStyle = (props,theme) => {
	const padding=props.type !== "group"
	? {
		padding: "16px",
	  }
	: {};
	return {
		...padding,
		marginLeft:"5px",
		marginBottom:"5px",
		position: "relative",
		display: "flex",
		alignItems: "center",
		height: "30px",
	};
};

export const contactHeaderCloseStyle = (img, theme) => {
	const mq = [...theme.breakPoints];

	return {
		cursor: "pointer",
		display: "none",
		mask: `url(${img}) left center no-repeat`,
		backgroundColor: `${theme.secondaryTextColor}`,
		height: "24px",
		width: "33%",
		[`@media ${mq[1]}, ${mq[2]}`]: {
			display: "block!important",
		},
	};
};

export const contactHeaderTitleStyle = (props) => {
	const alignment =
		props.hasOwnProperty("enableCloseMenu") && props.enableCloseMenu.length > 0
			? {
					width: "33%",
					textAlign: "center",
			  }
			: {};
    const styling=props.type !== "group"
	? {
		fontSize:"14px",
		color:"#5E5873",
		fontWeight:"600"
	  }
	: {
		fontSize:"12px",
		color:"#B9B9C3"
	  };
	return {
		margin: "0",
		display: "inline-block",
		width: "100%",
		...styling,
		textAlign: "left",
		lineHeight: "23px",
		...alignment,
		"&[dir=rtl]": {
			textAlign: "right",
		},
	};
};

export const contactSearchStyle = (props) => {
	const margin=props.type !== "group"
	? {
		marginRight: "16px",
		marginLeft:"16px",
	  }
	: {};
	return {
		...margin,
		position: "relative",
		borderRadius: "5px",
		border:"1px solid #D8D6DE",
		height: "35px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		"::placeholder":{
			color:"#B9B9C3 !important"
		}
	};
};

export const contactSearchButtonStyle = (img, theme) => {
	return {
		width: "30px",
		height: "100%",
		padding: "8px 0 8px 8px",
		cursor: "default",
		mask: `url(${img}) 10px center no-repeat`,
		backgroundColor: `${theme.secondaryTextColor}!important`,
	};
};

export const contactSearchInputStyle = (props) => {
	return {
		width: "calc(100% - 30px)",
		padding: "8px",
		fontSize: "15px",
		fontWeight: "400",
		lineHeight: "20px",
		outline: "none",
		border: "none",
		height: "100%",
		color: "#5E5873",
		backgroundColor: "transparent",
		"::placeholder":{
			color:"#B9B9C3"
		}
	};
};

export const contactMsgStyle = () => {
	return {
		overflow: "hidden",
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		top: "50%",
	};
};

export const contactMsgTxtStyle = (theme) => {
	return {
		margin: "0",
		minHeight: "36px",
		color: `${theme.color.secondary}`,
		fontSize: "20px!important",
		fontWeight: "600",
		lineHeight: "30px",
		wordWrap: "break-word",
		padding: "0 16px",
	};
};

export const contactListStyle = () => {
	return {
		height: "calc(100% - 125px)",
		overflowY: "auto",
		margin: "10px 0px 0px 0px",
		padding: "0",
	};
};

export const contactAlphabetStyle = (props) => {
	return {
		padding: "0 16px",
		margin: "5px 0",
		width: "100%",
		fontSize: "14px",
		fontWeight: "700",
		lineHeight: "20px",
		color: "#6E6B7B",
	};
};
export const endLine = (props) => {
	return {
		border: 0,
		clear:"both",
		display:"block",
		width: "88%",               
		backgroundColor:"#D8D6DE",
		height: "1px"
	};
};
export const btnContainer = (props) => {
	return {
		display:"flex",
		justifyContent:"flex-end",
		padding:"16px"
	};
};
export const closeButton = (props) => {
	return {
		color:"#0185E4",
		backgroundColor:"white",
		border:"0px",
		cursor:"pointer",
		height:"30px",
		borderRadius:"5px",
		width:"50px",
	};
};
export const sendMessageBtn = (props) => {
	return {
		color:"white",
		height:"30px",
		borderRadius:"5px",
		width:"120px",
		cursor:"pointer",
		border:"0px",
		backgroundColor:"#0065C1",
		marginLeft:"20px"
	};
};
export const topPopUpCloseBtn = (props) => {
	return {
		height:"20px",
		width:"20px",
		cursor:"pointer"
	};
};
export const closeBtnContainer = (props) => {
	return {
		textAlign:"right",
		marginTop:"5px",
		marginRight:"5px"
	};
};
