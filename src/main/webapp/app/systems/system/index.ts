/**
 * Created by yl on 2017/9/15.
 */
// 字典
export * from './dict/dict.route';
export * from './dict/dict.service';

// 用户管理
export * from './user/user.route';
// 修改密码
export * from './change-psw/change-psw.route';
// 个人主页
export * from './personal/personal.route';

// 敏感词
export * from './tabooed/tabooed.route';
export * from './tabooed/tabooed.service';

//浏览器支持
export * from './browser-support/browser-support.route';

//菜单设置
export * from './menu-settings/menu-settings.route';

//消息设置
export * from './messages-settings/messages-settings.route';

//sys容器
export * from './system.component';
