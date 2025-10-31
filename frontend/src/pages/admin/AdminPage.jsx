import CustomerForm from "../../components/customer/CustomerForm.jsx";
import { closeModal } from '../../lib/utils.js';
import Modal from '../../components/Modal.jsx';
import CustomerList from "../../components/customer/CustomerList.jsx"

function AdminPage() {

  return (
    <div className="flex flex-col gap-5">
      {/* Truck Create Modal */}
      <button className="btn btn-outline" onClick={() => closeModal('my_modal_customer')}>Create Customer +</button>
      <Modal closeModal={closeModal} id="my_modal_customer" title="Create Customer">
        <CustomerForm />
      </Modal>

      <CustomerList/>

    </div>
  )
}

export default AdminPage