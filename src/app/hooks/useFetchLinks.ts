import { useState, useEffect } from "react";
import { auth, firestore } from "@/config/firebaseConfig";
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
} from "firebase/firestore";

export const useFetchLinks = () => {
	const [linkCards, setLinkCards] = useState<
		{ platform: string; url: string }[]
	>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const userId = auth.currentUser?.uid || "";

	useEffect(() => {
		const fetchLinks = async () => {
			if (!userId) return;

			try {
				const q = query(collection(firestore, `users/${userId}/links`));
				const querySnapshot = await getDocs(q);

				const links = querySnapshot.docs.map(
					(doc) => doc.data() as { platform: string; url: string }
				);
				setLinkCards(links);
			} catch (error) {
				console.error("Error fetching links: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchLinks();
	}, [userId]);

	const updateLinkCard = async (
		index: number,
		platform: string,
		url: string
	) => {
		const updatedLinkCards = [...linkCards];
		updatedLinkCards[index] = { platform, url };
		setLinkCards(updatedLinkCards);

		try {
			const link = updatedLinkCards[index];
			const linkDocRef = doc(
				firestore,
				`users/${userId}/links/${link.platform}-${Date.now()}`
			);
			await setDoc(linkDocRef, link);
		} catch (error) {
			console.error("Error updating link: ", error);
		}
	};

	return { linkCards, loading, updateLinkCard };
};
