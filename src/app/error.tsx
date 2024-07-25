"use client";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";

// Fallback UI Component
const ErrorPage = ({ error }: { error: Error }) => {
	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div className="text-center">
				<h1 className="text-4xl font-bold">Something went wrong</h1>
				<p className="mt-4 text-lg">Error: {error.message}</p>
			</div>
		</div>
	);
};

// Error Boundary Wrapper Component
const ErrorBoundaryWrapper: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
	);
};

export default ErrorBoundaryWrapper;
