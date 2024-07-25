import React from "react";

interface ModalProps {
	message: string;
	isVisible: boolean;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, isVisible, onClose }) => {
	if (!isVisible) return null;

	return (
		<div className="fixed top-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 z-50">
			<div className="bg-white p-4 rounded shadow-md">
				<p>{message}</p>
				<button
					className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
					onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
};

export default Modal;
