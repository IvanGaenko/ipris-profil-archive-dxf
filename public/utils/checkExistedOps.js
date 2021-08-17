"use strict";
// const arr = '40, 300,  170';
// const validOps = [25, 40];
Object.defineProperty(exports, "__esModule", { value: true });
function checkExistedOps({ operationCell, validOps, }) {
    try {
        const incomingArr = operationCell
            .split(',')
            .map((item) => item.toString());
        const validOpsArr = validOps.map((item) => item.toString());
        const filteredArr = incomingArr.reduce((filteredArray, operation) => {
            if (validOpsArr.includes(operation) && !filteredArray.includes(true)) {
                filteredArray.push(true);
            }
            if (filteredArray.length === 0) {
                filteredArray.push(false);
            }
            return filteredArray;
        }, []);
        // return filteredArr[0];
        return {
            status: 'OK',
            value: filteredArr[0],
        };
    }
    catch (error) {
        // console.log('error', error);
        return {
            status: 'Error',
            value: false,
        };
    }
}
// checkExistedOps(arr, validOps);
// module.exports.checkExistedOps = checkExistedOps;
exports.default = checkExistedOps;
//# sourceMappingURL=checkExistedOps.js.map