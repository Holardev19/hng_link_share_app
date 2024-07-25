// components/Toast.tsx
import React, { useEffect } from "react";

interface ToastProps {
	message: string;
	type: "success" | "error";
	onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000); // Display toast for 3 seconds

		return () => clearTimeout(timer);
	}, [onClose]);

	return (
		<div
			className={`fixed top-4 font-semibold left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-center ${
				type === "success" ? "bg-[#633CFF]" : "bg-red-500"
			}`}>
			{message}
		</div>
	);
};

export default Toast;
