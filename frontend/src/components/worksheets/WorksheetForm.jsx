import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import AnswerSummary from "./AnswerSummary";
import toast from "react-hot-toast";

function WorksheetForm({ make, model }) {
    const [currentSection, setCurrentSection] = useState(0);
    const [currentHeadings, setCurrentHeadings] = useState([]);
    const [answers, setAnswers] = useState({}); // Format will be: { sectionId: { headingId: selectedValue } }
    const [answerSummary, setAnswerSummary] = useState([]);

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

    // Get options
    const { data: options } = useQuery({
        queryKey: ["options", make?.id, model?.id],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (make) params.append('make', make.id);
            if (model) params.append('model', model.id);

            const res = await axiosInstance.get(`/worksheet/options?${params}`);
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
        if (sections && sections[currentSection] && headings) {
            const filteredHeadings = headings.filter((heading) => {
                // heading.section can be populated object or a primitive id/number
                const sec = heading.section;
                const sectionId = sec?.section_id ?? (typeof sec === "number" ? sec : null);
                return sectionId !== null && sectionId - 1 === currentSection;
            });
            setCurrentHeadings(filteredHeadings || []);
        } else {
            setCurrentHeadings([]);
        }
    }, [currentSection, sections, headings]);

    // Update the submission handler
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axiosInstance.post("/worksheet/submit", {
                make: make.id,
                model: model.id,
                answers
            });
            toast.success("Worksheet submitted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to submit worksheet");
        }
    }

    // Update the updateAnswer function to store option._id instead of option.value
    function updateAnswer(sectionId, headingId, optionId) {
        if (!optionId) {
            setAnswers(prev => ({
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    [headingId]: null
                }
            }));
            return;
        }

        setAnswers(prev => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [headingId]: optionId // store the _id instead of value
            }
        }));
    }

    // Update the getAnswerSummary function
    function getAnswerSummary() {
        if (!sections || !headings) return [];

        const summary = [];

        Object.entries(answers).forEach(([sectionId, headingAnswers]) => {
            const section = sections.find((s) => s.section_id === parseInt(sectionId));

            Object.entries(headingAnswers).forEach(([headingId, optionId]) => {
                const heading = headings.find((h) => h._id === headingId);
                const selectedOption = options?.find((opt) => opt._id === optionId);

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
    useEffect(() => {
        setAnswerSummary(getAnswerSummary());
    }, [answers, options, sections, headings]);

    // Add this helper to get options for a specific heading
    function getOptionsForHeading(headingId) {
        if (!options) return [];
        return options.filter(opt => {
            const optHeadingId = opt.heading?._id ?? opt.heading;
            return String(optHeadingId) === String(headingId);
        });
    }

    // Helper to get current answer
    function getCurrentAnswer(sectionId, headingId) {
        return answers[sectionId]?.[headingId];
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
            <form onSubmit={handleSubmit} className="card p-6 border border-base-300 bg-white shadow-md">
                {sections && (
                    <>
                        <div className="card-title mb-4">
                            {sections[currentSection].name}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentHeadings?.map((heading) => {
                                const headingOptions = getOptionsForHeading(heading._id);
                                const currentValue = getCurrentAnswer(
                                    sections[currentSection].section_id,
                                    heading._id
                                );

                                return (
                                    <div className="card-body border border-base-200 rounded p-4"
                                        key={heading._id}
                                    >
                                        <h3 className="font-semibold">{heading.name}</h3>
                                        <select
                                            className="select select-bordered w-full"
                                            value={currentValue ?? ""} // use nullish coalescing
                                            onChange={(e) => {
                                                const optionId = e.target.value;
                                                updateAnswer(
                                                    sections[currentSection].section_id,
                                                    heading._id,
                                                    optionId
                                                );
                                            }}
                                        >
                                            <option value="">Select an option</option>
                                            {headingOptions.map((opt) => (
                                                <option
                                                    key={opt._id}
                                                    value={opt._id} // use _id instead of value
                                                >
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                        {headingOptions.length === 0 && (
                                            <p className="text-sm text-error mt-2">
                                                No options available for this heading
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
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

            <AnswerSummary answers={answerSummary} />

            <button className="btn" onClick={() => console.log(options)}>GET OPTIONS</button>
        </div>
    );
}

export default WorksheetForm;
