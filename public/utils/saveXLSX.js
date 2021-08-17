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
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const XLSX = __importStar(require("xlsx"));
function saveXLSX({ orderDataToSave, filePath }) {
    // console.log('orderDataToSave', orderDataToSave);
    try {
        const book = XLSX.utils.book_new();
        const cells = XLSX.utils.json_to_sheet(orderDataToSave);
        XLSX.utils.book_append_sheet(book, cells, 'Sheet1');
        XLSX.writeFile(book, filePath);
        return {
            status: 'OK',
            message: 'Заказ успешно сохранен',
        };
    }
    catch (error) {
        return {
            status: 'Error',
            message: 'Ошибка при сохранении файла',
        };
    }
}
module.exports = saveXLSX;
exports.default = saveXLSX;
//# sourceMappingURL=saveXLSX.js.map