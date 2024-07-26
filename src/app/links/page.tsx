"use client";
import React, { useState } from "react";
import Navbar from "../components/common/navbar";
import hand from "@/app/public/hand.svg";
import Image from "next/image";
import LinkCard from "../components/common/linkcard";
import mobile from "@/app/public/mobile.svg";
import WhiteGit from "@/app/public/WhiteGit.svg";
import ArrowRight from "@/app/public/ArrowRight.svg";
import WhiteYoutube from "@/app/public/WhiteYoutube.svg";
import WhiteLinkedin from "@/app/public/WhiteLinkedin.svg";
import { useFetchLinks } from "@/app/hooks/useFetchLinks";
import { saveLinksToFirestore } from "@/app/utils/fireStoreUtils";
import { auth, firestore } from "@/config/firebaseConfig";
import {
	collection,
	query,
	where,
	getDocs,
	setDoc,
	doc,
} from "firebase/firestore";

const LinksPage: React.FC = () => {
	const [linkCards, setLinkCards] = useState<
		{ platform: string; url: string }[]
	>([]);
	const [showGetStarted, setShowGetStarted] = useState<boolean>(true);
	const [showLinkCards, setShowLinkCards] = useState<boolean>(false);
	const [isSaveButtonEnabled, setIsSaveButtonEnabled] =
		useState<boolean>(false);

	const [nextIndex, setNextIndex] = useState<number>(0);

	const userId = auth.currentUser?.uid || "";

	const updateLinkCard = (index: number, platform: string, url: string) => {
		setLinkCards((prevLinkCards) => {
			const updatedLinkCards = [...prevLinkCards];
			updatedLinkCards[index] = { platform, url };
			return updatedLinkCards;
		});
	};

	const removeLinkCard = (index: number) => {
		setLinkCards((prevLinkCards) =>
			prevLinkCards.filter((_, i) => i !== index)
		);
	};

	const addLinkCard = () => {
		console.log("Adding new link card");
		const newIndex = linkCards.length;
		setLinkCards((prevLinkCards) => [
			...prevLinkCards,
			{ platform: "GitHub", url: "" },
		]);
		setShowGetStarted(false);
		setShowLinkCards(true);
		setIsSaveButtonEnabled(true); // Enable the save button
	};

	const handleSave = async () => {
		const userId = auth.currentUser?.uid || "";
		if (userId) {
			await saveLinksToFirestore(userId, linkCards);
		} else {
			console.error("User is not authenticated");
		}
	};

	console.log("Show Get Started:", showGetStarted);

	return (
		<>
			<Navbar />

			<div
				className="bg-[#FAFAFA] p-4 lg:flex lg:items-start lg:justify-center lg:gap-4 lg:mx-3 xl:gap-6 lg:relative
			">
				<div className="hidden lg:flex lg:w-[25rem] border lg:h-[45rem] lg:rounded-md  lg:items-center lg:justify-center lg:bg-[#fff] xl:w-[30rem]">
					<Image
						src={mobile}
						alt="mock"
						className="w-[30rem] h-[30rem] xl:w-[30rem] xl:h-[30rem] z-0"
					/>

					<div className="flex flex-col gap-3 items-center justify-center z-20 absolute bottom-[17.2rem]">
						<div className="flex items-center justify-between bg-[#1a1a1a] w-[180px] h-[35px] p-3 rounded-lg gap-3">
							<div className="flex items-center justify-center gap-3">
								<Image
									src={WhiteGit}
									alt="github"
									width={24}
									height={24}
								/>
								<p className="text-[#fff] font-normal text-sm">
									GitHub
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

						{/* Youtube */}
						<div className="flex items-center justify-between bg-[#EE3939] w-[180px] h-[35px] p-3 rounded-lg gap-3">
							<div className="flex items-center justify-center gap-3">
								<Image
									src={WhiteYoutube}
									alt="github"
									width={24}
									height={24}
								/>
								<p className="text-[#fff] font-normal text-sm">
									Youtube
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

						{/* LinkedIn */}
						<div className="flex items-center justify-between bg-[#2D68FF] w-[180px] h-[35px] p-3 rounded-lg gap-3">
							<div className="flex items-center justify-center gap-3">
								<Image
									src={WhiteLinkedin}
									alt="github"
									width={24}
									height={24}
								/>
								<p className="text-[#fff] font-normal text-sm">
									LinkedIn
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
					</div>
				</div>
				<div className="bg-[#fff] rounded-md overflow-clip px-4 pt-7 pb-5 flex flex-col gap-8 h-[45rem] relative lg:w-[40rem] xl:w-[50rem]">
					<div className="flex flex-col items-start justify-center gap-5">
						<h1 className="text-2xl font-bold text-[#333333]">
							Customize your links
						</h1>
						<p className="text-[#737373] text-sm">
							Add/edit/remove links below and then share all your
							profiles with the world!
						</p>
					</div>

					<div className="flex flex-col items-center justify-center gap-4">
						<button
							onClick={addLinkCard}
							className="flex items-center justify-center w-full h-10 border border-[#633CFF] rounded-md">
							<p className="text-[#633CFF] text-sm font-medium">
								&#43; Add new link
							</p>
						</button>

						{/* The link cards */}
						{/* Link Cards Container */}
						<div
							className={`flex flex-col gap-3 overflow-y-auto transition-all duration-300 z-0 md:w-full ${
								showLinkCards ? "h-[30rem]" : "h-0"
							}`}>
							{linkCards.map((link, index) => (
								<LinkCard
									key={index}
									index={index}
									platform={link.platform}
									url={link.url}
									onUpdate={updateLinkCard}
									onRemove={removeLinkCard}
								/>
							))}
						</div>

						{/* Get started */}
						{showGetStarted && (
							<div className="rounded-md bg-[#FAFAFA] py-10 px-4 w-full flex flex-col items-center justify-center gap-4 h-[25rem]">
								<Image
									src={hand}
									alt="start"
									width={124.77}
									height={80}
								/>

								<h2 className="font-semibold text-lg md:text-xl">
									Let&apos;s get you started
								</h2>
								<p className="text-[#737373] text-sm text-center w-full md:w-[28rem]">
									Use the &quot;Add new link&quot; button to
									get started. Once you have more than one
									link, you can reorder and edit them.
									We&apos;re here to help you share your
									profiles with everyone!
								</p>
							</div>
						)}
					</div>

					{/* The button */}
					<div className="w-full absolute bottom-0 border-t left-0 p-5 z-20 bg-[#fff] md:flex md:items-center md:justify-end">
						<button
							onClick={handleSave}
							className={`w-full h-10 p flex items-center justify-center rounded-md active:bg-[#beadff] md:w-24 ${
								isSaveButtonEnabled
									? "bg-[#633CFF] text-[#fff]"
									: "bg-[#beadff] text-[#fff]"
							}`}
							type="button"
							disabled={!isSaveButtonEnabled}>
							<p className="text-[#fff] text-md font-medium">
								Save
							</p>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default LinksPage;
