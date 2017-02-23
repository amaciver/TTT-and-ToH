const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan(el1, el2, cb) {
  reader.question(`Is ${el1} greater than ${el2}?`, (answer) => {
    cb(answer === 'yes');
  });

}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan) => {
      if (isGreaterThan) {
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2,5,6,7,3,5, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});

// const dummy = (string) => console.log(string);

// innerBubbleSortLoop([1,3,2,4,5], 0, false, dummy);
