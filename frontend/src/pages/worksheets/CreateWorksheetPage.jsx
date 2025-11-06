import { useState } from 'react';
import MakeSelect from '../../components/worksheets/MakeSelect'
import WorksheetForm from '../../components/worksheets/WorksheetForm'

function CreateWorksheetPage() {
  const [selectedMake, setSelectedMake] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div className='flex flex-col gap-5'>
      <MakeSelect 
        selectedMake={selectedMake}
        setSelectedMake={setSelectedMake}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
      
      {/* Only render WorksheetForm when both make and model are selected */}
      {selectedMake && selectedModel && (
        <WorksheetForm 
          make={selectedMake}
          model={selectedModel}
        />
      )}
    </div>
  )
}

export default CreateWorksheetPage