import { Prisma } from "@prisma/client"

type FieldType = {
  categoryname: string
  categoryslug: string
  categoryparent?: number | string
  categorysequence: number
}

type CategoryChildren = {
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
}

type Category = {
  children?: CategoryChildren[]
} & CategoryChildren

export type { FieldType, Category }
