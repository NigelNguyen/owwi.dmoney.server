import { Request, Response } from 'express'
import {
  getStatisticCategoryMonthlyService,
  getStatisticMonthlyService,
  getStatisticPreviousMonthlyService,
  getStatisticPreviousWeeklyService,
  getStatisticWeeklyService,
  getStatisticYearlyService
} from '../services/statistic'
import { tryCatch } from '../utils/try'

export const getStatisticCategoryMonthlyController = async (req: Request, res: Response) => {
  return await tryCatch(getStatisticCategoryMonthlyService)(req, res)
}

export const getStatisticWeeklyController = async (req: Request, res: Response) => {
  return await tryCatch(getStatisticWeeklyService)(req, res)
}

export const getStatisticPreviousWeeklyController = async (req: Request, res: Response) => {
  return await tryCatch(getStatisticPreviousWeeklyService)(req, res)
}

export const getStatisticMonthlyController = async (req: Request, res: Response) => {
  return await tryCatch(getStatisticMonthlyService)(req, res)
}

export const getStatisticPreviousMonthlyController = async (req: Request, res: Response) => {
  return await tryCatch(getStatisticPreviousMonthlyService)(req, res)
}
export const getStatisticYearlyController = async (req: Request, res: Response) => {
  return await tryCatch(getStatisticYearlyService)(req, res)
}
