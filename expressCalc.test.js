let { findMean, findMedian, findMode } = require('./expressCalc')

test('findMean should find mean of a list of nums', function () {
    const res = findMean('1,2,3')
    expect(res).toEqual(2)
})

test('findMedian should find median of a list of nums', function () {
    const res = findMedian('1,2,3')
    expect(res).toEqual('2')
})

test('findMode should find mode of a list of nums', function () {
    const res = findMode('1,1,1,2,3')
    expect(res).toEqual('1')
})