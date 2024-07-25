// src/app/fonts.ts
import { Instrument_Sans } from "next/font/google";

// Set up the font with required configuration
export const instrumentSans = Instrument_Sans({
	subsets: ["latin"],
	weight: ["400", "700"], // Specify weights you need
});
