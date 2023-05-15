import { test, describe } from "vitest"
import express from "express"
import request from "supertest"
import { builder } from "../src"

describe("args", () => {
  const serviceFn = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Hello World`)
      }, 1000)
    })
    return promise
  }

  test("using input", async () => {
    const app = express()

    const controller = builder()
      .express()
      .input((req, res, next) => {
        return "John"
      })
      .execute(serviceFn)

    app.get("/", controller)

    await request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Hello World")
  })

  test("without using input", async () => {
    const app = express()

    const controller = builder().express().execute(serviceFn)

    app.get("/", controller)

    await request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Hello World")
  })
})

describe("without args", () => {
  test("express", async () => {
    const app = express()

    const controller = builder()
      .express()
      .input((req, res, next) => {
        return "John"
      })
      .execute(async (name: string) => {
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(`Hello ${name}`)
          }, 1000)
        })
        return promise
      })

    app.get("/", controller)

    await request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect("Hello John")
  })
})
