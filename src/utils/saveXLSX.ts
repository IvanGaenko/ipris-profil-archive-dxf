// Imports
import * as XLSX from 'xlsx';

interface OrderPart {
  Num: number;
  Name: string;
  Definion: string;
  Count: number;
  Prev: string;
  Operations: string;
  Next: string;
  data: string;
  archiveFileName: string;
  archiveFilePath: string;
}

interface saveXLSXArgs {
  orderDataToSave: OrderPart[];
  filePath: string;
}

interface saveXLSXOutput {
  status: string;
  message: string;
}

function saveXLSX({ orderDataToSave, filePath }: saveXLSXArgs): saveXLSXOutput {
  try {
    const book = XLSX.utils.book_new();
    const cells = XLSX.utils.json_to_sheet(orderDataToSave);
    XLSX.utils.book_append_sheet(book, cells, 'Sheet1');

    XLSX.writeFile(book, filePath);

    return {
      status: 'OK',
      message: 'Заказ успешно сохранен',
    };
  } catch (error) {
    return {
      status: 'Error',
      message: 'Ошибка при сохранении файла',
    };
  }
}

module.exports = saveXLSX;
export default saveXLSX;
