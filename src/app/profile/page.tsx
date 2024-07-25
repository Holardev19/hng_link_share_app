"use client";
import React, { ChangeEvent, useState } from "react";
import { Formik, Field, Form, FieldProps, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Navbar from "@/app/components/common/navbar"; // Adjust the import based on your actual Navbar path
import image from "@/app/public/image.svg";
import mobile from "@/app/public/mobile.svg";
import WhiteGit from "@/app/public/WhiteGit.svg";
import ArrowRight from "@/app/public/ArrowRight.svg";
import WhiteYoutube from "@/app/public/WhiteYoutube.svg";
import WhiteLinkedin from "@/app/public/WhiteLinkedin.svg";

const FormComponent: React.FC = () => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const validationSchema = Yup.object({
		firstname: Yup.string().required("First name is required"),
		lastname: Yup.string().required("Last name is required"),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is required"),
		profilePicture: Yup.mixed<File>()
			.required("A file is required")
			.test("fileSize", "File size must be below 1MB", (value) => {
				if (value) {
					const file = value as File;
					return file.size <= 1024 * 1024; // 1MB
				}
				return false;
			})
			.test("fileFormat", "Unsupported Format", (value) => {
				if (value) {
					const file = value as File;
					return ["image/jpeg", "image/png"].includes(file.type);
				}
				return false;
			}),
	});

	const handleFileChange = (
		event: ChangeEvent<HTMLInputElement>,
		setFieldValue: (field: string, value: any) => void
	) => {
		const file = event.target.files?.[0];
		if (file) {
			setFieldValue("profilePicture", file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	return (
		<div>
			<Navbar />

			<Formik
				initialValues={{
					firstname: "",
					lastname: "",
					email: "",
					profilePicture: null,
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
					// Handle form submission logic here
				}}>
				{({ setFieldValue, errors }) => (
					<Form className="p-4 bg-[#FAFAFA] w-full h-screen lg:flex lg:items-start lg:justify-center lg:gap-4 lg:mx-3 xl:gap-6 lg:relative">
						<div className="hidden lg:flex lg:w-[27rem] border lg:h-[60rem] lg:rounded-md  lg:items-center lg:justify-center lg:bg-[#fff] xl:w-[40rem]">
							<Image
								src={mobile}
								alt="mock"
								className="w-[30rem] h-[30rem] xl:w-[30rem] xl:h-[30rem] z-0"
							/>

							<div className="flex flex-col gap-3 items-center justify-center z-20 absolute bottom-[3.1rem]">
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

						<div className="py-6 px-4  bg-[#fff] flex flex-col gap-6 rounded-md md:px-6 lg:w-[43rem] lg:mr-6">
							<div className="flex flex-col gap-3 items-start justify-start">
								<h1 className="text-[#333333] text-xl font-bold ">
									Profile Details
								</h1>
								<p className="text-[#737373]">
									Add to your details to create a personal
									touch to your profile
								</p>
							</div>

							<div className="p-4 w-full rounded-md bg-[#fafafa] flex flex-col gap-5 md:flex-row md:items-center justify-between">
								<p className="text-[#737373] md:mr-40">
									Profile picture
								</p>
								<label className="flex flex-col items-center justify-center bg-[#efebff] gap-4 w-48 h-48 rounded-md">
									<Image
										src={image || "/default-image.png"} // Default image if none is uploaded
										width={48}
										height={48}
										alt="Preview"
									/>
									<Field name="profilePicture">
										{({ field, meta }: FieldProps) => (
											<>
												<input
													id="profilePicture"
													type="file"
													accept=".png, .jpg, .jpeg"
													onChange={(event) =>
														handleFileChange(
															event,
															setFieldValue
														)
													}
													className="hidden"
												/>
												<p className="text-[#633cff] font-medium ">
													&#43; Upload Image
												</p>
												{meta.touched && meta.error ? (
													<p className="text-red-500">
														{meta.error}
													</p>
												) : null}
											</>
										)}
									</Field>
								</label>
								<p className="text-[#737373] text-sm font-normal md:w-28">
									Image must be below 1024x1024px. Use PNG or
									JPG format
								</p>
							</div>

							<div className="p-4 w-full rounded-md bg-[#fafafa] flex flex-col gap-5">
								<div className="flex flex-col gap-2 md:flex-row md:gap-[3.8rem]">
									<label
										htmlFor="firstname"
										className="block md:min-w-52 md:mr-11">
										First Name&#42;
									</label>
									<Field
										id="firstname"
										name="firstname"
										type="text"
										className="outline-none rounded-md border p-2 w-full "
									/>
									<ErrorMessage
										name="firstname"
										component="p"
										className="text-red-500 md:hidden"
									/>
								</div>
								<div className="flex items-center justify-end">
									<ErrorMessage
										name="firstname"
										component="p"
										className="text-red-500 hidden md:block"
									/>
								</div>
								<div className="flex flex-col gap-2 md:flex-row md:gap-[3.8rem]">
									<label
										htmlFor="lastname"
										className="block md:min-w-52 md:mr-11">
										Last Name &#42;
									</label>
									<Field
										id="lastname"
										name="lastname"
										type="text"
										className="outline-none rounded-md border p-2 w-full"
									/>
									<ErrorMessage
										name="lastname"
										component="p"
										className="text-red-500 md:hidden"
									/>
								</div>
								<div className="flex items-center justify-end">
									<ErrorMessage
										name="lastname"
										component="p"
										className="text-red-500 hidden md:block"
									/>
								</div>

								<div className="flex flex-col gap-2 md:flex-row md:gap-[3.8rem]">
									<label
										htmlFor="email"
										className="block md:min-w-52 md:mr-11">
										Email&#42;
									</label>
									<Field
										id="email"
										name="email"
										type="email"
										className="outline-none rounded-md border p-2 w-full"
									/>
									<ErrorMessage
										name="email"
										component="p"
										className="text-red-500 md:hidden"
									/>
								</div>
								<div className="flex items-center justify-end">
									<ErrorMessage
										name="email"
										component="p"
										className="text-red-500 hidden md:block"
									/>
								</div>
							</div>

							<div className="w-full md:w-full md:flex md:flex-row md:items-start md:justify-end md:mt-32 h-28 border-t md:py-6">
								<button
									type="submit"
									className="bg-[#633cff] text-white p-2 rounded w-full md:w-24">
									Submit
								</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormComponent;
