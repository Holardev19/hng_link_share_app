"use client";
import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig"; // Ensure this path matches your actual setup

const TestFirestore: React.FC = () => {
	const testFirestore = async () => {
		try {
			const docRef = await addDoc(collection(firestore, "users"), {
				first: "Ada",
				last: "Lovelace",
				born: 1815,
			});
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	return (
		<div>
			<h1>Test Firestore</h1>
			<button onClick={testFirestore}>Add Document</button>
		</div>
	);
};

export default TestFirestore;
