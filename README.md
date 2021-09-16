# EPAMLabTasks
Repository for EPAM Laboratory Tasks
# EPAMLabTask 1

1) Implement app that contains at least one dependency and one dev dependency​

2) Push code to repo “Module” (any name)

# EPAMLabTask 2

1) Create repo “conversion magic”​

2) Add file index.html containing script with type coercion operations​

# EPAMLabTask 3

1) Create repo “add”​

2) Implement function that can “add” objects​
example: 
```javascript
a = {x: 1} b = {x: 2, y: 2} ​
add(a, b) returns {x: 3, y: 2}​
add(a, b, a) returns {x: 4, y: 2}
```
3) Create additional function that can intersect object​

# EPAMLabTask 4

```javascript
function randn_bm() {  
    let u = 0, v = 0;  
    while (u === 0)
      u = Math.random();  
    while (v === 0) 
      v = Math.random();  

    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 2 | 0;
}; ​
```

1) Using provided function generate 10 numbers. Create object with the keys related to the generated numbers and value as a quantity of corresponding number. Display numbers distribution as a table using template literal string.​

Example of object: 
```javascript
{0: 5, 1: 3, 2: 2}​
```

2) Push code to repo “Object Gauss”

# EPAMLabTask 5

1) Implement function range(min,max) that can return sum of integer numbers in range [min,max]

2) Consider edge cases: result is greater than Number.MAX_SAFE_INTEGER, argument is not a number, min > max, etc.

3)* For performance reason add memoization mechanism

4) Push code to repo “Sum of Row”

# EPAMLabTask 6

1) Implement program to print all permutations of a given string​

Example:
```javascript
Input: ABC​

Output: ABC, ACB, BAC, BCA, CAB, CBA​
```
2)* Print all permutations in sorted (lexicographic) order​

3) Push code to repo “momentoMemory”

# EPAMLabTask 7

1) Describe base class Entity that can store name​

2) Implement child classes Stuff, Box, User. Box can store some stuff[]. Every box belongs to user​

3) Add example of usage of these classes, e.g., create some instances, display data related to them​

4) Push code to repo “sweet sugar”

# EPAMLabTask 8

1) Given array of numbers [x]. Find “approx” [y] array where ```javascript
y[i] = x[i-1] + x[i+1]​
```

2) Example: ```javascript
[1, 2, 3, 4] => [2, 4, 6, 3]​
```

3)* Write function that can perform this calculation for multidimensional arrays​

4) Push code to repo “Agent Smith”

# EPAMLabTask 9

1) Using js construct on page Tic-Tac-Toe layout​

2) Add possibility to interact with layout by mouse click (add “X” or “O”)​

3) Add module that can write down on page game result (1st win, 2nd win or draw)​

4) Push code to repo “TicTacToe”
