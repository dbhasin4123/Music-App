import * as Tone from "tone";

/** Tone module object. */
export const toneObject = Tone;

/** Tone.js piano sampler. */
export const piano = new toneObject.Sampler({
    urls: {
        B4: "B4.mp3",
        A4: "A4.mp3",
        G3: "G3.mp3",
        F3: "F3.mp3",
        E3: "E3.mp3",
        D3: "D3.mp3",
        C3: "C3.mp3"
    },
    release: 1,
    baseUrl: "samples/piano/"
}).toDestination();

/** Tone.js french horn sampler. */
export const frenchHorn = new toneObject.Sampler({
    // the only options for the french horn are:
    // a1, c2, ds2, g2, a3, d3, f3, c4, d5, f5
    // the best selection for a run of 7 notes is:
    //     c2, ds2, g2, a3, d3, f3, c4
    // since it has the least gap between notes
    urls: {
        B4: "C4.mp3",
        A4: "F3.mp3",
        G3: "D3.mp3",
        F3: "A3.mp3",
        E3: "G2.mp3",
        D3: "Ds2.mp3",
        C3: "C2.mp3"
    },
    release: 1,
    baseUrl: "samples/french-horn/"
}).toDestination();

/** Tone.js guitar sampler. */
export const guitar = new toneObject.Sampler({
    urls: {
        B4: "B4.mp3",
        A4: "A4.mp3",
        G3: "G3.mp3",
        F3: "F3.mp3",
        E3: "E3.mp3",
        D3: "D3.mp3",
        C3: "C3.mp3"
    },
    release: 1,
    baseUrl: "samples/guitar/"
}).toDestination();

/** Tone.js drums sampler. */
export const drums = new toneObject.Sampler({
    urls: {
        B4: "drums1.mp3",
        A4: "drums2.mp3",
        G3: "drums3.mp3",
        F3: "drums4.mp3",
        E3: "drums5.mp3",
        D3: "drums6.mp3",
        C3: "drums7.mp3"
    },
    release: 1,
    baseUrl: "samples/drums/"
}).toDestination();