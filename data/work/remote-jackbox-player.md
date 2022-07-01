---
title: Remote Jackbox Player
date: 2020
images:
   - remote-jackbox-player-ss1-cover.jpg
role: ""
results:
links:
   - title: Code
     url: https://github.com/isaacyakl/remote-jackbox-player
   - title: Player
     url: https://remote-jackbox-player.isaacyakl.com
summary: "Find and play Jackbox games remotely even if you don't own any. Enter a stream URL or connect a Twitch account to start playing. This player was designed during 2020 when COVID-19 was keeping everyone apart, and it aims to bring friends and family together through Jackbox games. This player was designed with mobile devices in mind, so it offers a few viewing options that make it easy to move between stream and game panes. Try it on your 📲 smartphone and tablet!"
tags:
   - JavaScript
   - Tailwind CSS
   - Twitch API
   - Font Awesome
   - Project
---

[![Remote Jackbox Player controls screenshot](/img/work/remote-jackbox-player-ss3-controls.jpg)](/img/work/remote-jackbox-player-ss3-controls.jpg)

The user interface was built using Tailwind CSS and Font Awesome to create controls and two panes: a stream pane and a game pane. Controls give options for reloading the stream if it falls behind, toggling the controls, changing the view, searching for a stream, and sharing the current stream view.

[![Remote Jackbox Player swap view screen capture](/img/work/remote-jackbox-player-ss2-swap-view.gif)](/img/work/remote-jackbox-player-ss2-swap-view.gif)

Because it was designed with mobile devices in mind, it offers a few pane viewing options suitable for small screen sizes. Swap View, Swipe View, and Scroll View make each pane full screen and allow easy pane switching. It also captures exit intent actions and double checks if the user wants to close or reload the game site so that a seat in the game isn't accidentally lost.

[![Remote Jackbox Player stream pane screenshot](/img/work/remote-jackbox-player-ss4-stream-pane.jpg)](/img/work/remote-jackbox-player-ss4-stream-pane.jpg)

In the background, Remote Jackbox Player uses JavaScript to access the Twitch API. After connecting a Twitch account, clicking in the stream URL field will display a list of streamers from your follower list if they are actively playing a Jackbox game. It also has the option to randomly find a streamer from Twitch who is playing one of the games found in the [feature-random-stream-game-ids.json](https://github.com/isaacyakl/remote-jackbox-player/blob/master/feature-random-stream-game-ids.json). If a stream URL is entered into the field instead, the stream frame is updated with the appropriate embed code if it is from Twitch or a generic iframe for other stream URLs. Virtually any web streaming platform should be supported.
