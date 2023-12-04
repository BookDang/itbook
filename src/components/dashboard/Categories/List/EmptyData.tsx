import { FC, ReactNode } from "react"

type EmptyDataProp = {
  children: ReactNode
}

const EmptyData: FC<EmptyDataProp> = ({ children }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {children}
    </div>
  )
}

export default EmptyData