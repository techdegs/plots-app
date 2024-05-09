function assignCoordinates(coordinates) {
    const result = [];
    for (const coord of coordinates) {
        const [lat, lng] = coord;
        result.push({ lat, lng });
    }
    return result;
}

const coordinates = [
    [7.02297, -1.20545],
    [7.01937, -1.20881],
    [7.01826, -1.2048],
    [7.02167, -1.20263],
];

const assignedCoordinates = assignCoordinates(coordinates);
console.log(assignedCoordinates);