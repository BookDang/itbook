import { Prisma } from "@prisma/client"

type FieldType = {
  categoryname: string
  categoryslug: string
  categoryparent?: number | string
  categorysequence: number
}
type Category = ({
  predecessor: {
    name: string
  } | null
} & {
  id: number
  name: string
  tags: Prisma.JsonValue
  slug: string
  sequence: number
  successorId: number | null
})

export type { FieldType, Category }
