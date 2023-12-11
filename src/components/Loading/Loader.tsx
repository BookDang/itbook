'use client'
import { RootState } from "@/store/store"
import Spin from "antd/es/spin"
import { useSelector } from "react-redux"

const Loader = () => {
  const loading = useSelector((state: RootState) => state.loading)
  return loading.isLoading ? (
    <div className="rounded w-full h-full flex justify-center items-center absolute top-0 left-0 z-50 bg-white">
      <Spin size="large" />
    </div>
  ) : <></>
}

export default Loader