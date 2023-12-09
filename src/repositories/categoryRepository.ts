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
        parentId: formData.categoryparent as number,
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
    const categories: any = await prisma.category.findMany({
      where: {
        parentId: 1,
      },
      include: {
        parent: {
          select: {
            name: true,
            slug: true,
          },
        },
        children: {
          include: {
            children: {
              include: {
                children: true,
              },
            },
          },
        },
      },
    })
    return categories
  } catch (error) {
    return []
  }
}

export const handlerDeleteCategory = async (categoryId: number) => {
  try {
    const deleteUser = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })
    return deleteUser ? true : false
  } catch (error) {
    return false
  }
}
