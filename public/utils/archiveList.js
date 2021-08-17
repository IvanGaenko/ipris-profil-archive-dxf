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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function getArchiveList(args) {
    const { archivePath, extension } = args;
    if (archivePath.length === 0 || extension.length === 0) {
        return {
            status: 'Error',
            value: new Map(),
            errorMessage: 'Ошибка в настройках выбора архива',
        };
    }
    const parsedExtensions = extension.map((ex) => ex.includes('.') ? ex : `.${ex}`);
    const arrOfArchiveFiles = [];
    try {
        for (const dir of archivePath) {
            let files = [];
            if (fs.existsSync(dir)) {
                files = fs.readdirSync(dir);
            }
            if (files && files.length !== 0) {
                const filesWithPaths = files.map((file) => {
                    return {
                        file,
                        dir,
                    };
                });
                arrOfArchiveFiles.push(...filesWithPaths);
            }
        }
        // parsing a file name
        const getParsedName = (name) => {
            if (name === undefined)
                return '';
            const getName = name
                .replace(/\s/g, '')
                .split('_')
                .slice(0, -1)
                .join('_')
                .replace(/(\().+?(\))/gi, '');
            if (getName !== undefined && getName.length !== 0) {
                return getName;
            }
            return name;
        };
        let archiveList = new Map();
        if (arrOfArchiveFiles.length !== 0) {
            // reduce arr of archive files
            archiveList = arrOfArchiveFiles.reduce((filteredArray, file) => {
                const { name, ext } = path.parse(file.file);
                if (parsedExtensions.includes(ext.toLowerCase()) ||
                    parsedExtensions.includes(ext.toUpperCase())) {
                    if (!filteredArray.has(name)) {
                        const parsedKey = getParsedName(name);
                        const parsedValue = {
                            fileName: file.file,
                            filePath: path.join(file.dir, file.file),
                        };
                        filteredArray.set(parsedKey, parsedValue);
                    }
                }
                return filteredArray;
            }, new Map());
        }
        if (archiveList.size === 0) {
            return {
                status: 'Error',
                value: new Map(),
                errorMessage: 'Ошибка в списке архива',
            };
        }
        // console.log('archiveList', archiveList);
        return {
            status: 'OK',
            value: archiveList,
        };
    }
    catch (error) {
        // console.log('error', error);
        return {
            status: 'Error',
            value: new Map(),
            errorMessage: 'Ошибка в списке архива',
        };
    }
}
// getArchiveList(archivePath);
// module.exports.getArchiveList = getArchiveList;
exports.default = getArchiveList;
//# sourceMappingURL=archiveList.js.map