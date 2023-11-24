import { Prisma, PrismaClient } from "@prisma/client"
import { FieldType } from "@/types/categorytypes"

const prisma = new PrismaClient()
type CreateCategory = {
  id: number
  name: string
  tags: Prisma.JsonValue
  slug: string
  successorId: number | null
  sequence: number
}

export const handlerCreateCategory = async (formData: FieldType): Promise<CreateCategory | boolean> => {
  try {
    const createCategory = await prisma.category.create({
      data: {
        name: formData.categoryname,
        slug: formData.categoryslug,
        // successor: {
        //   connect: {
        //     id: formData.categoryparent,
        //   },
        // },
        predecessor: {
          connect: {
            id: 1,
          },
        },
        tags: undefined,
      },
    })
    return createCategory || false
  } catch (error: unknown) {
    console.log(error)
    return false
  }
}
