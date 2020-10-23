import { Authpack } from "@authpack/sdk";

export const createAuthpack = (apiKey:string) => new Authpack({
  key: apiKey
})
