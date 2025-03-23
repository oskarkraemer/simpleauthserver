declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SESSION_DURATION?: number
        }
    }
}
  
export {}