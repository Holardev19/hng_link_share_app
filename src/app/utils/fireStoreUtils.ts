// utils/firestoreUtils.ts
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "@/config/firebaseConfig";

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

				await addDoc(
					collection(firestore, `users/${userId}/links`),
					newLink
				);
			}
		}
		console.log("Links saved to Firestore");
	} catch (error) {
		console.error("Error saving links to Firestore: ", error);
	}
};
