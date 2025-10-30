import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
export default function WorksheetList(){
    return (
        <ul className="list bg-base-100 rounded-box shadow-md border border-base-300">

            <li className="flex justify-between p-4 pb-2 text-md opacity-60 tracking-wide">
                <div>Worksheets</div>
                <Link to={"/worksheets/create"} className="btn btn-primary">Create +</Link>
            </li>

            <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
                <div><img className="w-15 h-10 rounded-box" src="/t410sar.jpg" /></div>
                <div className="list-col-grow">
                    <div>Collins</div>
                    <div className="text-xs uppercase font-semibold opacity-60">LA6875 476859</div>
                </div>
                <Link to={"/worksheets/1"} className="btn btn-square btn-ghost">
                    <Eye/>
                </Link>
            </li>

            <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
                <div><img className="w-15 h-10 rounded-box" src="/t410sar.jpg" /></div>
                <div className="list-col-grow">
                    <div>APC Transport</div>
                    <div className="text-xs uppercase font-semibold opacity-60">LF8657 478675</div>
                </div>
                <Link to={"/worksheets/1"} className="btn btn-square btn-ghost">
                    <Eye/>
                </Link>
            </li>

            <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
                <div><img className="w-15 h-10 rounded-box" src="/t410sar.jpg" /></div>
                <div className="list-col-grow">
                    <div>Collins</div>
                    <div className="text-xs uppercase font-semibold opacity-60">LF96885 478867</div>
                </div>
                <Link to={"/worksheets/1"} className="btn btn-square btn-ghost">
                    <Eye/>
                </Link>
            </li>

        </ul>
    )
}