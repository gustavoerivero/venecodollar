import axios, { AxiosHeaders, HeadersDefaults, RawAxiosRequestHeaders } from "axios";
import { BASE_URL } from ".";

const baseURL = BASE_URL;
const TIMEOUT = 10000;

type Headers = RawAxiosRequestHeaders | AxiosHeaders | HeadersDefaults

const http = (
  headers: Headers = { "Accept": "application/json", "Content-Type": "application/json" },
  timeout: number = TIMEOUT
) => axios.create({
  baseURL,
  headers,
  timeout
});

export default http;