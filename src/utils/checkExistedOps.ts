interface CheckOptsArgs {
  operationCell: string;
  validOps: string[];
}

interface CheckOpsOutput {
  status: string;
  value: boolean;
}

function checkExistedOps({
  operationCell,
  validOps,
}: CheckOptsArgs): CheckOpsOutput {
  try {
    const incomingArr: string[] = operationCell
      .split(',')
      .map((item) => item.toString());

    const validOpsArr: string[] = validOps.map((item) => item.toString());

    const filteredArr = incomingArr.reduce((filteredArray, operation) => {
      if (validOpsArr.includes(operation) && !filteredArray.includes(true)) {
        filteredArray.push(true);
      }

      if (filteredArray.length === 0) {
        filteredArray.push(false);
      }

      return filteredArray;
    }, [] as boolean[]);

    return {
      status: 'OK',
      value: filteredArr[0],
    };
  } catch (error) {
    return {
      status: 'Error',
      value: false,
    };
  }
}

export default checkExistedOps;
