import {
  getStatisticCategoryMonthlyRepository,
  getStatisticMonthlyRepository,
  getStatisticWeeklyRepository,
  getStatisticYearlyRepository
} from '../repositories/statistic'
import { IPlainObject } from '../types/common'
import { tryCatch } from '../utils/try'
import { Request, Response } from 'express'

export const getStatisticCategoryMonthlyService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const today = new Date()

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

    const result = await getStatisticCategoryMonthlyRepository({
      endDate: endOfMonth.toISOString(),
      startDate: startOfMonth.toISOString(),
      typeName: req.params.type,
      user: (req as IPlainObject).session.user._id
    })

    return res.send({
      message: 'Get statistic category monthly successfully!',
      content: { statistic: result.map((item) => ({ categoryName: item._id.category, totalAmount: item.totalAmount })) }
    })
  })(req, res)
}

export const getStatisticWeeklyService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const today = new Date()
    const startDate = new Date()
    const endDate = new Date()

    const day = today.getDay() ? today.getDay() : 7

    startDate.setDate(today.getDate() - day + 1)
    endDate.setDate(today.getDate() + (7 - day) + 1)
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    const labels: Array<string> = []
    const countDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1, 0, 0, 0, 0)

    while (countDate <= endDate) {
      labels.push(countDate.toISOString().split('T')[0])
      countDate.setDate(countDate.getDate() + 1)
    }

    const result = await getStatisticWeeklyRepository({
      endDate: endDate.toISOString(),
      startDate: startDate.toISOString(),
      typeName: 'Outcome',
      user: (req as IPlainObject).session.user._id
    })

    const formattedResult = labels.map((date) => {
      const matchedRow = result.find((row) => row._id.day === date)
      return {
        date: date,
        totalAmount: matchedRow ? matchedRow.totalAmount : 0
      }
    })

    return res.send({
      message: 'Get statistic weekly successfully!',
      content: { statistic: formattedResult }
    })
  })(req, res)
}

export const getStatisticPreviousWeeklyService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const today = new Date()
    const startDate = new Date()
    const endDate = new Date()

    const day = today.getDay() ? today.getDay() : 7

    startDate.setDate(today.getDate() - day - 6)
    endDate.setDate(today.getDate() + (7 - day) - 6)
    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    const result = await getStatisticWeeklyRepository({
      endDate: endDate.toISOString(),
      startDate: startDate.toISOString(),
      typeName: 'Outcome',
      user: (req as IPlainObject).session.user._id
    })

    const labels: Array<string> = []
    const countDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1, 0, 0, 0, 0)

    while (countDate <= endDate) {
      labels.push(countDate.toISOString().split('T')[0])
      countDate.setDate(countDate.getDate() + 1)
    }

    const formattedResult = labels.map((date) => {
      const matchedRow = result.find((row) => row._id.day === date)
      return {
        date: date,
        totalAmount: matchedRow ? matchedRow.totalAmount : 0
      }
    })

    return res.send({
      message: 'Get statistic previous week successfully!',
      content: {
        statistic: formattedResult
      }
    })
  })(req, res)
}

export const getStatisticMonthlyService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0)
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999)

    const result = await getStatisticMonthlyRepository({
      startDate: startOfYear.toISOString(),
      endDate: endOfYear.toISOString(),
      typeName: 'Outcome',
      user: (req as IPlainObject).session.user._id
    })

    const labels = Array.from({ length: 12 }, (_, k) => (k + 1).toString())

    const formattedResult = labels.map((month) => {
      const formattedMonth = month.padStart(2, '0')
      for (let i = 0; i < result.length; i++) {
        if (result[i]._id.day.slice(5) === formattedMonth) {
          return {
            date: result[i]._id.day,
            totalAmount: result[i].totalAmount
          }
        }
      }
      return {
        date: `${today.getFullYear()}-${formattedMonth}`,
        totalAmount: 0
      }
    })

    return res.send({
      message: 'Get statistic monthly successfully!',
      content: {
        statistic: formattedResult
      }
    })
  })(req, res)
}

export const getStatisticYearlyService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const today = new Date()
    const startTime = new Date(today.getFullYear() - 4, 0, 1, 0, 0, 0, 0)
    const endTime = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999)

    const labels: Array<string> = []

    for (let i = today.getFullYear() - 4; i <= today.getFullYear(); i++) {
      labels.push(i.toString())
    }

    const result = await getStatisticYearlyRepository({
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
      typeName: 'Outcome',
      user: (req as IPlainObject).session.user._id
    })

    const formattedResult = result.map((item) => ({
      date: item._id.day,
      totalAmount: item.totalAmount
    }))

    const finalResult = labels.reduce((acc: Array<{ date: string; totalAmount: number }>, year) => {
      const yearData = formattedResult.find((item) => item.date === year)
      if (yearData) {
      } else {
      }
      yearData ? acc.push(yearData) : acc.push({ date: year.toString(), totalAmount: 0 })
      return acc
    }, [])

    return res.send({
      message: 'Get statistic last 5 years successfully!',
      content: {
        statistic: finalResult,
        labels
      }
    })
  })(req, res)
}

export const getStatisticPreviousMonthlyService = async (req: Request, res: Response) => {
  return await tryCatch(async () => {
    const today = new Date()
    const startOfYear = new Date(today.getFullYear() - 1, 0, 1, 0, 0, 0, 0)
    const endOfYear = new Date(today.getFullYear() - 1, 11, 31, 23, 59, 59, 999)

    const result = await getStatisticMonthlyRepository({
      startDate: startOfYear.toISOString(),
      endDate: endOfYear.toISOString(),
      typeName: 'Outcome',
      user: (req as IPlainObject).session.user._id
    })

    const labels = Array.from({ length: 12 }, (_, k) => (k + 1).toString())

    const formattedResult = labels.map((month) => {
      const formattedMonth = month.padStart(2, '0')
      for (let i = 0; i < result.length; i++) {
        if (result[i]._id.day.slice(5) === formattedMonth) {
          return {
            date: result[i]._id.day,
            totalAmount: result[i].totalAmount
          }
        }
      }
      return {
        date: `${today.getFullYear()}-${formattedMonth}`,
        totalAmount: 0
      }
    })

    return res.send({
      message: 'Get statistic previous monthly successfully!',
      content: {
        statistic: formattedResult
      }
    })
  })(req, res)
}
