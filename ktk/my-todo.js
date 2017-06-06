var todo = (function(){
    var tasks = [];
    var STATE_I = '진행';
    var STATE_F = '완료';

    var addTask = (function () {
        var id = 1;
        return function(title,text){
            tasks.push({
                id : id++,
                title : title,
                text : text,
                state : STATE_I
            });

            render();
        };
    })();


    var removeTask = function(id){
        var isRemoved = false;
        for(var i = 0 ; i < tasks.length; i ++){
            if(id === tasks[i].id){
                tasks.splice(i,1);
                isRemoved = true;
                break;
            }
        }
        if(!isRemoved){
            throw '올바르지 못한 명령입니다. 다시 확인해주세요.';
        }
        render();
    };

    var changeState = function (id , state){
        var ID = false;
        var STATE;
        for(var i = 0 ; i < tasks.length ; i ++){
            if(id === tasks[i].id){
                ID = id;
                break;
            }
        }
        if(ID === false){
            throw '원하시는 할일이 없습니다.';
        }

        STATE = state;
        for (var i = 0; i < tasks.length; i++) {
            if(tasks[i].id === ID){
                tasks[i].state = STATE;
                break;
            }
        }
        render();
    };

    var render = function(){
        console.log(STATE_I);

        var task;

        for(var i = 0; i < tasks.length; i++){
            task = tasks[i];
            if(task.state === STATE_I){
                console.log(task.id +'.'+ task.title + '(' + task.text + ') - ' + task.state);
            }
        }

        console.log(STATE_F);

        for(var i = 0; i < tasks.length; i++){
            task = tasks[i];
            if(task.state === STATE_F){
                console.log(task.id +'.'+ task.title + '(' + task.text + ') - ' + task.state);
            }
        }

        console.log('추가     : addTask(할일 내용)');
        console.log('삭제     : removeTask(아이디)');
        console.log('상태 변경 : changeState(아이디, 상태 - 완료 또는 진행)');

    };
    return {
        add : addTask,
        remove: removeTask,
        toggle: function(id){
            for (var i = 0; i < tasks.length; i++) {
                if(tasks[i].id === id){
                    if(tasks[i].state === STATE_I) changeState(id,STATE_F);
                    else changeState(id,STATE_I);

                    break;
                }

            }

        }
    }
})();
