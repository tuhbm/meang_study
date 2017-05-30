var todo = (function(){//tasks와 STATE를 숨기기위해 즉시실행함수 사용
    var mode = 'html';
    var tasks = [];

    var STATE_P = '진행';
    var STATE_C = '완료';

    var addTask = (function() {
        var id = 0;

        return function(title) {

            // tasks.push({
            //     title: title,
            //     id: id++,
            //     state: STATE_P
            // });
            //
            // render();
            //
            // return id - 1;
            var result = id;

            tasks.push({
                title: title,
                id: id++,
                state: STATE_P
            });

            render();

            return result;
        };
    })();

    var removeTask = function(id) {
        var isRemoved = false;

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1);
                isRemoved = true;

                break;
            }
        }

        if (!isRemoved) {
            warning('removeTask: invalid id');
        }

        render();
    };

    var changeState = function(id, state) {
        var ID = false;
        var STATE;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                ID = id;
                break;
            }
        }
        if (ID === false) {
            warning('changeState: invalid id - ' + id);
            return;
        }

        // if (state !== STATE_P && state !== STATE_C) {
        //     warning('changeState: invalid state - ' + state);
        //     return;
        // } else {
        STATE = state;
        // } 이미 하드코딩되어있으므로 안정적이어어서 따로 방어코드 작성할필요가없다.
        //내부에서 이용된 코드는 안정적이므로 검사할필요가없다.
        //외부에서 본인을 제외한 코드는 모두 외부이므로 안정적이지 못하다.

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === ID) {
                tasks[i].state = STATE;
                break;
            }
        }

        render();
    };

    var warning = console.log;


    //인메모리함수 와 구분되도록 만듬, 렌더만이 네이티브를 알고있다.
    //가교가 되는 인메모리 함수만 사용.....?
    //


    var render = (function(){
        var renderConsole = function() {
            console.log(STATE_P);

            var task;

            for (var i = 0; i < tasks.length; i++) {
                task = tasks[i];

                if (task.state === STATE_P) {
                    console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
                }
            }

            console.log(STATE_C);

            for (var i = 0; i < tasks.length; i++) {
                task = tasks[i];

                if (task.state === STATE_C) {
                    console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
                }
            }

            console.log('추가     : addTask(할일 내용)');
            console.log('삭제     : removeTask(아이디)');
            console.log('상태 변경 : changeState(아이디, 상태 - 완료 또는 진행)');
        };

        var renderHtml = function(){
            return function(){

            }
        };

    })();

    // render();

    return{
        modeHtml : function (){
            mode = 'html';
        },
        modeConsole : function (){
            mode = 'console';
        },
        add : addTask, //바깥쪽에 함수이름을 노출할 필요는 없다. 바깥에서 사용자가 사용하기 좋게 만드는것이 캡슐화
        remove : removeTask,
        toggle : function(id){
            for(var i = 0; i < tasks.length;i++){
                if(tasks[i].id ===id){
                    if(tasks[i].state === STATE_P){
                        changeState(id,STATE_C);
                    } else {
                        changeState(id,STATE_P);
                    }

                    break;
                }
            }
        }
        // changeState : changeState  //함수명을 노출할 필요가없다.라고 판단함
    }; //스코프를 위해서 바깥으로 오브젝트 형태로 개발
    //캡슐화, 은닉
    /**
     캡슐화 : 사용자가 사용하기 좋게 편하도록 변경 및 은닉
     은닉
     캡슐화 >>>>> 은닉
     */

})();

var taskId = todo.add('이름');

todo.toggle(taskId);
