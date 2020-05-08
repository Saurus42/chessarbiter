"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const child_process_1 = require("child_process");
var stockfish;
worker_threads_1.parentPort?.on('message', (value) => {
    if (value === 'start') {
        stockfish = child_process_1.spawn('./bin/stockfish');
        stockfish.stdin.write('uci\n');
        stockfish.stdin.write('setoption name Threads value 1\n');
        stockfish.stdin.write('ucinewgame\n');
        stockfish.stdin.write('position startpos\n');
        stockfish.stdin.write('go nodes 1000\n');
        stockfish.stdout.on('data', (data) => {
            let output = data.toString();
            if (output.includes('bestmove')) {
                let str = output.slice(output.search('bestmove'));
                worker_threads_1.parentPort?.postMessage(str);
            }
        });
    }
    else if (value.includes('move')) {
    }
});
worker_threads_1.parentPort?.on('close', () => {
    stockfish.kill();
});
//# sourceMappingURL=index.js.map