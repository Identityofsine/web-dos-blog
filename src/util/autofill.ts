import { DirectoryTree, FileSystem } from "../obj/directorytree/Directory";

/**
 * 
 * @param {string} progress the string before progress
 * @param {React.Dispatch<React.SetStateAction<string>>} setString setState function. 
 * @param {DirectoryTree | undefined } folder folder structure.
 * @returns 
 */
export function autoFill(progress : string, setString : React.Dispatch<React.SetStateAction<string>>, folder : DirectoryTree | undefined) {
    if(folder === undefined) return;

    let splitWord = progress.split(/\s+/);
    const _word = splitWord[splitWord.length - 1];
    const _closest = folder.closestItem(_word);
    if(_closest.trim() === "") return;
    splitWord.pop();
    splitWord.push(_closest);
    console.log(splitWord);
    setString(splitWord.join(' '));

    return;
}