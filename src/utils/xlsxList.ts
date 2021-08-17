// Imports
import * as XLSX from 'xlsx';

// App Imports
import checkExistedOps from './checkExistedOps';

const firstRow = 'A1';
const technologyName = 'Технология';

interface OrderHeaders {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  G: string;
}

export interface Cells {
  Num: number;
  Name: string;
  Definion: string;
  Count: number;
  Prev: string;
  Operations: string;
  Next: string;
}

interface GetXlsxListArgs {
  options: {
    validOps: string[];
    targetSheets: string[];
    checkedBy: keyof OrderHeaders;
    orderHeaders: OrderHeaders;
  };
  fullName: string;
}

interface GetXlsxListOutput {
  status: string;
  value: { data: Cells[]; parsedColumn: keyof Cells };
  errorMessage?: string;
}

const extractLastRow = (str: string | undefined) => {
  if (str === undefined) {
    return firstRow;
  }

  return str.split(':')[1];
};

const cleanRal = (name: string) => {
  if (name === undefined) return '';
  const splitedName = name.trim().split('.');
  const lastValueOfArr = splitedName[splitedName.length - 1];

  if (lastValueOfArr.length > 3 && parseInt(lastValueOfArr, 10) > 999) {
    return splitedName.slice(0, -1).join('.');
  }

  return splitedName.join('.');
};

function getXlsxList({
  options,
  fullName,
}: GetXlsxListArgs): GetXlsxListOutput {
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
    const sheetsArr: Cells[] = [];

    for (const sheetName of targetSheets) {
      const worksheet = workbook.Sheets[sheetName];

      if (worksheet !== undefined) {
        const worksheetRef: string | undefined = worksheet['!ref'];
        const lastRow = extractLastRow(worksheetRef);

        const cells: Cells[] = XLSX.utils.sheet_to_json(worksheet, {
          raw: true,
          header: [
            orderHeaders.A, // 'Num',
            orderHeaders.B, // 'Name',
            orderHeaders.C, // 'Definion',
            orderHeaders.D, // 'Count',
            orderHeaders.E, // 'Prev',
            orderHeaders.F, // 'Operations',
            orderHeaders.G, // 'Next',
          ],
          range: `${firstRow}:${lastRow}`,
        });
        sheetsArr.push(...cells);
      }
    }

    const newArr: Cells[] = [];

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
      if (
        cell.Operations !== undefined &&
        cell.Operations.trim() !== technologyName
      ) {
        const checkedOps = checkExistedOps({
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
      parsedColumn: orderHeaders[checkedBy] as keyof Cells,
    };

    return {
      status: 'OK',
      value: result,
    };
  } catch (error) {
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

export default getXlsxList;
