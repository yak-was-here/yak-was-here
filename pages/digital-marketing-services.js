import BaseMeta from "../components/BaseMeta";
import Breadcrumbs from "../components/Breadcrumbs";
import CtaBtn from "../components/CtaBtn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { fName, lName, nick } from "../data/meta";

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
				<section>Best Deals section</section>
				<div className="text-center" style={{ backgroundColor: "purple" }}>
					<h3 style={{ color: "white", padding: "1em" }}>What can I do for you?</h3>
				</div>

				<section>
					<ul>
						<li>Web Design, Development, &amp; Management</li>
						<li>Social Media Marketing &amp; Management</li>
						<ul>
							<li>Instagram</li>
							<li>Facebook</li>
							<li>YouTube</li>
							<li>Twitter</li>
							<li>TikTok</li>
							<li>Yelp</li>
							<li>Google Business</li>
						</ul>
						<li>Branding</li>
						<ul>
							<li>Social Media Branding</li>
							<li>Brand Identity: Competitive Differentiation</li>
						</ul>
						<li>Ecommerce</li>
						<ul>
							<li>Product Management: Addition, Updating</li>
							<li>Platforms</li>
							<ul>
								<li>Shopify</li>
								<li>Amazon</li>
								<li>eBay</li>
								<li>Walmart</li>
								<li>BigCommerce</li>
								<li>Magento</li>
								<li>Volusion</li>
								<li>WooCommerce</li>
							</ul>
						</ul>
						<li>Search Engine Optimization (SEO)</li>
						<ul>
							<li>Keyword Targeting</li>
							<li>Technical Optimization</li>
							<li>Blog Article Writing</li>
							<li>Quality Link Building</li>
						</ul>
						<li>Multi-Channel Online Marketing Strategies</li>
						<ul>
							<li>Search Engine Marketing (SEM)</li>
							<li>Social Media Ads</li>
							<li>Email Outreach</li>
							<li>Retargeting</li>
						</ul>
						<li>Graphic Design</li>
						<ul>
							<li>Logo Design</li>
							<li>Web Banners</li>
							<li>Fliers</li>
							<li>Business Cards</li>
							<li>Ads</li>
						</ul>
					</ul>
				</section>
				<section>
					<h2>Packages</h2>
				</section>
				{/* 
					- https://www.shopify.in/blog/ecommerce-marketing-analytics-how-to-measure-the-success-of-your-marketing-campaigns
					- https://www.singlegrain.com/blog-posts/link-building/the-ultimate-guide-to-link-building-with-content/
					- https://rosshill.ca/
 				*/}
				<section style={{ textAlign: "center" }}>
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
