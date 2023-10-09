import React from "react";

import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClient and QueryClientProvider
import "./index.css";
import App from "./App";

import ReactDOM from "react-dom/client";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</React.StrictMode>
);
