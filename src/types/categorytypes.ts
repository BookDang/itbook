import { Prisma } from "@prisma/client"

type FieldType = {
  categoryname: string
  categoryslug: string
  categoryparent?: number | string
  categorysequence: number
}
type Category = ({
  children: {
    name: string
  } | null
} & {
  id: number
  name: string
  tags: Prisma.JsonValue
  slug: string
  sequence: number
  parent: {
    name: string
    slug: string
  }
  parentId: number | null
})

export type { FieldType, Category }
