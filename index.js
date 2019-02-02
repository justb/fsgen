#!/usr/bin/env node

const program = require('commander');
const shell = require("shelljs");
const fs = require("fs");

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
    .arguments('[dir]')
    .option('-r, --recursive', 'Remove recursively')
    .action(function (dir, cmd) {
        if(dir){
            shell.cd(dir)
        }
        fs.readFile('package.json', 'utf8', (err, package) => {
            if (err) {
                throw err
            } else {
                shell.exec('git clone git@github.com:justb/specification-front.git')
                shell.exec('rm -rf ./specification-front/.git')
                shell.exec('mv ./specification-front/.[!.]* . && mv ./specification-front/* .')
                shell.exec('rm -rf ./specification-front')
                fs.readFile('husky.json', 'utf8', (err, husky) => {
                    if (err) {
                        throw err
                    } else {
                        let pack = Object.assign(JSON.parse(package||'{}'),JSON.parse(husky))
                        if(!pack.scripts){
                            pack.scripts={}
                        }
                        pack.scripts["commit"]='git-cz'
                        fs.writeFile('package.json', JSON.stringify(pack), (err) => {
                            if (err) throw err;
                            shell.exec('rm -rf husky.json')
                            shell.exec('yarn add lint-staged husky eslint babel-eslint eslint-plugin-import eslint-plugin-flowtype eslint-plugin-jsx-a11y eslint-config-react-app eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier commitizen stylus-supremacy')
                            console.log('It is finished!');
                        });
                    }
                })
            }
        })
        // console.log('remove ' + dir + (cmd.recursive ? ' recursively' : ''))
    })

program.parse(process.argv)