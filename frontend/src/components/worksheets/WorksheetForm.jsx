import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../lib/axios';

function WorksheetForm() {
    const [currentSection, setCurrentSection] = useState(0);
    const [currentHeadings, setCurrentHeadings] = useState([]);
    const [answers, setAnswers] = useState({});

    const { data: sections } = useQuery({
        queryKey: ["sections"],
        queryFn: async () => {
            const res = await axiosInstance.get("/worksheet/section");
            return res.data;
        }
    });

    const { data: headings } = useQuery({
        queryKey: ["headings"],
        queryFn: async () => {
            const res = await axiosInstance.get("/worksheet/heading");
            return res.data;
        }
    });

    const total = sections?.length ?? 0;
    function goNext() {
        setCurrentSection((c) => {
            // clamp to last available index
            if (total === 0) return 0
            return Math.min(c + 1, Math.max(total - 1, 0))
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
            const filteredHeadings = headings.filter(
                (heading) => (heading.section.section_id)-1 === currentSection
            );
            setCurrentHeadings(filteredHeadings);
        };
        console.log(currentHeadings);
    }, [currentSection, sections]);

    function handleSubmit(e) {
        e.preventDefault()
        console.log('Worksheet submitted', answers)
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Steps */}
            <ul className="steps steps-horizontal w-full">
                {sections?.map((section, index) => {
                    const done = Boolean(answers[section.section_id])
                    const active = index === currentSection
                    return (
                        <li
                            key={section._id}
                            className={`step ${done ? 'step-primary' : ''} ${active ? 'step-secondary' : ''}`}
                            onClick={() => goToStep(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {section.name}
                        </li>
                    )
                })}
            </ul>

            {/* Current Section */}
            <form onSubmit={handleSubmit} className="card p-4">

                {sections && (
                    <div className="mb-4">
                        <div className="card-title">{sections[currentSection].name}</div>
                        {currentHeadings.map((heading) => (
                            <div className='card-body' key={heading.id}>{heading.name}</div>
                        ))}
                    </div>
                )}

                <div className="flex gap-2 justify-between">
                    <div>
                        <button type="button" className="btn" onClick={goPrev} disabled={currentSection === 0}>
                            Prev
                        </button>
                        <button type="button" className="btn btn-primary ml-2" onClick={goNext} disabled={total === 0}>
                            Next
                        </button>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-success" disabled={total === 0}>
                            Submit Worksheet
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default WorksheetForm