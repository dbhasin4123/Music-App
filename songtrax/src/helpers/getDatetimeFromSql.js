import stringifyTime from "./stringifyTime.js";

const NULL_LENGTH = 6;
const API_KEY_LENGTH = 12;
const TOTAL_OFFSET = NULL_LENGTH + API_KEY_LENGTH + 1;
const DATETIME_LENGTH = 19;

export default function getDatetimeFromSql(sql) {
    if (typeof sql !== 'string') {
        console.error('Invalid SQL input. Expected a string.');
        return { time: '', date: '' }; // Return an empty object or handle it differently
    }

    let index = sql.indexOf("NULL");

    if (index !== -1 && index + TOTAL_OFFSET + DATETIME_LENGTH <= sql.length) {
        let time = sql.substring(index + TOTAL_OFFSET, index + TOTAL_OFFSET + DATETIME_LENGTH);
        return stringifyTime(time);
    } else {
        console.error('"NULL" not found or datetime string is incomplete in SQL string.');
        return { time: '', date: '' }; // Return an empty object or handle it differently
    }
}
