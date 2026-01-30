---
title: New Breed
date: 2020-2023
images:
   - nbpa-ss2.png
role: "Web Developer & Digital Marketer"
results:
   - Developed website features to save $100s/mo in third-party application subscriptions
   - Programmed industry-leading, trade-in web application
   - Automated structured data generation with JavaScript
   - Generated average monthly revenue of $2,000+
   - Increased domain authority by 33% through SEO tasks
   - Wrote industry specific blogs and reviews
   - Created ecommerce SOPs for training and workflow optimization
links:
   - title: Website
     url: https://newbreedpb.com/
   - title: Trade App
     url: https://trade.newbreedpb.com/
   - title: Theme Code
     url: https://github.com/isaacyakl/new-breed-shopify-theme
   - title: Trade App Code
     url: https://github.com/isaacyakl/new-breed-trade-app
summary: "Since late 2020, I have managed the ecommerce side of New Breed Paintball & Airsoft. My main concern has been to continue providing a friendly, reliable customer experience as they have since 2008. This has encompassed setting them up with Shopify for both their ecommerce and retail locations; developing web improvements; creating marketing content; and authoring SOPs to better enhance workflows. In all, the web store has stiff competition from well-established online paintball and airsoft retailers but is still managing to grow and generate consistent revenue."
tags:
   - Shopify
   - SEO
   - Liquid
   - JavaScript
   - Git
   - PHP
   - JSON-LD
   - Bootstrap
   - jQuery
   - SCSS
   - Meta Ads
   - Adobe Photoshop
   - HTML
   - CSS
   - SEM
---

## Frontend

[![NBPA frontend mobile screenshot](/img/work/nbpa-ss6-frontend-mobile.jpg)](/img/work/nbpa-ss6-frontend-mobile.jpg)

