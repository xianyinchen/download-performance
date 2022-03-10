
'use strict';

const os = require('os');
const Fs = require("fs");
const Path = require("path");

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

// 引入http模块
const http = require("http");

var remote_server = null;
function createServer(ip, port) {
    try {
        if (null != remote_server) {
            remote_server.close();
        }

        // 创建server，指定处理客户端请求的函数
        console.warn("IP: " + ip + ":" + port);
        remote_server = http.createServer(
            function (request, response) {
                //判断HTTP方法，只处理GET 
                if (request.method != "GET") {
                    response.writeHead(403);
                    response.end();
                    return null;
                }

                //此处也可使用URL模块来分析URL(https://nodejs.org/api/url.html)
                var sep = request.url.indexOf('?');
                var filePath = sep < 0 ? request.url : request.url.slice(0, sep);

                //当文件存在时发送数据给客户端，否则404
                var fileStat = Fs.stat(Path.join(__dirname, "../../../", "." + filePath),
                    function (err, stats) {
                        console.warn("GET file: " + Path.join(__dirname, "../../../", "." + filePath));

                        if (err) {
                            response.writeHead(404);
                            response.end();
                            return null;
                        }
                        //TODO:Content-Type应该根据文件类型设置
                        response.writeHead(200, { "Content-Type": "text/plain", "Content-Length": stats.size });

                        //使用Stream
                        var stream = Fs.createReadStream(Path.join(__dirname, "../../../", "." + filePath));

                        stream.on('data', function (chunk) {
                            response.write(chunk);
                        });

                        stream.on('end', function () {
                            response.end();
                        });

                        stream.on('error', function () {
                            response.end();
                        });
                    }
                );
            }
        ).listen(port);
    }
    catch (e) {
        console.warn(e);
    }
}

const copyDir = function (src, dst) {
    if (!Fs.existsSync(src)) return;
    var paths = Fs.readdirSync(src);

    if (!Fs.existsSync(dst)) Fs.mkdirSync(dst);
    paths.forEach(function (path) {
        const _src = src + '/' + path
        const _dst = dst + '/' + path
        let readable; let writable
        var st = Fs.statSync(_src);
        if (st.isFile()) {
            readable = Fs.createReadStream(_src)
            writable = Fs.createWriteStream(_dst)
            readable.pipe(writable)
        }
        else if (st.isDirectory()) {
            if (!Fs.existsSync(dst))
                Fs.mkdirSync(dst);
            copyDir(_src, _dst);
        }
    })
}

const rmdirSync = function (path) {
    if (Fs.existsSync(path)) {
        Fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "\\" + file;
            if (Fs.statSync(curPath).isDirectory()) {
                rmdirSync(curPath);
            } else {
                Fs.unlinkSync(curPath);
            }
        });
        //Fs.rmdirSync(path + '\\');
    }
};

exports.onAfterBuild = function (options, result) {
    try {
        var root = Path.join(Editor.Project.path, 'build/', options.outputName);

        copyDir(Path.join(root, '/remote'), Path.join(__dirname, '../../../remote'));
        rmdirSync(Path.join(root, '/remote'));

        // 配置远程资源地址

        var url = Path.join(root, "/src/settings.json");

        var srcStr = Fs.readFileSync(url, 'utf-8');
        Fs.writeFileSync(url, srcStr.replace("http://127.0.0.1/", `http://${getIPAdress()}:${5500}/`));

        // 启动不检测 http 合法性

        var url = Path.join(root, "/project.config.json");

        var srcStr = Fs.readFileSync(url, 'utf-8');
        Fs.writeFileSync(url, srcStr.replace(`"urlCheck":true`, `"urlCheck":false`));

        createServer(getIPAdress(), 5500);
    } catch (error) {
        console.warn(error)
    }
}
