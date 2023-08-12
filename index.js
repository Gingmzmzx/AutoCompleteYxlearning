// ==UserScript==
// @name         AutoCompleteYxlearning
// @namespace    https://www.gov.cn
// @version      0.1
// @description  自动完成培训平台答题
// @author       XiBaozi
// @match        https://sdta-zyk.yxlearning.com/learning
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sspai.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    function randstr(len = 1, text = null) {
        var t = text || ("0123456789abcdef" +
            "ghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"),
            a = t.length,
            n = "";
        for (let i = 0; i < len; i++) {
            n += t.charAt(Math.floor(Math.random() * a));
        }
        return n;
    } // function randstr


    /* **** [BEGIN] 根元素创建 **** */
    var root = document.createElement('div');
    document.body.append(root);
    /* **** [END] 根元素创建 **** */


    /* **** [BEGIN] 数据声明 **** */
    var panel_class = '__' + randstr(8);
    var myops_classn = '__opts' + randstr(4);
    /* **** [END] 数据声明 **** */
    

    /* **** [BEGIN] CSS **** */
    var style1 = document.createElement('style');
    style1.innerHTML = `
    /* Global styles */
    * {
        user-select: text !important;
        -webkit-user-select: text !important;
        -moz-user-select: text !important;
        -comment-comment: "Enable selecting";
    }
    *[disabled] {
        cursor: not-allowed !important;
    }

    /* Class styles */
    .${panel_class} {
        display: block;
        text-align: center;
        position: fixed;
        box-shadow: 0 0 5px 0;
        background: rgba(255, 255, 255, 0.9);
        padding: 5px 5px;
        font-size: 13px;
    }
    .${panel_class} {
        z-index: 1048571;
        left: 10px;
        bottom: 10px;
        border: 1px solid #cccccc;
    }
    .${panel_class} a {
        display: block;
        color: blue;
        cursor: pointer;
        text-decoration: none;
        margin-top: 3px;
    }
    .${panel_class} a:hover {
        color: #f90;
        background: #dddddd;
        text-decoration: underline;
    }
    .${myops_classn} {
        margin: 1px 1px;
        padding: 3px 3px;
    }
    `; // style1.innerHTML
    root.append(style1);
    /* **** [END] CSS **** */


    /* **** [BEGIN] 面板UI **** */
    var panel = document.createElement('div');
    panel.classList.add(panel_class);
    panel.innerHTML = `<div>自动学习</div>
    <div class="${myops_classn}"></div>`;
    root.append(panel);
    let p_fieldset = panel.querySelector(`.${myops_classn}`);
    let op_list = {
        "开始自动学习": function () {
            startAutoComplete();
        },
        "停止自动学习": function () {
            stopAutoComplete();
        },
        "清空答案列表": function () {
            clearAnswerList();
        },
        "退出": function () {
            panel.style.display = 'none';
            stopAutoComplete(false);
        },
    }; // let op_list
    if (p_fieldset) {
        for (let i in op_list) {
            let a = document.createElement('a');
            a.href = 'javascript:void(0)';
            a.innerHTML = i;
            a.__op = i;
            a.onclick = function (ev) {
                (ev || event).preventDefault();
                try { op_list[this.__op](this); }
                catch (err) {
                    console.error(
                        'Error executing operation '
                        + i + ':', err);
                };
            }
            p_fieldset.append(a);
        }
    } // if (p_fieldset)
    /* **** [END] 面板UI **** */

    /* **** [BEGIN] 主要逻辑 **** */
    var answerList = [],
        intervalID = undefined;

    function startAutoComplete() {
        if (intervalID != undefined) {
            alert("已经开始了自动答题！");
            return;
        }
        intervalID = setInterval(function() {
            if ( $(".pv-ask-modal").length ) {
                if($(".pv-ask-modal").is(":visible")) {
                    // 有问答
                    var questionSelection = $(".pv-ask-form");
                    questionSelection.each(function() {
                        var i = $(this);
                        var val = String(i.children("label").text()).replace(/[A-Z]、/g, "");
                        console.log(val);
                        if ( answerList.indexOf(val) !== -1 ) {
                            console.log(`ignore ${val}`);
                        } else {
                            answerList.push(val);
                            i.children("input").attr("checked", true);
                            return false;
                        }
                    });
                    $(".pv-ask-submit").click();
                    checkIntervalID = setInterval(function() {
                        // if ( $(".pv-ask-error-tip").length ) {

                        //     clearInterval(checkIntervalID);
                        // }
                        if ( $(".pv-ask-success-tip").length ) {
                            answerList = [];
                            clearInterval(checkIntervalID);
                        }
                    }, 20);
                }
            }
        }, 1000);
        console.log(`已开始自动学习，intervalID为${intervalID}`);
    }

    function stopAutoComplete(echoFlag=true) {
        if (intervalID != undefined){
            clearInterval(intervalID);
            console.log(`已停止自动学习，intervalID为${intervalID}`);
            intervalID = undefined;
        } else {
            if (echoFlag) alert("还未开始自动答题！");
        }
    }

    function clearAnswerList() {
        console.log(`清除前answerList: ${answerList}`);
        answerList = [];
    }
    /* **** [END] 主要逻辑 **** */
})();