The web store is built with Shopify using a customized version of the [Venture theme](https://themes.shopify.com/themes/venture/styles/snowboards). I chose to build upon an existing theme to streamline setup and rapidly deliver value to my client. This choice allowed me to get right to developing and implementing customer-specific features not usually present in themes by default, instead of first needing to build a custom theme from the ground up. Additionally, by coding some of these features myself, I have been able to save New Breed money because many of these features usually involve installing several 3rd party applications &mdash; most of which normally cost monthly subscriptions.

### Features

- Product second image display on hover
- Product YouTube videos and 3D model support
- Large search bar with auto focus
- Product reviews system
- Instagram feed widget
- Automatic [FAQ page](https://newbreedpb.com/pages/frequently-asked-questions) formatting
- Product availability tagging system
- Product offers auto population (Warranty, Free Shipping, Financing, Layaway, etc.)
- Product SKU and MPN display
- Automatic structured data (Product, Breadcrumbs, FAQ, Blog Articles)
- Automatic campaign link formatting for blog articles

These features make use of the Shopify Liquid templating language, JavaScript (ESNext transpiled to ES5), HTML, and CSS/SCSS. My workflow utilizes the [Shopify Theme Kit](https://shopify.dev/themes/tools/theme-kit) and Git/GitHub, and the procedure can be found in the theme's [README.md](https://github.com/isaacyakl/new-breed-shopify-theme#new-version-procedure) on GitHub.

### Automatic FAQ Formatting

[![NBPA FAQ page screenshot](/img/work/nbpa-ss9-faq-page.jpg)](/img/work/nbpa-ss9-faq-page.jpg)

The [FAQ template page](https://github.com/isaacyakl/new-breed-shopify-theme/blob/4fd2acfdafe4bc67b8100e8d8f4e9e4ac143cc66/templates/page.faq.liquid) automatically formats and generates structured data from questions and answers the staff members add to the page. It captures what is entered for the FAQ page in Shopify Admin, parses each heading and subsequent paragraph elements from the DOM tree, creates FAQ structured data (JSON-LD), a collapsible section for each, adds anchor links to each header, and inserts everything into the DOM tree. Have a look at the [FAQ page](https://newbreedpb.com/pages/frequently-asked-questions).

### Automatic Campaign Link Formatting

New Breed blog articles are usually written to provide customers with good product recommendations. Because of this, product links are placed in the articles, but there is no easy way to measure the clickthrough rates. Usually, the solution is to create special campaign URLs with tracking parameters one-by-one for each product and replace each link manually. However, this is a pain when there are many product recommendations, such as a list of the top 10 best products. So rather than manually generating and pasting links into the text editor, I wrote JavaScript code that parses the article body text for links and automatically adds campaign URL parameters based on the article type and topic. This has made it possible to generate articles more quickly and monitor the performance of marketing efforts using Google Analytics.

### Automatic Structured Data Generation

[![NBPA rich results screenshot](/img/work/nbpa-ss10-rich-results.jpg)](/img/work/nbpa-ss10-rich-results.jpg)

Because Rich Results are so helpful to searchers, I wrote JavaScript to automatically generate thorough structured data (JSON-LD) for all products, articles, and page breadcrumbs. There are many 3rd party apps which perform this but tend to only focus on specific properties, miss other necessary ones, or become redundant. They also cost an added monthly subscription and, when used together, end up being pricey and slow down page load times. To avoid the extra cost, thoroughly cover all properties needed, and keep load times low, I enhanced the existing structured schema and wrote code to automatically generate additional structured data. Each article, product, and page uses properties from Shopify Liquid objects to create JSON-LD script nodes which are inserted into the DOM tree at load time. This has proven successful and many Rich Results are now available for top-ranking pages.

## Trade-in Web Application

[![NBPA trade web app screenshot](/img/work/nbpa-ss3-trade-app.jpg)](/img/work/nbpa-ss3-trade-app.jpg)

Creating a quality trade-in application system begins with making a form that is both clear for the customer and detailed enough for the trade processors. My past experience developing a trade application system for [YourPbFriend](/work/yourpbfriend) helped me understand what was required and what pitfalls to avoid. I made sure to provide clear instruction, visually indicate required information, flexibility for multiple trade items with picture and video attachment, and a straight-forward email ticket system.

[![NBPA trade email screenshot](/img/work/nbpa-ss5-trade-app-email.jpg)](/img/work/nbpa-ss5-trade-app-email.jpg)

The trade system has seen moderate use, but not nearly as much success as in prior experience. This is largely due to changes in the industry and the decreasing popularity of Paintball. Many trades are now taking place in Facebook groups; ironically, Facebook is strongly opposed to the paintball and airsoft industries and has banned all advertising of related products.

## Digital Marketing

[![NBPA product review article screenshot](/img/work/nbpa-ss11-product-review-article.jpg)](/img/work/nbpa-ss11-product-review-article.jpg)

My strategy for New Breed is to generate fun and informative content on social media accounts and the website. This content targets keyword phrases at important steps in the purchasing journey and includes writing reviews about products, gathering customer reviews, and compiling lists of the best items available. I then work to put these in front of customers by sending out email marketing, placing banners on the website, posting on social media accounts, and occasionally running PbNation ad campaigns. I usually do the graphic design work for the banners and ads myself using Photoshop.

[![NBPA banner samples screenshot](/img/work/nbpa-ss12-banner-samples.jpg)](/img/work/nbpa-ss12-banner-samples.jpg)

[![NBPA ad samples screenshot](/img/work/nbpa-ss13-ad-samples.jpg)](/img/work/nbpa-ss13-ad-samples.jpg)

When I first started working with New Breed, we attempted to run Meta and Google retargeting campaigns using a limited product catalog. We did this to avoid getting flagged for advertising paintball and airsoft guns. However, we still ran into product restriction issues. Even advertising related products such as jerseys and masks caused problems. Because of this, we have had to rely on boosting social media posts and SEO.

### SEO

I perform many essential one-time and daily SEO tasks. Much of my time in this role is spent optimizing and generating content for keyword phrases that target customers' needs along the purchase path. By doing so consistently, I am able to acquire backlinks manually and, hopefully, organically in the future. A few tasks performed are as follows:

- Internal linking
- Keyword optimizing pages/collections
- Blog article writing
- One-time structured data enhancements
  - Organization information
  - Sitelinks searchbox
- Automatically generated structured data
  - Products
  - Articles
  - Breadcrumbs
  - FAQ

## Ecommerce

[![NBPA product screenshot](/img/work/nbpa-ss14-product.jpg)](/img/work/nbpa-ss14-product.jpg)

My ecommerce tasks involve product, process, and staff management. I routinely verify the work of staff members in the backend of Shopify. This includes the correction, addition, and management of a +3,000 product catalog. Product details (e.g. descriptions, MPNs/SKUs, UPCs, costs, prices, etc.) must be kept up-to-date and compliant with manufacturer MAP prices, especially in the current economy. I make an effort to include the most accurate and helpful details, including videos, high-quality images, product compatibility, and what is included with each purchase.

[![NBPA SOP screenshot](/img/work/nbpa-ss7-sop.jpg)](/img/work/nbpa-ss7-sop.jpg)

To better manage these tasks, I have written thorough SOPs and an employee handbook. These were made to help train staff and serve as references in the future when my role comes to an end. Many of these procedures cover topics like product management, order management, trade processing, and app management. I have also created best practices and resource reference documents, as well as a used gear value calculator.

[![NBPA used gear value calc screenshot](/img/work/nbpa-ss8-used-gear-value-calculator.jpg)](/img/work/nbpa-ss8-used-gear-value-calculator.jpg)
