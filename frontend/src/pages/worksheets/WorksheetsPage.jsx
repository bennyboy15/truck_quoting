import WorksheetList from "../../components/worksheets/WorksheetList"
import Input from "../../components/Input"

function WorksheetsPage() {
    return (
        <div className="flex flex-col gap-3">
            <Input placeholder="Search"/>
            <WorksheetList />
        </div>
    )
}

export default WorksheetsPage