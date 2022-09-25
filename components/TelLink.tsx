import React from "react";
import Obfuscate from "react-obfuscate";
import { nick, tel } from "../data/meta";

export default function TelLink({ children, obfChildren = false }: { children: React.ReactNode; obfChildren?: boolean }) {
	return (
		<Obfuscate tel={tel} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={obfChildren}>
			<span style={{ display: "inline-block", margin: "0", padding: "0" }} title={`Call ${nick}`}>
				{children}
			</span>
		</Obfuscate>
	);
}
