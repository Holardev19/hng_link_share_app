"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import solar from "@/app/public/solar.svg";
import Image from "next/image";
import { instrumentSans } from "@/app/components/common/fonts";
import email from "@/app/public/lock.svg";
import lock from "@/app/public/lock.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import Toast from "@/app/components/common/Toast";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
	const [toast, setToast] = useState<{
		message: string;
		type: "success" | "error";
	} | null>(null);

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>({
		resolver: zodResolver(loginSchema),
	});

	const emailValue = watch("email", "");
	const passwordValue = watch("password", "");

	const router = useRouter();

	//Handle form submission
	const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
		const { email, password } = data;
		try {
			await signInWithEmailAndPassword(auth, email, password);
			setToast({
				message: "Login successful! Redirecting...",
				type: "success",
			});
			setTimeout(() => {
				router.push("/links");
			}, 2000);
		} catch (error) {
			if (error instanceof FirebaseError) {
				if (error.code === "auth/user-not-found") {
					setToast({
						message: "Incorrect email address.",
						type: "error",
					});
				} else if (error.code === "auth/wrong-password") {
					setToast({ message: "Incorrect password.", type: "error" });
				} else {
					setToast({
						message: "Please input the correct email or password",
						type: "error",
					});
				}
			}
		}
		// Perform login logic here
	};

	return (
		<div
			className={`${instrumentSans.className} flex flex-col items-center min-h-screen p-8 gap-8 justify-center md:w-[30rem] md:items-center md:justify-center md:mx-auto md:h-[30rem]`}>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}
			<div className="flex flex-col items-start justify-start p-6 w-[360px] gap-5">
				<div className="flex flex-row items-start justify-start gap-3 py-2 w-full mb-11 md:justify-center">
					<Image src={solar} alt="logo" width={40} height={40} />

					<p className="w-36 h-[26.25px] font-extrabold text-4xl">
						devlinks
					</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col items-start justify-center gap-8 md:bg-[#fff] md:p-8 md:rounded-md">
					<div className="flex flex-col gap-3 items-start justify-center">
						<h1 className="font-bold text-2xl leading-9 text-[#333333]">
							Login
						</h1>
						<p className="text-[#737373] ">
							Add your details below to get back into the app
						</p>
					</div>

					<div className="flex flex-col justify-center items-start gap-6">
						{/* Email */}

						<div className="flex flex-col justify-center items-start relative">
							<label
								htmlFor="email"
								className="block  font-normal text-[#333333] text-xs leading-5">
								Email address
							</label>
							<div
								className={`w-[19.5rem] h-12 rounded-lg border items-center justify-center py-3 px-4 flex gap-3 ${
									errors.email
										? "border-red-500 focus:ring-red-500 focus:ring-2 focus:ring-offset-2"
										: emailValue
										? "border-[#633CFF] shadow-md shadow-[#633CFF]/50"
										: "border-[#D9D9D9]"
								}`}>
								<Image
									src={email}
									alt="email"
									width={13}
									height={10}
									className="pt-1"
								/>

								<input
									id="email"
									type="email"
									{...register("email")}
									placeholder="e.g alex@gmail.com"
									className="mt-1 block w-64 h-6 opacity-50 rounded-md  outline-none font-normal text-base leading-6 text-[#333333]"
								/>
							</div>
							{errors.email && (
								<p className="text-xs text-red-600 absolute right-0 top-5 z-20 pr-2">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="flex flex-col justify-center items-start relative">
							<label
								htmlFor="password"
								className="block  font-normal text-[#333333] text-xs leading-5">
								Password
							</label>
							<div
								className={`w-[19.5rem] h-12 rounded-lg border items-center justify-center py-3 px-4 flex gap-3 ${
									errors.password
										? "border-red-500 focus:ring-red-500 focus:ring-2 focus:ring-offset-2"
										: passwordValue
										? "border-[#633CFF] shadow-md shadow-[#633CFF]/50"
										: "border-[#D9D9D9]"
								}`}>
								<Image
									src={lock}
									alt="email"
									width={10}
									height={10}
									// className="pt-1"
								/>
								<input
									id="password"
									type="password"
									{...register("password")}
									className="mt-1 block w-64 h-6 opacity-50 rounded-md  outline-none font-normal text-base leading-6 text-[#333333] z-0"
									placeholder="Enter your password"
								/>
							</div>
							{errors.password && (
								<p className="text-xs text-red-600 absolute right-0 top-5 z-20 pr-2">
									{errors.password.message}
								</p>
							)}
						</div>

						<button
							type="submit"
							className="w-full bg-[#633CFF] text-white py-3 px-7 rounded-lg shadow-sm gap-2 flex items-center justify-center">
							<p className="font-semibold text-base leading-6 text-[#fff]">
								Login
							</p>
						</button>
					</div>

					<div className="flex items-center justify-center py-2 w-full h-12">
						<p className="font-normal text-base leading-6 text-center w-44 md:w-full ">
							<span className="text-[#737373] leading-6 font-normal text-base md:mr-2">
								Don’t have an account&#63;
							</span>
							<Link
								href="./auth/register"
								className="leading-6 font-normal text-base text-[#633CFF]">
								Create account
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
