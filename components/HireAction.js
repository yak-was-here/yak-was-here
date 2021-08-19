import Obfuscate from "react-obfuscate";
import { emailAddress } from "./ObfusDat";

export default function HireAction({ children }) {
	return (
		<Obfuscate email={emailAddress} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={false} title="Email yak" target="_blank" rel="noopener">
			{children}
		</Obfuscate>
	);
}
