const driver = window.driver.js.driver;
if (driver) {
    console.log("successful");
} else {
    console.error("无法引用 driver 属性");
}

let currentPageIndex = 1;
const pages = document.querySelectorAll('.page');
const backButton = document.getElementById('backBtn');
// let driver
// 系统大小
let partitionSizeMiB = 61440;

// 页面加载时执行初始化操作
window.onload = function() {
    // 在页面加载时隐藏返回按钮
    updateBackButtonVisibility();
  
    // 设置
    document.getElementById("PartitionSize").value = partitionSizeMiB + " MiB";

    // 创建一个新的 Driver 实例
    const driverObj = driver({
        allowClose: false,      // 
        Animation:true,
        overlayClickNext: false,  // 是否点击阴影时下一步
        showProgress: true,
        opacity: 0,
    });

    // 定义引导步骤
    driver.defineSteps([
        {
            element: '.page.active .language-table label:nth-of-type(1)', // 选择中文简体的单选框
            popover: {
                title: '第一步',
                description: '点击这里选择语言。',
                closeBtnText: '关闭',      // 关闭按钮文字
                doneBtnText: '完成', // Text on the final button 完成按钮的文字
                showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                position: 'right',
            },
            onNextClick: ()=>{
                alert("hello");
                driver.moveNext();
            }
        },
        {
            element: '.page.active .language-table button', // 下一步按钮
            popover: {
                title: '第二步',
                description: '点击这里进行下一步。',
                doneBtnText: '完成',
                closeBtnText: '关闭',      // 关闭按钮文字
                showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                showButtons: false,         // 弹窗底部是否展示按钮
                position: 'right',
            }
        },
    ]);

    // 启动引导
    driver.start();
};

// 更新返回按钮的可见性
function updateBackButtonVisibility() {
    if (currentPageIndex === 1) {
        backButton.style.display = 'none'; // 隐藏返回按钮
    } else {
        backButton.style.display = 'block'; // 显示返回按钮
    }
}


// 跳转到下一页
function nextPage() {
    pages[currentPageIndex - 1].classList.remove('active');
    currentPageIndex++;
    pages[currentPageIndex - 1].classList.add('active');

    updateBackButtonVisibility();
}


function nextPage1() {
    nextPage();

    // 更新引导步骤
    driver.reset();
    setTimeout(updateGuideSteps1, 300);

}

function nextPage2() {
    var agreeCheckbox = document.getElementById('agreeCheckbox');
    if (agreeCheckbox.checked) {
        nextPage();
        drawWorldMap();
        driver.reset();
        setTimeout(updateGuideSteps2, 300);
    } else {
        // 如果勾选框未被选中，则禁用下一步按钮
        alert("勾选同意选框。");
    }
}

function nextPage3() {
    nextPage();
    driver.reset();
    setTimeout(updateGuideSteps3, 300);
    // 更新引导步骤
}

function nextPage4() {
    nextPage();
    driver.reset();
    setTimeout(updateGuideSteps4, 300);
    // 更新引导步骤
}

function nextPage5(){
    nextPage();
    readAllRowData();
}

function nextPage6(){
    var confirmationCheckbox = document.getElementById("confirmationCheckbox");
        var nextButton = document.getElementById("nextButton");

        if (confirmationCheckbox.checked) {
            // 如果复选框被选中，执行下一步操作
            // 在这里添加您的下一步逻辑
            nextPage();
            console.log("下一步操作");

        } else {
            // 如果复选框未被选中，提醒用户确认选择
            alert("请先确认选择！");
        }
}


// 返回上一页
function goBack() {
    if (currentPageIndex > 1) {
        pages[currentPageIndex - 1].classList.remove('active');
        currentPageIndex--;
        pages[currentPageIndex - 1].classList.add('active');
       
    }
    updateBackButtonVisibility();
    
}

// 返回首页
function goToHomePage() {
    window.location.href = 'index.html'; // 跳转到首页
}


