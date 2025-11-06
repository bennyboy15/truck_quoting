import CustomerForm from "../../components/customer/CustomerForm.jsx";
import { closeModal } from '../../lib/utils.js';
import Modal from '../../components/Modal.jsx';
import CustomerList from "../../components/customer/CustomerList.jsx";
import SectionForm from "../../components/worksheets/SectionForm.jsx";
import SectionList from "../../components/worksheets/SectionList.jsx";
import HeadingList from "../../components/worksheets/HeadingList.jsx";
import HeadingForm from "../../components/worksheets/HeadingForm.jsx";
import OptionsList from "../../components/options/OptionsList.jsx";

function AdminPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Customer Section */}
      <div className="card bg-white shadow-lg border border-base-300">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Customers</h2>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => closeModal('my_modal_customer')}
            >
              Create Customer +
            </button>
          </div>
          <CustomerList />
          <Modal closeModal={closeModal} id="my_modal_customer" title="Create Customer">
            <CustomerForm />
          </Modal>
        </div>
      </div>

      {/* Sections Section */}
      <div className="card bg-white shadow-lg border border-base-300">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Sections</h2>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => closeModal('my_modal_section')}
            >
              Create Section +
            </button>
          </div>
          <SectionList />
          <Modal closeModal={closeModal} id="my_modal_section" title="Create Section">
            <SectionForm />
          </Modal>
        </div>
      </div>

      {/* Headings Section */}
      <div className="card bg-white shadow-lg border border-base-300">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Headings</h2>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => closeModal('my_modal_heading')}
            >
              Create Heading +
            </button>
          </div>
          <HeadingList />
          <Modal closeModal={closeModal} id="my_modal_heading" title="Create Heading">
            <HeadingForm />
          </Modal>
        </div>
      </div>

      {/* Options Section */}
      <div className="card bg-white shadow-lg border border-base-300">
          <OptionsList />
      </div>
    </div>
  )
}

export default AdminPage