"use strict";
// App Imports
// const { getArchiveList } = require('./old_archiveList');
// const { getArchiveList } = require('./archiveList');
// const { getXlsxList } = require('./xlsxList');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archiveList_1 = __importDefault(require("./archiveList"));
const xlsxList_1 = __importDefault(require("./xlsxList"));
function compareName(args) {
    try {
        const { options, shortName, fullName } = args; // filePath = array of archive paths, fullName='C:\\Users\\...', shortName=572
        const { archivePath, extension } = options;
        const archiveList = archiveList_1.default({ archivePath, extension }); // return Map of archive files list {key: name, value: {fileName: name of file, filePath: full path of file}}
        const xlsList = xlsxList_1.default({ options, fullName }); // return arr of xls data 'Num', 'Name', 'Definion', 'Count', 'Prev',  'Operations',  'Next'
        if (xlsList.status === 'Error') {
            return {
                status: 'Error',
                value: {
                    name: {
                        fullName: '',
                        shortName: '',
                    },
                    data: [],
                },
                errorMessage: xlsList.errorMessage,
            };
        }
        if (archiveList.status === 'Error') {
            return {
                status: 'Error',
                value: {
                    name: {
                        fullName: '',
                        shortName: '',
                    },
                    data: [],
                },
                errorMessage: archiveList.errorMessage,
            };
        }
        const { data, parsedColumn } = xlsList.value;
        let orderNum = 0;
        // const orderNum = 0;
        const compareList = data.map((part) => {
            const searchCriteria = part[parsedColumn];
            const archiveFile = archiveList.value.get(searchCriteria.toString());
            orderNum += 1;
            if (archiveFile !== undefined) {
                return {
                    ...part,
                    Num: orderNum,
                    data: 'Yes',
                    archiveFileName: archiveFile.fileName,
                    archiveFilePath: archiveFile.filePath,
                };
            }
            return {
                ...part,
                Num: orderNum,
                data: 'No',
                archiveFileName: '-',
                archiveFilePath: '-',
            };
        });
        const result = {
            name: {
                fullName,
                shortName,
            },
            data: compareList,
        };
        // console.log('result', result);
        return {
            status: 'OK',
            value: result, // {name: {fullName,shortName,},data: compareList,};
        };
    }
    catch (error) {
        return {
            status: 'Error',
            value: {
                name: {
                    fullName: '',
                    shortName: '',
                },
                data: [],
            },
            errorMessage: 'Ошибка',
        };
    }
}
// Output
// name: {
//   fullName: 'C:\\Users\\IVAN\\OneDrive\\Рабочий стол\\572.xlsm',
//   shortName: '572.xlsm'
// },
// data: [
// {
//   Num: 2,
//   Name: 'Кронштейн',
//   Definion: 'SIP.063.080',
//   Count: 109,
//   Prev: '-',
//   Operations: '25, 26, 170',
//   Next: '4.1',
//   data: 'Yes',
//   archiveFileName: 'SIP.063.080_S50.DXF',
//   archiveFilePath: '\\\\Fileserver\\архив\\Архив DXF\\SIP.063.080_S50.DXF'
// }
// ]
// const orderPath = 'C:\\Users\\gaenk\\Desktop\\337.xlsm';
// const filePath = 'C:\\Users\\gaenk\\Desktop\\arch';
// const fullName = 'C:\\Users\\IVAN\\OneDrive\\Рабочий стол\\572.xlsm';
// const shortName = '572.xlsm';
// const filePath = ['\\\\Fileserver\\архив\\Архив DXF'];
// compareName({ filePath, shortName, fullName });
module.exports = compareName;
exports.default = compareName;
//# sourceMappingURL=compareName.js.map