// 更新引导步骤
function updateGuideSteps1() {
    if (currentPageIndex === 2) {
   
        var driver = new Driver({
            allowClose: false,      // 
            Animation:true,
            overlayClickNext: false,  // 是否点击阴影时下一步
            showProgress: true,
            opacity: 0,
        }); 
        // 定义第一步和第二步引导
        driver.defineSteps([
            {
                element: '.content-container textarea', // 协议内容
                popover: {
                    title: '第一步',
                    description: '阅读许可协议内容。',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            {
                element: '.content-container .checkbox-container label', // 同意条款勾选框
                popover: {
                    title: '第二步',
                    description: '勾选同意协议条款。',
                    doneBtnText: '完成',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            {
                element: '.content-container .button-container button' , // 点击下一步
                popover: {
                    title: '第三步',
                    description: '点击下一步。',
                    doneBtnText: '完成',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    showButtons: false,         // 弹窗底部是否展示按钮
                    position: 'right',
                }
            },
        ]);

        driver.start();

    }
}


function updateGuideSteps2() {
    if (currentPageIndex === 3) {
   
        var driver = new Driver({
            allowClose: false,      // 
            Animation:true,
            overlayClickNext: false,  // 是否点击阴影时下一步
            showProgress: true,
            opacity: 0,
        }); 
        // 定义第一步和第二步引导
        driver.defineSteps([
            {
                element: '#timezoneSelect', //时区
                popover: {
                    title: '第一步',
                    description: '选择北京时区',
                    doneBtnText: '完成',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            {
                element: '.timezoneOptions button', // 同意条款勾选框
                popover: {
                    title: '第二步',
                    description: '点击下一步。',
                    doneBtnText: '完成',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    showButtons: false,         // 弹窗底部是否展示按钮
                    position: 'right',
                }
            },
        ]);

        driver.start();

    }
}

function updateGuideSteps3() {
    if (currentPageIndex === 4) {
   
        var driver = new Driver({
            allowClose: false,      // 
            Animation:true,
            overlayClickNext: false,  // 是否点击阴影时下一步
            showProgress: true,
            opacity: 0,
        }); 
        // 定义第一步和第二步引导
        driver.defineSteps([
            {
                element: '.path-table label:first-child', 
                popover: {
                    title: '第一步',
                    description: '选择 Live 安装',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            {
                element: '.path-table #pathTable', 
                popover: {
                    title: '第二步',
                    description: '点击下一步。',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    showButtons: false,         // 弹窗底部是否展示按钮
                    position: 'right',
                }
            },
        ]);

        driver.start();

    }
}

function updateGuideSteps4(){
    if (currentPageIndex === 5) {
   
        var driver = new Driver({
            allowClose: false,      // 
            Animation:true,
            overlayClickNext: false,  // 是否点击阴影时下一步
            opacity: 0,
        }); 
        // 定义第一步和第二步引导
        driver.defineSteps([
            {
                element: '#page5 button:nth-child(3)', 
                popover: {
                    title: '第一步',
                    description: '点击自定义安装，然后点击下一步。',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字 
                    position: 'right',
                },
            },
               
            {
                element: '#page5 button:nth-child(3)', 
                popover: {
                    title: '第一步',
                    description: '点击自定义安装，然后点击下一步。',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字 
                    showButtons: false,         // 弹窗底部是否展示按钮
                    position: 'right',
                },
            },
            {
                element: '#customInstallContent #newPartition', 
                popover: {
                    title: '第二步',
                    description: '点击新建分区',
                    doneBtnText: '完成',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            // 选择挂载点
            {
                element: '#newPartitionForm label input[name="partitionLocation"]:checked', 
                popover: {
                    title: '第三步',
                    description: '选择新分区的位置。',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            {
                element: '#newPartitionForm #use', 
                popover: {
                    title: '第四步',
                    description: '选择文件的类型。',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            {
                element: '#newPartitionForm #mountPoint', 
                popover: {
                    title: '第五步',
                    description: '选择挂载点。',
                    doneBtnText: '完成',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },
            {
                element: '#newPartitionForm #size', 
                popover: {
                    title: '第六步',
                    description: '选择大小。',
                    closeBtnText: '关闭',      // 关闭按钮文字
                    doneBtnText: '完成',
                    showButtons: true,         // Do not show control buttons in footer 是否显示按钮
                    nextBtnText: '下一步',        // Next button text for this step 下一步按钮文字
                    prevBtnText: '上一步',    // Previous button text for this step 上一步按钮文字
                    position: 'right',
                }
            },

            
        ]);

        driver.start();

    }
}

// 绘制地图
function drawWorldMap(){
    var myChart = echarts.init(document.getElementById('world'));
    let nameMap = {
        Afghanistan: '阿富汗',
        Singapore: '新加坡',
        Angola: '安哥拉',
        Albania: '阿尔巴尼亚',
        'United Arab Emirates': '阿联酋',
        Argentina: '阿根廷',
        Armenia: '亚美尼亚',
        'French Southern and Antarctic Lands':
            '法属南半球和南极领地',
        Australia: '澳大利亚',
        Austria: '奥地利',
        Azerbaijan: '阿塞拜疆',
        Burundi: '布隆迪',
        Belgium: '比利时',
        Benin: '贝宁',
        'Burkina Faso': '布基纳法索',
        Bangladesh: '孟加拉国',
        Bulgaria: '保加利亚',
        'The Bahamas': '巴哈马',
        'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
        Belarus: '白俄罗斯',
        Belize: '伯利兹',
        Bermuda: '百慕大',
        Bolivia: '玻利维亚',
        Brazil: '巴西',
        Brunei: '文莱',
        Bhutan: '不丹',
        Botswana: '博茨瓦纳',
        'Central African Republic': '中非共和国',
        Canada: '加拿大',
        Switzerland: '瑞士',
        Chile: '智利',
        China: '中国',
        'Ivory Coast': '象牙海岸',
        Cameroon: '喀麦隆',
        'Democratic Republic of the Congo': '刚果民主共和国',
        'Republic of the Congo': '刚果共和国',
        Colombia: '哥伦比亚',
        'Costa Rica': '哥斯达黎加',
        Cuba: '古巴',
        'Northern Cyprus': '北塞浦路斯',
        Cyprus: '塞浦路斯',
        'Czech Republic': '捷克共和国',
        Germany: '德国',
        Djibouti: '吉布提',
        Denmark: '丹麦',
        'Dominican Republic': '多明尼加共和国',
        Algeria: '阿尔及利亚',
        Ecuador: '厄瓜多尔',
        Egypt: '埃及',
        Eritrea: '厄立特里亚',
        Spain: '西班牙',
        Estonia: '爱沙尼亚',
        Ethiopia: '埃塞俄比亚',
        Finland: '芬兰',
        Fiji: '斐',
        'Falkland Islands': '福克兰群岛',
        France: '法国',
        Gabon: '加蓬',
        'United Kingdom': '英国',
        Georgia: '格鲁吉亚',
        Ghana: '加纳',
        Guinea: '几内亚',
        Gambia: '冈比亚',
        'Guinea Bissau': '几内亚比绍',
        Greece: '希腊',
        Greenland: '格陵兰',
        Guatemala: '危地马拉',
        'French Guiana': '法属圭亚那',
        Guyana: '圭亚那',
        Honduras: '洪都拉斯',
        Croatia: '克罗地亚',
        Haiti: '海地',
        Hungary: '匈牙利',
        Indonesia: '印度尼西亚',
        India: '印度',
        Ireland: '爱尔兰',
        Iran: '伊朗',
        Iraq: '伊拉克',
        Iceland: '冰岛',
        Israel: '以色列',
        Italy: '意大利',
        Jamaica: '牙买加',
        Jordan: '约旦',
        Japan: '日本',
        Kazakhstan: '哈萨克斯坦',
        Kenya: '肯尼亚',
        Kyrgyzstan: '吉尔吉斯斯坦',
        Cambodia: '柬埔寨',
        Kosovo: '科索沃',
        Kuwait: '科威特',
        Laos: '老挝',
        Lebanon: '黎巴嫩',
        Liberia: '利比里亚',
        Libya: '利比亚',
        'Sri Lanka': '斯里兰卡',
        Lesotho: '莱索托',
        Lithuania: '立陶宛',
        Luxembourg: '卢森堡',
        Latvia: '拉脱维亚',
        Morocco: '摩洛哥',
        Moldova: '摩尔多瓦',
        Madagascar: '马达加斯加',
        Mexico: '墨西哥',
        Macedonia: '马其顿',
        Mali: '马里',
        Myanmar: '缅甸',
        Montenegro: '黑山',
        Mongolia: '蒙古',
        Mozambique: '莫桑比克',
        Mauritania: '毛里塔尼亚',
        Malawi: '马拉维',
        Malaysia: '马来西亚',
        Namibia: '纳米比亚',
        'New Caledonia': '新喀里多尼亚',
        Niger: '尼日尔',
        Nigeria: '尼日利亚',
        Nicaragua: '尼加拉瓜',
        Netherlands: '荷兰',
        Norway: '挪威',
        Nepal: '尼泊尔',
        'New Zealand': '新西兰',
        Oman: '阿曼',
        Pakistan: '巴基斯坦',
        Panama: '巴拿马',
        Peru: '秘鲁',
        Philippines: '菲律宾',
        'Papua New Guinea': '巴布亚新几内亚',
        Poland: '波兰',
        'Puerto Rico': '波多黎各',
        'North Korea': '北朝鲜',
        Portugal: '葡萄牙',
        Paraguay: '巴拉圭',
        Qatar: '卡塔尔',
        Romania: '罗马尼亚',
        Russia: '俄罗斯',
        Rwanda: '卢旺达',
        'Western Sahara': '西撒哈拉',
        'Saudi Arabia': '沙特阿拉伯',
        Sudan: '苏丹',
        'South Sudan': '南苏丹',
        Senegal: '塞内加尔',
        'Solomon Islands': '所罗门群岛',
        'Sierra Leone': '塞拉利昂',
        'El Salvador': '萨尔瓦多',
        Somaliland: '索马里兰',
        Somalia: '索马里',
        'Republic of Serbia': '塞尔维亚',
        Suriname: '苏里南',
        Slovakia: '斯洛伐克',
        Slovenia: '斯洛文尼亚',
        Sweden: '瑞典',
        Swaziland: '斯威士兰',
        Syria: '叙利亚',
        Chad: '乍得',
        Togo: '多哥',
        Thailand: '泰国',
        Tajikistan: '塔吉克斯坦',
        Turkmenistan: '土库曼斯坦',
        'East Timor': '东帝汶',
        'Trinidad and Tobago': '特里尼达和多巴哥',
        Tunisia: '突尼斯',
        Turkey: '土耳其',
        'United Republic of Tanzania': '坦桑尼亚',
        Uganda: '乌干达',
        Ukraine: '乌克兰',
        Uruguay: '乌拉圭',
        'United States': '美国',
        Uzbekistan: '乌兹别克斯坦',
        Venezuela: '委内瑞拉',
        Vietnam: '越南',
        Vanuatu: '瓦努阿图',
        'West Bank': '西岸',
        Yemen: '也门',
        'South Africa': '南非',
        Zambia: '赞比亚',
        Korea: '韩国',
        Tanzania: '坦桑尼亚',
        Zimbabwe: '津巴布韦',
        Congo: '刚果',
        'Central African Rep.': '中非',
        Serbia: '塞尔维亚',
        'Bosnia and Herz.': '波黑',
        'Czech Rep.': '捷克',
        'W. Sahara': '西撒哈拉',
        'Lao PDR': '老挝',
        'Dem.Rep.Korea': '朝鲜',
        'Falkland Is.': '福克兰群岛',
        'Timor-Leste': '东帝汶',
        'Solomon Is.': '所罗门群岛',
        Palestine: '巴勒斯坦',
        'N. Cyprus': '北塞浦路斯',
        Aland: '奥兰群岛',
        'Fr. S. Antarctic Lands': '法属南半球和南极陆地',
        Mauritius: '毛里求斯',
        Comoros: '科摩罗',
        'Eq. Guinea': '赤道几内亚',
        'Guinea-Bissau': '几内亚比绍',
        'Dominican Rep.': '多米尼加',
        'Saint Lucia': '圣卢西亚',
        Dominica: '多米尼克',
        'Antigua and Barb.': '安提瓜和巴布达',
        'U.S. Virgin Is.': '美国原始岛屿',
        Montserrat: '蒙塞拉特',
        Grenada: '格林纳达',
        Barbados: '巴巴多斯',
        Samoa: '萨摩亚',
        Bahamas: '巴哈马',
        'Cayman Is.': '开曼群岛',
        'Faeroe Is.': '法罗群岛',
        'IsIe of Man': '马恩岛',
        Malta: '马耳他共和国',
        Jersey: '泽西',
        'Cape Verde': '佛得角共和国',
        'Turks and Caicos Is.': '特克斯和凯科斯群岛',
        'St. Vin. and Gren.': '圣文森特和格林纳丁斯'
    }
    option = {
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                if (params.name) {
                    return params.name;
                }
            }
        },

        series: [
            {
                name: 'World Population (2010)',
                type: 'map',
                mapType: 'world',
                roam: true,
                itemStyle: {
                    areaColor: '#7B68EE', // 地图区域的颜色 如果设置了visualMap，areaColor属性将不起作用
                    borderWidth: 0.5, // 描边线宽 为 0 时无描边
                    // borderColor: '#000', // 图形的描边颜色 支持的颜色格式同 color，不支持回调函数
                    borderType: 'solid', // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
                    emphasis: {label: {show: true}}
                },
                label: {
                    show: false // 是否显示对应地名
                },
                nameMap: nameMap
            }
        ]
    };
    myChart.setOption(option);
    // 监听地图点击事件
    myChart.on('click', function(params) {
        // // 获取点击的区域名称
        alter("onclick");
        // var areaName = params.name;

        // // 创建新的 select 选项
        // var newOption = new Option(areaName, areaName);

        // // 获取 select 元素并添加新的选项
        // var selectOption = document.getElementById('timezoneSelect');
        // selectOption.appendChild(newOption);
    });
}


// page 4 页面内容
function showFolderInput() {
    var radioGhost = document.querySelector('input[name="path"][value="Ghost"]');
    var folderInputRow = document.getElementById('folderInputRow');
    if (radioGhost.checked) {
        folderInputRow.style.display = 'table-row';
    } else {
        folderInputRow.style.display = 'none';
    }
}

function openFile() {
    var fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', function() {
        var folderInput = document.getElementById('folderInput');
        folderInput.value = fileInput.value;
    });
    fileInput.click(); // 触发文件选择对话框
}


// 页面五
function showFullInstall() {
    document.getElementById('fullInstallContent').style.display = 'block';
    document.getElementById('customInstallContent').style.display = 'none';
}

function showCustomInstall() {
    document.getElementById('fullInstallContent').style.display = 'none';
    document.getElementById('customInstallContent').style.display = 'block';
}


function addPartition() {
    // 显示新建分区的内容
    document.getElementById("newPartitionForm").style.display = "block";
}




function createPartition() {
    var partitionType = document.querySelector('input[name="partitionType"]:checked').value;
    var partitionLocation = document.querySelector('input[name="partitionLocation"]:checked').value;
    var use = document.getElementById("use").value;
    var mountPoint = document.getElementById("mountPoint").value;
    var size = document.getElementById("size").value;

    var table = document.querySelector("#customInstallContent table");
    var newRow = table.insertRow(table.rows.length-1); // 添加新行

    // 设备信息
    var deviceCell = newRow.insertCell();
    deviceCell.textContent = "/dev/sda" + (table.rows.length - 3);

    // 类型信息
    var typeCell = newRow.insertCell();
    typeCell.textContent = use;

    // 挂载点信息
    var mountPointCell = newRow.insertCell();
    mountPointCell.textContent = mountPoint;

    // 大小信息
    var sizeCell = newRow.insertCell();
    sizeCell.textContent = size + "MiB";

    // 已用信息
    var useCell = newRow.insertCell();
    useCell.textContent = "0.0MiB";

    // 系统信息
    var systemCell = newRow.insertCell();
    systemCell.textContent = "";

    // 格式化信息
    var formatCell = newRow.insertCell();
    formatCell.textContent = "是";

   // 删除按钮
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "删除";
    deleteButton.onclick = function() {
        var confirmDelete = confirm("确定要删除这一行吗？");
        if (confirmDelete) {
            table.deleteRow(this.parentNode.parentNode.rowIndex);
            // 从 sizeCell 中获取其文本内容，并将其转换为数字
            var sizeCellValue = parseFloat(sizeCell.textContent);

            // 全局变量控制 value 和 max
            partitionSizeMiB = partitionSizeMiB + sizeCellValue;

                    
            // 设置
            document.getElementById("PartitionSize").value = partitionSizeMiB + " MiB";

            var sizeInput = document.getElementById("size");
            sizeInput.value = partitionSizeMiB;

        }
    };

    // 修改按钮
    var editButton = document.createElement("button");
    editButton.textContent = "修改";
    editButton.onclick = function(){
        showEditOptionsForm();
    };

    // 获取最后一个单元格
    var lastCellIndex = newRow.cells.length;

    // 创建新的单元格
    var newCell = newRow.insertCell(lastCellIndex);

    // 添加删除按钮到新的单元格
    newCell.appendChild(deleteButton);

    // 添加修改按钮到新的单元格
    newCell.appendChild(editButton);

    // 从 sizeCell 中获取其文本内容，并将其转换为数字
    var sizeCellValue = parseFloat(sizeCell.textContent);

    // 全局变量控制 value 和 max
    partitionSizeMiB = partitionSizeMiB - sizeCellValue;

            
    // 设置
    document.getElementById("PartitionSize").value = partitionSizeMiB + " MiB";

    var sizeInput = document.getElementById("size");
    sizeInput.value = partitionSizeMiB;

    // 隐藏新建分区界面
    hideNewPartitionForm();


}

// 隐藏新建分区界面的函数
function hideNewPartitionForm() {
    document.getElementById("newPartitionForm").style.display = "none";
}


// 显示修改选项界面
function showEditOptionsForm() {
    document.getElementById("editOptionsForm").style.display = "block";
}

// 更新选项
function updateOptions() {
    var editedUse = document.getElementById("editUse").value;
    var editedMountPoint = document.getElementById("editMountPoint").value;

    // 更新原表格中的值
    var originalUse = document.getElementById("use");
    originalUse.value = editedUse;

    var originalMountPoint = document.getElementById("mountPoint");
    originalMountPoint.value = editedMountPoint;

    // 隐藏修改选项界面
    hideEditOptionsForm();
}

// 隐藏修改选项界面
function hideEditOptionsForm() {
    document.getElementById("editOptionsForm").style.display = "none";
}



function readAllRowData() {
    // 找到所有的 radio 按钮
    var radioButtons = document.querySelectorAll('input[name="language"]');
    var selectedLanguage = "";

    // 遍历所有 radio 按钮
    radioButtons.forEach(function(radioButton) {
        // 检查哪个 radio 按钮被选中
        if (radioButton.checked) {
            // 获取被选中的 radio 按钮的 value 属性值
            selectedLanguage = radioButton.value;
        }
    });

    // 获取 select 元素
    var selectElement = document.getElementById("timezoneSelect");

    // 获取当前选择的索引
    var selectedIndex = selectElement.selectedIndex;

    // 获取选择的值
    var selectedTimezone = selectElement.options[selectedIndex].textContent;

    // 获取选择的值
    var table = document.getElementById("customInstallContent");
    var rows = table.getElementsByTagName("tr");
    var rowData = [];

    // 从第二行开始读取数据（跳过表头）
    for (var i = 2; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var rowContent = [];
        // 读取每一列的数据并存入数组
        for (var j = 0; j < cells.length; j++) {
            var input = cells[j].querySelector("input[type='text']"); // 获取包含在<td>中的<input>元素
            if (input) {
                rowContent.push(input.value); // 读取<input>元素的值并存入数组
            } else {
                rowContent.push(cells[j].innerText); // 如果<td>中没有<input>元素，则读取<td>的文本内容并存入数组
            }
        }
        rowData.push(rowContent);
    }


    // 将结果打包成 JSON 数据格式
    var jsonData = {
        "selectedLanguage": selectedLanguage,
        "selectedTimezone": selectedTimezone,
        "selectedPath":"Live",
        "rowData": rowData
    };

    // 打印结果到控制台
    console.log(jsonData);
    // 打印结果到控制台
    // console.log(rowData);
}

