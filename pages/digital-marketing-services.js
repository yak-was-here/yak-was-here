import BaseMeta from "../components/BaseMeta";
import Breadcrumbs from "../components/Breadcrumbs";
import CtaBtn from "../components/CtaBtn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { fName, lName, nick } from "../data/meta";
import ServicePackage from "../components/ServicePackage";
import Link from "next/link";

function DigMktgServices() {
	return (
		<>
			<BaseMeta title={`Digital marketing services by ${fName} "${nick}" ${lName}`} desc={`Hire yak and take your business or brand to the next level.`} />
			<NavBar active="services" />
			<Breadcrumbs
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Digital Marketing Services", link: "/digital-marketing-services" },
				]}
			/>
			<Header heading="Digital Marketing Services" />
			<main>
				<div className="section-outside-heading yak-green">
					<h2 className="max-page-width yak-green" style={{ letterSpacing: "0.05em" }} id="selling-point">
						Grow your business.
						<br />
						<strong style={{ fontSize: "larger" }}>Get results.</strong>
					</h2>
					<p className="max-page-width">Full-service digital marketing available packaged and on retainer.</p>
				</div>
				<section>
					<p>Execute your strategy with a campaign that leverages multiple channels at once including social media, email, web content, ecommerce, search engines and more.</p>
					<p>Reduce lost sales and increase brand visibility across the web.</p>
					<p>Discover which approach or combination will drive the greatest results: Pay-Per-Click, social media influencers, retargeting, SEO, and more.</p>
					<p>Focus on where you can make the most impact; leave behind tedious campaign management.</p>
					<hr />
					<h3>Not sure what your business needs to reach the next level?</h3>
					<p>Get recommended strategies based on competitive analysis and market research.</p>
				</section>
				<div className="section-outside-heading yak-cyan">
					<h2 className="max-page-width yak-cyan" style={{ letterSpacing: "0.05em" }} id="selling-point">
						Past work
					</h2>
					<p className="max-page-width">Browse my experience working with different brands and businesses in various industries. This includes experience developing startups, retail, and mom-and-pop shops in the paintball, airsoft, apparel, and fitness industries.</p>
					<p className="max-page-width text-center">
						<Link href="./work">
							<a className="btn">Browse work</a>
						</Link>
					</p>
				</div>
				<section>
					<h2>Website Services</h2>
					<ul>
						<li>Web Design or Redesign</li>
						<li>
							Web Development
							<ul>
								<li>Feature Additions</li>
								<li>User Experience Improvements</li>
							</ul>
						</li>
						<li>
							Web Content Development
							<ul>
								<li>FAQ Page</li>
								<li>Knowledge Bases</li>
								<li>Product Galleries</li>
								<li>Shipping Information</li>
							</ul>
						</li>
						<li>Web Maintenance</li>
					</ul>
				</section>
				<section>
					<h2>Ecommerce Services</h2>
					<ul>
						<li>
							Product Management
							<ul>
								<li>Product Addition</li>
								<li>Product Information Updating</li>
								<li>Product Description Development</li>
								<li>Product Feed Management</li>
							</ul>
						</li>
						<li>
							Sales Channel Integration and Management
							<ul>
								<li>Shopify</li>
								<li>Amazon</li>
								<li>eBay</li>
								<li>Instagram / Facebook</li>
								<li>Google Shopping</li>
								<li>BigCommerce</li>
								<li>Volusion</li>
								<li>WooCommerce</li>
							</ul>
						</li>
					</ul>
				</section>
				<section>
					<h2>SEO (Search Engine Optimization) Services</h2>
					<ul>
						<li>Keyword Targeting</li>
						<li>Technical Optimization</li>
						<li>Blog Article Writing / Copywriting</li>
						<li>Quality Link Building</li>
					</ul>
				</section>
				<section>
					<h2>Graphic Design Services</h2>
					<ul>
						<li>
							Brand Identity
							<ul>
								<li>Logo Design</li>
								<li>Competitive Differentiation</li>
								<li>Value Communication</li>
							</ul>
						</li>
						<li>Social Media Branding</li>
						<li>Web Banner Ads</li>
						<li>Business Cards</li>
						<li>Fliers</li>
					</ul>
				</section>
				<section>
					<h2>Pay-Per-Click Advertising Services</h2>
					<ul>
						<li>Google Ads</li>
						<li>Bing Ads</li>
						<li>Facebook Ads</li>
						<li>Instagram Ads</li>
						<li>Amazon Ads</li>
					</ul>
				</section>
				<section>
					<h2>Social Media Services</h2>
					<ul>
						<li>
							Social Media Marketing &amp; Management
							<ul>
								<li>Content Marketing</li>
								<li>Ads</li>
								<li>Influencers / Brand Advocate Relations</li>
								<li>Chat Bots / Auto Reply</li>
							</ul>
						</li>
						<li>Account / Profile Branding</li>
						<li>Ecommerce Integration</li>
					</ul>
				</section>
				<div className="section-outside-heading yak-purple">
					<h2 className="max-page-width yak-purple" style={{ letterSpacing: "0.05em" }} id="packages">
						Packages
					</h2>
					<p className="max-page-width">Browse complimentary services packaged as one-time projects.</p>
				</div>
				<section>
					<ServicePackage name={"Multi-Channel Marketing Package"} price={"$2,500"}>
						<ul>
							<li>Search Engine Marketing (SEM)</li>
							<li>Social Media Ads</li>
							<li>Email Marketing</li>
							<li>Retargeting</li>
						</ul>
					</ServicePackage>
					<ServicePackage name={"Landing Page Marketing Package"} price={"$4,000"}>
						<ul>
							<li>Multi-Channel Marketing Package</li>
							<li>Landing Page</li>
						</ul>
					</ServicePackage>
					<ServicePackage name={"Website Marketing Package"} price={"$3,000"}>
						<ul>
							<li>Website or Ecommerce Store</li>
						</ul>
					</ServicePackage>
				</section>
				<div className="section-outside-heading yak-purple">
					<h2 className="max-page-width yak-purple" style={{ letterSpacing: "0.05em" }} id="retainer">
						Retainer
					</h2>
					<p className="max-page-width">Hire me to do a fixed number of hours of work for you each month, thereby, taking advantage of all my services when needed.</p>
					<CtaBtn text={"Hire me"} />
				</div>
				{/* 
					- https://www.shopify.in/blog/ecommerce-marketing-analytics-how-to-measure-the-success-of-your-marketing-campaigns
					- https://www.singlegrain.com/blog-posts/link-building/the-ultimate-guide-to-link-building-with-content/
					- https://rosshill.ca/
 				*/}
			</main>
			<Footer />
		</>
	);
}

export default DigMktgServices;
