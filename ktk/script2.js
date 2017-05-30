var todo = (function() {
    var mode = 'html';
    var tasks = [];

    var STATE_P = '진행';
    var STATE_C = '완료';

    var addTask = (function() {
        var id = 0;

        return function(title) {
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
        var ID = false, STATE;
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

        STATE = state;

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id === ID) {
                tasks[i].state = STATE;
                break;
            }
        }

        render();
    };

    var warning = console.log;

    var init, render;

    (function() {
        var completeLi, progressLi;

        init = (function() {
            var initHtml = function() {
                progressLi = document.querySelector('#todo .progress li');
                completeLi = document.querySelector('#todo .complete li');

                progressLi.parentNode.removeChild(progressLi);
                completeLi.parentNode.removeChild(completeLi);
            };

            return function() {
                if (mode === 'html') {
                    initHtml();
                }
            };
        })();

        render = (function() {
            var renderConsole = function() {
                console.log('진행');

                var task;

                for (var i = 0; i < tasks.length; i++) {
                    task = tasks[i];

                    if (task.state === '진행') {
                        console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
                    }
                }

                console.log('완료');

                for (var i = 0; i < tasks.length; i++) {
                    task = tasks[i];

                    if (task.state === '완료') {
                        console.log(task.id + '. ' + task.title + '(' + task.state + ')' );
                    }
                }

                console.log('추가     : addTask(할일 내용)');
                console.log('삭제     : removeTask(아이디)');
                console.log('상태 변경 : changeState(아이디, 상태 - 완료 또는 진행)');
            }

            var renderHTML = function() {
                console.log('// 각 리스트를 비운다.');
                document.querySelectorAll('#todo .progress').innerHTML = '';
                document.querySelectorAll('#todo .complete').innerHTML = '';

                console.log('// 진행을 채운다.');
                console.log('// 완료를 채운다.');
                console.log('// 인풋 박스를 비운다.');
            };

            return function() {
                if (mode === 'console') {
                    renderConsole();
                } else if (mode == 'html') {
                    renderHTML();
                }
            };
        })();
    })();

    render();

    return {
        init: init,
        modeHtml: function() {
            mode = 'html';
        },
        modeConsole: function() {
            mode = 'console';
        },
        add: addTask,
        remove: removeTask,
        toggle: function(id) {
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].id === id) {
                    if (tasks[i].state === STATE_P) {
                        changeState(id, STATE_C);
                    } else {
                        changeState(id, STATE_P);
                    }

                    break;
                }
            }
        }
    };
})();

todo.init();