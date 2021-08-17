"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const XLSX = __importStar(require("xlsx"));
// App Imports
const checkExistedOps_1 = __importDefault(require("./checkExistedOps"));
const firstRow = 'A1';
const technologyName = 'Технология';
const extractLastRow = (str) => {
    if (str === undefined) {
        return firstRow;
    }
    return str.split(':')[1];
};
const cleanRal = (name) => {
    if (name === undefined)
        return '';
    const splitedName = name.trim().split('.');
    const lastValueOfArr = splitedName[splitedName.length - 1];
    if (lastValueOfArr.length > 3 && parseInt(lastValueOfArr, 10) > 999) {
        return splitedName.slice(0, -1).join('.');
    }
    return splitedName.join('.');
};
function getXlsxList({ options, fullName, }) {
    // console.log('options', options);
    const { validOps, targetSheets, checkedBy, orderHeaders } = options;
    if (validOps.length === 0 || targetSheets.length === 0) {
        return {
            status: 'Error',
            value: {
                data: [],
                parsedColumn: 'Definion',
            },
            errorMessage: 'Ошибка в настройках выбора XLS файла',
        };
    }
    if (orderHeaders[checkedBy] === undefined) {
        return {
            status: 'Error',
            value: {
                data: [],
                parsedColumn: 'Definion',
            },
            errorMessage: 'Ошибка в колонке для поиска',
        };
    }
    try {
        const workbook = XLSX.readFile(fullName);
        const sheetsArr = [];
        for (const sheetName of targetSheets) {
            const worksheet = workbook.Sheets[sheetName];
            if (worksheet !== undefined) {
                const worksheetRef = worksheet['!ref'];
                const lastRow = extractLastRow(worksheetRef);
                const cells = XLSX.utils.sheet_to_json(worksheet, {
                    raw: true,
                    header: [
                        orderHeaders.A,
                        orderHeaders.B,
                        orderHeaders.C,
                        orderHeaders.D,
                        orderHeaders.E,
                        orderHeaders.F,
                        orderHeaders.G, // 'Next',
                    ],
                    range: `${firstRow}:${lastRow}`,
                });
                // console.log('cells', cells);
                sheetsArr.push(...cells);
            }
        }
        const newArr = [];
        if (sheetsArr.length === 0) {
            return {
                status: 'Error',
                value: {
                    data: [],
                    parsedColumn: 'Definion',
                },
                errorMessage: 'Ошибка при переборе XLS файла',
            };
        }
        for (const cell of sheetsArr) {
            // check on Operations
            if (cell.Operations !== undefined &&
                cell.Operations.trim() !== technologyName) {
                const checkedOps = checkExistedOps_1.default({
                    operationCell: cell.Operations,
                    validOps,
                });
                if (checkedOps.status === 'OK' && checkedOps.value) {
                    newArr.push({
                        ...cell,
                        Name: cell.Name.trim(),
                        Definion: cleanRal(cell.Definion),
                    });
                }
            }
        }
        if (newArr.length === 0) {
            return {
                status: 'Error',
                value: {
                    data: [],
                    parsedColumn: 'Definion',
                },
                errorMessage: 'Список XLS файла пустой либо нет совпадений технологии',
            };
        }
        const result = {
            data: newArr,
            parsedColumn: orderHeaders[checkedBy],
        };
        // console.log('result', result);
        return {
            status: 'OK',
            value: result,
        };
    }
    catch (error) {
        // console.log(error);
        return {
            status: 'Error',
            value: {
                data: [],
                parsedColumn: 'Definion',
            },
            errorMessage: 'Ошибка в XLS файле',
        };
    }
}
// getXlsxList(x);
// module.exports.getXlsxList = getXlsxList;
exports.default = getXlsxList;
// const worksheet = workbook.Sheets[targetSheet];
// const lastRow = extractLastRow(worksheet['!ref']);
// const cells = XLSX.utils.sheet_to_json(worksheet, {
//   raw: true,
//   cellStyles: true,
//   header: [
//     'Num',
//     'Name',
//     'Definion',
//     'Count',
//     'Prev',
//     'Operations',
//     'Next',
//   ],
//   range: `${firstRow}:${lastRow}`,
// });
// console.log('cells', cells);
//# sourceMappingURL=xlsxList.js.map