import React from "react";
import Obfuscate from "react-obfuscate";
import { nick, tel } from "../data/meta";

export default function TelLink({ className = "", children, obfChildren = false }: { className?: string; children: React.ReactNode; obfChildren?: boolean }) {
	return (
		<Obfuscate tel={tel} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={obfChildren}>
			<span className={className ? className : "inline-block m-0 p-0"} title={`Call ${nick}`}>
				{children}
			</span>
		</Obfuscate>
	);
}
