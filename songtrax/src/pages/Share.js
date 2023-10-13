import { Link, useParams } from "react-router-dom";

import SharedSelector from "../components/SharedSelector.js";

import useDocumentTitle from "../helpers/useDocumentTitle.js";

import { preview, cancelPreview } from "../music/preview.js";

import "../css/share.css";


export default function Share({ samples, updateSample, locations, samplesToLocations, setSamplesToLocations, setHome }) {
    const handlePreview = (e) => {
        e.preventDefault();
        preview(sample.data, sample.type);
        updateSample({ ...sample, previewing: true });
        setTimeout(() => updateSample({ ...sample, previewing: false }), 4000);
    };

    const handleStopPreview = (e) => {
        e.preventDefault();
        cancelPreview();
        updateSample({ ...sample, previewing: false });
    }

    setHome(false);
    const { id } = useParams(); // string | undefined
    useDocumentTitle(`Share Sample ${id}`);
    const sample = samples.find(_sample => _sample.id === id);

    return (
        <>
            <h1>Share This Sample:</h1>
            <div className="box sample">
                <div className="left">
                    <h2>{sample.name}</h2>
                    <p>{sample.time} on {sample.date}</p>
                </div>
                <div className="right">
                    {sample.previewing || <Link to="#" className="primary" onClick={handlePreview}>Preview</Link>}
                    {sample.previewing && <Link to="#" className="primary greyed" onClick={handleStopPreview}>Stop Previewing</Link>}
                </div>
            </div>
            <div className="selectors">
                {locations.map(location => (
                    <SharedSelector
                        key={location.id}
                        sampleId={sample.id}
                        locationId={location.id}
                        locationName={location.name}
                        samplesToLocations={samplesToLocations}
                        setSamplesToLocations={setSamplesToLocations}
                    />
                ))}
            </div>
        </>
    );
}
