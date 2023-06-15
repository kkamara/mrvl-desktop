export const APP_NAME = 'mrvl'.toUpperCase()
export const YEAR_RELEASED = 2022
export const GIPHY_API_KEY = 'M5Pj4m4sIMVxGzJvOEOHwWbzl5UcOKjE'
export const FLAGSMITH_ENVIRONMENT_KEY = 'c4pNNMEo9DHuPargExAWRu'
// export const ENV = 'prod'
export const ENV = 'local'

export const appName = process.env.REACT_APP_NAME
export const nodeEnv = process.env.REACT_APP_NODE_ENV
export const appDebug = process.env.REACT_APP_DEBUG == 'true'
export const appURL = process.env.REACT_APP_URL
export const appLocale = process.env.REACT_APP_APP_LOCALE
export const appPort = process.env.PORT || process.env.port || 5000
export const publicMarvelKey = process.env.REACT_APP_PUBLIC_MARVEL_KEY
export const privateMarvelKey = process.env.REACT_APP_PRIVATE_MARVEL_KEY
export const marvelURL = process.env.REACT_APP_MARVEL_URL

