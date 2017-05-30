var TASKS = [];
var STATE_I = '진행';
var STATE_F = '완료';

var addTask = (function () {
    var id = 1;
    return function(title,text){
        TASKS.push({
            id : id++,
            title : title,
            text : text
        });
    };
})();


var removeTask = function(id){

    for(var i = 0 ; i < TASKS.length; i ++){
        if(id === TASKS[i].id){
            TASKS.splice(i,1);

            break;
        }

    }




};

var changeState = function (){

};