import CustomerForm from "../../components/customer/CustomerForm.jsx";
import { closeModal } from '../../lib/utils.js';
import Modal from '../../components/Modal.jsx';
import CustomerList from "../../components/customer/CustomerList.jsx"
import SectionForm from "../../components/worksheets/SectionForm.jsx"

function AdminPage() {

  return (
    <div className="flex flex-col gap-5">
      {/* Customer Create Modal */}
      <button className="btn btn-outline" onClick={() => closeModal('my_modal_customer')}>Create Customer +</button>
      <Modal closeModal={closeModal} id="my_modal_customer" title="Create Customer">
        <CustomerForm />
      </Modal>

      <CustomerList/>

      {/* Section Create Modal */}
      <button className="btn btn-outline" onClick={() => closeModal('my_modal_section')}>Create Section +</button>
      <Modal closeModal={closeModal} id="my_modal_section" title="Create Section">
        <SectionForm />
      </Modal>

    </div>
  )
}

export default AdminPage