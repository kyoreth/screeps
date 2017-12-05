var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleGatherer = require('role.gatherer');


var num_builders = 3;
var num_upgraders = 1;
var num_gatherers = 3;
var num_miners = 2;

var body = ["move","carry", "work"];



/*var fun = require('testfun');
console.log(fun.foo());*/

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
   // console.log('Harvesters: ' + harvesters.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
   // console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);
    var gatherers = _.filter(Game.creeps, (creep) => creep.memory.role == 'gatherer');

    if(miners.length < num_miners) {
        var newName = 'Miner' + Game.time;
        console.log('Spawning new miner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            {memory: {role: 'miner'}});
    }
     if(upgraders.length < num_upgraders) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    if(builders.length < num_builders) {
       var newName = 'Builder' + Game.time;
       console.log('Spawning new builder: ' + newName);
       Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
           {memory: {role: 'builder'}});
   }
   if(gatherers.length < num_gatherers) {
       var newName = 'Gatherer' + Game.time;
       console.log('Spawning new gatherer: ' + newName);
       Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
           {memory: {role: 'gatherer'}});
   }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'gatherer') {
            roleGatherer.run(creep);
        }
    }
}
