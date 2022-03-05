import Obfuscate from "react-obfuscate";

// prettier-ignore
const emailAddress = (function(){var m=Array.prototype.slice.call(arguments),X=m.shift();return m.reverse().map(function(T,e){return String.fromCharCode(T-X-20-e)}).join('')})(28,153)+(16).toString(36).toLowerCase().split('').map(function(o){return String.fromCharCode(o.charCodeAt()+(-39))}).join('')+(24346).toString(36).toLowerCase()+(function(){var F=Array.prototype.slice.call(arguments),I=F.shift();return F.reverse().map(function(t,B){return String.fromCharCode(t-I-17-B)}).join('')})(45,185,162,159)+(13701).toString(36).toLowerCase()+(30).toString(36).toLowerCase().split('').map(function(e){return String.fromCharCode(e.charCodeAt()+(-71))}).join('')+(12).toString(36).toLowerCase()+(function(){var b=Array.prototype.slice.call(arguments),V=b.shift();return b.reverse().map(function(O,l){return String.fromCharCode(O-V-59-l)}).join('')})(35,204,205);

export default function EmailLink({ children }) {
	return (
		<Obfuscate email={emailAddress} linkText="https://youtu.be/dQw4w9WgXcQ" obfuscateChildren={false} title="Email yak" target="_blank" rel="noopener">
			{children}
		</Obfuscate>
	);
}
