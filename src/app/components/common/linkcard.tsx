import React, { useState, useEffect, useCallback } from "react";
import lines from "@/app/public/lines.svg";
import Image from "next/image";
import github from "@/app/public/github.svg";
import youtube from "@/app/public/youtube.svg";
import linkedin from "@/app/public/linkedin.svg";
import devTo from "@/app/public/devTo.svg";
import codeWars from "@/app/public/codewars.svg";
import freeCode from "@/app/public/freeCode.svg";
import gitLab from "@/app/public/gitLab.svg";
import hashNode from "@/app/public/hashnode.svg";
import stackOverflow from "@/app/public/stackOverflow.svg";
import Select from "react-select";
import LinkBlack from "@/app/public/LinkBlack.svg";

const customSingleValue = ({ data }: { data: any }) => (
	<div className="flex items-center">
		<Image src={data.icon} alt="icon" className="w-6 h-6 mr-2" />
		{data.label}
	</div>
);

const formatOptionLabel = (option: any) => (
	<div className="flex items-center">
		<Image src={option.icon} alt="icon" className="w-4 h-4 mr-2" />
		{option.label}
	</div>
);

const customStyles = {
	container: (provided: any) => ({
		...provided,
		minHeight: "3rem",
		width: "100%",
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: "#737373",
		fontSize: "1rem",
		minHeight: "3rem",
	}),
	option: (provided: any, state: any) => ({
		...provided,
		color: "#737373",
		fontSize: "1rem",
		backgroundColor: state.isSelected
			? "#F5F5F5"
			: state.isFocused
			? "#E0D7FF"
			: "#FFFFFF",
		"&:hover": {
			backgroundColor: "#E0D7FF",
		},
	}),
	dropdownIndicator: (provided: any) => ({
		...provided,
		padding: 0,
	}),
	clearIndicator: (provided: any) => ({
		...provided,
		display: "none",
	}),
	indicatorSeparator: (provided: any) => ({
		...provided,
		display: "none",
	}),
	menu: (provided: any) => ({
		...provided,
		borderColor: "#633CFF",
	}),
	menuList: (provided: any) => ({
		...provided,
		padding: 0,
	}),
	control: (provided: any, state: any) => ({
		...provided,
		borderColor: state.isFocused ? "#737373" : "#CCCCCC",
		boxShadow: "none",
		"&:hover": {
			borderColor: "#737373",
		},
		outline: "none",
	}),
};

const options = [
	{ value: "Github", label: "GitHub", icon: github },
	{ value: "Youtube", label: "Youtube", icon: youtube },
	{ value: "Linkedin", label: "LinkedIn", icon: linkedin },
	{ value: "DevTo", label: "DevTo", icon: devTo },
	{ value: "CodeWars", label: "CodeWars", icon: codeWars },
	{ value: "FreeCodeCamp", label: "FreeCodeCamp", icon: freeCode },
	{ value: "Gitlab", label: "GitLab", icon: gitLab },
	{ value: "HashNode", label: "HashNode", icon: hashNode },
	{ value: "StackOverflow", label: "StackOverflow", icon: stackOverflow },
];

interface Link {
	platform: string;
	url: string;
}

interface LinkCardProps {
	index: number;
	platform: string;
	url: string;
	onUpdate: (index: number, platform: string, url: string) => void;
	onRemove: (index: number) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({
	index,
	platform,
	url,
	onUpdate,
	onRemove,
}) => {
	const [selectedOption, setSelectedOption] = useState<any>(
		options.find((option) => option.value === platform) || options[0]
	);
	const [linkUrl, setLinkUrl] = useState<string>("");

	useEffect(() => {
		setLinkUrl(url); // Update local state when `url` prop changes
	}, [url]);

	const handleUpdate = useCallback(() => {
		if (selectedOption.value !== platform || linkUrl !== url) {
			onUpdate(index, selectedOption.value, linkUrl);
		}
	}, [selectedOption, linkUrl, index, platform, url, onUpdate]);

	return (
		<>
			<div className="rounded-md p-4 flex flex-col gap-4 bg-[#FAFAFA] w-full h-72 pb-8">
				<div className="flex flex-row justify-between items-start">
					<div
						className="flex flex-row gap-3 items-center
								 justify-start">
						<Image src={lines} alt="lines" width={16} height={12} />

						<p className="font-semibold text-[#737373]">
							Link &#35;{index + 1}
						</p>
					</div>

					<button
						className="text-[#737373] font-light text-sm "
						onClick={() => onRemove(index)}>
						Remove
					</button>
				</div>

				<div className="h-10 flex flex-col gap-2 justify-center items-start mt-3">
					<p className="text-[#737373] text-sm font-light">
						Platform
					</p>
					<Select
						options={options}
						formatOptionLabel={formatOptionLabel}
						onChange={(option) => setSelectedOption(option)}
						value={selectedOption}
						components={{ SingleValue: customSingleValue }}
						className="w-full rounded-md"
						defaultValue={options.find(
							(option) => option.value === "github"
						)}
						styles={customStyles}
						isSearchable={false} // Disables search functionality
						isClearable={false} //
					/>
					{/* Other content */}
				</div>

				<div className="h-10 flex flex-col gap-2 justify-center items-start mt-12">
					<p className="text-[#737373] text-sm font-light">Link</p>
					<div className="flex items-center justify-start pl-3 py-3 border rounded-md w-full gap-3 ">
						<Image
							src={LinkBlack}
							alt="link"
							width={14}
							height={14}
						/>
						<input
							type="text"
							placeholder="e.g https://www.github.com/john_the_doe"
							value={linkUrl}
							onChange={(e) => setLinkUrl(e.target.value)}
							className="text-[#333333] bg-[#FAFAFA] outline-none md:w-full"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default LinkCard;
