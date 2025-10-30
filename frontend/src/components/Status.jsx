import React from 'react'

function Status({ status }) {

    const statusVariants = { 0: "success", 1: "info", 2: "warning", 3: "neutral"};
    const statusText =  { 0: "Submitted", 1: "Draft", 2: "Modified", 3: "New" };

    return (
        <div className={`flex gap-2 items-center`}>
            <div className="inline-grid *:[grid-area:1/1]">
                <div className={`status status-${statusVariants[status]} animate-ping`}></div>
                <div className={`status status-${statusVariants[status]}`}></div>
            </div>
            <p className={`text-${statusVariants[status]}`}>{statusText[status]}</p>
        </div>
    )
}

export default Status