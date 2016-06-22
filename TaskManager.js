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
      totalJobs[n] = {target: sourceList[n], position: init, jobAmount: 8-wallSquares};
      //position could be deprecated as target has the position in it, but other code still uses .position
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
  assignJob : function(creep){ //works
    if(creep.memory.job === undefined){
      console.log("Assigning job to: "+creep.name);
      console.log("currentJobs.length is: "+TaskManager.currentJobs.length);
      for(var n=0; n < TaskManager.currentJobs.length; n++){
        if(TaskManager.currentJobs[n].jobAmount > 0){
          console.log("jobAmount is:"+TaskManager.currentJobs[n].jobAmount);
          creep.memory.job = TaskManager.currentJobs[n];
          break;
          //TaskManager.currentJobs[n].jobAmount -= 1;
        }
      }
    }
  },
  updateAvailableJobs : function(totalJobs){ //doesn't seem to work
    //requires knowledge of death/birth of creeps
    var list = totalJobs;
    //console.log("HarvesterList length is: "+TaskManager.HarvesterList.length);
    for(var n=0; n < TaskManager.harvesterList.length; n++){
      var harvester = TaskManager.harvesterList[n];
      if(harvester.memory.job != undefined){
        var toDel = harvester.memory.job;
        for(var j=0; j< list.length; j++){
          //console.log("Got here");
          if(list[j].position.x == toDel.position.x &&
             list[j].position.y == toDel.position.y){
              list[j].jobAmount -= 1;
              console.log("jobAmount has been reduced, jobAmount is "+list[j].jobAmount);
             }
        }
      }
    }
    //console.log(currentJobs.jobAmount);
    return list;
  },
  harvesters : function(){ //doesn't work
    var list = [];
    for(var key in Game.creeps){
      if(Game.creeps[key].memory.role === "Harvester"){
        list[list.length] = Game.creeps[key];
      }
    }
    return list;
  },
  updateTaskManager : function(){
    TaskManager.processSources();
    TaskManager.totalNumberOfJobs = TaskManager.getTotalJobs(TaskManager.fullJobs); //send help doesn't work without these
    TaskManager.harvesterList = TaskManager.harvesters();
    TaskManager.currentJobs = TaskManager.updateAvailableJobs(TaskManager.fullJobs);
  }
};

module.exports = TaskManager;
