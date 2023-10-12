export const modalWrapperStyle = (context) => {
	return {
		position:"absolute",
		// width:"280px",
		zIndex:100,
		backgroundColor:"white",
		height:"100%",
		borderRadius:"5px"
	};
};


export const closeBtn = (img, context) => {
	return {
		height:"20px",
		width:"20px",
		cursor:"pointer",
		margin:"5px 5px 0px 0px",
		cursor:"pointer"
	}
};
export const closeImgDiv=()=>
{
	return {
		textAlign:"right",
	}
}
export const modalBodyStyle = () => {
	return {
		padding:"0px 16px 10px 24px",
		// overflowY:"auto",
		position:"relative",
		height: "100%",
		width: "100%",
	};
};

export const modalErrorStyle = (context) => {
	return {
		fontSize: "12px",
		color: `${context.theme.color.red}`,
		textAlign: "center",
		margin: "8px 0",
		width: "100%",
	};
};

export const modalTableStyle = (props) => {
	return {
		borderCollapse: "collapse",
		margin: "0",
		padding: "0",
		width: "100%",
		height: "94%",
		tr: {
			display: "table",
			width: "100%",
			tableLayout: "fixed",
		},
	};
};

export const tableCaptionStyle = () => {
	return {
		color:"#5E5873",
		fontSize: "14px",
		marginBottom: "15px",
		fontWeight: "bold",
		textAlign: "left",
	};
};

export const tableBodyStyle = () => {
	return {
		// height: "calc(100% - 40px)",
		overflow: "hidden",
		display: "block",
		tr: {
			td: {
				padding: "8px 0",
				fontSize: "14px",
				input: {
					width: "100%",
					border: "none",
					padding: "8px 16px",
					fontSize: "14px",
					outline: "none",
				},
				select: {
					outline: "none",
					padding: "8px 16px",
				},
			},
		},
	};
};

export const tableFootStyle = (context, state, img) => {
	const loadingState = state.creatingGroup
		? {
				disabled: "true",
				pointerEvents: "none",
				background: `url(${img}) no-repeat right 10px center ${context.theme.primaryColor}`,
		  }
		: {};

	const textMargin = state.creatingGroup ? { marginRight: "24px" } : {};

	return {
		display: "inline-block",
		button: {
			cursor: "pointer",
			padding: "8px 16px",
			backgroundColor: `${context.theme.primaryColor}`,
			borderRadius: "5px",
			color: `${context.theme.color.white}`,
			fontSize: "14px",
			outline: "0",
			border: "0",
			...loadingState,
			span: {
				...textMargin,
			},
		},
		tr: {
			border: "none",
			td: {
				textAlign: "center",
			},
		},
	};
};

export const inputStyle = (context) => {
	return {
		display: "block",
		width: "100%",
		border: "1px solid #D8D6DE !important",
		// boxShadow: "rgba(20, 20, 20, 0.04) 0 0 0 1px inset",
		borderRadius: "8px",
		backgroundColor: `white`,
		color: "#5E5873",
		fontSize: "14px",
		"::placeholder":{
			color:"#B9B9C3",
			fontSize:"14px"
		}
	};
};
export const createGroupButton = (context) => {
	return {
		backgroundColor:"#0065C1",
		border:"0px",
		color:"white",
		height:"30px",
		borderRadius:"5px",
		marginLeft:"20px",
		cursor:"pointer"
	};
};
export const closeCreateGroupPopupButton = (context) => {
	return {
		backgroundColor:"white",
		border:"0px",
		color:"#0185E4",
		height:"30px",
		borderRadius:"5px",
		marginLeft: "50px",
		cursor:"pointer"
	};
};
export const btnDiv = (context) => {
	return {
		display:"flex",
		justifyContent:"flex-end",
		paddingLeft:"16px",
		paddingRight:"16px",
		marginTop:"-20px"
	};
};
export const endLine = (props) => {
	return {
		border: 0,
		clear:"both",
		display:"block",
		width: "100%",               
		backgroundColor:"#D8D6DE",
		height: "1px"
	};
};
export const groupIconImg = (props) => {
	return {
		height:"80px",
		width:"80px",
		borderRadius:"50%",
		cursor:"pointer"
	};
};
export const uploadIconImg = (props) => {
	return {
		position:"relative",
		height:"25px",
		width:"25px",
		borderRadius:"50%",
		marginLeft:"-27px",
		marginTop:"45px",
		cursor:"pointer"
	};
};
export const groupIconImgContainer = (props) => {
	return {
		display:"flex !important",
		justifyContent:"center",
	};
};
export const groupNameHeader = (props) => {
	return {
		marginTop:"-30px",
		color:"#B9B9C3",
		fontSize:"12px"
	};
};
export const selectMemeberHeader = (props) => {
	return {
		marginTop:"-10px",
		color:"#B9B9C3",
		fontSize:"12px"
	};
};