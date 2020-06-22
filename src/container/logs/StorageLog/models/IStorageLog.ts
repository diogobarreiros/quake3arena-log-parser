export default interface IStorageLog {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
