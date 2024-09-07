import { ipcMain } from 'electron';

export class Ipc {
    static init(): void {
        ipcMain.handle('get-media-info', async (event, args) => {
            console.log(args.url);
            return 'Ok';
        });
    }
}