import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ErrorBoundaryWrapper from "./error";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Link Sharing App",
	description: "HNG Stage five Task",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ErrorBoundaryWrapper>{children}</ErrorBoundaryWrapper>
			</body>
		</html>
	);
}
