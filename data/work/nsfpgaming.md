---
title: NSFP Gaming
date: 2016
images:
   - nsfpgaming-ss1-cover.png
role:
results:
links:
   - title: Code
     url: https://github.com/isaacyakl?tab=repositories&q=nsfp
   - title: NSFPGaming.com
     url: http://nsfpgaming.com
   - title: NSFPHax.com
     url: https://nsfphax.com
summary: "I developed branding for the Nah Son, Free Pie! gaming community and deployed both NSFP Gaming.com and NSFPhax.com. The founder had a rough idea for the logo design, which I helped bring to fruition. NSFPGaming.com provides a portal to various other community resources such as social media presence, server information, an online shop, and community information. NSFPHax.com was developed as a joke site featuring gaming clips from the community."
tags:
   - JavaScript
   - jQuery
   - HTML
   - CSS
   - Git
   - YouTube API
   - Adobe Photoshop
   - Adobe Illustrator
   - Project
---

[![NSFP Gaming mobile screenshot](/img/work/nsfpgaming-ss4-mobile.jpg)](/img/work/nsfpgaming-ss4-mobile.jpg)

## Branding and Logos

The Adam Warren 0.2 font was chosen for titles because of its graffiti style and playful feel, perfect for a gaming community. It was used in both NSFP Gaming and "NSFP Hax" content and designs: stickers, shirts, mugs, and web banners.

[![NSFP Gaming wordmark](/img/work/nsfpgaming-wordmark.png)](/img/work/nsfpgaming-wordmark.png)

A rough version of the NSFP logo was originally created in Battlefield's art program. I developed a color palette from that design with the addition of purple, often used by members in-game. Then I made the improved, high-quality version in Illustrator. I also designed the alternate NSFPHax logo with inspiration from informational overlays hack clients will commonly add to player entities.

[![NSFP Gaming logos](/img/work/nsfpgaming-logos.png)](/img/work/nsfpgaming-logos.png)

## NSFPHax.com

[![NSFPHax screenshot](/img/work/nsfpgaming-ss2-nsfphax-mobile.jpg)](/img/work/nsfpgaming-ss2-nsfphax-mobile.jpg)

[NSFPHax.com](https://nsfphax.com) displays twelve of the latest videos of NSFP members "hacking" in game. It originated from a joke within the community: while playing Counter-Strike: Global Offensive, if a member pulled off an awesome play, the rest of the team would spam links to where they got their hacks from — "nsfphax.com". For a while, talk of actually putting up a website which had videos of their awesome plays posted was thrown around, until one day I decided I would make it happen.

The website uses jQuery to access the YouTube API. It waits for the page to load, then it grabs up to twelve of the latest videos uploaded to a specific playlist on the NSFP Gaming YouTube channel. If no videos are found or API access is not possible, it will display a loading error. This is to handle YouTube API rate limits if they are hit.

[![NSFPHax client screenshot](/img/work/nsfpgaming-ss3-nsfphax-client.jpg)](/img/work/nsfpgaming-ss3-nsfphax-client.jpg)

I also programmed a fake "Hax Client" for this project in C++. It is a small Windows program that appears to launch a few different games. However, when clicked, each instead links to a YouTube video of the troll variety. It also features a small Easter egg. [Download it from GitHub](https://github.com/isaacyakl/nsfphax.com/raw/master/nsfphax0.1-beta337.zip).
