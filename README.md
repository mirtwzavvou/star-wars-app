# Getting Started with Starwars App

To get the project running locally:

Clone this repo
npm install to install all required dependencies
`npm start` to start the local server

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode, using webpack.dev.js configuration under `build` folder.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and ready to be deployed!

### `npm test`

Runs unit tests with jest

### `npm lint`

Runs es-linter and lists produced warnings and errors for all .js files under `src` folder.

### `npm lint-fix`

Applies available fixes to errors in .js files under `src` folder.

### `npm prettify-scss`

Runs prettify on .scss files under `src` folder.

## Functionality overview

In this project a list of films is fetched using Axios library. The film items are stored and the state is handled 
and shared across components using Redux. Movie items are listed and by clicking on an item, the user can preview 
the selected movie. \
Additionally, the app provides a sorting button and a search bar. By clicking on the sorting button, the user can 
sort the listed movies either by year or by episode id. By typing a keyword in the search bar, the user can search
and filter movies with the given title.

### Points of improvement

#### UX/UI
  * When a movie is selected and the user searches for a movie title, the selected movie might disappear from the list.
We could clear the movie preview when the selected movie is not listed.
  * The sorting button could provide an option to clear the selected sorting option. Similar functionality could be 
    applied to the search bar.
  * We could use isFetching flag in movie state in order to show a loader while the films are being fetched.
  * Apply a common typography (font-family) for all elements
  
#### Technical
  * Add a css optimizer (CssMinimizerWebpackPlugin, PostCss/PurgeCss)
  * Add missing unit tests (e.g. actions/index.js)
  * Add an internalization library for GR, EN (react-i18next)
  * Add Tailwind library providing utility classes




