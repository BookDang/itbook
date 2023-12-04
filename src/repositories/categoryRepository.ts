import { Category, Prisma, PrismaClient } from "@prisma/client"
import { Category as CategoryDB, FieldType } from "@/types/categorytypes"

const prisma = new PrismaClient()

export const handlerCreateCategory = async (
  formData: FieldType
): Promise<Category | Prisma.PrismaClientKnownRequestError | boolean> => {
  try {
    const createCategory = await prisma.category.create({
      data: {
        name: formData.categoryname,
        slug: formData.categoryslug,
        successorId: formData.categoryparent as number,
        tags: undefined,
      },
    })
    return createCategory
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log("There is a unique constraint violation.")
        return error
      }
    }
    return false
  }
}

export const handlerGetAllCategories = async (): Promise<CategoryDB[]> => {
  try {
    const categories: CategoryDB[] = await prisma.category.findMany({
      where: {
        id: { gt: 1 }
      },
      include: {
        predecessor: {
          select: {
            name: true
          }
        }
      }
    })
    return categories
  } catch (error) {
    return []
  }
}
