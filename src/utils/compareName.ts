// App Imports
import getArchiveList from './archiveList';
import getXlsxList, { Cells } from './xlsxList';

interface OrderHeaders {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  G: string;
}

interface CompareNameArgs {
  options: {
    archivePath: string[];
    extension: string[];
    validOps: string[];
    targetSheets: string[];
    checkedBy: keyof OrderHeaders;
    orderHeaders: OrderHeaders;
  };
  shortName: string;
  fullName: string;
}

interface CompareResult extends Cells {
  data: string;
  archiveFileName: string;
  archiveFilePath: string;
}

interface compareData {
  name: {
    fullName: string;
    shortName: string;
  };
  data: CompareResult[];
}

interface CompareNameOutput {
  status: string;
  value: compareData;
  errorMessage?: string;
}

function compareName(args: CompareNameArgs): CompareNameOutput {
  try {
    const { options, shortName, fullName } = args; // filePath = array of archive paths, fullName='C:\\Users\\...', shortName=572
    const { archivePath, extension } = options;
    const archiveList = getArchiveList({ archivePath, extension }); // return Map of archive files list {key: name, value: {fileName: name of file, filePath: full path of file}}
    const xlsList = getXlsxList({ options, fullName }); // return arr of xls data 'Num', 'Name', 'Definion', 'Count', 'Prev',  'Operations',  'Next'

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

    return {
      status: 'OK',
      value: result, // {name: {fullName,shortName,},data: compareList,};
    };
  } catch (error) {
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

module.exports = compareName;
export default compareName;
