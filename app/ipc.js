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
class Ipc {
    static init() {
        electron_1.ipcMain.handle('get-media-info', (event, args) => __awaiter(this, void 0, void 0, function* () {
            console.log(args.url);
            return 'Ok';
        }));
    }
}
exports.Ipc = Ipc;
//# sourceMappingURL=ipc.js.map