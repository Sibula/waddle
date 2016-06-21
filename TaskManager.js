var TaskManager = { //For managing Harvester jobs, needs some fiddling with
                    //object variables
  //parameters
  currentJobs : [],
  fullJobs : [],
  harvesterList : [],
  totalNumberOfJobs : 0,

  processSources : function(){ //should be used in main
    var sourceList = [];
    var totalJobs = [];

    var helper = [];

    for(var key in Game.rooms){
      helper[helper.length] = Game.rooms[key];
    }

    var instance = helper[0]; //hardcoded into taking account only one room
    sourceList = instance.find(FIND_SOURCES);
    //console.log("The amount of sources is: "+sourceList.length);

    for(var n=0; n<sourceList.length; n++){
        var init = sourceList[n].pos; //Position of source n
        //console.log("The position of "+n+"th source is "+init.x+", "+init.y);
        var wallSquares = 0;
        //var targetHelper = [];
        var target = instance.lookAtArea(init.y-1,init.x-1,init.y+1,init.x+1, true);
        //rectangle with y1,x1 and y2,x2 as defining points
        //shitty definition from the devs
        for(var key in target){
          if(!((init.x == target[key].x) && (init.y == target[key].y))){ //NAND
            if(target[key].terrain === "wall"){ /*no need to check for existence
              of .terrain*/
              wallSquares += 1;
            }
          }
            /*console.log(target[key].terrain+", "+key+", in position "+
            target[key].x+", "+target[key].y);*/
        }
      totalJobs[n] = {position: init, jobAmount: 8-wallSquares};
      //console.log("wallSquares was: "+wallSquares);
    }
    TaskManager.fullJobs = totalJobs;
  },

  getTotalJobs : function(list){ //list should have jobs in it
    var jobAmount = 0;
    for(var n=0; n<list.length; n++){
      jobAmount += list[n].jobAmount;
    }
    return jobAmount;
  },
  assignJob : function(creep){
    if(creep.memory.job === undefined){
      for(var n=0; n < TaskManager.currentJobs.length; n++){
        if(TaskManager.currentJobs[n].jobAmount > 0){
          creep.memory.job = TaskManager.currentJobs[n];
        }
      }
    }
  },
  updateAvailableJobs : function(totalJobs){
    //requires knowledge of death/birth of creeps
    var currentJobs = totalJobs;
    for(var n=0; n < TaskManager.harvesterList.length; n++){
      var harvester = TaskManager.harvesterList[n];
      if(harvester.memory.job != undefined){
        var toDel = harvester.memory.job;
        for(var j=0; j< currentJobs.length; j++){
          if(currentJobs[j].position.x == toDel.position.x &&
             currentJobs[j].position.y == toDel.position.y){
              currentJobs[j].jobAmount -= 1;
             }
        }
      }
    }
    return currentJobs;
  },
  harvesters : function(){
    var list = [];
    for(var key in Game.creeps){
      if(Game.creeps[key].role === "Harvester"){
        list[list.length] = Game.creeps[key];
      }
    }
    return list;
  },
  updateTaskManager : function(){
    TaskManager.totalNumberOfJobs = TaskManager.getTotalJobs(TaskManager.fullJobs); //send help doesn't work without these
    TaskManager.harvesterList = TaskManager.harvesters();
    TaskManager.currentJobs = TaskManager.updateAvailableJobs(TaskManager.fullJobs);
  }
};

module.exports = TaskManager;
