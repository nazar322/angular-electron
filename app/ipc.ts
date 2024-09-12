import { app, ipcMain } from 'electron';
import { spawnSync } from 'child_process';
import { win } from './main';
import * as path from 'path';

export class Ipc {
    static init(): void {
        // Subscribe for media info request
        ipcMain.on('get-media-info', this.onGetMediaInfo);
    }

    private static onGetMediaInfo(event: Electron.IpcMainEvent, args: any): void {
        let ytdlpPath: string = '';

        switch (process.platform) {
            case 'win32':
                ytdlpPath = app.isPackaged 
                                ? path.join(process.resourcesPath, '/app/yt-dlp/win/yt-dlp.exe')
                                : path.join(__dirname, '/yt-dlp/win/yt-dlp.exe');
                break;

            case 'darwin':
                ytdlpPath = app.isPackaged
                                ? path.join(process.resourcesPath, '/app/yt-dlp/osx/yt-dlp')
                                : path.join(__dirname, '/yt-dlp/osx/yt-dlp');
                break;
        }
        
        // Do work
        const ytdlp = spawnSync(ytdlpPath,
            ['--write-info', '--dump-json', '--skip-download', '--no-warnings', args.url], 
            { stdio: 'pipe' });

        if (ytdlp.error) {
            console.log(`yt-dlp error: ${ytdlp.error}`);
        }
        else if (ytdlp.stderr && ytdlp.stderr.length > 0) {
            console.log(`stderr: ${ytdlp.stderr.toString()}`);
        }
        else if (ytdlp.status === 0) {
            win?.webContents.send('get-media-info-response', ytdlp.stdout.toString());
        }
    }
}