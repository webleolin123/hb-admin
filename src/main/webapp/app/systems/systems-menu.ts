/**
 * Created by Administrator on 2018/7/9.
 */
import {NbMenuItem} from '@nebular/theme';

export const SYSTEMS_ITEMS: NbMenuItem[] = [
    {
        title: '首页',
        icon: 'nb-home',
        link: '/dingding/dashboard',
        home: false,
    },
    {
        title: '钉钉OA',
        group: false,
    },
    {
        title: '基础数据',
        icon: 'nb-compose',
        expanded:false,
        children: [
            {
                title: '数据管理',
                expanded:false,
                children:[
                    {
                        title: '平台',
                        link: '/dingding/section/platform'
                    },
                    {
                        title: '品牌',
                        link: '/dingding/section/brand'
                    },
                    {
                        title: '店铺',
                        link: '/dingding/section/shop'
                    },
                    {
                        title: '商品',
                        link: '/dingding/section/good'
                    },
                    {
                        title: 'SKU',
                        link: '/dingding/section/sku'
                    },
                ],
            },
            {
                title: '辅助管理',
                expanded:false,
                children:[
                    {
                        title: '帮助规则',
                        link: '/dingding/section/help-roles'
                    }
                ],
            },
        ],
    },
    {
        title: '开发管理',
        icon: 'nb-compose',
        expanded:false,
        children: [
            {
                title: '开发管理',
                expanded:false,
                children: [
                    {
                        title: '开发立项',
                        link: '/dingding/section/dev-project'
                    },
                    {
                        title: '项目管理',
                        link: '/dingding/section/project-manage'
                    },
                ],
            },
            {
                title: '设计管理',
                expanded:false,
                children: [
                    {
                        title: '包装设计申请',
                        link: '/dingding/section/package-design'
                    },
                    {
                        title: '视频拍摄申请',
                        link: '/dingding/section/video-shoot'
                    },
                    {
                        title: '页面设计申请',
                        link: '/dingding/section/page-design'
                    },
                    {
                        title: 'ID设计申请',
                        link: '/dingding/section/ID-design'
                    },
                ],
            },
            {
                title: '业务管理',
                expanded:false,
                children: [
                    {
                        title: '取样申请',
                        link: '/dingding/section/sampling'
                    },
                    {
                        title: '提交报告',
                        link: '/dingding/section/submit-report'
                    },
                    {
                        title: '合同审核',
                        link: '/dingding/section/contract-review'
                    },
                    {
                        title: '采购审核',
                        link: '/dingding/section/procurement-review'
                    },
                    {
                        title: '会议申请',
                        link: '/dingding/section/meeting'
                    },
                ],
            },
        ],
    },
    {
        title: '销售管理',
        icon: 'nb-keypad',
        expanded:false,
        children: [
            {
                title: '销售管理',
                expanded:false,
                children: [
                    {
                        title: '销售立项',
                        link: '/dingding/section/sales-project'
                    },
                    {
                        title: '销售管理',
                        link: '/dingding/section/sales-manage'
                    },
                ],
            },
            {
                title: '产品管理',
                expanded:false,
                children: [
                    {
                        title: '价格申请',
                        link: '/dingding/section/price'
                    },
                    {
                        title: '预售申请',
                        link: '/dingding/section/pre-sale'
                    },
                    {
                        title: '上下架申请',
                        link: '/dingding/section/load-upload'
                    },
                    {
                        title: '库存调拨申请',
                        link: '/dingding/section/stock-transfer',
                    },
                ],
            },
            {
                title: '推广管理',
                expanded:false,
                children: [
                    {
                        title: '直通车申请',
                        link: '/dingding/section/zhi-tong-che'
                    },
                    {
                        title: '钻展申请',
                        link: '/dingding/section/zuan-zhan'
                    },
                    {
                        title: '销售方案',
                        link: '/dingding/section/sales-plan'
                    },
                    {
                        title: '淘宝客申请',
                        link: '/dingding/section/tao-ke',
                    },
                    {
                        title: '短信申请',
                        link: '/dingding/section/message',
                    },
                    {
                        title: '达人申请',
                        link: '/dingding/section/da-ren',
                    },
                    {
                        title: '店铺广告位资源申请',
                        link: '/dingding/section/shop-ad-resource',
                    },
                ],
            },
            {
                title: '促销管理',
                expanded:false,
                children: [
                    {
                        title: '赠品申请',
                        link: '/dingding/section/gift'
                    },
                    {
                        title: '满减申请',
                        link: '/dingding/section/full-reduce'
                    },
                    {
                        title: '优惠券申请',
                        link: '/dingding/section/coupons'
                    },
                ],
            },
            {
                title: '活动管理',
                expanded:false,
                children: [
                    {
                        title: '白名单申请（商品团、品牌团、主题团）',
                        link: '/dingding/section/whitelist'
                    },
                    {
                        title: '淘抢购（商品团、品牌团、主题团）',
                        link: '/dingding/section/amoy-snap'
                    },
                    {
                        title: '聚划算（商品团、品牌团、主题团）',
                        link: '/dingding/section/poly-cost'
                    },
                    {
                        title: '其他（天天特价、公域活动）',
                        link: '/dingding/section/others',
                    },
                    {
                        title: '微信推广',
                        link: '/dingding/section/WeChat-promotion',
                    },
                    {
                        title: '客服推广',
                        link: '/dingding/section/customer-promotion',
                    },
                    {
                        title: '活动存盘',
                        link: '/dingding/section/event-save',
                    },
                ],
            },

        ],
    },
    {
        title: '综合管理',
        icon: 'nb-keypad',
        expanded:false,
        children: [
            {
                title: '工资条',
                link: '/dingding/section/salary'
            },
            {
                title: '考勤管理',
                link: '/dingding/section/attendance'
            },
            {
                title: '负面评价采集',
                link: '/dingding/section/appraise'
            },
            {
                title: '售后登记管理',
                link: '/dingding/section/clf-register',
            },
            {
                title: '会议',
                link: '/dingding/section/meetings',
            },
        ],
    },
    {
        title: '钉钉权限',
        icon: 'ion-clipboard',
        expanded:false,
        children: [
            {
                title: '权限设置',
                link: '/dingding/authority/authority-settings'
            },
            {
                title: '模块管理',
                link: '/dingding/authority/business-module'
            },
            {
                title: '部门管理',
                link: '/dingding/authority/department'
            },
            {
                title: '角色管理',
                link: '/dingding/authority/roles-manage'
            },
            {
                title: '人员管理',
                link: '/dingding/authority/personnel-manage'
            },
        ],
    },
    {
        title: '消息通知',
        icon: 'ion-clipboard',
        expanded:false,
        children: [
            {
                title: '消息中心',
                link: '/dingding/messages/notification'
            },
        ],
    },
    {
        title: '系统',
        group: false,
    },
    {
        title: '系统',
        icon: 'nb-gear',
        expanded:false,
        children: [
            {
                title: '系统字典',
                link: '/systems/system/dict',
            },
            {
                title: '菜单设置',
                link: '/systems/system/menu-settings',
            },
            {
                title: '个人信息',
                link: '/systems/system/personal',
            },
            {
                title: '敏感词',
                link: '/systems/system/tabooed',
            },
            {
                title: '消息设置',
                link: '/systems/system/messages-settings',
            },
            {
                title: '修改密码',
                link: '/systems/system/change-psw'
            },
            {
                title: '用户管理',
                link: '/systems/system/user'
            },
            {
                title: '浏览器支持',
                link: '/systems/system/browser-support'
            },
        ],
    },
    {
        title: '消息通知',
        icon: 'nb-audio',
        expanded:false,
        children: [
            {
                title: '消息通知',
                link: '/systems/messages/message',
            },
            {
                title: '短信推送',
                link: '/systems/messages/ali-sms',
            },
            {
                title: '百度推送',
                link: '/systems/messages/baidu-sms',
            },
        ],
    },
];
