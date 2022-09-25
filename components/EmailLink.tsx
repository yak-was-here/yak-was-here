import Obfuscate from "react-obfuscate";
import { nick, email } from "../data/meta";

export default function EmailLink({ children }) {
	return (
		<Obfuscate email={email} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={false} title={`Email ${nick}`}>
			{children}
		</Obfuscate>
	);
}
