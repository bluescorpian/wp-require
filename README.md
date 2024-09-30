# WpRequire

`WpRequire` is a library for userscripts to interact with Webpack's module chunks. It provides the ability to require Webpack modules and find modules that match a condition, to keep userscripts working through site updates.

## Getting Started

### Installation

```js
// @require     https://gist.githubusercontent.com/bluescorpian/9c582a0f9fd35e5088950034099a2cf9/raw/c7fe32f4e607ce231c295fbffe0e9ceaa5bc39c0/wprequire.js
```

### Usage

```javascript
const webpack = new WpRequire(webpackChunkname);

// Require a module
const module = webpack(moduleId);

// Find a module
const module = webpack.findModule((m) => Object.hasOwn(m, "createUser"));

// List modules
console.log(webpack.moduleExports);
```

# API

## Class: `WpRequire`

### Constructor

#### `new WpRequire(webpackChunk, interceptModuleCalls = false)`

-   `webpackChunk` (Array): The Webpack chunk array. If `null` is provided, the constructor will attempt to find it using `WpRequire.findWebpackChunks()`.
-   `interceptModuleCalls` (Boolean): If true, the constructor intercepts module calls to cache their exports. Default is `false`.

-   **Throws:**
    -   Error if Webpack chunks or the require function cannot be found.

### Methods

#### `(...arguments)`

Calls `wpRequire.require` with provided arguments.

#### `require(...arguments)`

Calls the Webpack `require` Calls the Webpack `require` function with the provided arguments.

#### `findModule(condition[, cachedOnly = false])`

-   `condition` (Function): A function that takes module exports as an argument and returns a boolean indicating if the module matches the condition.
-   `cachedOnly` (Boolean): If true, only searches cached modules. Default is `false`.

-   **Returns:** The exports of the first module that matches the condition, or `null` if no match is found.

#### `static findWebpackChunks()`

-   **Returns:** An array of Webpack chunk arrays found in the global window object.

### Properties

#### `cachedModules`

An object storing the exports of intercepted modules.

#### `modules`

An object representing all the modules in the Webpack bundle.

#### `moduleExports`

Getter that requires all modules exports.
