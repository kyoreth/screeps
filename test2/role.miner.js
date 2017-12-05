var roleMiner =  {
  run: function(creep) {
      
    if (!creep.memory.harvestPointId)
    {
        let occupiedHarvestPoints = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').map((el) => el.memory.harvestPointId);
        let closestSource = creep.pos.findClosestByRange(FIND_SOURCES, {filter: (source) => occupiedHarvestPoints.indexOf(source.id) == -1});
        creep.memory.harvestPointId = closestSource.id;
    }

    let source = Game.getObjectById(creep.memory.harvestPointId);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        if (creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}}) == ERR_NOT_FOUND)
        {
            creep.moveTo(source);
        }
      
      
      
  }}}
  
module.exports = roleMiner;