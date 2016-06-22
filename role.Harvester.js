var TaskManager = require("TaskManager")

var Harvester = { //Harvester
  run : function(creep){
    if(creep.memory.job === undefined){
      
      TaskManager.assignJob(creep);
      TaskManager.updateTaskManager();
      //console.log("A creep has been spawned; jobAmount is: ")
    }
    if(creep.carry.energy < creep.carryCapacity && creep.memory.job !== undefined){
      var targetId = creep.memory.job.target.id;
      var target = Game.getObjectById(targetId);
      if(creep.harvest(target) == ERR_NOT_IN_RANGE){ //currently invalid target
        creep.moveTo(target.pos.x, target.pos.y); //target.pos === memory.position
      }
      //creep.harvest(target) target needs to be source object
      else if(creep.harvest(target) == ERR_INVALID_TARGET){
        console.log("paskanen koodi :D");
      }
    }

    else if(Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity){
      if(creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(Game.spawns.Spawn1);
      }
    }
  }

};

module.exports = Harvester;
