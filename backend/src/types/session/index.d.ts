export {};

declare module 'express-session' {
  interface SessionData {
    singin: boolean
  }
}
