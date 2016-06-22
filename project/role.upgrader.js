var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0){
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity){
            creep.memory.upgrading = true;
        }


        if(!creep.memory.upgrading && creep.pos.findClosestByPath(FIND_MY_SPAWNS) > 200) {
          var spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if(spawn.transferEnergy(creep, creep.energyCapacity) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleUpgrader;
