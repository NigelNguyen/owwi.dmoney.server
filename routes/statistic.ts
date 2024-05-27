import express from 'express'
import {
  getStatisticCategoryMonthlyController,
  getStatisticMonthlyController,
  getStatisticPreviousMonthlyController,
  getStatisticPreviousWeeklyController,
  getStatisticWeeklyController,
  getStatisticYearlyController
} from '../controllers/statistic'
import isMember from '../middlewares/isMember'

const router = express.Router()

router.use(isMember)

router.get('/statistic/category-monthly/:type', getStatisticCategoryMonthlyController)

router.get('/statistic/weekly', getStatisticWeeklyController)

router.get('/statistic/previous-weekly', getStatisticPreviousWeeklyController)

router.get('/statistic/monthly', getStatisticMonthlyController)

router.get('/statistic/previous-monthly', getStatisticPreviousMonthlyController)

router.get('/statistic/yearly', getStatisticYearlyController)

export default router
