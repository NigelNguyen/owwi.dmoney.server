import { IPlainObject } from '../types/common'

export const cookiesParser = (cookies?: string): IPlainObject => {
  if (cookies) {
    const cookieStrings = cookies.split(';')
    if (!cookieStrings) return {}
    return cookieStrings?.reduce((acc, cookieString) => {
      const [key, value] = cookieString.split('=')
      if (!key) return acc;
      const keyTrim = key.trim()
      acc[keyTrim] = value ? value.trim() : null
      return acc
    }, {} as IPlainObject)
  } else {
    return {}
  }
}
