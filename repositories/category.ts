import Category from '../models/Category'

export const createCategoryRepository = async (data: { user: string; name: string; description: string }) => {
  const category = await new Category(data)
  return await category.save()
}

export const getCategoryByIdRepository = async ({ id, user }: { id: string; user: string }) => {
  const category = await Category.findOne({ _id: id, user })
  return category
}

export const getCategoryByUserRepository = async ({ user }: { user: string }) => {
  const category = await Category.find({ user })
  return category
}

export const updateCategoryRepository = async (data: {
  id: string
  name: string
  description: string
}) => {
  const { id, ...left } = data
  const category = await Category.findOneAndUpdate({ _id: id }, left)
  return category
}

export const deleteCategoryByIdRepository = async ({ id, user }: { id: string; user: string }) => {
  const category = await Category.findOneAndDelete({ _id: id, user })
  return category
}
