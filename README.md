# karmia-express-middleware-normalize

Normalize request middleware for Express

## Installation

```Shell
npm install karmia-express-middleware-normalize
```

## Example

```JavaScript
const karmia_express_middleware_normalize = require('karmia-express-middleware-normalize'),
    normalize = new karmia_express_middleware_normalize();

const body_parser = require('body-parser'),
    express = require('express'),
    app = express();

app.use(body_parser.json());
app.use(normalize.middleware());
```
