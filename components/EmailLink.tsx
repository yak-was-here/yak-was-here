import React from "react";
import Obfuscate from "react-obfuscate";
import { nick, email } from "../data/meta";

export default function EmailLink({ className = "", children, obfChildren = false }: { className?: string; children: React.ReactNode; obfChildren?: boolean }) {
	return (
		<Obfuscate email={email} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={obfChildren}>
			<span className={className ? className : "inline-block m-0 p-0"} title={`Email ${nick}`}>
				{children}
			</span>
		</Obfuscate>
	);
}
