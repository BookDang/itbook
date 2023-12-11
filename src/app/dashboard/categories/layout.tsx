import Loader from "@/components/Loading/Loader"
import Action from "@/components/dashboard/Categories/Action"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Action />
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