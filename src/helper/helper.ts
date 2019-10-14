export const pathToName = (path:string) => {
    let index = path.lastIndexOf('/'), fileName;

    if (index > -1) {
        fileName = path.substring(index + 1, path.length);
    }

    return fileName || path;
};