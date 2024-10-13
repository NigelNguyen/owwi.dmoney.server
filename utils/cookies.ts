import { IPlainObject } from '../types/common'

export const cookiesParser = (cookies?: string): IPlainObject => {
  if (cookies) {
    const cookieStrings = cookies.split(';')
    return cookieStrings?.reduce((acc, cookieString) => {
      const [key, value] = cookieString.split('=')
      const keyTrim = key.trim()
      acc[keyTrim] = value.trim()
      return acc
    }, {} as IPlainObject)
  } else {
    return {}
  }
}
