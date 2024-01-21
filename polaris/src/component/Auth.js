import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const Auth = ({ children }) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { pathname } = useLocation();
	const checkUser = queryClient.getQueryData(["check"]);

	useEffect(() => {
		if (!checkUser) {
			return;
		}
		console.log("checkUser in auth.js", checkUser);

		if (checkUser.userId === 'none') {
			navigate("/auth/login", { state: pathname });
		}
	}, [checkUser, navigate, pathname]);

	return <>{children}</>;
};

export default Auth;
