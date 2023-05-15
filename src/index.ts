import { NextFunction, Request, Response } from "express"

const express = () => ({
  input: <TInput>(
    input: (req: Request, res: Response, next: NextFunction) => TInput,
  ) => {
    return {
      execute:
        <TOutput>(callback: (input: TInput) => TOutput) =>
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const data = input(req, res, next)
            if (res.headersSent) {
              return
            }
            const result = await callback(data)
            res.send(result)
          } catch (error) {
            next(error)
          }
        },
    }
  },
  execute:
    <TOutput>(callback: () => TOutput) =>
    async (_: Request, res: Response, next: NextFunction) => {
      try {
        const result = await callback()
        res.send(result)
      } catch (error) {
        next(error)
      }
    },
})

const graphql = () => ({
  input: <TInput>(
    input: <TParent = any, TArgs = any, TContext = any, TInfo = any>(
      parent: TParent,
      args: TArgs,
      context: TContext,
      info: TInfo,
    ) => TInput,
  ) => {
    return {
      execute:
        <TOutput>(callback: (input: TInput) => TOutput) =>
        async (parent: any, args: any, context: any, info: any) =>
          callback(input(parent, args, context, info)),
    }
  },
})

export const builder = () => {
  return {
    express,
    graphql,
  }
}
