import { Link } from "react-router-dom"
import TruckList from "../../components/trucks/TruckList"
import TruckForm from "../../components/trucks/TruckForm"
import { CircleX } from "lucide-react"
import TruckMakeForm from "../../components/trucks/TruckMakeForm"
import TruckModelForm from "../../components/trucks/TruckModelForm"

function TrucksPage() {

  function closeModal(id) {
    document.getElementById(id).showModal();
  }

  return (
    <>
      <div className="flex gap-5 mb-2">

        {/* Truck Create Modal */}
        <button className="btn btn-outline" onClick={() => closeModal('my_modal_truck')}>Create Truck +</button>
        <dialog id="my_modal_truck" className="modal">
          <div className="modal-box">
            <div className="flex justify-between items-center pb-1">
              <h3 className="card-title">Create Truck</h3>
              <form method="dialog">
                <button className="btn btn-secondary" onClick={() => closeModal('my_modal_2')}><CircleX />Close</button>
              </form>
            </div>
            <TruckForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Make Create Modal */}
        <button className="btn btn-outline" onClick={() => closeModal('my_modal_make')}>Create Make +</button>
        <dialog id="my_modal_make" className="modal">
          <div className="modal-box">
            <div className="flex justify-between items-center pb-1">
              <h3 className="card-title">Create Make</h3>
              <form method="dialog">
                <button className="btn btn-secondary" onClick={() => closeModal('my_modal_make')}><CircleX />Close</button>
              </form>
            </div>
            <TruckMakeForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* Model Create Modal */}
        <button className="btn btn-outline" onClick={() => closeModal('my_modal_model')}>Create Model +</button>
        <dialog id="my_modal_model" className="modal">
          <div className="modal-box">
            <div className="flex justify-between items-center pb-1">
              <h3 className="card-title">Create Model</h3>
              <form method="dialog">
                <button className="btn btn-secondary" onClick={() => closeModal('my_modal_model')}><CircleX />Close</button>
              </form>
            </div>
            <TruckModelForm />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

      </div>

      <TruckList />
    </>
  )
}

export default TrucksPage