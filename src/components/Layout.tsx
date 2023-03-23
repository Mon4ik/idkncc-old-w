import React, {useEffect} from "react";

import useLocalStorage from "@/utils/useLocalStorage";

export default function Layout({ children }: React.PropsWithChildren) {
	const [isDark, setIsDark] = useLocalStorage("dark-mode", false)

	useEffect(() => {
		if (isDark)
			document.documentElement.classList.add('dark')
		else
			document.documentElement.classList.remove('dark')
	}, [isDark])

	return (
		<>
			{children}
		</>
	)
}