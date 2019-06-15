// //////////////////////////
// START EDITING HERE
// //////////////////////////

// How many seconds between rotates
var wallpaperTime = 60;

// Number of wallpapers
var numberOfWallpapers = 9;

// Set the path to the directory of all the wallpapers
// For example: absolute "http://www.example.com/images/wallpapers/" or relative "./images/wallpapers/" ending with a forward slash
// Absolute is recommended so that this script will work on pages in subdirectories.
var wallpaperPath = "http://www.isaacyakl.com/images/wallpaper_bin/";
//var wallpaperPath = "./images/wallpaper_bin/";

// Array of all the wallpaper files
// Fill this array with the wallpaper file names and add more if needed
var imageFiles = [
  "wp_1.jpg",
  "wp_2.jpg",
  "wp_3.jpg",
  "wp_4.jpg",
  "wp_5.jpg",
  "wp_6.jpg",
  "wp_7.jpg",
  "wp_8.jpg",
  "wp_9.jpg"
];

// //////////////////////////
// DON'T EDIT BELOW THIS LINE
// //////////////////////////

function setRandomWallpaper(newWallpaperPath) {
  // Get a random number between 0 & the number of wallpapers
  var randImgNum = Math.floor(Math.random() * (numberOfWallpapers - 0)) + 0;

  // Variable to hold location of next wallpaper
  var image;

  // This if statement was included so that the path to the wallpapers
  // directory could be updated if the path was not originally absolute
  // (e.g. it was set as: ./folder/wallpapers instead of http://www.example.com/folder/wallpapers)
  if (typeof wallpaperPath !== "undefined") {
    // If new wallpaper path was specified
    // Build location of next wallpaper based on new path
    image = wallpaperPath + imageFiles[randImgNum];
  } // No new wallpaper path is specified
  else {
    // Build location of next wallpaper
    image = wallpaperPath + imageFiles[randImgNum];
  }

  // Set new background image
  document.body.style.backgroundImage = "url('" + image + "')";
}

// Preload wallpaper images
for (i = 1; i < imageFiles.length; i++) {
  new Image().src = wallpaperPath + imageFiles[i];
}

// Set first wallpaper
//setRandomWallpaper();

// Begin wallpaper slideshow
setInterval(function() {
  setRandomWallpaper();
}, wallpaperTime * 1000);
