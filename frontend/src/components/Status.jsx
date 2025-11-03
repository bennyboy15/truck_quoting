import React from 'react'

function Status({ status }) {

    const statusVariants = { 0: "status-success", 1: "status-info", 2: "status-warning", 3: "status-neutral"};
    const statusTextColour = { 0: "text-success", 1: "text-info", 2: "text-warning", 3: "text-neutral"};
    const statusText =  { 0: "Submitted", 1: "Draft", 2: "Modified", 3: "New" };

    return (
        <div className={`flex gap-2 items-center`}>
            <div className="inline-grid *:[grid-area:1/1]">
                <div className={`status ${statusVariants[status]} animate-ping`}></div>
                <div className={`status ${statusVariants[status]}`}></div>
            </div>
            <p className={`${statusTextColour[status]}`}>{statusText[status]}</p>
        </div>
    )
}

export default Status