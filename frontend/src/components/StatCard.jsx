export default function StatCard({
    title,
    value,
    icon: Icon,
    // now expect Tailwind / Daisy class names instead of raw color strings
    cardBgClass = 'bg-white',
    iconBgClass = 'bg-blue-50',
    iconColorClass = 'text-blue-700',
    stripeColorClass = 'bg-blue-600',
}) {
    return (
        <div className={`${cardBgClass} rounded-lg shadow-lg border border-base-300 overflow-hidden`}>
            <div className="p-4 flex items-center justify-between">
                <div className="text-left">
                    <div className="text-sm text-gray-500 font-medium">{title}</div>
                    <div className="text-2xl font-semibold mt-1">{value}</div>
                </div>

                <div
                    className={`${iconBgClass} p-3 rounded-full flex items-center justify-center min-w-[48px] min-h-[48px]`}
                >
                    {Icon ? <Icon className={`w-6 h-6 ${iconColorClass}`} /> : null}
                </div>
            </div>

            {/* colored stripe at bottom */}
            <div className={`${stripeColorClass} h-1 w-full`} />
        </div>
    )
}