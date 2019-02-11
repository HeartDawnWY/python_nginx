// 适配移动端的拖动
var moveFlg = 0;
(function($) {
    var proto = $.ui.mouse.prototype,
        _mouseInit = proto._mouseInit;
    $.extend(proto, {
        _mouseInit: function() {
            this.element.bind("touchstart." + this.widgetName, $.proxy(this, "_touchStart"));
            _mouseInit.apply(this, arguments);
        },
        _touchStart: function(event) {
            this.element.bind("touchmove." + this.widgetName, $.proxy(this, "_touchMove")).bind("touchend." + this.widgetName, $.proxy(this, "_touchEnd"));
            this._modifyEvent(event);
            $(document).trigger($.Event("mouseup"));
            //reset mouseHandled flag in ui.mouse
            this._mouseDown(event);
            //console.log(this);
            //return false;

            //--------------------touchStart do something--------------------
            console.log("i touchStart!");

        },
        _touchMove: function(event) {
            moveFlag = 1;
            this._modifyEvent(event);
            this._mouseMove(event);

            //--------------------touchMove do something--------------------
            console.log("i touchMove!");

        },
        _touchEnd: function(event) {
            // 主动触发点击事件
            if (moveFlag == 0) {
                var evt = document.createEvent('Event');
                evt.initEvent('click', true, true);
                this.handleElement[0].dispatchEvent(evt);
            }
            this.element.unbind("touchmove." + this.widgetName).unbind("touchend." + this.widgetName);
            this._mouseUp(event);
            moveFlag = 0;

            //--------------------touchEnd do something--------------------
            console.log("i touchEnd!");

        },
        _modifyEvent: function(event) {
            event.which = 1;
            var target = event.originalEvent.targetTouches[0];
            event.pageX = target.clientX;
            event.pageY = target.clientY;
        }
    });
})(jQuery);


