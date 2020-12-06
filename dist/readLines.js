"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.default = async (filename, preserveBlankLines) => {
    const data = await fs_1.default.promises.readFile(filename);
    const lines = data.toString().split('\n').map((line) => line.trim());
    if (!preserveBlankLines) {
        return lines.filter((line) => line !== '');
    }
    else {
        return lines;
    }
};
