export function calculateDaysDiff(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
}

export function dateToString(date) {
    const current = new Date(date);
    const day = current.getDate();
    const month = current.getMonth() + 1;
    const year = current.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
}