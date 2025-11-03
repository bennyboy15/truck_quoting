import TruckList from "../../components/trucks/TruckList"
import TruckForm from "../../components/trucks/TruckForm"
import TruckMakeForm from "../../components/trucks/TruckMakeForm"
import TruckModelForm from "../../components/trucks/TruckModelForm"
import Modal from "../../components/Modal"
import TruckModelList from "../../components/trucks/TruckModelList"
import TruckMakeList from "../../components/trucks/TruckMakeList"
import { closeModal } from "../../lib/utils"

function TrucksPage() {

  return (
    <>
      <div className="flex gap-5 mb-2">

        {/* Truck Create Modal */}
        <button className="btn btn-soft" onClick={() => closeModal('my_modal_truck')}>Create Truck +</button>
        <Modal closeModal={closeModal} id="my_modal_truck" title="Create Truck">
          <TruckForm />
        </Modal>

        {/* Make Create Modal */}
        <button className="btn btn-soft" onClick={() => closeModal('my_modal_make')}>Create Make +</button>
        <Modal closeModal={closeModal} id="my_modal_make" title="Create Make">
          <TruckMakeForm />
        </Modal>

        {/* Model Create Modal */}
        <button className="btn btn-soft" onClick={() => closeModal('my_modal_model')}>Create Model +</button>
        <Modal closeModal={closeModal} id="my_modal_model" title="Create Model">
          <TruckModelForm />
        </Modal>

      </div>

      <div className="flex flex-col gap-8">
        <TruckList />
        <TruckModelList/>
        <TruckMakeList/>
      </div>
    </>
  )
}

export default TrucksPage