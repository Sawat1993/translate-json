
const DNDKeys = ['url', 'key', 'id']; // Keys which doesn't need update

const xlsx = require('node-xlsx');
const fs = require('fs');
let xlsData;

const xlsMapper = (key) => {
    if (xlsData.get(key)) {
        return xlsData.get(key);
    } else {
        return key;
    }
}

const parseData = (data) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        return data;
    }
}

const iterate = (obj, callback) => {
    Object.keys(obj).forEach(key => {

        if (typeof obj[key] === 'object' && obj[key] !== null) {
            iterate(obj[key], callback)
        } else {
            if (!DNDKeys.includes(key)) {
                obj[key] = callback(obj[key])
            }
        }
    })
}

const translate = (inputJsonFile, inputXlsFile) => {
    const jsonData = parseData(fs.readFileSync(`./files/input-json/${inputJsonFile}`, 'utf8'));
    const xlsObj = xlsx.parse(__dirname + `/files/input-xls/${inputXlsFile}`);
    xlsData = new Map(xlsObj[0].data);


    iterate(jsonData, parseData.bind(this));
    iterate(jsonData, xlsMapper.bind(this));


    fs.writeFileSync(`./files/output/${inputJsonFile.split('.')[0]}-${inputXlsFile.split('.')[0]}.json`, JSON.stringify(jsonData))
}


// translate('orchestrations.json', 'French-FR_All.xls');
const inputJsonFiles = fs.readdirSync('./files/input-json/');
const inputXlsFiles = fs.readdirSync('./files/input-xls/');

for (const inputJsonFile of inputJsonFiles) {
    for (const inputXlsFile of inputXlsFiles) {
        if (inputXlsFile.includes('xls')) {
            translate(inputJsonFile, inputXlsFile);
        }
    }
}