function playMusic() {
    try {
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
            (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
            (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
            (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

        var audioObject = document.getElementById("voice");
        if (Sys.ie) {
            audioObject.play();
        } else if (Sys.firefox) {
            audioObject.play();
        } else if (Sys.chrome) {
            $("div[class='musicPlay']").remove();
            $("#body").append("<iframe src='"+common_ops.buildStaticUrl("music/music.mp3")+"' style='width:0px; height:0px;' allow='autoplay' />")
        } else if (Sys.opera) {

        } else if (Sys.safari) {

        }

        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
            audioObject.play();
        } else {
            if (document.addEventListener) {
                document.addEventListener("WeixinJSBridgeReady", function() {
                    audioObject.play();
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent("WeixinJSBridgeReady", function() {
                    audioObject.play();
                });
                document.attachEvent("onWeixinJSBridgeReady", function() {
                    audioObject.play();
                });
            }
        }
        var voiceStatu = true;
        document.addEventListener("touchstart", function(e) {
            if (voiceStatu) {
                audioObject.play();
                voiceStatu = false;
            }
        }, false);
    } catch (err) {
        console.log(err)
    }
}

/**
 * User: wei ya
 * Date: 14-6-12
 * Time: 下午8:08
 * 小型婚礼
 */
$(function() {

    // 播放音乐
    playMusic();

    var $firstHorn = $(".first-horn"),
        // 场景舞台    
        $box = $(".box"),
        /* 场景一左边喇叭 */
        $firstTxt = $(".first-txt"),
        /* 场景一文字div */
        firstTxtWidth = $firstTxt.width(),
        /* 文字div的宽度 */
        $secondBox = $(".second-box"),
        /* 场景二box */
        $secondPeople = $(".second-people"),
        /* 场景二左边人物 */
        $secondTxt = $(".second-txt"),
        /* 场景二右边文字 */
        $threeBox = $(".three-box"),
        /* 场景三box */
        $threeImg = $(".three-img"),
        /* 场景三图片 */
        $foreBox = $(".fore-box"),
        /* 场景四box */
        $foreImg = $(".fore-img"),
        /* 场景四图片 */
        $fiveBox = $(".five-box"),
        /* 场景五box */
        $fiveImg = $(".five-img"),
        /* 场景五中间图片 */
        $uEnter = $(".u-enter"),
        /* 进入婚礼按钮 */
        $sixBox = $(".six-box"),
        /* 场景六box */
        $sixDiv = $sixBox.find("div"),
        /* 场景六里面小块div */
        sixDivWidth = $sixDiv.width(),
        /* 场景六里面小块div的宽度 */
        sixDivHeight = $sixDiv.height(),
        /* 场景六里面小块div的高度 */
        sixBoxWidth = $sixBox.width(),
        /* 场景六宽度 */
        sixBoxHeight = $sixBox.height(),
        /* 场景六高度 */
        $sevenBox = $(".seven-box");

    var baseApi = "http://192.168.10.114/v1/";

    /* 场景一 */
    $box.css("background", "url('"+ common_ops.buildStaticUrl("images/bg/scene_01.jpg") +"') no-repeat")
    $firstHorn.animate({ left: 0 }, 1000);
    $firstTxt.animate({ left: "435px" }, function() {
        $firstTxt.fadeIn(1000);
        showTxt($firstTxt.find("div:eq(0)")); /* 显示第一行文字 */
        setTimeout(function() { showTxt($firstTxt.find("div:eq(1)")); }, 3000); /* 显示第二行文字 */
        setTimeout(scene2, 7000); /* 进入场景二 */
    });

    /* 显示文字 */
    function showTxt($obj) {
        for (var i = 0; i < 8; i++) {
            (function() {
                $obj.animate({ width: firstTxtWidth * (i + 1) + "px" }); /* 根据i值，width逐渐变大 */
            })(i)
        }
    }

    /* 场景二 */
    function scene2() {
        $box.css("background", "url('"+common_ops.buildStaticUrl("images/bg/timg.jpg")+"') repeat")
        $firstTxt.fadeOut();
        $firstHorn.animate({ left: "-422px" }, function() {
            $secondBox.show();
            $secondPeople.animate({ left: "0" });
            $secondTxt.animate({ left: "230px" }, function() {
                $secondTxt.fadeIn(1000);
                setTimeout(scene3, 2000); /* 进入场景三 */
            });
        });
    }

    /* 场景三 */
    function scene3() {
        $box.css("background", "url('"+common_ops.buildStaticUrl("images/bg/marry.jpg")+"') no-repeat")
        $secondBox.hide();
        $threeBox.fadeIn();
        for (var i = 0; i < 6; i++) { /* 控制图片跳转频率 */
            if (i == 0) {
                $threeImg.css({ left: 0, top: 0 });
            } else if (i % 2 == 0) {
                $threeImg.animate({ left: 40 * i + "px", top: 30 * i + "px" }, 80 * (6 - i));
            } else {
                $threeImg.animate({ left: 40 * i + "px", top: "200px" }, 80 * (6 - i));
            }
        }
        $("#person-left").animate({ opacity: 1 }, 4000)
        $("#person-right").animate({ opacity: 1 }, 4000, function() {
            /* 进入场景四 */
            setTimeout(scene4, 2000);
        });
    }

    /* 场景四 */
    function scene4() {
        $box.css("background", "url('"+common_ops.buildStaticUrl("images/bg/town.jpg")+"') no-repeat")
        $threeBox.hide();
        $foreBox.fadeIn();
        $foreImg.animate({ top: "100px" }, 1000, function() {
            $("div[class='love']").animate({ opacity: 1 }, 2000);
            var imgArr = $("img[name='person-img']");
            $(imgArr[0]).animate({ opacity: 1 }, 2000);
            $(imgArr[1]).animate({ opacity: 1 }, 2000);
            $(imgArr[2]).animate({ opacity: 1 }, 2000);
        });
        setTimeout(scene5, 5000); /* 进入场景五 */
    }

    /* 场景五 */
    function scene5() {
        $box.css("background", "url('"+common_ops.buildStaticUrl("images/bg/scene-five.jpg")+"') no-repeat")
        $foreBox.hide();
        $foreImg.animate({ left: "960px" }, function() {
            $fiveBox.fadeIn(function() {
                loop();
            });
            // 烟花发起
            $fiveBox.find("img").css({ "transform": "scale(1)" });
            $("img[name='img-left']").animate({ opacity: 1 }, 2000);
            $("img[name='img-right']").animate({ opacity: 1 }, 3000);
            $("img[name='img-top']").animate({ opacity: 1 }, 4000, function() { diamond(); });
            $("img[name='img-down']").animate({ opacity: 1 }, 5000);
            var diamond = function() {
                $("img[name='img-top']").rotate({
                    angle: 0,
                    animateTo: 360,
                    callback: diamond,
                    duration: 8000,
                    easing: function(x, t, b, c, d) { // t: current time, b: begInnIng value, c: change In value, d: duration
                        return c * (t / d) + b;
                    }
                });
            }
            $uEnter.click(function() {
                stopFireworks();
                $fiveBox.hide();
                setTimeout(scene6, 400); /* 进入第六场景 */
            })
        });
    }

    /* 场景六 */
    var colCount = 4,
        /* 多少列 */
        rowCount = 4; /* 多少行 */
    function scene6() {
        $box.css("background", "url('') no-repeat")
        $sixBox.fadeIn();
        /* 聚合 */
        $sixDiv.each(function() {
            var _index = $(this).index(),
                col = _index % colCount,
                /* 第几列 */
                row = Math.floor(_index / rowCount),
                /* 第几行 */
                cssLeft = sixBoxWidth / 2 - colCount / 2 * sixDivWidth + col * sixDivWidth,
                /* left的值 */
                cssTop = sixBoxHeight / 2 - rowCount / 2 * sixDivHeight + row * sixDivHeight,
                /* top的值 */
                divLeft = -col * sixDivWidth,
                /* 背景定位的宽度 */
                divTop = -row * sixDivHeight; /* 背景定位的高度 */
            $(this).css({ "left": cssLeft, "top": cssTop, "background-position": divLeft + "px " + divTop + "px" }); /* 先设置成为聚合，定位好背景图片 */
            setTimeout(scatter, 1600); /* 调用散开 */
        })
        setTimeout(scene7, 3000); /* 进入第七场景 */
    }
    /* 散开 */
    function scatter() {
        $sixDiv.each(function() {
            var _index = $(this).index(),
                col = _index % colCount,
                /* 第几列 */
                row = Math.floor(_index / rowCount),
                /* 第几行 */
                cssLeft = (col - 1) * (sixBoxWidth + sixDivWidth) - sixDivWidth,
                /* 我这里的水平间距大小为盒子大小加上它自身的宽度 */
                cssTop = (row - 1) * (sixBoxHeight + sixDivHeight) - sixDivWidth; /* 我这里的水平间距大小为盒子大小加上它自身的宽度 */
            $(this).animate({ "left": cssLeft, "top": cssTop }, 1200);
        })
    }


    /* 场景七 */
    var $sevenDiv = $(".seven-content div[class='wish']"),
        $clickMe = $(".clickMe"),
        /* 送上祝福 */
        $mask = $(".mask"),
        $popBox = $(".pop-box"),
        $write = $("#write"),
        $inputUser = $("#inputUser"),
        $uSure = $("#uSure"),
        $sevenContent = $(".seven-content");

    function scene7() {
        $sixBox.hide();
        $sevenBox.fadeIn(1000);
        $sevenDiv.each(function() {
            defineSevenDiv($(this));
        })

        function defineSevenDiv($own) {
            var _obj = defineRandom();
            $own.css({ "transform": "rotate(" + _obj.rotate + "deg)" }); /* 设置随机旋转值 */
            if (_obj.left < 0) {
                _obj.left = -10
            }
            if (_obj.top < 0) {
                _obj.top = -10;
            }
            $own.animate({ left: _obj.left + "px", top: _obj.top + "px" }); /* 随机排布 */
        }

        /* 定义随机left，top和旋转值 */
        function defineRandom() {
            var randomLeft = Math.floor(680 * (Math.random())) - 80,
                /* 图片left值 */
                randomTop = Math.floor(400 * Math.random()) - 80,
                /* 图片top值 */
                randomRotate = 20 - Math.floor(40 * Math.random()); /* 图片旋转角度 */
            return {
                left: randomLeft,
                top: randomTop,
                rotate: randomRotate
            }
        }

        /* 拖动祝福卡片 */
        draggableNote();
        /* 拖动图片 */
        function draggableNote() {
            $(".seven-content div[class='wish']").draggable({
                containment: $sevenContent,
                zIndex: 2700,
                start: function() {
                    $(this).css({ "transform": "rotate(0deg)", "cursor": "crosshair" }); /* 开始拖动图片旋转为0，鼠标样式改变 */
                },
                stop: function() {
                    var _obj = defineRandom();
                    $(this).css({ "transform": "rotate(" + _obj.rotate + "deg)", "cursor": "pointer" }); /* 停止拖动，旋转为随机的 */
                }
            })
        }

        /* 点我送祝福 */
        $clickMe.click(function() {
            $write.val("送上您的祝福吧~");
            $mask.fadeIn();
            $popBox.animate({ top: "50%" });
        })

        /* 获取焦点时 */
        $write.focus(function() {
                var _val = $(this).val();
                if (_val == "送上您的祝福吧~") {
                    $(this).val("");
                }
            })
            /* 丢失焦点时 */
        $write.blur(function() {
            var _val = $(this).val();
            if (_val.length == 0) {
                $(this).val("送上您的祝福吧~");
            }
        })

        /* 点击确定 */
        $uSure.click(function() {
            var _writeVal = $write.val();
            var _user = $inputUser.val();
            if (_user.length == 0) {
                _user = '匿名'
            }
            var _randomNum = Math.ceil(Math.random() * 6);
            if (_writeVal != "送上您的祝福吧~") {
                createNewWish(_writeVal, _user);
                sendWishToServer(_writeVal, _user);
                //提示
                layer.open({
                    content: '谢谢您的祝福~~祝您心想事成',
                    skin: 'msg',
                    time: 3 //2秒后自动关闭
                });

            } else {
                alert("请输入祝福语！");
            }
        })

        // HTML进行编码
        function HTMLDecode(text) {
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            output = output.replace(/\r\n/g, "<br />");
            output = output.replace(/\n/g, "<br />");
            return output;
        }

        function createNewWish(msg, user) {
            // 获取随机信息
            var _randomNum = Math.ceil(Math.random() * 7);
            var _wish = '<div class="wish">';
            _wish += '<div class="header-' + _randomNum + '"></div>';
            _wish += '<div class="content content-' + _randomNum + '">' + HTMLDecode(msg) + '</div>';
            _wish += '<div class="footer footer-' + _randomNum + '">';
            // _wish += '<div class="footer-img"><img src="/images/wish/wish' + _randomNum + '_flower.gif" /></div>';
            var imgUrl = common_ops.buildStaticUrl("images/wish/wish") + _randomNum +'_flower.gif';
            _wish += '<div class="footer-img"><img src="'+ imgUrl +'" /></div>';
            _wish += '<div class="footer-user"><span>by:&nbsp;&nbsp;' + user + '</span></div>';
            _wish += '</div>';
            _wish += '</div>';

            $sevenContent.append(_wish); /* 如果输入祝福语，将此标签添加的尾部 */
            defineSevenDiv($sevenContent.find("div[class='wish']:last"));
            $popBox.animate({ top: "-300px" }, function() {
                $mask.fadeOut();
                draggableNote(); /* 可拖动卡片，给新添加的标签赋予拖动功能 */
            });
        }

        function getAllWish() {
            $.ajax({
                url: baseApi + "wish/all",
                dataType: 'json',
                success: function(data) {
                    var d = eval(data)
                    var wishData = d.data
                    for (var k in wishData) {
                        createNewWish(wishData[k].text, wishData[k].user);
                    }
                    // 关闭弹出
                    layer.closeAll();
                },
                error: function() {
                    // 关闭弹出
                    layer.closeAll();
                },
                complete: function() {
                    // 关闭弹出
                    layer.closeAll();
                }
            })
        }

        function sendWishToServer(msg, user) {
            layer.open({ type: 2 });
            var json = {
                "text": msg,
                "user": user
            }
            $.ajax({
                url: baseApi + "wish/add",
                dataType: 'json',
                contentType: "application/json",
                cache: false,
                type: 'post',
                data: JSON.stringify(json),
                success: function(data) {
                    // 关闭弹出
                    layer.closeAll();
                    console.log(data)
                },
                error: function() {
                    // 关闭弹出
                    layer.closeAll();
                },
                complete: function() {
                    // 关闭弹出
                    layer.closeAll();
                }
            })
        }

        function initWish() {
            // 弹出Loading
            layer.open({ type: 2 });
            getAllWish()
        }

        initWish();
    }
})