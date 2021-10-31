/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

//Helper Functions:

// array [1, 35, 321, 2, 434, 1391, 5, 125]

function getDigit(number, place, longestNumber) {
  // getDigit(1391, 3, 4)
  // returns 1
  const numToString = number.toString();
  const numLength = numToString.length;

  const placeInString = longestNumber - numLength;
  return numToString[place - placeInString] || 0;
}

function getLongestNumber(arr) {
  // returns 4
  let longest = 0;
  for (let i = 0; i < arr.length; i++) {
    let currentLength = arr[i].toString().length;
    if (currentLength > longest) longest = currentLength;
  }
  return longest;
}

function radixSort(array) {
  // find longest number
  let longestNum = getLongestNumber(array);
  // create the buckets needed (array of 10 arrays)
  let buckets = Array.from({ length: 10 }, () => []);
  // for loop for the number of iterations needed
  for (let i = longestNum - 1; i >= 0; i--) {
    // while loop
    // enqueue numbers into their buckets
    while (array.length) {
      let current = array.shift();
      buckets[getDigit(current, i, longestNum)].push(current);
    }
    // for loop for each bucket
    //dequeue all items in each bucket
    for (let j = 0; j < buckets.length; j++) {
      while (buckets[j].length) {
        array.push(buckets[j].shift());
      }
    }
  }
  return array;
}

// unit tests
// do not modify the below code
describe.skip("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
