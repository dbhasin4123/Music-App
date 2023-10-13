import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { createSample, updateSample as updateSampleToApi } from "../api/api.js";

import InstrumentSelector from "../components/InstrumentSelector.js";
import NoteSelector from "../components/NoteSelector.js";

import getDatetimeFromSql from "../helpers/getDatetimeFromSql.js";
import useDocumentTitle from "../helpers/useDocumentTitle.js";

import { preview, cancelPreview, notes } from "../music/preview.js";

import "../css/edit.css";

/** Default ID for new samples. */
const DEFAULT_ID = 0;
/** Default name for new samples. */
const DEFAULT_NAME = "";
/** Default instrument for new samples. */
const DEFAULT_TYPE = "piano";
/** Returns the default bars for notes. */
const DEFAULT_BARS = () => Array(16).fill(false);
/** Returns the default data for a new sampele. */
const DEFAULT_DATA = () => {
    let data = {};
    notes.forEach(note => data[note] = DEFAULT_BARS());
    return data;
};

export default function Edit({ samples, updateSample, setSamples, setHome }) {
    /** Handles a name change event. */
    const handleNameChange = (e) => {
        setSample({ ...sample, name: e.target.value });
    };

    /** Handles a preview event. */
    const handlePreview = () => {
        updateSample({ ...sample, previewing: true });
        preview(sample.data, sample.type);
        setSample({ ...sample, previewing: true });
        setTimeout(() => updateSample({ ...sample, previewing: false }), 4000);
        setTimeout(() => setSample({ ...sample, previewing: false }), 4000);
    };

    /** Handles a stop preview event. */
    const handleStopPreview = () => {
        cancelPreview();
        updateSample({ ...sample, previewing: false });
        setSample({ ...sample, previewing: false });
    }

    /** Handles a save event. */
    const handleSave = async (e) => {
        if (id) {
            if (sample.name === "") {
                alert("Please enter a name for your sample.");
                return;
            }
            // update existing sample in API
            await updateSampleToApi(id, sample.data, sample.type, sample.name);
            // update existing sample in "global" state
            setSamples(samples.map(_sample => (_sample.id === id) ? { ...sample, data: sample.data, type: sample.type, name: sample.name } : _sample));
        } else {
            if (sample.name === "") {
                alert("Please enter a name for your sample.");
                return;
            }
            // create new sample in API
            let response = await createSample(sample.data, sample.type, sample.name);
            let { time, date } = getDatetimeFromSql(response.sql);
            // create new sample in "global" state
            setSamples([...samples, { id: response.insertedID, data: sample.data, type: sample.type, name: sample.name, time, date, previewing: false }]);
        }
        e.target.innerText = "Saved...";
        setTimeout(() => window.location = "/", 1500);
    };

    setHome(false);
    const { id } = useParams(); // string | undefined
    useDocumentTitle(id ? `Edit Sample ${id}` : "Create New Sample");

    let initialSample = samples.find(_sample => _sample.id === id) || {
        id: DEFAULT_ID,
        data: DEFAULT_DATA(),
        type: DEFAULT_TYPE,
        name: DEFAULT_NAME
    };
    const [sample, setSample] = useState(initialSample);

    return (
        <>
            <h1>Editing This Sample:</h1>
            <div className="banner box">
                <input type="text" placeholder="Sample Name" value={sample.name} onChange={handleNameChange} />
                <div className="right">
                    {sample.previewing || <Link to="#" className="primary" onClick={handlePreview}>Preview</Link>}
                    {sample.previewing && <Link to="#" className="primary greyed" onClick={handleStopPreview}>Stop Previewing</Link>}
                    <button className="secondary" onClick={handleSave}>Save</button>
                </div>
            </div>
            <div className="selectors">
                <InstrumentSelector sample={sample} setSample={setSample} />
                {notes.map(note => <NoteSelector key={note} note={note} sample={sample} setSample={setSample} />)}
            </div>
        </>
    );
}
