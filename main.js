Memory = {processed: false};
var doStuff = false;

var totalJobs = [];
var index = 0; //placeholder for Birthing



var TaskManager = require("TaskManager");
var Birthing = require("Birthing");
var HarvesterRole = require("role.Harvester");
//var Tasker = new TaskManager; could make TaskManager into an object in the
//future

module.exports.loop = function () {

//console.log("The value of processed is: "+processed);
if (((Game.creeps.length === undefined) || (Game.creeps.length <
  TaskManager.totalNumberOfJobs)) && Game.spawns.Spawn1.energy > 200
  && Memory.processed){
  //var index = Birthing.checkName("Harvester"); Birthing doesn't currently work
  Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], "Harvester"+index,
  {role: "Harvester"}); //creeps.length as identifier doesn't work
  //assign a job for harvester, remove hardcode, migrate into a new module
  //TaskManager.assignJob(Game.creeps["Harvester"+index]);
  TaskManager.updateTaskManager();
  index += 1;
} else {
  //console.log("Couldn't get into birthing!")
}
if (!Memory.processed){

  //TaskManager.processSources(); //DOESN'T FUCKING REMEMBER THIS IN 11s
  TaskManager.updateTaskManager(); //mistake in totalJobs not being in TaskMg
  //console.log("The total amount of jobs is: "+TaskManager.totalNumberOfJobs);
  Memory.processed = true;
}

for(var i in Game.creeps){
  var creep = Game.creeps[i];
  if(creep.memory.role === "Harvester"){
    HarvesterRole.run(creep);
  }
}


}
