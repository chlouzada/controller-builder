# controller-builder

Helper function designed to simplify the process of creating controllers for web applications by handling the boilerplate code.



This is a work in progress.

## Install

```
npm install controller-builder
```

## Usage

```ts
import { builder } from 'controller-builder';

// with args
const fn = async (name: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Hello ${name}`)
    }, 1000)
  })
}

const controller = builder()
  .express()
  .input((req, res, next) => {
    return req.query.name
  })
  // ts will check if return type of input matches the expected type of fn
  .execute(fn)

const app = express()

app.get("/", controller)
```

```ts
import { builder } from 'controller-builder';

// without args
const fn = async () => {
 return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Hello World`)
    }, 1000)
  })
}

const controller = builder()
  .express()
  .execute(fn)

const app = express()

app.get("/", controller)
```
