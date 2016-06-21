var TaskManager = require("TaskManager")

var Harvester = { //Harvester
  run : function(creep){
    if(creep.memory.job === undefined){
      TaskManager.assignJob(creep);
      TaskManager.updateAvailableJobs();
    }
  }
};

module.exports = Harvester;
