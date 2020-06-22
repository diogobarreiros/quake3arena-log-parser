import { container } from 'tsyringe';

import IStorageLog from './models/IStorageLog';

import DiskStorageLog from './implementations/DiskStorageLog';

const logs = {
  disk: DiskStorageLog,
};

container.registerSingleton<IStorageLog>('StorageLog', logs.disk);
