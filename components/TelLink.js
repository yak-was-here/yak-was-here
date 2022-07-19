import Obfuscate from "react-obfuscate";
import { nick } from "../data/meta";

// obfuscate the tel num so web scrappers cant grab it from GitHub
// Obfuscated by — https://anseki.github.io/gnirts/
// prettier-ignore
export const telNum = (function(){var E=Array.prototype.slice.call(arguments),R=E.shift();return E.reverse().map(function(h,j){return String.fromCharCode(h-R-8-j)}).join('')})(43,105,91)+(36).toString(36).toLowerCase()+(25).toString(36).toLowerCase().split('').map(function(Y){return String.fromCharCode(Y.charCodeAt()+(-71))}).join('')+(function(){var t=Array.prototype.slice.call(arguments),V=t.shift();return t.reverse().map(function(c,D){return String.fromCharCode(c-V-49-D)}).join('')})(60,161,167,141)+(5).toString(36).toLowerCase()+(29).toString(36).toLowerCase().split('').map(function(C){return String.fromCharCode(C.charCodeAt()+(-71))}).join('')+(3).toString(36).toLowerCase()+(function(){var Z=Array.prototype.slice.call(arguments),b=Z.shift();return Z.reverse().map(function(D,S){return String.fromCharCode(D-b-18-S)}).join('')})(58,125)+(257).toString(36).toLowerCase();

export default function TelLink({ children }) {
	return (
		<Obfuscate tel={`+1${telNum.replace(/\D/g, "")}`} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={false} title={`Call ${nick}`}>
			{children}
		</Obfuscate>
	);
}
