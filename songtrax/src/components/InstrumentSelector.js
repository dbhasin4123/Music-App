
export default function InstrumentSelector({ sample, setSample }) {
    const instruments = ["Piano", "French Horn", "Guitar", "Drums"];
    const instrumentCodes = instruments.map(instrument => instrument.toLowerCase().replace(" ", "_"));

    const handleInstrumentChange = (e) => {
        setSample({ ...sample, type: e.target.value });
    };

    return (
        <div className="selector selector-edit">
            <p><strong>Type</strong></p>
            <div className="button-group">
                {instruments.map((_instrument, index) => (
                    <div key={_instrument} className={(instrumentCodes[index] === sample.type) ? "secondary button" : "primary button"}>
                        <input type="radio" name="instruments" value={instrumentCodes[index]} id={instrumentCodes[index]} onChange={handleInstrumentChange} checked={instrumentCodes[index] === sample.type} />
                        <label htmlFor={instrumentCodes[index]} >{_instrument}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
