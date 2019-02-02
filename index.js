const program = require('commander');
var shell = require("shelljs");
var fs = require("fs");

// program
//     .command('create <type> [name] [otherParams...]')
//     .alias('c')
//     .description('Generates new code')
//     .action(function (type, name, otherParams) {
//         console.log('type', type);
//         console.log('name', name);
//         console.log('other', otherParams);
//         // 在这里执行具体的操作
//     });

// program.parse(process.argv);

program
    .command('create <dir>')
    .option('-r, --recursive', 'Remove recursively')
    .action(function (dir, cmd) {
        shell.exec("create-react-app " + dir);
        shell.cd(dir)
        shell.exec('git clone git@github.com:justb/specification-front.git')
        shell.exec('rm -rf ./specification-front/.git')
        shell.exec('mv ./specification-front/.[!.]* . && mv ./specification-front/* .')
        shell.exec('rm -rf ./specification-front')
        fs.readFile('package.json', 'utf8', (err, package) => {
            if (err) {

            } else {
                fs.readFile('husky.json', 'utf8', (err, husky) => {
                    if (err) {

                    } else {
                        fs.writeFile('package.json', JSON.stringify(Object.assign(JSON.parse(package),JSON.parse(husky))), (err) => {
                            if (err) throw err;
                            shell.exec('rm -rf husky.json')
                            console.log('It is finished!');
                        });
                    }
                })
                
            }
        })
        // console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
    })

program.parse(process.argv)