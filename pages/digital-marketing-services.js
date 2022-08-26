import BaseMeta from "../components/BaseMeta";
import Breadcrumbs from "../components/Breadcrumbs";
import CtaBtn from "../components/CtaBtn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { fName, lName, nick } from "../data/meta";
import ServicePackage from "../components/ServicePackage";

function DigMktgServices() {
	return (
		<>
			<BaseMeta title={`Digital marketing services by ${fName} "${nick}" ${lName}`} desc={`Hire yak and take your business or brand to the next level.`} />
			<NavBar active="work" />
			<Breadcrumbs
				trail={[
					{ text: "Home", link: "/" },
					{ text: "Digital Marketing Services", link: "/digital-marketing-services" },
				]}
			/>
			<Header heading="Digital Marketing Services" />
			<main>
				<section>
					<p>Execute your strategy with a campaign that spans multiple channels: social media, email, web content, and more. Discover which strategies will give you the greatest return on investment: Pay-Per-Click, social media influencers, retargeting, and more. Get full-service digital marketing available either in packages or on retainer.</p>
					{/* Display three popular package options in a grid. Link to packages section at bottom of page. */}
					<ul>
						<li>Pack1</li>
						<li>Pack2</li>
						<li>Pack3</li>
					</ul>
					<p>Below are many of the services available on retainer and included in packages:</p>
				</section>
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
					<h2>Paid Advertising Services</h2>
					<ul>
						<li></li>
						<li>Google Ads</li>
						<li>Meta Ads</li>
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
				<h2 className="section-outside-heading" id="packages">
					Packages
				</h2>
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
				<h2 className="section-outside-heading" id="on-retainer">
					Retainer
				</h2>
				<section>Hire with a retainer agreement and take full advantage of all services.</section>
				{/* 
					- https://www.shopify.in/blog/ecommerce-marketing-analytics-how-to-measure-the-success-of-your-marketing-campaigns
					- https://www.singlegrain.com/blog-posts/link-building/the-ultimate-guide-to-link-building-with-content/
					- https://rosshill.ca/
 				*/}
				<section className="text-center">
					<hr />
					<h3>Take your business to the next level.</h3>
					<CtaBtn />
				</section>
			</main>
			<Footer />
		</>
	);
}

export default DigMktgServices;
