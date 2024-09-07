import { ipcMain, utilityProcess } from 'electron';
import { spawn } from 'child_process';

export class Ipc {
    static init(): void {
        ipcMain.handle('get-media-info', async (event, args) => {
            console.log(args.url);

            const ytdlp = spawn('C:\\Users\\Acer\\Downloads\\yt-dlp_win\\yt-dlp.exe', 
                ['--write-info', '--dump-json', '--skip-download', args.url], {stdio: 'pipe'});

            ytdlp.on('spawn', () => {
                console.log(`yt-dlp (${ytdlp.pid}) spawned`);

                ytdlp.stdout?.on('data', (data) => {
                    console.log(`stdout ${data}`);
                });

                ytdlp.stderr?.on('data', (data) => {
                    console.log(`stderr ${data}`);
                });
            });

            ytdlp.on('exit', (code) => {
                console.log(`yt-dlp has exited (${code})`);
            });

            ytdlp.on('error', (error) => {
                console.log(`yt-dlp error: ${error}`);
            });

            return 'Ok';
        });
    }
}