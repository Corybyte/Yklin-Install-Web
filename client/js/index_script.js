// 在页面加载完成后执行引导
window.onload = function() {
    // 创建一个新的 Driver 实例
    var driver = new Driver();

    // 定义引导步骤
    driver.defineSteps([
        {
            element: '.option:nth-child(2) button', // 选择第二个选项按钮
            popover: {
                title: '第一步',
                description: '点击这里安装操作系统。',
                closeBtnText: '关闭',
                position: 'right',
            }
        },
        // 添加更多的引导步骤
    ]);

    // 启动引导
    driver.start();
};

function tryWithoutInstall() {
    alert("试用银河麒麟操作系统而不安装(T)");
}
  
function installOS() {
    // 修改当前页面的 URL
    window.location.href = "WizardRegister.html"; // 修改为要跳转到的页面的 URL
}
  
function checkDisk() {
    alert("检测盘片是否有错误(C)");
    // 在此处添加检测盘片是否有错的逻辑
}
  
function testMemory() {
    alert("检测内存(H)");
    // 在此处添加测试内存的逻辑
}
  
function bootFromHDD() {
    alert("从第一硬盘引导(B)");
    // 在此处添加从第一硬盘引导的逻辑
}

// 添加对键盘按键的侦测
document.addEventListener('keydown', function(event) {
    switch(event.key.toLowerCase()) {
        case 't':
            tryWithoutInstall();
            break;
        case 'i':
            installOS();
            break;
        case 'c':
            checkDisk();
            break;
        case 'h':
            testMemory();
            break;
        case 'b':
            bootFromHDD();
            break;
        case 'f1':
            // 阻止浏览器默认的 F1 功能
            event.preventDefault();
            helpFunction();
            break;
        case 'f2':
            languageFunction();
            break;
        case 'f3':
            keyboardLayoutFunction();
            break;
        case 'f4':
            modeFunction();
            break;
        case 'f5':
            accessibilityFunction();
            break;
        case 'f6':
            otherOptionsFunction();
            break;
        default:
            break;
    }
});



  // 点击帮助选项执行的函数
function helpFunction() {
    alert('您点击了帮助选项！');
}

// 点击语言选项执行的函数
function languageFunction() {
    alert('您点击了语言选项！');
}

// 点击键盘布局选项执行的函数
function keyboardLayoutFunction() {
    alert('您点击了键盘布局选项！');
}

// 点击模式选项执行的函数
function modeFunction() {
    alert('您点击了模式选项！');
}

// 点击辅助功能选项执行的函数
function accessibilityFunction() {
    alert('您点击了辅助功能选项！');
}

// 点击其他选项执行的函数
function otherOptionsFunction() {
    alert('您点击了其他选项！');
}
  