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
                ytdlpPath = electron_1.app.isPackaged
                    ? path.join(process.resourcesPath, '/app/yt-dlp/win/yt-dlp.exe')
                    : path.join(__dirname, '/yt-dlp/win/yt-dlp.exe');
                break;
            case 'darwin':
                ytdlpPath = electron_1.app.isPackaged
                    ? path.join(process.resourcesPath, '/app/yt-dlp/osx/yt-dlp')
                    : path.join(__dirname, '/yt-dlp/osx/yt-dlp');
                break;
        }
        // Do work
        const ytdlp = (0, child_process_1.spawnSync)(ytdlpPath, ['--write-info', '--dump-json', '--skip-download', '--no-warnings', args.url], { stdio: 'pipe' });
        if (ytdlp.error) {
            console.log(`yt-dlp error: ${ytdlp.error}`);
        }
        else if (ytdlp.stderr && ytdlp.stderr.length > 0) {
            console.log(`stderr: ${ytdlp.stderr.toString()}`);
        }
        else if (ytdlp.status === 0) {
            main_1.win === null || main_1.win === void 0 ? void 0 : main_1.win.webContents.send('get-media-info-response', ytdlp.stdout.toString());
        }
    }
}
exports.Ipc = Ipc;
//# sourceMappingURL=ipc.js.map