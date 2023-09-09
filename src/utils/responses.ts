import { Response } from "express"
import messages from "./messages"

/**
 * Function that generates a JSON response with an error message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 * @param code Optional code parameter to specify the error message. Defaults to "UnexpectedError".
 */
export const makeResponsesError = (
  res: Response,
  err: Error,
  code?: "Success" | "UnexpectedError" | "Error"
) => {
  const msg = {
    OK: 0,
    Error: err,
    Message: messages[code ?? "UnexpectedError"]
  }
  res.status(404).json(msg)
}

/**
 * Function that generates a JSON response with an exception message for HTTP 404 status code.
 * @param res Response object from Express.
 * @param err Error object to be included in the response.
 */
export const makeResponsesException = (
  res: Response,
  err: Error
) => {
  const msg = {
    OK: 0,
    Message: err
  }
  res.status(404).json(msg)
}

/**
 * Function that generates a JSON response with a success message for HTTP 200 status code.
 * @param res Response object from Express.
 * @param code Optional code parameter to specify the success message. Defaults to "Success".
 */
export const makeResponsesOk = (
  res: Response,
  code?: "Success" | "UnexpectedError" | "Error"
) => {
  const msg = {
    OK: 1,
    Message: messages[code ?? "Success"]
  }
  res.status(200).json(msg)
}

/**
 * Function that generates a JSON response with data, success message, and HTTP 200 status code.
 * @param res Response object from Express.
 * @param data Any object to be included in the response.
 * @param code Optional code parameter to specify the success message. Defaults to "Success".
 */
export const makeResponsesOkData = (
  res: Response,
  data: any,
  code?: "Success" | "UnexpectedError" | "Error"
) => {
  const msg = {
    OK: 1,
    Data: data,
    Message: messages[code ?? "Success"]
  }
  res.status(200).json(msg)
}