import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function AddNew(){
    return(
        <div className="fixed w-15 h-15 bg-pink-400 right-5 bottom-5 flex justify-center items-center rounded-full hover:cursor-pointer ">
            <FontAwesomeIcon icon={faPlus} className="scale-200"></FontAwesomeIcon>
        </div>
    )
}

export default AddNew