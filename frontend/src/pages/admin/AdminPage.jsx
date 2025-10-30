import React from 'react'
import CustomerForm from "../../components/customer/CustomerForm.jsx"
import { closeModal } from '../../lib/utils.js'
import Modal from '../../components/Modal.jsx'

function AdminPage() {

  return (
    <>
      {/* Truck Create Modal */}
      <button className="btn btn-outline" onClick={() => closeModal('my_modal_customer')}>Create Customer +</button>
      <Modal closeModal={closeModal} id="my_modal_customer" title="Create Customer">
        <CustomerForm />
      </Modal>
      


    </>
  )
}

export default AdminPage