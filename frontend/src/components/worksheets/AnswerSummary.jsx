
function AnswerSummary({answers}) {
  return (
    <div className="card p-6 border border-base-300 bg-white shadow-md">
                <h3 className="card-title mb-4">Answer Summary</h3>
                {answers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>Section</th>
                                    <th>Heading</th>
                                    <th>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {answers.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.section}</td>
                                        <td>{item.heading}</td>
                                        <td>{item.answer}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-base-content/60 py-4">
                        No answers selected yet
                    </div>
                )}
            </div>
  )
}

export default AnswerSummary