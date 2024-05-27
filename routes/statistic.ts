import express from 'express'
import { getStatisticCategoryMonthlyController, getStatisticMonthlyController, getStatisticPreviousMonthlyController, getStatisticPreviousWeeklyController, getStatisticWeeklyController,getStatisticYearlyController } from '../controllers/statistic'

const router = express.Router()

router.get('/statistic/category-monthly/:type', getStatisticCategoryMonthlyController)

router.get('/statistic/weekly', getStatisticWeeklyController)

router.get('/statistic/previous-weekly', getStatisticPreviousWeeklyController)

router.get('/statistic/monthly', getStatisticMonthlyController)

router.get('/statistic/previous-monthly', getStatisticPreviousMonthlyController)

router.get('/statistic/yearly', getStatisticYearlyController)

// router.get('/statistic/yearly', getStatisticPreviousYearlyController)

export default router
