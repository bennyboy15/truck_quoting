import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

function WorksheetForm() {
    const [currentSection, setCurrentSection] = useState(0);
    const [currentHeadings, setCurrentHeadings] = useState([]);
    const [answers, setAnswers] = useState({}); // Format will be: { sectionId: { headingId: selectedValue } }

    // Get sections
    const { data: sections } = useQuery({
        queryKey: ["sections"],
        queryFn: async () => {
            const res = await axiosInstance.get("/worksheet/section");
            return res.data;
        },
    });
    // Get headings
    const { data: headings } = useQuery({
        queryKey: ["headings"],
        queryFn: async () => {
            const res = await axiosInstance.get("/worksheet/heading");
            return res.data;
        },
    });

    // Section Navigators
    const total = sections?.length ?? 0;
    function goNext() {
        setCurrentSection((c) => {
            // clamp to last available index
            if (total === 0) return 0;
            return Math.min(c + 1, Math.max(total - 1, 0));
        });
    }
    function goPrev() {
        setCurrentSection((c) => Math.max(c - 1, 0));
    }
    function goToStep(index) {
        setCurrentSection(index);
    }

    // Use useEffect to handle heading updates when currentSection changes
    useEffect(() => {
        if (sections && sections[currentSection]) {
            const filteredHeadings = headings?.filter(
                (heading) => heading.section.section_id - 1 === currentSection
            );
            setCurrentHeadings(filteredHeadings);
        }
        console.log(currentHeadings);
    }, [currentSection, sections]);

    // Add options state (you can fetch these from API if needed)
    const options = [
        { id: 1, label: "Option 1", value: 1 },
        { id: 2, label: "Option 2", value: 2 },
        // Add more options as needed
    ];

    function updateAnswers(sectionId, headingId, value) {
        setAnswers((prev) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [headingId]: value,
            },
        }));
    }

    // Helper to check if a heading has been answered
    function getHeadingAnswer(sectionId, headingId) {
        return answers[sectionId]?.[headingId];
    }

    // Update the submit handler
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Worksheet submitted", answers);
        // Add your API call here to save the answers
    }

    // Add this helper function to get answer summaries
    function getAnswerSummary() {
        if (!sections || !headings) return [];

        const summary = [];

        Object.entries(answers).forEach(([sectionId, headingAnswers]) => {
            const section = sections.find((s) => s.section_id === parseInt(sectionId));

            Object.entries(headingAnswers).forEach(([headingId, value]) => {
                const heading = headings.find((h) => h._id === headingId);
                const selectedOption = options.find((opt) => opt.value === value);

                if (section && heading && selectedOption) {
                    summary.push({
                        section: section.name,
                        heading: heading.name,
                        answer: selectedOption.label,
                    });
                }
            });
        });

        return summary;
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Steps */}
            <ul className="steps steps-horizontal w-full">
                {sections?.map((section, index) => {
                    const done = Boolean(answers[section.section_id]);
                    const active = index === currentSection;
                    return (
                        <li
                            key={section._id}
                            className={`step ${done ? "step-primary" : ""} ${active ? "step-secondary" : ""
                                }`}
                            onClick={() => goToStep(index)}
                            style={{ cursor: "pointer" }}
                        >
                            {section.name}
                        </li>
                    );
                })}
            </ul>

            {/* Current Section */}
            <form
                onSubmit={handleSubmit}
                className="card p-6 border border-base-300 bg-white shadow-md"
            >
                {sections && (
                    <>
                        <div className="card-title mb-4">
                            {sections[currentSection].name}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentHeadings?.map((heading) => (
                                <div className="card-body border border-base-200 rounded p-4" key={heading._id}>
                                    <h3 className="font-semibold">{heading.name}</h3>
                                    <div className="dropdown">
                                        <div tabIndex={0} role="button" className="btn m-1 w-full justify-between">
                                            {getHeadingAnswer(
                                                sections[currentSection].section_id,
                                                heading._id
                                            )
                                                ? options.find(
                                                    (opt) =>
                                                        opt.value ===
                                                        getHeadingAnswer(
                                                            sections[currentSection].section_id,
                                                            heading._id
                                                        )
                                                )?.label
                                                : "Select Option..."}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-lg"
                                        >
                                            {options.map((option) => (
                                                <li key={option.id}>
                                                    <a
                                                        onClick={() =>
                                                            updateAnswers(
                                                                sections[currentSection].section_id,
                                                                heading._id,
                                                                option.value
                                                            )
                                                        }
                                                        className={
                                                            getHeadingAnswer(
                                                                sections[currentSection].section_id,
                                                                heading._id
                                                            ) === option.value
                                                                ? "active"
                                                                : ""
                                                        }
                                                    >
                                                        {option.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-6">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="btn"
                            onClick={goPrev}
                            disabled={currentSection === 0}
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={goNext}
                            disabled={total === 0}
                        >
                            Next
                        </button>
                    </div>

                    {currentSection === sections?.length - 1 && (
                        <button
                            type="submit"
                            className="btn btn-success w-full md:w-auto"
                            disabled={total === 0}
                        >
                            Submit Worksheet
                        </button>
                    )}
                </div>
            </form>

            {/* Add this after the form */}
            <div className="card p-6 border border-base-300 bg-white shadow-md">
                <h3 className="card-title mb-4">Answer Summary</h3>
                {getAnswerSummary().length > 0 ? (
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
                                {getAnswerSummary().map((item, index) => (
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
        </div>
    );
}

export default WorksheetForm;
