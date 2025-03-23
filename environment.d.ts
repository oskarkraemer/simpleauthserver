declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SESSION_DURATION?: number
            MAX_SESSIONS_PER_USER?: number
        }
    }
}
  
export {}