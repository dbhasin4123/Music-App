import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header.js";

import Edit from "./pages/Edit.js";
import Samples from "./pages/Samples.js";
import Share from "./pages/Share.js";

import { readSamples, readLocations, readSamplesToLocations } from "./api/api.js";

import "./css/colours.css";
import "./css/main.css";

export default function App() {
    /** Determines whether or not the header's back arrow should be shown. */
    const [home, setHome] = useState(true);

    /** "Global" list of samples. */
    const [samples, setSamples] = useState([]);

    /** "Global" list of locations. */
    const [locations, setLocations] = useState([]);

    /** "Global" list of samples shared to locations. */
    const [samplesToLocations, setSamplesToLocations] = useState([]);

    /** Fetches samples from the WMP API. */
    useEffect(() => {
        const fetchSamples = async () => setSamples(await readSamples());
        fetchSamples();
    }, []);

    /** Fetches locations from the WMP API. */
    useEffect(() => {
        const fetchLocations = async () => setLocations(await readLocations());
        fetchLocations();
    }, []);

    /** Fetches samples shared to locations from the WMP API. */
    useEffect(() => {
        const fetchSamplesToLocations = async () => setSamplesToLocations(await readSamplesToLocations());
        fetchSamplesToLocations();
    }, []);

    
    function updateSample(sample) {
        setSamples(samples.map(_sample => {
            return (_sample.id === sample.id) ? sample : _sample;
        }));
    }

    return (
        <BrowserRouter>
            <Header home={home} />
            <main>
                <Routes>
                    <Route path="/" element={<Samples samples={samples} updateSample={updateSample} samplesToLocations={samplesToLocations} setHome={setHome} />} />
                    <Route path="edit/new" element={<Edit samples={samples} updateSample={updateSample} setSamples={setSamples} setHome={setHome} />} />
                    <Route path="edit/:id" element={<Edit samples={samples} updateSample={updateSample} setSamples={setSamples} setHome={setHome} />} />
                    <Route path="share/:id" element={<Share samples={samples} updateSample={updateSample} locations={locations} samplesToLocations={samplesToLocations} setSamplesToLocations={setSamplesToLocations} setHome={setHome} />} />
                </Routes>
            </main>
            <footer />
        </BrowserRouter>
    );
}
