import { ipcMain } from 'electron';
import { spawn } from 'child_process';
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
                ytdlpPath = path.join(process.resourcesPath, `/app/yt-dlp/win/yt-dlp.exe`);
                break;

            case 'darwin':
                ytdlpPath = path.join(process.resourcesPath, `/app/yt-dlp/osx/yt-dlp`);
                break;
        }
        
        // Do work
        const ytdlp = spawn(ytdlpPath,
            ['--write-info', '--dump-json', '--skip-download', '--no-warnings', args.url], 
            { stdio: 'pipe' });

        // When worker has spawned
        ytdlp.on('spawn', () => {
            console.log(`yt-dlp (${ytdlp.pid}) spawned`);

            ytdlp.stdout?.on('data', (data: Buffer) => {
                // Report worker's result
                win?.webContents.send('get-media-info-response', data.toString());
            });

            ytdlp.stderr?.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });
        });

        ytdlp.on('exit', (code) => {
            console.log(`yt-dlp has exited (${code})`);
        });

        ytdlp.on('error', (error) => {
            console.log(`yt-dlp error: ${error}`);
        });
    }
}