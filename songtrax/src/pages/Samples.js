import NewSample from "../components/NewSample.js";
import Sample from "../components/Sample.js";

import useDocumentTitle from "../helpers/useDocumentTitle.js";

import "../css/samples.css";

export default function Samples({ samples, updateSample, samplesToLocations, setHome }) {
    setHome(true);
    useDocumentTitle("Home");

    return (
        <>
            <h1>Samples You've Created</h1>
            <div className="samples">
                {samples.map(sample => {
                    let shared = samplesToLocations.filter(sampleToLocation =>
                        sampleToLocation.sample === sample.id).length > 0;
                    return (
                        <Sample
                            key={sample.id}
                            shared={shared}
                            sample={sample}
                            updateSample={updateSample}
                        />
                    );
                })}
                {<NewSample />}
            </div>
        </>
    );
}
