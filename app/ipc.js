"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ipc = void 0;
const electron_1 = require("electron");
const child_process_1 = require("child_process");
class Ipc {
    static init() {
        electron_1.ipcMain.handle('get-media-info', (event, args) => __awaiter(this, void 0, void 0, function* () {
            console.log(args.url);
            const ytdlp = (0, child_process_1.spawn)('C:\\Users\\Acer\\Downloads\\yt-dlp_win\\yt-dlp.exe', ['--write-info', '--dump-json', '--skip-download', args.url], { stdio: 'pipe' });
            ytdlp.on('spawn', () => {
                var _a, _b;
                console.log(`yt-dlp (${ytdlp.pid}) spawned`);
                (_a = ytdlp.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
                    console.log(`stdout ${data}`);
                });
                (_b = ytdlp.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
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
        }));
    }
}
exports.Ipc = Ipc;
//# sourceMappingURL=ipc.js.map