class Entity {
    constructor(name, color, backgroundColor) {
        this.name = name;
        this.color = color;
        this.backgroundColor = backgroundColor;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value || `Unknown${this.constructor.name}`;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value || '#000';
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    set backgroundColor(value) {
        this._backgroundColor = value || '#fff';
    }
    
    toString() {
        return `${this.constructor.name}:${this._name}`;
    }

    getInfo() {
        const propsInfo = [ `Type: ${this.constructor.name}` ];

        for (const prop in this) {
            const stringProp = prop[1].toUpperCase()+prop.substring(2); 
            propsInfo.push(`${stringProp}: ${this[prop]}`);
        }

        return propsInfo.join('\n');
    }

    addChild(children, newChild, ...updatedProps) {
        if (!children || !newChild)
            return -1;
        
        const isExist = !!children.find(child => child.name === newChild.name);

        if (!isExist) {
            for (const prop of updatedProps) 
                newChild[prop] = this[prop];

            return children.push(newChild) - 1;   
        }
        return -1;
    }

    removeChild(children, deletedChildName) {
        const childIndex = children.findIndex(child => child.name === deletedChildName);

        if (childIndex !== -1)
            return children.splice(childIndex, 1)[0];

        return null;
    }
}

class Stuff extends Entity {
    constructor(name, size, color, backgroundColor) {
        super(name, color, backgroundColor);
        this.size = size;
    }

    get size() {
        return this._size;
    }

    set size(value) {
        this._size = parseInt(value) || 1;
    }
}

class Box extends Entity {
    constructor(name, volume, stuff, color, backgroundColor) {
        super(name, color, backgroundColor);
        this.volume = volume;
        this.stuff = stuff;
    }

    get volume() {
        return this._volume;
    }

    set volume(value) {
        this._volume = value || 1;
    }

    get stuff() {
        return this._stuff;
    }

    set stuff(value) {
        this._stuff = value || [];
    }

    toString() {
        const stuff = this._stuff.length ? this._stuff : 'Empty';
        return `\n${super.toString()} - ${stuff}`;
    }
    addStuff(newstuff) {
        return this.addChild(this._stuff, newstuff, 'color');
    }

    removeStuff(stuffName) {
        return this.removeChild(this._stuff, stuffName);
    }
}

class User extends Entity {
    constructor(name, age, strength, boxes, color, backgroundColor) {
        super(name, color, backgroundColor);
        this.age = age;
        this.strength = strength;
        this.boxes = boxes;
        
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = parseInt(value) || 18;
    }

    get strength() {
        return this._strength;
    }

    set strength(value) {
        this._strength = parseInt(value) || 0;
    }

    get boxes() {
        return this._boxes;
    }

    set boxes(value) {
        this._boxes = value || [];
    }

    addBox(newBox) {
        return this.addChild(this._boxes, newBox, 'backgroundColor');
    }

    removeBox(boxName) {
        return this.removeChild(this._boxes, boxName);
    }
}

function init() {
    firstTest();
    secondTest();
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function firstTest() {
    const user = new User('Alex', 22, 3, [], 'black', getRandomColor());
    const boxes = [ 
        new Box('Box1', 3, [], getRandomColor()),
        new Box('Box2', 4, [], getRandomColor()),
        new Box('Box5', 3, [], getRandomColor()),
        new Box('Box4', 8, [], getRandomColor()),
        new Box('Box1', 2, [], getRandomColor()),
        new Box('Box3', 6, [], getRandomColor()),
        new Box('Box6', 1, [], getRandomColor()),
        new Box('Box8', 9, [], getRandomColor()),
        new Box(),
    ]
    boxes.forEach(box => user.addBox(box));
    user.removeBox('Box8');

    console.log(user.getInfo());
    console.log(boxes[0].getInfo());
}

    

function secondTest() {
    const user2 = new User('Bob', 28, 5, [], 'black', getRandomColor());
    const [box1, box2] = [ new Box('Box10', 6, [], getRandomColor()),
                            new Box('Box60', 2, [], getRandomColor()),]
                            
    const stuffList = [
        new Stuff('Knife', 1),
        new Stuff(),
    ]
    
    stuffList.forEach(stuff => box1.addStuff(stuff));
    user2.addBox(box1);
    user2.addBox(box2);

    console.log(user2.getInfo());
    console.log(box1.getInfo());
    console.log(stuffList[1].getInfo());
}

init();