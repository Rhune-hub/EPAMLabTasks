const FIRST_DIMENSION = [ 1,2,3,4,5 ];

const SECOND_DIMENSION = [
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
];

const THIRD_DIMENSION = [[
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
],[
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
],[
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
],[
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
],[
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
],[
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
    [1,2,3,4,5],
]];

function init() {
    testFunction(FIRST_DIMENSION);
    testFunction(SECOND_DIMENSION);
    testFunction(THIRD_DIMENSION);   
}

function testFunction(arr) {
    const newArr = JSON.parse(JSON.stringify(arr));
    
    for (let i = 0; i < arr.length; i++) {
        task(arr, newArr, arr[i], i);
    }
    console.log("Input\n\r",arr);

    console.log("Output\n\r",newArr);
}

function task(arr,newArr, elem, ...r) {
    if (Array.isArray(elem)) {
        for (let i = 0; i < elem.length; i++) {
            task(arr, newArr, elem[i], ...r, i);
        }
    }
    else {
        let i;
        let newArrElement = newArr;
        const aprox = [];
        for (i = 0; i < r.length; i++) {
            let [one, two] = [arr, arr];
            for (let j = 0; j < r.length; j++)
                if (i !== j)
                    [one, two] = [ one ? one[r[j]] : 0, two ? two[r[j]] : 0];
                else
                    [one, two] = [  r[j] > 0 ? one[r[j]-1] : 0, 
                                    r[j] < two.length - 1 ? two[r[j]+1] : 0 ];
            aprox.push(one, two);

            if (i < r.length - 1)
                newArrElement = newArrElement[r[i]];
        }
        newArrElement[r[i-1]] = aprox.reduce( (a, b) => a + b );   
    }
}

init();