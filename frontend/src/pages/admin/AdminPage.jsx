import CustomerForm from "../../components/customer/CustomerForm.jsx";
import { closeModal } from '../../lib/utils.js';
import Modal from '../../components/Modal.jsx';
import CustomerList from "../../components/customer/CustomerList.jsx";
import SectionForm from "../../components/worksheets/SectionForm.jsx";
import SectionList from "../../components/worksheets/SectionList.jsx";
import HeadingList from "../../components/worksheets/HeadingList.jsx";
import HeadingForm from "../../components/worksheets/HeadingForm.jsx";

function AdminPage() {

  return (
    <div className="flex flex-col gap-5">
      {/* Customer Create Modal */}
      <button className="btn btn-soft" onClick={() => closeModal('my_modal_customer')}>Create Customer +</button>
      <Modal closeModal={closeModal} id="my_modal_customer" title="Create Customer">
        <CustomerForm />
      </Modal>

      <CustomerList/>

      {/* Section Create Modal */}
      <button className="btn btn-soft" onClick={() => closeModal('my_modal_section')}>Create Section +</button>
      <Modal closeModal={closeModal} id="my_modal_section" title="Create Section">
        <SectionForm />
      </Modal>

      <SectionList/>

      {/* Section Create Modal */}
      <button className="btn btn-soft" onClick={() => closeModal('my_modal_heading')}>Create Heading +</button>
      <Modal closeModal={closeModal} id="my_modal_heading" title="Create Heading">
        <HeadingForm />
      </Modal>
      
      <HeadingList/>

    </div>
  )
}

export default AdminPage