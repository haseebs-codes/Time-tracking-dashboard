# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![](./design/Frontend%20Mentor%20-%20Time%20tracking%20dashboard.png).

### Links

- Solution URL: [solution URL](https://github.com/haseebs-codes/Time-tracking-dashboard)
- Live Site URL: [live site](https://haseebs-codes.github.io/Time-tracking-dashboard/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Gulp
- [Sass](https://sass-lang.com/) (SCSS) - `@use` modules, mixins, maps and `@each` loops
- BEM naming convention
- [PurgeCSS](https://purgecss.com/) - removes unused CSS
- npm
- Vanilla JavaScript (ES modules)
- Fetch API with `async`/`await` to load `data.json`
- ARIA (`aria-pressed`) for the filter buttons


### What I learned

- **Rendering from JSON** - I fetched `data.json` with `async`/`await` and built every card with a template literal instead of hardcoding them in the HTML. Switching between Daily, Weekly and Monthly is just bracket notation: `activity.timeframes[dataFilter]` turns one word into a variable, so a single function handles all three views.
- **Build tooling** - I used Gulp to compile Sass and run PurgeCSS. PurgeCSS only keeps classes it can find in your files, so once my cards moved into JS, their styles disappeared. Adding `assets/js/*.js` to the `content` array fixed it.
- **The active button was the hardest part** - What finally made it click was thinking about *when* code runs. Code inside `addEventListener` runs on every click, and code outside it runs once on page load. I started with a nested `forEach` to remove `active` from every button, then replaced it with one lookup for the button that's currently active:

```js
const activeBtn = document.querySelector('.js-filter-btn.active');
```

The code I'm most proud of is this Sass `@each` loop. It generates a color and icon modifier for every card from one color map:

```scss
@each $key, $val in $primary-map {
  .filter-card--#{$key} {
    background-color: var(--primary-#{$key});
    background-image: url(../../../images/icon-#{$key}.svg);
  }
}
```

Because the JS builds these class names in pieces (`filter-card--${cardModifiers}`), PurgeCSS can't see the full names, so I protect them with a safelist regex: `/^filter-card--/`.

### Continued development

I'm comfortable with how this project turned out. These are the things I want to go deeper on next:

- **Fetching data and promises** - I used `async`/`await` here, but I want to understand promises properly: what `fetch` actually returns, handling errors with `try`/`catch` and `response.ok`, and showing something useful when a request fails.
- **Event delegation** - Using one listener on a parent element with `event.target` and `closest()` instead of attaching a listener to every button.
- **JS fundamentals** - Keep practicing loops, scope, and *when* code runs (page load vs. events), since those caused most of my bugs on this project.
- **Gulp build tasks** - Writing a build-only task separate from the watch task, and using npm scripts like `build` and `deploy`.

### Useful resources

- [MDN - Default parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters) - Explains how to give a function parameter a fallback value. I used it so the cards render the weekly view on first load.
- [MDN - aria-pressed](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed) - Shows how to tell screen readers which toggle button is currently selected.

### AI Collaboration

I used **Claude (Claude Code in VS Code)** as a mentor during this project. I asked it to guide me with hints and explanations instead of writing the code for me, so all of the code in this project is my own.

What I asked for help with:

- **Switching between Daily, Weekly and Monthly stats** - Turning the hardcoded `.weekly` into a variable with bracket notation (`timeframes[dataFilter]`), giving the buttons `data-filter` attributes and reading them with `dataset`.
- **Getting a value out of a click handler** - Why `return` inside an event listener goes nowhere, and why I should call the render function from inside the handler instead.
- **Scope** - Why my listeners couldn't see `data`, and moving them into `loadActivities()` so they run once and can still reach it.
- **Reading error messages** - Using the stack trace for `Cannot read properties of null (reading 'forEach')` to find the line and the variable that was `null`.
- **Default parameters** - Using `dataFilter = "weekly"` in the function definition instead of assigning a value inside the function call.
- **The "Last Week" label** - Why one value can't be both a data key and display text, why `if` doesn't work inside `${}` (statements vs. expressions), and using a lookup object instead.
- **Styles disappearing after a build** - PurgeCSS was removing classes that only exist in my JS template string. I fixed it by adding my JS files to the `content` array, learned how globs like `*.js` work, and found out that gulp has to be restarted after editing `gulpfile.js`.
- **The active button state** - The difference between `& .active` and `&.active` in Sass, how `forEach` runs, where code has to go so it runs on every click and not just on page load, and replacing a nested `forEach` with a `querySelector('.js-filter-btn.active')` lookup.
- **Accessibility** - Adding `aria-pressed` to the filter buttons, and learning that native buttons already handle the Enter key.

What worked well: getting hints first and only more direct help when I was still stuck made me understand *why* things broke, not just how to fix them. Tracing through the code step by step with `console.log` and DevTools was the most useful habit I picked up.


## Author

- Frontend Mentor - [@haseebs-codes](https://www.frontendmentor.io/profile/haseebs-codes)
