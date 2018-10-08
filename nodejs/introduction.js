function introduction(userInfo) {
    console.log(`Hi. My name is ${userInfo.fName} ${userInfo.lName} and my email is ${userInfo.email}. I was born in ${userInfo.bYear}.`);
}

module.exports.introduction = introduction;