"use client";
import React from "react";
import Image from "next/image";
import logo from "@/app/public/logo.svg";
import link from "@/app/public/link.svg";
import profile from "@/app/public/profile.svg";
import eye from "@/app/public/eye.svg";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar: React.FC = () => {
	const router = useRouter();
	const currentPath = usePathname();
	return (
		<>
			<nav className="w-full h-16 py-4 px-6 md:bg-[#fff] md:mt-4 md:rounded-md  md:py-0 md:pt-2 md:w-[95%] md:mx-auto">
				<div
					className="flex justify-between items-center
				gap-4 md:pb">
					<div className="md:flex md:items-center md:justify-center md:gap-3 md:h-12 md:w-[14rem]">
						<Image src={logo} alt="logo" width={30} height={27} />
						<p className="w-full h-[26.25px] font-extrabold text-4xl md:text-2xl hidden md:block">
							devlinks
						</p>
					</div>

					<div className="flex justify-between items-center gap-4">
						<Link
							href="/links"
							className={`flex items-center justify-center w-14 h-9  md:w-28 md:gap-2 ${
								currentPath === "/links"
									? "bg-[#EFEBFF] shadow-md rounded-lg"
									: ""
							}`}>
							<Image
								src={link}
								alt="link"
								width={18}
								height={18}
							/>
							<p className="hidden md:block text-[#633cff] font-medium">
								Links
							</p>
						</Link>

						<Link
							href="/profile"
							className={`flex items-center justify-center w-14 h-8 md:w-36 md:gap-2 ${
								currentPath === "/profile"
									? "bg-[#EFEBFF] shadow-md rounded-lg"
									: ""
							}`}>
							<Image
								src={profile}
								alt="link"
								width={18}
								height={18}
								className="shadow-md"
							/>
							<p className="w-full h-[26.25px] text-4xl  hidden md:block md:text-sm md:text-[#737373] md:font-medium md:pt-1">
								Profile Details
							</p>
						</Link>
					</div>

					<div className="md:w-52 md:flex md:justify-end">
						<Link
							href="/preview"
							className="w-12 h-9 border border-[#633CFF] rounded-md flex items-center justify-center md:w-20">
							<Image
								src={eye}
								alt="preview"
								width={24}
								height={24}
								className="md:hidden"
							/>
							<p className="w-full h-[26.25px] text-4xl  hidden md:block md:text-sm md:text-[#633cff] md:font-medium md:pt-1 md:w-40 text-center">
								Preview
							</p>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
