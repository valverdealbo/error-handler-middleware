# @valbo/error-handler-middleware

Express error middleware that sends the error as a json response.

![npm (scoped)](https://img.shields.io/npm/v/@valbo/error-handler-middleware)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Build Status](https://img.shields.io/github/workflow/status/valverdealbo/error-handler-middleware/CI)
[![Coverage Status](https://coveralls.io/repos/github/valverdealbo/error-handler-middleware/badge.svg?branch=main)](https://coveralls.io/github/valverdealbo/error-handler-middleware?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/valverdealbo/error-handler-middleware/badge.svg?targetFile=package.json)](https://snyk.io/test/github/valverdealbo/error-handler-middleware?targetFile=package.json)

## Install

```bash
npm install @valbo/error-handler-middleware
```
## Usage

Add it to express at the end of the middleware chain to capture the error thrown and send it as a JSON response:

```typescript
import { errorHandlerMiddleware } from '@valbo/error-handler-middleware';

// at the end of the middleware chain
app.use(errorHandlerMiddleware);
```

This error response will have the following format:

```json
{
  "error" : {
    "status": 400,
    "name": "BadRequestError",
    "message": ".find should NOT have additional properties"
  }
}
```

The **status** will be **error.status**, **error.statusCode** or **500** as a default. 

The **name** will be **error.name** or **InternalServerError** as a default.

It will also store the error sent in **response.locals.responseError** if you want to do something else with it, like logging.
