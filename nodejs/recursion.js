var fs = require("fs");

function rec1(x) {
    
    console.log(x);

    if (x === 0)
        console.log("x is 0. That's the end of the recursion");
    else if (x === 4) 
        rec2(x - 2);
    else if (x === 5)
        rec3(x - 3);
    else if (x === 16) {
        sum (x);
    }
        
    else
        rec1(x - 1)
    
}

function rec2(x) {
    console.log(x);

    return x * rec2(x-1);
    
}

function rec3(x) {

    if (x !== 0) {
        console.log(x);


        return Math.floor(x / rec3(x-1));
    }

    else 
        return 1;
    
}

function sum(x) {
    if (x > 0) {
        x += sum(x-1);
        console.log(x); 
    }
        
    return x;
}

rec1(15);

// The first function

function listFiles(path) {
    console.log(fs.readdirSync(path));
}

listFiles("/home/devugees/Desktop/nodejs/");

// The recursive function

function listFilesRec(path) {

    var dirInfo = fs.readdirSync(path);

    for (let i = 0; i < dirInfo.length; i++) {
        let stat = fs.lstatSync(path + '/' + dirInfo[i]);
        if (!(stat.isFile())) {
            console.log(dirInfo[i]);  
            listFilesRec(path + '/' + dirInfo[i]);
        }
        else
            console.log(dirInfo[i]);    
    }
}

listFilesRec("/home/devugees/Desktop/nodejs/");