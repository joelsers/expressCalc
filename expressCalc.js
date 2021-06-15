const { response } = require('express');
const express = require('express')
const ExpressError = require('./expressError');


const app = express();

function findMean(nums) {

    let numsArr = nums.split(",")

    let total = 0
    for (let i = 0; i < numsArr.length; i++) {

        total += Number(numsArr[i])

    }

    let mean = total / numsArr.length
    if (isNaN(mean)) {
        throw new ExpressError('must be a list of nums in query string', 400)
    }
    return mean
}

function findMedian(nums) {
    let numsArr = nums.split(",")
    let orderedNums = numsArr.sort()
    console.log(orderedNums)
    if (orderedNums.length % 2 != 0) {
        let middleIndex = orderedNums.length / 2 - 0.5
        let median = orderedNums[middleIndex]
        return median
    } else if (orderedNums.length % 2 == 0) {
        let middleIndex = orderedNums.length / 2
        let median = orderedNums[middleIndex] / 2 + orderedNums[middleIndex - 1] / 2
        return median
    }
}

function findMode(nums) {
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
    for (let i = 0; i < numDictVals.length; i++) {
        if (numDictVals[i] > mode) {
            mode = numDictKeys[i]
        }
    }
    return mode
}

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
    let mean = findMean(req.query.nums)

    if (isNaN(mean)) {
        throw new ExpressError('must be a list of nums in query string', 400)
    }

    res.json(`response:{operation: mean, value: ${mean}}`)
})

app.get('/median', (req, res) => {


    let median = findMedian(req.query.nums)

    res.json(`response:{operation: median, value: ${median}}`)
})

app.get('/mode', (req, res) => {
    if (!req.query.nums) {
        throw new ExpressError('url needs to look like "mode?nums=1,2,3,4"', 400)
    }
    let mode = findMode(req.query.nums)
    if (isNaN(mode)) {
        throw new ExpressError('must be a list of nums in query string', 400)
    }


    res.json(`response:{operation: mode, value: ${mode}}`)
})

module.exports = { findMean, findMedian, findMode }