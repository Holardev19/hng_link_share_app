import React from "react";
import Image from "next/image";
import ProfilePic from "@/app/public/ProfilePic.svg";
import WhiteGit from "@/app/public/WhiteGit.svg";
import ArrowRight from "@/app/public/ArrowRight.svg";
import WhiteYoutube from "@/app/public/WhiteYoutube.svg";
import WhiteLinkedin from "@/app/public/WhiteLinkedin.svg";
import Link from "next/link";

const PreviewPage: React.FC = () => {
	return (
		<div className="relative md:h-[55rem] md:pb-40">
			<div className="w-full flex flex-col items-start justify-start leading-[normal] tracking-[normal] z-0 md:bg-[#633cff] md:h-80 md:rounded-br-xl md:rounded-bl-xl">
				<nav className="flex justify-center items-center gap-4 py-3 px-5 w-full md:bg-[#fff] md:z-10 md:m-4 md:rounded-md md:justify-between md:w-[95%]">
					<Link href="/links">
						<button className="flex items-center justify-center py-1 px-2 border w-40 h-10 rounded-md border-[#633cff] md:w-36">
							<p className="text-[#633cff] font-medium">
								Back to Editor
							</p>
						</button>
					</Link>

					<button className="flex items-center justify-center py-1 px-2 border w-40 h-10 rounded-md bg-[#633cff] md:w-32">
						<p className="text-[#fff] font-medium">Share Link</p>
					</button>
				</nav>
			</div>

			<section className="flex flex-col items-center justify-start px-8 gap-16  w-full md:z-30 md:absolute md:top-40 md:h-[569px] md:py-3 md:px-14 md:bg-[#fff] md:w-[349px]  md:rounded-xl md:justify-start md:mb-28 md:mx-[30%] lg:mx-[35%] xl:mx-[37%] 2xl:mx-[42%]">
				<div className="mt-14 flex flex-col items-center justify-start gap-6">
					<Image
						className="w-[104px] h-[104px] relative rounded-[50%] object-cover"
						loading="lazy"
						alt="pic"
						src={ProfilePic}
						width={30}
						height={30}
					/>
					<div className="flex flex-col items-center justify-start gap-4">
						<h1 className="m-0 relative text-xl leading-[150%] font-bold font-inherit text-[#333333]">
							Ben Wright
						</h1>
						<div className="relative text-base leading-[150%] text-grey whitespace-nowrap text-[#737373]">
							ben@example.com
						</div>
					</div>
				</div>

				{/* The links */}
				<div className="flex flex-col gap-5 items-center justify-center ">
					<div className="flex items-center justify-between bg-[#1a1a1a] w-[237px] h-[44px] p-3 rounded-lg gap-3">
						<div className="flex items-center justify-center gap-3">
							<Image
								src={WhiteGit}
								alt="github"
								width={24}
								height={24}
							/>
							<p className="text-[#fff] font-normal">GitHub</p>
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
					<div className="flex items-center justify-between bg-[#EE3939] w-[237px] h-[44px] p-3 rounded-lg gap-3">
						<div className="flex items-center justify-center gap-3">
							<Image
								src={WhiteYoutube}
								alt="github"
								width={24}
								height={24}
							/>
							<p className="text-[#fff] font-normal">Youtube</p>
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
					<div className="flex items-center justify-between bg-[#2D68FF] w-[237px] h-[44px] p-3 rounded-lg gap-3">
						<div className="flex items-center justify-center gap-3">
							<Image
								src={WhiteLinkedin}
								alt="github"
								width={24}
								height={24}
							/>
							<p className="text-[#fff] font-normal">LinkedIn</p>
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
			</section>
		</div>
	);
};

export default PreviewPage;
