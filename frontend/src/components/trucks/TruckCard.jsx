import React from 'react'
import { Truck } from 'lucide-react'
import {Link} from "react-router-dom"

/**
 * Props:
 * - truck: object (from backend)
 * - onView?: (truck) => void  // called when "View details" clicked
 */
export default function TruckCard({ truck = {} }) {
  const {
    _id,
    stockNo,
    chassis,
    fleetNo,
    registration,
    offlineDate,
    deliveryDate,
    truckColour,
    chassisColour,
    trimColour,
    status,
    model,
  } = truck

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '—')

  const statusInfo = (() => {
    // map numeric status to label + tailwind classes
    switch (Number(status)) {
      case 1:
        return { label: 'Active', classes: 'bg-emerald-100 text-emerald-800' }
      case 2:
        return { label: 'Offline', classes: 'bg-amber-100 text-amber-800' }
      case 3:
        return { label: 'Decommissioned', classes: 'bg-red-100 text-red-800' }
      default:
        return { label: 'Unknown', classes: 'bg-slate-100 text-slate-800' }
    }
  })()

  return (
    <article className="bg-white rounded-lg shadow-sm border border-base-300 p-4 flex gap-4 items-start">
      <div className="flex-shrink-0 rounded-md bg-slate-50 p-3">
        <Truck className="w-6 h-6 text-slate-700" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-sm font-semibold truncate">{stockNo ?? 'No stock #'}</h4>
            <div className="text-xs text-slate-500 truncate">
              {model?.name ? `${model.name} • ${chassis ?? '—'}` : chassis ?? '—'}
            </div>
          </div>

          <div className={`text-xs px-2 py-1 rounded-full font-medium ${statusInfo.classes}`}>
            {statusInfo.label}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
          <div>
            <div className="text-xs text-slate-400">Fleet No</div>
            <div>{fleetNo ?? '—'}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400">Registration</div>
            <div>{registration ?? '—'}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400">Offline</div>
            <div>{formatDate(offlineDate)}</div>
          </div>

          <div>
            <div className="text-xs text-slate-400">Delivery</div>
            <div>{formatDate(deliveryDate)}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            {/* color swatches — background color is dynamic so inline style used for color only */}
            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-400">Truck</div>
              <div
                className="w-5 h-5 rounded border"
                style={{ backgroundColor: truckColour || 'transparent' }}
                title={truckColour || 'No color'}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-400">Chassis</div>
              <div
                className="w-5 h-5 rounded border"
                style={{ backgroundColor: chassisColour || 'transparent' }}
                title={chassisColour || 'No color'}
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xs text-slate-400">Trim</div>
              <div
                className="w-5 h-5 rounded border"
                style={{ backgroundColor: trimColour || 'transparent' }}
                title={trimColour || 'No color'}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/truck/${_id}`}
              className="btn btn-sm btn-outline"
              aria-label={`View details for ${stockNo ?? 'truck'}`}
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}