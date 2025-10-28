import { Link } from "react-router-dom"
import TruckList from "../../components/trucks/TruckList"


function TrucksPage() {
  return (
    <>
    <Link to={"/trucks/create"} className="btn btn-active mb-5">Create +</Link>
    <TruckList/>
    </>
  )
}

export default TrucksPage