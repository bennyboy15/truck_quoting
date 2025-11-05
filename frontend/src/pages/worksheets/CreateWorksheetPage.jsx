import MakeSelect from '../../components/worksheets/MakeSelect'
import WorksheetForm from '../../components/worksheets/WorksheetForm'

function CreateWorksheetPage() {

  return (
    <div className='flex flex-col gap-5'>
      <MakeSelect/>
      <WorksheetForm />
    </div>
  )
}

export default CreateWorksheetPage