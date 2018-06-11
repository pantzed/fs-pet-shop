'use strict';

let fs = require('fs');
let path = require('path');
let petsPath = path.join(__dirname, 'pets.json');

let node = path.basename(process.argv[0]);
let file = path.basename(process.argv[1]);
let cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let pets = JSON.parse(data);
    let index = process.argv[3];

    if (index) {
      if (index > pets.length - 1 || index < 0){
        console.error(`Usage: ${node} ${file} INDEX`);
        process.exit(2);
      }
      else {
        console.log(pets[index]);
      }
    }
    else {
      console.log(pets);
    }
  });
}

else if (cmd === 'create') {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    let pets = JSON.parse(data);
    let age = parseInt(process.argv[3]);
    let kind = process.argv[4];
    let name = process.argv[5];
    let petsString; //future string

    if (age && kind && name) {
      pets.push({age, kind, name});
      petsString = JSON.stringify(pets);
      fs.writeFile(petsPath, petsString, 'utf8', (err) => {
        if (err) throw err;
        console.log(`{ age: ${age}, kind: '${kind}', name: '${name}' }`);
      });
    }
    else {
      console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
      process.exit(3);
    }
  });
}

else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}