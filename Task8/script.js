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
    
    aproximateArray(arr, newArr, arr);
    console.group('Array aproximation...');
    console.log("Input:",arr);
    console.log("Output:",newArr);
    console.groupEnd();
}

function aproximateArray(arr,newArr, elem, ...indexes) {
    if (Array.isArray(elem)) {
        for (let i = 0; i < elem.length; i++) {
            aproximateArray(arr, newArr, elem[i], ...indexes, i);
        }
    }
    else {
        let selectedIndex;
        let newArrElement = newArr;
        let tempArr = arr;
        const aprox = [];
        for (selectedIndex = 0; selectedIndex < indexes.length; selectedIndex++) {
            let [firstNeighbor, secondNeighbor] = [tempArr, tempArr];
            for (let depthIndex = selectedIndex; depthIndex < indexes.length; depthIndex++)
                if (selectedIndex !== depthIndex)
                    [firstNeighbor, secondNeighbor] = [ firstNeighbor ? firstNeighbor[indexes[depthIndex]] : 0, 
                                                        secondNeighbor ? secondNeighbor[indexes[depthIndex]] : 0];
                else
                    [firstNeighbor, secondNeighbor] = [  indexes[depthIndex] > 0 ? firstNeighbor[indexes[depthIndex]-1] : 0, 
                                    indexes[depthIndex] < secondNeighbor.length - 1 ? secondNeighbor[indexes[depthIndex]+1] : 0 ];
            aprox.push(firstNeighbor, secondNeighbor);

            if (selectedIndex < indexes.length - 1) {
                newArrElement = newArrElement[indexes[selectedIndex]];
                tempArr = tempArr[indexes[selectedIndex]];
            }
        }
        newArrElement[indexes[selectedIndex-1]] = aprox.reduce( (acc, elem) => acc + elem );   
    }
}

init();