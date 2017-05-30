var tasks = [];

var STATE_P = '진행';
var STATE_C = '완료';

var addTask = (function() {
    var id = 0;

    return function(title) {
        tasks.push({
            title: title,
            id: id++,
            state: STATE_P
        });

        render();
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

    if (state !== STATE_P && state !== STATE_C) {
        warning('changeState: invalid state - ' + state);
        return;
    } else {
        STATE = state;
    }

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === ID) {
            tasks[i].state = STATE;
            break;
        }
    }

    render();
};

var warning = console.log;

var render = function() {
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
}

render();