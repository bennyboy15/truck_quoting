export default function StatCard({ title, value, icon, bgColor }) {
    const Icon = icon;
    return (
        <div className={`card bg-${bgColor} text-${bgColor}-content shadow-lg`}>
            <div className="card-body p-4">
                <div className="flex items-center justify-between">
                    <div className={`bg-${bgColor} p-3 rounded-box`}>
                        <Icon size={24}/>
                    </div>
                    <div className="text-right">
                        <div className="stat-title opacity-70">{title}</div>
                        <div className="stat-value">{value}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}