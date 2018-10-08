var fs = require("fs");

var file = fs.readFileSync("./halloworld.txt", 'utf-8');

console.log(file);


var str1 = "Hallo World to a new file. Now it's the writing test.";

fs.writeFileSync("./halloworldwritten.txt", str1);

// var check1 = fs.readFileSync("./halloworldwritten.txt", 'utf-8');

// console.log(check1);

var str2 = "This will override a file...";

fs.writeFileSync("./halloworldwritten.txt", str2);

// var check2 = fs.readFileSync("./halloworldwritten.txt", 'utf-8');

// console.log(check2);

var str3 = "Appending another text...";

fs.appendFileSync("./halloworldwritten.txt", str3);

var check3 = fs.readFileSync("./halloworldwritten.txt", 'utf-8');

console.log(check3);

var jsonFile = JSON.parse(
    fs.readFileSync("./person.json", "utf-8")
);

console.log(jsonFile);

/*
    Task

    Open the users.csv and create an array of javascript objects
    having the proper key and value pairs

*/

var csvObj = fs.readFileSync("./users.csv", "utf-8");

// console.log(csvObj);

var arrLines = csvObj.split("\n");

// console.log(arrLines);

var infoArr = [];

for (var i = 0; i < arrLines.length; i++) {
    let tempArr = arrLines[i].split(",");
    // console.log(tempArr);
    let userInfo = {
        "username" : tempArr[0],
        "email"    : tempArr[1],
        "lastVisit": tempArr[2]
    }
    // console.log(userInfo);
    infoArr.push(userInfo);
}

console.log(infoArr);

let dataToWrite = JSON.stringify(infoArr);


fs.writeFileSync("./users.json", dataToWrite);

// fs.unlinkSync("./users.json");

// fs.unlinkSync("./home/devugees/Desktop/deleteme");

var fileList = fs.readdirSync("/home/devugees/Desktop/nodejs");

for (let i = 0; i < fileList.length; i++)
    console.log(fileList[i]);

let info1 = fs.lstatSync("./person.json");

console.log(info1);

let info2 = fs.lstatSync("./level1");

if (info2.isFile())
    console.log("It's a file");
else
    console.log("It's a directory/folder");

/*

    Task 2

    a) Show all jpeg images that are in the image folder

    b) afterwards, delete all images that are not JPEG files

*/

var fileList2  = fs.readdirSync("/home/devugees/Desktop/nodejs/images");
console.log(fileList2);

// var finalArray =[];


for (let i = 0; i < fileList2.length; i++) {
    var image = fileList2[i];

    var checkType = String(image).split(".");
    // console.log(checkType);
    
    if (checkType[1] === "jpeg")
        console.log(image);

    // Now the part of task 2
    else if (checkType[1] !== "jpeg")
        fs.unlinkSync("./images/" + image);
}


    




