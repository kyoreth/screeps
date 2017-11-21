var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var num_builders = 5;
var num_upgraders = 4;
var num_harvesters = 2;

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    if(harvesters.length < num_harvesters) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['home'].spawnCreep([WORK,WORK,CARRY,MOVE, MOVE], newName,
            {memory: {role: 'harvester'}});
    }
     if(upgraders.length < num_upgraders) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['home'].spawnCreep([WORK,WORK,CARRY,MOVE, MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    if(builders.length < num_builders) {
       var newName = 'Builder' + Game.time;
       console.log('Spawning new builder: ' + newName);
       Game.spawns['home'].spawnCreep([WORK,WORK,CARRY,MOVE, MOVE], newName,
           {memory: {role: 'builder'}});
   }

    if(Game.spawns['home'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['home'].spawning.name];
        Game.spawns['home'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['home'].pos.x + 1,
            Game.spawns['home'].pos.y,
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
    }
}
