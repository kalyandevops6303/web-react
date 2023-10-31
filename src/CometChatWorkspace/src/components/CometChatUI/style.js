export const unifiedStyle = (props) => {
	const mq = [...props.theme.breakPoints];

	return {
		display: "flex",
		height: "100%",
		width: "100%",
		maxWidth: "1500px",
		marginLeft: "auto",
		marginRight: "auto",
		padding: "30px 24px 30px 24px",
		boxSizing: "border-box",
		backgroundColor: "#F8F8F8",
		fontFamily: `${props.theme.fontFamily}`,
		border: `1px solid ${props.theme.borderColor.primary}`,
		position: "relative",
		"*": {
			boxSizing: "border-box",
			fontFamily: `${props.theme.fontFamily}`,
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
		[`@media ${mq[0]}`]: {
			padding: 0,
		},
	};
};

export const unifiedSidebarStyle = (state, props) => {
	const sidebarView = state.sidebarview
		? {
				left: "0",
				boxShadow: "rgba(0, 0, 0, .4) -30px 0 30px 30px",
		  }
		: {};

	const mq = [...props.theme.breakPoints];

	return {
		width: "370px",
		border: `1px solid ${props.theme.borderColor.primary}`,
		borderRadius: "5px",
		marginRight: "12px",
		backgroundColor: `${props.theme.backgroundColor.white}`,
		height: "100%",
		position: "relative",
		display: "flex",
		flexDirection: "column",
		"> .contacts, .chats, .groups, .userinfo": {
			// height: "calc(100% - 64px)",
			height:"100%"
		},
		[`@media ${mq[0]}`]: {
			position: "absolute!important",
			left: "-100%",
			top: "0",
			bottom: "0",
			width: "100%!important",
			zIndex: "2",
			margin: 0,
			backgroundColor: `${props.theme.backgroundColor.white}`,
			transition: "all .3s ease-out",
			...sidebarView,
		},
	};
};

export const unifiedMainStyle = (state, props) => {
	const mq = [...props.theme.breakPoints];

	return {
		width: "calc(100% - 280px)",  
		border: `1px solid ${props.theme.borderColor.primary}`,
		borderRadius: "5px",
		marginLeft: "12px",
		height: "100%",
		order: "2",
		display: "flex",
		flexDirection: "row",
		[`@media ${mq[0]}`]: {
			width: "100%",
			margin: 0,
		},
	};
};
