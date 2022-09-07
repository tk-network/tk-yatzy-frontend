function output(field, roomData, user) {
    let dataset = roomData.room.rounds.find(round => {
        return round.user == user.id && round.fieldId == field.id && round.round == roomData.room.round
    });
    return dataset ? dataset.fieldValue : "";
}

function sumTop(roomData, user) {
    let fieldsToSum = ["einser", "zweier", "dreier", "vierer", "fünfer", "sechser"];

    return roomData.room.rounds.filter(round => {
        return round.user == user.id && fieldsToSum.includes(round.fieldId) && round.round == roomData.room.round
    })?.reduce((total, current) => total + current.fieldValue, 0) || "";
}

function sumBottom(roomData, user) {
    let fieldsToSum = ["einPaar", "zweiPaar", "dreierpasch", "viererpasch", "fullHouse", "kleineStraße", "großeStraße", "yatzy", "chance"];

    return roomData.room.rounds.filter(round => {
        return round.user == user.id && fieldsToSum.includes(round.fieldId) && round.round == roomData.room.round
    })?.reduce((total, current) => total + current.fieldValue, 0) || "";
}

function countNumbers(thrownNumbers) {
    let object = {};

    for (let number = 1; number <= 6; number++) {
        object[number] = thrownNumbers.filter(tNumber => tNumber == number).length;
    }

    return object;
}

export default {
    fields: [
        {
            id: "einser",
            label: "Einser",
            rule: (thrownNumbers) => {
                return thrownNumbers.filter(number => number == 1).length * 1;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "zweier",
            label: "Zweier",
            rule: (thrownNumbers) => {
                return thrownNumbers.filter(number => number == 2).length * 2;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "dreier",
            label: "Dreier",
            rule: (thrownNumbers) => {
                return thrownNumbers.filter(number => number == 3).length * 3;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "vierer",
            label: "Vierer",
            rule: (thrownNumbers) => {
                return thrownNumbers.filter(number => number == 4).length * 4;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "fünfer",
            label: "Fünfer",
            rule: (thrownNumbers) => {
                return thrownNumbers.filter(number => number == 5).length * 5;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "sechser",
            label: "Sechser",
            rule: (thrownNumbers) => {
                return thrownNumbers.filter(number => number == 6).length * 6;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "summe",
            label: "Summe",
            style: "font-weight: bold;",
            output: (field, roomData, user) => sumTop(roomData, user)
        },
        {
            id: "bonus",
            label: "Bonus",
            style: "font-weight: bold;",
            output: (field, roomData, user) => {
                return sumTop(roomData, user) >= 63 ? 50 : "";
            }
        },
        {
            id: "einPaar",
            label: "Ein Paar",
            rule: (thrownNumbers) => {
                return (new Set(thrownNumbers)).size !== thrownNumbers.length ? 10 : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "zweiPaar",
            label: "Zwei Paar",
            rule: (thrownNumbers) => {
                let count = countNumbers(thrownNumbers);
                return Object.values(count).filter(c => c >= 2).length >= 2 ? 20 : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "dreierpasch",
            label: "Dreierpasch",
            rule: (thrownNumbers) => {
                let count = Object.values(countNumbers(thrownNumbers));
                return count.some(c => c >= 3) ? thrownNumbers.reduce((total, current) => total + current, 0) : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "viererpasch",
            label: "Viererpasch",
            rule: (thrownNumbers) => {
                let count = Object.values(countNumbers(thrownNumbers));
                return count.some(c => c >= 4) ? thrownNumbers.reduce((total, current) => total + current, 0) : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "fullHouse",
            label: "Full House",
            rule: (thrownNumbers) => {
                let count = Object.values(countNumbers(thrownNumbers));
                return count.some(c => c == 3) && count.some(c => c == 2) ? 25 : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "kleineStraße",
            label: "Kleine Straße",
            rule: (thrownNumbers) => {
                return /1234|2345|3456/.test([...new Set(thrownNumbers)].sort().join("")) ? 30 : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "großeStraße",
            label: "Große Straße",
            rule: (thrownNumbers) => {
                return /12345|23456/.test([...new Set(thrownNumbers)].sort().join("")) ? 40 : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "yatzy",
            label: "Yatzy",
            rule: (thrownNumbers) => {
                let count = countNumbers(thrownNumbers);
                let yatzyKey = Object.keys(count).find(key => count[key] == 5);
                return yatzyKey ? 50 + (Number(yatzyKey) * 5) : 0;
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "chance",
            label: "Chance",
            rule: (thrownNumbers) => {
                return thrownNumbers.reduce((total, current) => total + current, 0);
            },
            output: (field, roomData, user) => output(field, roomData, user),
        },
        {
            id: "total",
            label: "Total",
            style: "font-weight: bold;",
            output: (field, roomData, user) => {
                let top = sumTop(roomData, user) || 0;
                let bonus = top >= 63 ? 50 : 0;
                let bottom = sumBottom(roomData, user) || 0;
                return top + bonus + bottom;
            }
        },
    ]
}