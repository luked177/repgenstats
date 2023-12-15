import { useState, useEffect } from "react";

export const useTabFocus = () => {
	const [isTabFocused, setIsTabFocused] = useState(!document.hidden);

	useEffect(() => {
		const handleVisibilityChange = () => {
			setIsTabFocused(!document.hidden);
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return isTabFocused;
};
