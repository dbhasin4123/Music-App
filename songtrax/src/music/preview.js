import { guitar, frenchHorn, piano, drums, toneObject } from "./instruments.js";

/** Notes used to create samples. */
export const notes = ["B4", "A4", "G3", "F3", "E3", "D3", "C3"];

export function preview(data, type) {
    function playNoteFromBars(note, bars) {
        const now = toneObject.now();
        bars.forEach((bar, time) => {
            bar && instrument.triggerAttackRelease(note, "8n", now + (time / 4)); // Plays 0.25s apart
        });
    }

    let instrument;
    switch (type) {
        case "piano":
            instrument = piano;
            break;

        case "guitar":
            instrument = guitar;
            break;

        case "french_horn":
            instrument = frenchHorn;
            break;

        case "drums":
            instrument = drums;
            break;

        default:
            throw new Error("Unknown instrument: " + type);
    }

    notes.forEach(note => playNoteFromBars(note, data[note]));
}


export function cancelPreview() {
    toneObject.Transport.stop();
    toneObject.Transport.cancel(toneObject.now());
}