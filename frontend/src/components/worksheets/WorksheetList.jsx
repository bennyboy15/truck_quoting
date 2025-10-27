export default function WorksheetList(){
    return (
        <ul className="list bg-base-100 rounded-box shadow-md border border-base-300">

            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Worksheets</li>

            <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
                <div><img className="w-15 h-10 rounded-box" src="/t410sar.png" /></div>
                <div className="list-col-grow">
                    <div>Collins</div>
                    <div className="text-xs uppercase font-semibold opacity-60">LA6875 476859</div>
                </div>
                <button className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
            </li>

            <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
                <div><img className="w-15 h-10 rounded-box" src="/t410sar.png" /></div>
                <div className="list-col-grow">
                    <div>APC Transport</div>
                    <div className="text-xs uppercase font-semibold opacity-60">LF8657 478675</div>
                </div>
                <button className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
            </li>

            <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
                <div><img className="w-15 h-10 rounded-box" src="/t410sar.png" /></div>
                <div className="list-col-grow">
                    <div>Collins</div>
                    <div className="text-xs uppercase font-semibold opacity-60">LF96885 478867</div>
                </div>
                <button className="btn btn-square btn-ghost">
                    <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                </button>
            </li>

        </ul>
    )
}