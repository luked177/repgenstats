import { useQuery } from "@tanstack/react-query";
import "./App.css";
import axios from "axios";
import CountUp from "react-countup";
import { FallingConfetti } from "./Confetti/Confetti";
import { useTabFocus } from "./hooks/useIsTabFocused";

function App() {
	const isTabFocused = useTabFocus();

	const metrics = useQuery({
		queryKey: ["Metrics"],
		queryFn: async () => {
			const apiUrl = `https://api.applicationinsights.io/v1/apps/${import.meta.env.VITE_ApplicationId}/metrics/${"customMetrics/RunCount"}`;
			const now = new Date();
			const oneYearAgo = new Date(now);
			oneYearAgo.setFullYear(now.getFullYear() - 1);
			const query = {
				timespan: `${oneYearAgo.toISOString()}/${now.toISOString()}`,
				aggregation: "sum",
			};
			const data = await axios.get(apiUrl, {
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_ApiKey,
				},
				params: query,
			});
			return data.data?.value?.["customMetrics/RunCount"]?.sum;
		},
		refetchInterval: isTabFocused ? 4000 : null,
	});

	return (
		<>
			<FallingConfetti />
			<div style={{ width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
				<CountUp style={{ fontSize: "72px" }} start={0} end={metrics.data} duration={2.75} suffix=' Reports Ran'></CountUp>
			</div>
		</>
	);
}

export default App;
