const fs = require('fs');

function readSyncByfs(tips) {
    tips = tips || '> ';
    process.stdout.write(tips);
    process.stdin.pause();

    const buf = Buffer.allocUnsafe(10000);
    fs.readSync(process.stdin.fd, buf, 0, 10000, 0);
    process.stdin.end();

    return buf.toString('utf8', 0, response).trim();
}