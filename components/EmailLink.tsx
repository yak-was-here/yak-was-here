import React from "react";
import Obfuscate from "react-obfuscate";
import { nick, email } from "../data/meta";

export default function EmailLink({ children, obfChildren = false }: { children: React.ReactNode; obfChildren?: boolean }) {
	return (
		<Obfuscate email={email} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={obfChildren}>
			<span style={{ display: "inline-block", margin: "0", padding: "0" }} title={`Email ${nick}`}>
				{children}
			</span>
		</Obfuscate>
	);
}
