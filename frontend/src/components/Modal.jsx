import { CircleX } from "lucide-react"

function Modal({closeModal, id, title, children}) {
    return (
        <>
            <dialog id={id} className="modal">
                <div className="modal-box">
                    <div className="flex justify-between items-center pb-1">
                        <h3 className="card-title">{title}</h3>
                        <form method="dialog">
                            <button className="btn btn-secondary" onClick={() => closeModal(id)}><CircleX />Close</button>
                        </form>
                    </div>
                    {children}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}

export default Modal