# todo-list

```
Vue-cli build TodoList project
```

### gh-pages
```
// vue.config.js
const ENV = process.env.NODE_ENV;
publicPath: ENV === "development" ? "" : "/<REPO>/"

git subtree push --prefix dist origin gh-pages
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
