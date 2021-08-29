# README

This is a single-page-application (SPA) where a user can create rooms that hold unique playlists of youtube videos. Users can submit youtube links and they will be added to the playlist. Selecting a video from the playlist will update the video on the page.

# INSTALLATION

-download this repo, and navigate to ./backend
-type: <rails s> into your console to start the server
-open up ./frontend/index.html in your preferred browser

# Acknowledgements

## the following resources have been helpful during the development of this project:

### fetching - https://www.freecodecamp.org/news/how-to-use-fetch-api/

### css and html testing - https://www.w3schools.com/css/default.asp

### youtube api - https://developers.google.com/youtube/iframe_api_reference

# BUGS AND DEVELOPMENT NOTES

## FUTURE DEVELOPMENT PLANS

-remove need for users from the database, since the current project requirements do not allow load/reload to refresh DOM elements. This messes with some of the assumed live updating features such as user count and dynamic playlists

- add way to check for valid YT links.

## MAJOR BUGS

-figure out autoplay on end bug. The current YT api refuses to cooperate with its event listeners on a development server, but seems to work on live servers like on JS fiddle. This prevents listening to when the current video ends for queueing the next video in the playlist.
