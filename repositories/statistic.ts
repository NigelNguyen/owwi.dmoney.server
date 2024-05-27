import Record from '../models/Record'
export type TWeeklyStatistic = {
  _id: {
    day: string
    typeName: string
  }
  totalAmount: number
  records?: any
}

export type TCategoryStatistic = {
  _id: {
    category: string
    typeName: string
  }
  totalAmount: number
  records?: any
}

export const getStatisticCategoryMonthlyRepository = async ({
  typeName,
  startDate,
  endDate,
  user
}: {
  typeName: string
  startDate: string
  endDate: string
  user: string
}): Promise<TCategoryStatistic[]> => {
  const records = await Record.aggregate([
    {
      $match: {
        user: user,
        typeName: typeName,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: {
          category: '$categoryName',
          typeName: '$typeName'
        },
        totalAmount: { $sum: '$amount' }
        // count: { $sum: 1 }, // get count *
        // records: { $push: '$$ROOT' } // get full records
      }
    },
    {
      $sort: { totalAmount: 1 }
    }
  ])
  return records
}

export const getStatisticWeeklyRepository = async ({
  typeName,
  startDate,
  endDate,
  user
}: {
  typeName: string
  startDate: string
  endDate: string
  user: string
}): Promise<TWeeklyStatistic[]> => {
  const records = await Record.aggregate([
    {
      $match: {
        user: user,
        typeName: typeName,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: {
          day: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          typeName: '$typeName'
        },
        totalAmount: { $sum: '$amount' }
        // count: { $sum: 1 }, // get count *
        // records: { $push: '$$ROOT' } // get full records
      }
    },
    {
      $sort: { '_id.day': 1 } // Sort by day in ascending order
    }
  ])
  return records
}

export const getStatisticMonthlyRepository = async ({
  typeName,
  startDate,
  endDate,
  user
}: {
  typeName: string
  startDate: string
  endDate: string
  user: string
}): Promise<TWeeklyStatistic[]> => {
  const records = await Record.aggregate([
    {
      $match: {
        user: user,
        typeName: typeName,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: {
          day: { $dateToString: { format: '%Y-%m', date: '$date' } },
          typeName: '$typeName'
        },
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $sort: { '_id.day': 1 }
    }
  ])
  return records
}
export const getStatisticYearlyRepository = async ({
  typeName,
  startDate,
  endDate,
  user
}: {
  typeName: string
  startDate: string
  endDate: string
  user: string
}): Promise<TWeeklyStatistic[]> => {
  const records = await Record.aggregate([
    {
      $match: {
        user: user,
        typeName: typeName,
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      }
    },
    {
      $group: {
        _id: {
          day: { $dateToString: { format: '%Y', date: '$date' } },
          typeName: '$typeName'
        },
        totalAmount: { $sum: '$amount' }
      }
    },
    {
      $sort: { '_id.day': 1 }
    }
  ])
  return records
}
