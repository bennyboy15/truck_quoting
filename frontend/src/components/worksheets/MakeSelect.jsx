import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';

function MakeSelect({ selectedMake, setSelectedMake, selectedModel, setSelectedModel }) {

  const { data: truckMakes } = useQuery({
    queryKey: ["truckMakes"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trucks/make");
      return res.data
    }
  });

  const { data: truckModels } = useQuery({
    queryKey: ["truckModels"],
    queryFn: async () => {
      const res = await axiosInstance.get("/trucks/model");
      return res.data
    }
  });

  const filteredModels = selectedMake
    ? truckModels?.filter(m => {
        // model.make may be populated object or id string
        const makeId = m.make?._id ?? m.make;
        return String(makeId) === String(selectedMake.id);
      })
    : [];

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3 flex-wrap'>
        {
          selectedMake ?
            <div className='flex items-center gap-3 rounded-xl bg-white p-2 px-4 border border-base-300 font-semibold'>
              <span>{selectedMake.name}</span>
              <button className='btn btn-sm btn-error' onClick={() => { setSelectedMake(null); setSelectedModel(null); }}>Cancel</button>
            </div> :
            truckMakes?.map((make) => (
              <button
                key={make._id}
                className='btn btn-primary'
                onClick={() => setSelectedMake({ id: make._id, name: make.name })}
              >
                {make.name}
              </button>
            ))
        }
      </div>

      <div>
        {selectedMake && !selectedModel ? (
          filteredModels?.length > 0 ? (
            <div className='flex gap-3 flex-wrap mt-2'>
              {filteredModels.map((model) => (
                <button
                  key={model._id}
                  className='btn btn-outline'
                  onClick={() => setSelectedModel({ id: model._id, name: model.name })}
                >
                  {model.name}
                </button>
              ))}
            </div>
          ) : (
            <div className='text-sm text-base-content/60 mt-2'>No models for selected make</div>
          )
        ) : null}

        {selectedModel && (
          <div className='flex items-center gap-3 mt-2'>
            <div className='flex items-center gap-3 rounded-xl bg-white p-2 px-4 border border-base-300 font-semibold'>
              <span>{selectedModel.name}</span>
              <button className='btn btn-sm btn-error' onClick={() => setSelectedModel(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MakeSelect