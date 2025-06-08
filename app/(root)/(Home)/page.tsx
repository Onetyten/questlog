import Sidebar from "@/components/sidebar"


export default function Home() {
  return (
    <div className="text-xl w-full min-h-screen flex absolute justify-around font-roboto bg-secondary ">
      <Sidebar/>

      <div className="bg-secondary flex justify-around flex-1">

     

          <div className="w-100 h-full">

          </div>

          <div className="flex-3 flex flex-col w-full bg-background">
            <div className="border-b-2 border-secondary h-20 flex items-center">
              <p className="ml-6 text-3xl ">
                To-Do
              </p>
            </div>
            <div>
              
            </div>
          </div>

          <div className="flex-1"> 

          </div>

        


      </div>

      
    </div>
  )
}
