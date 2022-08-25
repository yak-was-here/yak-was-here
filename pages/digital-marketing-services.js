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
					<p>Display three popular package options in a grid. Link to packages section at bottom of page.</p>
					<ul>
						<li>Pack1</li>
						<li>Pack2</li>
						<li>Pack3</li>
					</ul>
				</section>
				<section>
					<hr />
					<h2>Website Services</h2>
					<ul>
						<li>Web Design</li>
						<li>Web Development</li>
						<li>Web Content Development</li>
						<li>Web Maintenance</li>
					</ul>
					<h2>Ecommerce Services</h2>
					<ul>
						<li>Product Management: Addition, Updating</li>
						<li>Sales Channel Integration and Management</li>
						<li>
							Platforms
							<ul>
								<li>Shopify</li>
								<li>Amazon</li>
								<li>eBay</li>
								<li>BigCommerce</li>
								<li>Volusion</li>
								<li>WooCommerce</li>
							</ul>
						</li>
					</ul>
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
					<h2>Search Engine Optimization (SEO) Services</h2>
					<ul>
						<li>Keyword Targeting</li>
						<li>Technical Optimization</li>
						<li>Blog Article Writing / Copywriting</li>
						<li>Quality Link Building</li>
					</ul>
					<h2>Social Media Services</h2>
					<ul>
						<li>Social Media Marketing</li>
						<li>Social Media Management</li>
						<li>Account / Profile Branding</li>
						<li>Shopping / Product Integration</li>
						<li>
							Platforms
							<ul>
								<li>Instagram</li>
								<li>Facebook</li>
								<li>YouTube</li>
								<li>Twitter</li>
								<li>TikTok</li>
								<li>Yelp</li>
								<li>Google Business</li>
							</ul>
						</li>
					</ul>
				</section>
				<h2 className="section-outside-heading" id="packages">
					Packages
				</h2>
				<section>
					<p>Packages in detail.</p>
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
