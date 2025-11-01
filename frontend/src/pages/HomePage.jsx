import { useCurrentUser } from '../hooks/useCurrentUser';
import StatCard from '../components/StatCard';
import { Truck } from 'lucide-react';

function HomePage() {
  const { data: current_user } = useCurrentUser()
  const user = current_user || {}

  const worksheets = user.worksheets || [
    { id: 1, title: 'Truck #123 Inspection', status: 'In Progress', updatedAt: '2025-10-28' },
    { id: 2, title: 'Quote — ACME Logistics', status: 'Completed', updatedAt: '2025-09-10' },
    { id: 3, title: 'Trailer Refurb', status: 'Pending', updatedAt: '2025-10-01' },
  ]

  const stats = {
    total: worksheets.length,
    active: worksheets.filter((w) => w.status === 'In Progress').length,
    completed: worksheets.filter((w) => w.status === 'Completed').length,
  }

  const statusClasses = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'completed':
        return 'bg-emerald-50 text-emerald-700'
      case 'in progress':
        return 'bg-amber-50 text-amber-700'
      case 'pending':
      default:
        return 'bg-sky-50 text-sky-700'
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 font-inter">
      <aside className="w-56 flex-shrink-0 flex flex-col gap-4 p-6 bg-gradient-to-b from-slate-900 to-slate-800 text-sky-100">
        <div className="text-lg font-semibold tracking-tight">Truck Quoting</div>
        <div className="text-sm text-sky-200">Welcome, {user.name ?? 'User'}</div>

        <nav className="mt-3 flex flex-col gap-1">
          <button className="text-left px-3 py-2 rounded-lg text-sky-100 bg-white/2 hover:bg-white/5">Overview</button>
          <button className="text-left px-3 py-2 rounded-lg text-sky-100 hover:bg-white/5">Worksheets</button>
          <button className="text-left px-3 py-2 rounded-lg text-sky-100 hover:bg-white/5">Quotes</button>
          <button className="text-left px-3 py-2 rounded-lg text-sky-100 hover:bg-white/5">Settings</button>
        </nav>

        <div className="mt-auto text-xs text-sky-300">
          {user.username ? `@${user.username}` : 'Not signed in'}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <header className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold">
              Welcome back, {user.name ?? 'there'} {user.username ? `(${user.username})` : ''}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Quick summary of your account and recent worksheets</p>
          </div>
          <button className='btn btn-default btn-soft'>+ New Worksheet</button>
        </header>

        <section className="mt-6" aria-label="Overview statistics">
          <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
            <StatCard className="flex-1 w-full" title="Total Worksheets" value={25} icon={Truck} iconBg={"red"} />
            <StatCard className="flex-1 w-full" title="Active" value={25} icon={Truck} iconBg={"red"} />
            <StatCard className="flex-1 w-full" title="Completed" value={25} icon={Truck} iconBg={"red"} />
            <StatCard className="flex-1 w-full" title="Pending" value={25} icon={Truck} iconBg={"red"} />
          </div>
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Your Worksheets</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {worksheets.map((w) => (
              <article
                key={w.id}
                className="bg-gradient-to-b from-white to-slate-50 p-4 rounded-xl border shadow-md"
                aria-labelledby={`sheet-${w.id}-title`}
              >
                <div id={`sheet-${w.id}-title`} className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{w.title}</div>
                    <div className="text-xs text-slate-500 mt-1">Updated: {w.updatedAt}</div>
                  </div>

                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses(w.status)}`}>
                    {w.status}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage