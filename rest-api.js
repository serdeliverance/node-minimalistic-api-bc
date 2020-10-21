const http = require('http')
const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')

const host = 'localhost'
const port = 8080

const fileDir = 'files'
const fileName = 'factorial.txt'

const calculateFactorialAndSave = (res) => {
    console.log('Executing a bash process which calculates the factorial of a random number')

    let n = Math.floor((Math.random() * 10) + 1)

    exec(`bash factorialCalculator.sh ${n}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running script: ${error}`)
            return
        }
        console.log(stdout)
    })

    res.writeHead(200)
    res.end()
}

const getFile = (res) => {
    console.log('Retrieving file...')

    let filePath = `${fileDir}/${fileName}`

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
        }

        res.writeHead(200)
        res.end(data)
    })
}

const cleanDirectory = (res) => {
    console.log('cleaning directory')

    fs.readdir(fileDir, (err, files) => {

        if (err) throw err

        files.forEach(file =>
            fs.unlink(path.join(fileDir, file), (err) => {
                if (err) throw err
            }))
    })

    res.writeHead(200)

    res.end()
}

const requestHandler = (req, res) => {
    switch (req.method) {
        case 'POST':
            calculateFactorialAndSave(res)
            break
        case 'GET':
            getFile(res)
            break
        case 'DELETE':
            cleanDirectory(res)
            break
    }
}

const server = http.createServer(requestHandler)

server.listen(port, host, () => console.log(`Server running on http://${host}:${port}`))