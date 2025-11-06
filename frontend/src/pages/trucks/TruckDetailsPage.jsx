import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { ArrowLeft, Calendar, Hash, Key, Package, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

function TruckDetailsPage() {
  const { id } = useParams();

  const { data: truck, isLoading } = useQuery({
    queryKey: ["trucks", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trucks/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="btn btn-ghost btn-sm">
            <ArrowLeft size={20} />
            Back
          </Link>
          <h1 className="text-2xl font-bold">Truck Details</h1>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm">Edit Truck</button>
          <button className="btn btn-error btn-sm">Delete</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Truck Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="card bg-white shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2">
                <Truck size={20} />
                Basic Information
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Hash className="opacity-70" size={16} />
                  <div>
                    <p className="text-sm opacity-70">Stock Number</p>
                    <p className="font-medium">{truck.stockNo || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Key className="opacity-70" size={16} />
                  <div>
                    <p className="text-sm opacity-70">Chassis Number</p>
                    <p className="font-medium">{truck.chassisNo || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="opacity-70" size={16} />
                  <div>
                    <p className="text-sm opacity-70">Fleet Number</p>
                    <p className="font-medium">{truck.fleetNo || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="opacity-70" size={16} />
                  <div>
                    <p className="text-sm opacity-70">Delivery Date</p>
                    <p className="font-medium">
                      {truck.deliveryDate 
                        ? new Date(truck.deliveryDate).toLocaleDateString() 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colors Card */}
          <div className="card bg-white shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title">Colors</h2>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm opacity-70">Truck Color</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: truck.truckColour }}
                    />
                    <span>{truck.truckColour}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm opacity-70">Chassis Color</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: truck.chassisColour }}
                    />
                    <span>{truck.chassisColour}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm opacity-70">Trim Color</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: truck.trimColour }}
                    />
                    <span>{truck.trimColour}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Worksheet Card */}
          <div className="card bg-white shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title">Worksheet Answers</h2>
              {truck.worksheet ? (
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Heading</th>
                        <th>Answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {truck.worksheet.map((answer, index) => (
                        <tr key={index}>
                          <td>{answer.section}</td>
                          <td>{answer.heading}</td>
                          <td>{answer.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-base-content/60">
                  No worksheet data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Status & Actions */}
        <div className="space-y-6">
          <div className="card bg-white shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title">Status</h2>
              <div className="mt-4">
                <div className="badge badge-lg">Active</div>
              </div>
            </div>
          </div>

          <div className="card bg-white shadow-lg border border-base-300">
            <div className="card-body">
              <h2 className="card-title">Quick Actions</h2>
              <div className="space-y-2 mt-4">
                <button className="btn btn-outline w-full">View Documents</button>
                <button className="btn btn-outline w-full">Print Details</button>
                <button className="btn btn-outline w-full">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TruckDetailsPage;