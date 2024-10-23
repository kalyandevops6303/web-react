import ProjectStatusChip from "./projectCard/ProjectStatusChip"


const LeftSideBarProjectDetails = () => {
  return (
    <div className="bg-white flex flex-col items-start gap-5 px-5 py-5 w-full lg:w-[25%] rounded-xl">
        <div className="flex flex-row items-center w-full justify-between ">
        <div><ProjectStatusChip borderColor="#00B0FF" backgroundColor="#00B0FF1F" textColor="#00B0FF" status="Open" /></div>
        <h1 className="text-[#EA5455] font-semibold">10 Days Left</h1>


        </div>
        <h1 className="font-semibold text-lg">Usage Data Collection and Payment</h1>
            <div className="flex flex-row items-center gap-3">
                <div className="flex flex-col items-center">
                    
                </div>
            </div>
    </div>
  )

}

export default LeftSideBarProjectDetails;