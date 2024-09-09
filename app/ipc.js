"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ipc = void 0;
const electron_1 = require("electron");
const child_process_1 = require("child_process");
const main_1 = require("./main");
const path = require("path");
class Ipc {
    static init() {
        // Subscribe for media info request
        electron_1.ipcMain.on('get-media-info', this.onGetMediaInfo);
    }
    static onGetMediaInfo(event, args) {
        let ytdlpPath = '';
        switch (process.platform) {
            case 'win32':
                ytdlpPath = path.join(process.resourcesPath, `/app/yt-dlp/win/yt-dlp.exe`);
                break;
            case 'darwin':
                ytdlpPath = path.join(process.resourcesPath, `/app/yt-dlp/osx/yt-dlp`);
                break;
        }
        // Do work
        const ytdlp = (0, child_process_1.spawn)(ytdlpPath, ['--write-info', '--dump-json', '--skip-download', '--no-warnings', args.url], { stdio: 'pipe' });
        // When worker has spawned
        ytdlp.on('spawn', () => {
            var _a, _b;
            console.log(`yt-dlp (${ytdlp.pid}) spawned`);
            (_a = ytdlp.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
                // Report worker's result
                main_1.win === null || main_1.win === void 0 ? void 0 : main_1.win.webContents.send('get-media-info-response', data.toString());
            });
            (_b = ytdlp.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
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
exports.Ipc = Ipc;
//# sourceMappingURL=ipc.js.map