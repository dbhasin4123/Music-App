import stringifyTime from "../helpers/stringifyTime.js";

/** Base URL for the API */
const apiUrl = "https://comp2140.uqcloud.net/api/";
/** Personal API key from Blackboard */ 
const apiKey = "aneesha";
//h
/** Allowed endpoints for the API read mode. */
const readEndpoints = ["location", "sample", "sampletolocation"];
/** Lower bound for the return limit for the API read mode. */
const readLimitLowerBound = 1;
/** Upper bound for the return limit for the API read mode. */
const readLimitUpperBound = 9999;
/** Allowed orders for the API read mode. */
const readOrders = ["asc", "desc"];

/** Allowed sample types for the API create mode. */
const sampleTypes = ["piano", "french_horn", "guitar", "drums"];

/** Allowed endpoints for the API delete mode. */
const deleteEndpoints = ["sample", "sampletolocation"];


function createUrl(params) {
    let url = `${apiUrl}?apiKey=${apiKey}`;
    for (let param in params) {
        url += `&${param}=${params[param]}`;
    }
    return url;
}


async function read(endpoint, limit = readLimitUpperBound, order = "asc") {
    if (!readEndpoints.includes(endpoint)) {
        throw new Error(`Invalid endpoint: ${endpoint}`);
    } else if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
    }

    const url = createUrl(
        {
            mode: "read",
            endpoint: endpoint,
            limit: limit,
            order: order
        }
    );
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export async function readLocations(limit = readLimitUpperBound, order = "asc") {
    if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
    }

    let data = await read("location", limit, order);
    if ("location" in data) {
        return data.location.map(location => {
            return {
                id: location.id,
                name: location.location
            };
        });
    }
    return [];
}


export async function readSamples(limit = readLimitUpperBound, order = "asc") {
    if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
      }

    try {
        let data = await read("sample", limit, order);

        if (data && Array.isArray(data.sample)) {
            return data.sample.map(sample => {
                let { time, date } = stringifyTime(sample.datetime);
                return {
                    id: sample.id,
                    name: sample.name,
                    type: sample.type,
                    data: JSON.parse(sample.recording_data),
                    time: time,
                    date: date,
                    previewing: false
                };
            });
        } else {
            console.error("Invalid API response format for 'sample' endpoint.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching data from the API:", error.message);
        return [];
    }
}


export async function readSamplesToLocations(limit = readLimitUpperBound, order = "asc") {
    if (limit < readLimitLowerBound || limit > readLimitUpperBound) {
        throw new Error(`Invalid limit: ${limit}`);
    } else if (!readOrders.includes(order)) {
        throw new Error(`Invalid order: ${order}`);
    }

    let data = await read("sampletolocation", limit, order);
    if ("sampletolocation" in data) {
        return data.sampletolocation.map(sampleToLocation => {
            return {
                id: sampleToLocation.id,
                location: sampleToLocation.locations_id,
                sample: sampleToLocation.samples_id
            };
        });
    }
    return [];
}


export async function createSample(sample, sampleType, sampleName) {
    if (!sampleTypes.includes(sampleType)) {
        throw new Error(`Invalid sample type: ${sampleType}`);
    } else if (sampleName === "") {
        throw new Error(`Sample name cannot be empty`);
    }

    const url = createUrl(
        {
            mode: "create",
            endpoint: "sample",
            sampleType: sampleType,
            sampleName: sampleName
        }
    );
    const response = await fetch(url, { method: "POST", body: JSON.stringify(sample) });
    const data = await response.json();
    return data;
}


export async function createSamplesToLocations(sampleId, locationId) {
    const url = createUrl(
        {
            mode: "create",
            endpoint: "sampletolocation",
            sampleID: sampleId,
            locationID: locationId
        }
    );
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export async function updateSample(sampleId, sample, sampleType, sampleName) {
    if (!sampleTypes.includes(sampleType)) {
        throw new Error(`Invalid sample type: ${sampleType}`);
    } else if (sampleName === "") {
        throw new Error(`Sample name cannot be empty`);
    }

    const url = createUrl(
        {
            mode: "update",
            endpoint: "sample",
            sampleType: sampleType,
            sampleName: sampleName,
            id: sampleId
        }
    );

    const response = await fetch(url, { method: "POST", body: JSON.stringify(sample) });
    const data = await response.json();
    return data;
}


async function del(endpoint, id) {
    if (!deleteEndpoints.includes(endpoint)) {
        throw new Error(`Invalid endpoint: ${endpoint}`);
    }

    const url = createUrl(
        {
            mode: "delete",
            endpoint: endpoint,
            id: id
        }
    )
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export async function deleteSample(id) {
    let samplesToLocations = await readSamplesToLocations();
    samplesToLocations.filter(samToLoc => samToLoc.sample === id)
        .forEach(async samToLoc => await deleteSamplesToLocations(samToLoc.id));
    let data = await del("sample", id);
    return data;
}


export async function deleteSamplesToLocations(id) {
    let data = await del("sampletolocation", id);
    return data;
}

