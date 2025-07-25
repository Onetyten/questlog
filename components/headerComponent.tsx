
import { BsLayoutSidebarInset,BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { ToggleSideBar } from "@/store/sidebarSlice/sidebarSlice"
import {useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { usePathname } from "next/navigation";

export default function HeaderComponent() {
    const pathName = usePathname()
    const dispatch = useDispatch()
    const openBarRedux = useSelector((state:RootState)=>state.openBar.openBar)    
    const handlechangeBar = () => {
        dispatch(ToggleSideBar())
    }
    const getTitle=(path:string)=>{
        switch (path) {
            case "/":
                return "Todo"
            case "/myday":
                return "My Day"
            case "/upgrades":
                return "Upgrades"
            case "/avatar":
                return "Avatar"
            case "/rank":
                return "Rank"
            default:
                return "Todo"
                break;
        }
    }

const pageName = getTitle(pathName)

return (
        <div className={`border-b-2 ${openBarRedux?'xl:left-44 2xl:left-60':'xl:left-20'} fixed bg-background border-secondary z-30 h-16 sm:h-20 flex w-full pl-5 items-center`}>
            {openBarRedux?(<BsLayoutSidebarInset className="text-2xl cursor-pointer hidden xl:flex text-gray-500" onClick={handlechangeBar}/>):(<BsLayoutSidebarInsetReverse className="text-2xl text-gray-500 cursor-pointer hidden xl:flex" onClick={handlechangeBar}/>)}
            <div className="flex w-full items-center justify-between mr-10">
                <p className="ml-6 text-2xl sm:text-3xl text-primary ">
                {pageName}
                </p>
            </div>
        </div>
)
}
