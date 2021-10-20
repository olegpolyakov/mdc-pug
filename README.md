# MDC Pug

[Material Components Web](https://github.com/material-components/material-components-web) implemented in Pug.

## Setup

Install the library:

```sh
npm i mdc-pug
```

If you plan on using the Sass files, you'll also need to install `sass`:

```sh
npm i -D sass
```

> **NOTE**: MDC Pug (as well as MDC Web) uses the new [Sass Module System](https://sass-lang.com/blog/the-module-system-is-launched). Unfortunately at this time the `node-sass` implementation does not support it. Please use the `sass` library.

## Usage

### Pug

You can include the whole library in your layout file:

*layout.pug*
```pug
include path-to-node_modules/mdc-pug/index

doctype html
html
  head
    link(rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500')
    link(rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons')
    link(rel='stylesheet' href='path-to-node-modules/mdc-pug/dist/mdc.css')

body.mdc-typography
  block body

  script(src='path-to-node-modules/mdc-pug/dist/mdc.js')
  script.
    mdc.autoInit();
```

All of the components will be available as mixins in other pug files that extend the `layout`:

*hello.pug*
```pug
extends layout

block body
    +mdc-typography('Hello World')
    +mdc-button('Click Me')
```

Alternatively you can include only the components you need:

```pug
include path-to-node_modules/mdc-pug/mixins/button
include path-to-node_modules/mdc-pug/mixins/typography

doctype html
html
    head
        link(rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500')
        link(rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons')
        link(rel='stylesheet' href='path-to-node-modules/mdc-pug/dist/mdc.css')

    body.mdc-typography
        +mdc-typography('Hello World')
        +mdc-button('Click Me')

    script(src='path-to-node-modules/mdc-pug/dist/mdc.js')
    script.
        mdc.autoInit();
```

### Sass

You can use all the styles:

```scss
@use 'path-to-node_modules/mdc-pug';
```

or only the compon you need:

```scss
@use 'path-to-node_modules/mdc-pug/lib/styles/button';
@use 'path-to-node_modules/mdc-pug/lib/styles/typography';
```