var Birthing = {
  checkName : function(role){
    var namesakes = [];
    var index = [];
    var number = 0;
    for(var i in Game.creeps){
      if(role === Game.creeps[i].memory.role){
        namesakes[namesakes.length] = Game.creeps[i].name;
      }
    } //Not sure if hardcode, every name should have the specified role in it
    index = namesakes.forEach(function splitName(index){
                                namesake[index].split(0,role.length);
    });
    if(index.length === 0){
      return number;
    }
    for(var n=0; n < index.length; n++){
      if(!(String.toString(n) === index[n])){ //NOT
        number = n;
        break;
      }
      if(n === index.length-1){
        number = n+1;
      }
    }
    return number;
  }
};
module.export = Birthing;
