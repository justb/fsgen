#!/usr/bin/env node

const program = require('commander')
const shell = require('shelljs')
const fs = require('fs')

program
    .version('2.0.1')
    .arguments('[dir]')
    .option('-yarn, --yarn', 'use yarn instead of npm')
    .option('-ts, --typescript', 'use typescript instead of javascript')
    .action(function(dir, cmd) {
        if (dir) {
            shell.cd(dir)
        }
        const isTs = cmd.typescript
        const isYarn = cmd.yarn
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
                        let pack = Object.assign(JSON.parse(package || '{}'), JSON.parse(husky))
                        if (!pack.scripts) {
                            pack.scripts = {}
                        }
                        pack.scripts['commit'] = 'git-cz'
                        fs.writeFile('package.json', JSON.stringify(pack), err => {
                            if (err) throw err
                            shell.exec('rm -rf husky.json')
                            // eslint-plugin-import eslint-plugin-flowtype eslint-plugin-jsx-a11y eslint-config-react-app eslint-plugin-react
                            let nodeModules =
                                ' lint-staged husky commitizen eslint babel-eslint prettier eslint-config-prettier eslint-plugin-prettier '
                            if (isTs) {
                                nodeModules += ' @typescript-eslint/eslint-plugin @typescript-eslint/parser'
                                shell.exec('mv ./ts/.[!.]* . && mv ./ts/* .')
                            }
                            shell.exec('rm -rf ts')
                            shell.exec((isYarn ? 'yarn add' : 'npm i') + nodeModules)
                            console.log('It is finished!')
                        })
                    }
                })
            }
        })
    })

program.parse(process.argv)