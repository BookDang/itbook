import Loader from "@/components/Loading/Loader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className={`
        border border-solid border-gray-300 rounded 
        p-2 add-new-category relative h-[calc(100vh_-_65px)]
      `}>
        <Loader />
        {children}
      </div>
    </>
  )
}