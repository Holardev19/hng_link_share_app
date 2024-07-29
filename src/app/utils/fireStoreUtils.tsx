"use client";

// uils/firestoreUtils.ts
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const saveLinksToFirestore = async (
	userId: string,
	linkCards: { platform: string; url: string }[]
) => {
	try {
		for (const link of linkCards) {
			if (link.platform && link.url) {
				const newLink = {
					platform: link.platform,
					url: link.url,
					userId: userId,
				};

				const docRef = await addDoc(
					collection(firestore, `users/${userId}/links`),
					newLink
				);
				console.log("Saving to document ID:", docRef.id);
				console.log(
					"Saving to document path:",
					`users/${userId}/links/${docRef.id}`
				);
			}
		}
		console.log("Links saved to Firestore");
	} catch (error) {
		console.error("Error saving links to Firestore: ", error);
	}
};
