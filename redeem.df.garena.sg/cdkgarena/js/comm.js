function isMobile() {
    return /(iPhone|iPad|iPod|iOS|Android|Windows Phone|BlackBerry|SymbianOS)/i.test(navigator.userAgent)
}

function isiPad() {
    return (navigator.userAgent.match(/(iPad)/) || (navigator.userAgent.match(/(Macintosh)/) && navigator.maxTouchPoints >= 1))
}

var langToObj = {
    en: 'English', //英语
    // 'zh-cn': '简体中文', //中文
    // fr: 'Français', //法语
    es: 'Español', //西班牙语
    // ru: 'Русский', //俄语
    // de: 'Deutsch', //德语
    ar: 'العربية', //阿语
    'zh-tw': '繁體中文', //繁中
    th: 'ไทย', //泰语
    vi: 'Tiếng Việt', //越南语
    id: 'Indonesia', //印尼语
    pt: 'Português', //葡萄牙语
    // ko: '한국어', //韩语
    // ja: '日本語', //日语
    tr: 'Türkçe', //土耳其语
    // ms: 'Bahasa Melayu' //马来语
};

//    var GLangTipeNow = GLangTipe[1];
var GLangTipeNow = GLanguage['en'];

function init() {
    // var params = new URLSearchParams(window.location.search);
    // var curLang = params.get('lang') || 'en';
    var curLang = document.querySelector('html').getAttribute('lang') || localStorage.getItem('lang') || 'en';
    GLangTipeNow = GLanguage[curLang];
    var langs = Object.keys(langToObj);
    var languageHtml = langs.map((lang) => {
        return `<li ${lang === curLang ? 'class="on"' : ''} data-value="${lang}">${langToObj[lang]}</li>`
    }).join('');
    $('.language p').text(langToObj[curLang]);
    $('.language ul').html(languageHtml);
    languageChange(curLang);

    $('.language li').click(function() {
        var $value = $(this).attr('data-value');
        languageChange($value);
        $(this).addClass('on').siblings().removeClass('on');
    });

    //    stateChange('before');

    if (isMobile() || isiPad()) {
        $('.language').click(function() {
            $(this).toggleClass('show');
            return false;
        });

        $('body').click(function() {
            $('.language').removeClass('show');
        });
    }

    window.onload = function() {
        //ajaxImg();
    };
}

function languageChange(type) {
    $('html').attr('class', type);
    $('.language p').text(langToObj[type]);
    setGTips(type);
    setFootLink(type);
};

function setGTips(obj) {
    GLangTipeNow = GLanguage[obj];
    $('[data-lang]').each(function() {
        var texts = $(this).attr('data-lang');
        $(this).html(GLangTipeNow[texts] || '');
    });
    $('[data-key]').each(function() {
        var texts = $(this).attr('data-key');
        $(this).html(GLangTipeNow[texts] || '');
    });
    $('[data-content]').each(function() {
        var texts = $(this).attr('data-content');
        $(this).attr('content', GLangTipeNow[texts] || '');
    });
    $('[data-footLink]').each(function() {
        var texts = $(this).attr('data-footLink');
        $(this).attr('href', GLangTipeNow[texts]);
    });
};

function preloadImages(images) {
    return Promise.all(
        images.map(
            image =>
            new Promise(resolve => {
                var img = new Image();
                img.src = image;
                img.onload = () => resolve(img);
            })
        )
    );
}

function ajaxImg() {
    var ajaxImgList = [];
    var ajaxImgSrc = "ossweb-img/";
    var langs = Object.keys(langToObj);

    langs.map((lang) => {
        var sloganImg = ajaxImgSrc + "slogan-" + lang + ".png";
        var btnImg = ajaxImgSrc + "btn-" + lang + ".png";
        ajaxImgList.push(sloganImg);
        ajaxImgList.push(btnImg);
    });

    preloadImages(ajaxImgList).then(() => {
        console.log('All images are preloaded');
    });
};

function stateChange(s) {
    $('.state').removeClass('show');
    $('.state-' + s).addClass('show');
}

var superTipsTime = null;

function setSuperTips(txt, t = 2000) {
    if (superTipsTime) {
        return
    }
    $('#superTips').text(txt).addClass("show");
    superTipsTime = setTimeout(function() {
        $('#superTips').addClass("hide");
        setSuperTimeNull();
    }, t);
}

function setSuperTimeNull() {
    clearTimeout(superTipsTime);
    setTimeout(function() {
        superTipsTime = null;
        $('#superTips').removeClass("show hide");
    }, 200);
}

function setDiaTips(t) {
    $('#diaTips p').text(t);
    TGDialogS('diaTips');
}

//显示弹窗
function TGDialogS(e) {
    // 利用milo库引入dialog组件
    dialogs.show({
        id: e,
        bgcolor: '#000', //弹出“遮罩”的颜色，格式为"#FF6600"，可修改，默认为"#fff
        opacity: 80 //弹出“遮罩”的透明度，格式为｛10-100｝，可选
    })
}

function setFootLink(type) {
    $("#footCookie").attr('href', 'https://www.playdeltaforce.com/' + type + '/cookie-policy.html');
};

//关闭弹窗
function closeDialog() {
    // 利用milo库引入dialog组件
    dialogs.hide()
}

$(function() {
    init();

    $('#superTips').click(function() {
        $('#superTips').addClass("hide");
        setSuperTimeNull();
    });

    $('.btn-close').click(function() {
        closeDialog();
    });

    // 过滤cdkey空格内容
    $(".exc-input").on('input', function() {
        $(this).val($(this).val().replace(/[\s]/g, ''));
    });


    //弹窗，带关闭按钮
    //setDiaTips('Successfully claimed! Please check your in-game mail.');

    //提示，不带关闭按钮，停留时间可配置，默认是2000
    //setSuperTips('Successfully claimed! Please check your in-game mail.',3000);

    //模拟登录后
    // $('.main-box .btn-signin').click(function(){
    // 	stateChange('after');
    // });

    // //模拟弹出提示  
    // $('.main-box .btn-exchange').click(function(){
    // 	setSuperTips('Successfully claimed! Please check your in-game mail.',3000);
    // });

})