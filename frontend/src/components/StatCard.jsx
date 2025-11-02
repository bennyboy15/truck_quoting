export default function StatCard({
    title,
    value,
    icon: Icon,
    cardBg = 'bg-white',
    iconBg = 'bg-blue-50',
    iconColor = 'text-blue-700',
    stripeColor = 'bg-blue-600',
}) {
    return (
        <div className={`${cardBg} rounded-lg shadow-lg border border-base-300 overflow-hidden`}>
            <div className="p-4 flex items-center justify-between">
                <div className="text-left">
                    <div className="text-sm text-gray-500 font-medium">{title}</div>
                    <div className="text-2xl font-semibold mt-1">{value}</div>
                </div>

                <div
                    className={`${iconBg} p-3 rounded-full flex items-center justify-center min-w-[48px] min-h-[48px]`}
                >
                    {Icon ? <Icon className={`w-6 h-6 ${iconColor}`} /> : null}
                </div>
            </div>

            {/* colored stripe at bottom */}
            <div className={`${stripeColor} h-1 w-full`} />
        </div>
    )
}