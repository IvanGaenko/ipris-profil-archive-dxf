// Imports
import * as fs from 'fs';
import * as path from 'path';

interface ArchiveListArgs {
  archivePath: string[];
  extension: string[];
}

interface MapValue {
  fileName: string;
  filePath: string;
}

interface ArchiveListOutput {
  status: string;
  value: Map<string, MapValue>;
  errorMessage?: string;
}

function getArchiveList(args: ArchiveListArgs): ArchiveListOutput {
  const { archivePath, extension } = args;

  if (archivePath.length === 0 || extension.length === 0) {
    return {
      status: 'Error',
      value: new Map<string, MapValue>(),
      errorMessage: 'Ошибка в настройках выбора архива',
    };
  }

  const parsedExtensions = extension.map((ex) =>
    ex.includes('.') ? ex : `.${ex}`,
  );

  const arrOfArchiveFiles = [];

  try {
    for (const dir of archivePath) {
      let files: string[] = [];

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
    const getParsedName = (name: string) => {
      if (name === undefined) return '';
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

    let archiveList = new Map<string, MapValue>();

    if (arrOfArchiveFiles.length !== 0) {
      // reduce arr of archive files
      archiveList = arrOfArchiveFiles.reduce((filteredArray, file) => {
        const { name, ext } = path.parse(file.file);

        if (
          parsedExtensions.includes(ext.toLowerCase()) ||
          parsedExtensions.includes(ext.toUpperCase())
        ) {
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
      }, new Map<string, MapValue>());
    }

    if (archiveList.size === 0) {
      return {
        status: 'Error',
        value: new Map<string, MapValue>(),
        errorMessage: 'Ошибка в списке архива',
      };
    }

    return {
      status: 'OK',
      value: archiveList,
    };
  } catch (error) {
    return {
      status: 'Error',
      value: new Map<string, MapValue>(),
      errorMessage: 'Ошибка в списке архива',
    };
  }
}

export default getArchiveList;
