import AddNew from "../component/add"
import Nav from "../component/nav"
function Home(){
    return(
        <div className="min-h-[200vh] bg-[#120121]">
            <Nav></Nav>
            <AddNew></AddNew>
            <div className="w-10 h-10 bg-red-500">

            </div>
        </div>
    )
}

export default Home