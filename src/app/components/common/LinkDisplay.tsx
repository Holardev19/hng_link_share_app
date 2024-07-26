import React from "react";
import { useEffect, useState } from "react";
import { firestore, auth } from "@/config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import WhiteGit from "@/app/public/WhiteGit.svg";
import WhiteYoutube from "@/app/public/WhiteYoutube.svg";
import WhiteLinkedin from "@/app/public/WhiteLinkedin.svg";
import ArrowRight from "@/app/public/ArrowRight.svg";

interface Link {
	platform: string;
	url: string;
}

const LinkDisplay = () => {
	const [links, setLinks] = useState<Link[]>([]);
	const userId = auth.currentUser?.uid;

	useEffect(() => {
		if (!userId) {
			console.error("User is not authenticated"); // **Added Authentication Check**
			return;
		}
		const fetchLinks = async () => {
			try {
				const linksCollection = collection(
					firestore,
					`users/${userId}/links`
				);
				const linksQuery = query(linksCollection);

				const querySnapshot = await getDocs(linksQuery);

				const fetchedLinks: Link[] = [];
				querySnapshot.forEach((doc) => {
					const data = doc.data() as Link;
					fetchedLinks.push(data);
				});

				setLinks(fetchedLinks);
			} catch (error) {
				console.error(
					"Error fetching links from Firestore: ",
					JSON.stringify(error)
				);
			}
		};

		fetchLinks();
	}, [userId]);

	const handleCopyToClipboard = (url: string) => {
		navigator.clipboard
			.writeText(url)
			.then(() => {
				alert("Link copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy link: ", err);
			});
	};

	const renderIcon = (platform: string) => {
		switch (platform) {
			case "GitHub":
				return WhiteGit;
			case "YouTube":
				return WhiteYoutube;
			case "LinkedIn":
				return WhiteLinkedin;
			default:
				return null;
		}
	};

	return (
		<>
			<div className="flex flex-col gap-5 items-center justify-center">
				{links.map((link, index) => (
					<div
						key={index}
						className={`flex items-center justify-between ${
							link.platform === "GitHub"
								? "bg-[#1a1a1a]"
								: link.platform === "YouTube"
								? "bg-[#EE3939]"
								: "bg-[#2D68FF]"
						} w-[237px] h-[44px] p-3 rounded-lg gap-3 cursor-pointer`}
						onClick={() => handleCopyToClipboard(link.url)}>
						<div className="flex items-center justify-center gap-3">
							<Image
								src={renderIcon(link.platform)}
								alt={link.platform}
								width={24}
								height={24}
							/>
							<p className="text-[#fff] font-normal">
								{link.platform}
							</p>
						</div>
						<div>
							<Image
								src={ArrowRight}
								alt="arrow"
								width={16}
								height={16}
							/>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default LinkDisplay;
