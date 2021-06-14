const { response } = require('express');
const express = require('express')
const ExpressError = require('./expressError');


const app = express();

app.listen(3000, function () {
    console.log('App on port 3000')
})

app.get('/', (req, res) => {
    res.send('<h1>This is the home page</h1>')
})

app.get('/mean', (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('url needs to look like "mean?nums=1,2,3,4"', 400)
    }

    const nums = req.query.nums
    let numsArr = nums.split(",")
    console.log(numsArr)
    let total = 0
    for (let i = 0; i < numsArr.length; i++) {

        total += Number(numsArr[i])
        console.log(total)
    }
    let mean = total / nums.length
    if (isNaN(mean)) {
        throw new ExpressError('must be a list of nums in query string', 400)
    }

    res.send(`<h1>${mean}</h1>`)
})

app.get('/median', (req, res) => {
    const nums = req.query.nums
    let numsArr = nums.split(",")
    let orderedNums = numsArr.sort()
    console.log(orderedNums)
    if (orderedNums.length % 2 != 0) {
        let middleIndex = orderedNums.length / 2 - 0.5
        let median = orderedNums[middleIndex]
        res.send(`<h1>${median}</h1>`)
    } else if (orderedNums.length % 2 == 0) {
        let middleIndex = orderedNums.length / 2
        let median = orderedNums[middleIndex] / 2 + orderedNums[middleIndex - 1] / 2
        res.send(`<h1>${median}</h1>`)
    }

})

app.get('/mode', (req, res) => {
    const nums = req.query.nums
    let numsArr = nums.split(",")
    let numDict = {}
    numsArr.forEach(function (i) {
        if (numDict[i] === undefined) {
            numDict[i] = 1

        } else {
            numDict[i] += 1

        }
    })
    let numDictKeys = Object.keys(numDict)
    let numDictVals = Object.values(numDict)
    let mode = 0
    console.log(numDict)
    console.log(numDictKeys)
    console.log(numDictVals)
    for (let i = 0; i < numDictVals.length; i++) {
        if (numDictVals[i] > mode) {
            mode = numDictKeys[i]
        }
    }


    res.send(`<h1>${mode}</h1>`)
})

