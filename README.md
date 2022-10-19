<p align="center">
  <img src="public/assets/logo.png" alt="BlockJS Logo"/>
</p>

![GitHub package.json version](https://img.shields.io/github/package-json/v/bschulzebaek/blockjs?color=%233498db&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/bschulzebaek/blockjs/Build%20and%20Deploy%20-%20Master?style=flat-square)
![Codecov](https://img.shields.io/codecov/c/github/bschulzebaek/blockjs?style=flat-square)

## Placeholder

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

## Local Development

Clone the repository and install dependencies
```bash
git clone git@github.com:bschulzebaek/blockjs.git
cd blockjs
npm install
```

Start the [Vite](https://vitejs.dev/) dev server (Host defaults to <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a>)
```bash
npm run dev
```

Unit testing with [Vitest](https://vitest.dev/)
```bash
# Run once and generate coverage report at coverage/index.html
npm run test:unit 

# Start with file watcher for both source and test files
npm run test:unit:watch 

# Filter tests to run by filename 
npm run test:unit:watch -- World.test
```


Available commands can be found in the [package.json](/package.json) file at "scripts".
