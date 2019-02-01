// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = '3.0';
export const DEBUG_INFO_ENABLED = true;
export const SERVER_API_URL = '';
export const BUILD_TIMESTAMP = '';
// todo 打包时根据服务器进行修改,0-辉煌本地，1-艺乐本地，2-92服务器，3-外网服务器
const _BASE_API_URL = 'http://192.168.0.127:9580/';
// const _BASE_API_URL = 'http://192.168.0.92:8080/'; // 部署在92服务器时，项目图片展示使用的base url
// const _BASE_API_URL = 'http://192.168.0.93:8080/';//93
// const _BASE_API_URL = 'http://www.berbuy.com:8080/'; // 部署在39服务器时，项目图片展示使用的base url
//BASE_API_URL1 BASE_API_URL2 BASE_API_URL3 用于G:\myHBtoWork\admin-lc\src\main\webapp\app\account\login\login.component.ts 条件判断
export const BASE_API_URL = _BASE_API_URL;
const _BASE_SYS_DICT_FINDALL_BY_PARENT_KIND_API = 'base/api/sys-dicts/findAllByParentKind';
export const BASE_SYS_DICT_FINDALL_BY_PARENT_KIND_API = _BASE_SYS_DICT_FINDALL_BY_PARENT_KIND_API;
const _WORKFLOW_DINGDING_GET_USER_INFO_API = 'workflow/api/dingding/getEnterpriseInfo';
export const WORKFLOW_DINGDING_GET_USER_INFO_API = _WORKFLOW_DINGDING_GET_USER_INFO_API;
// 图片上传s
const _IMAGE_API_URL = 'http://www.berbuy.com:4869/'; // 图片上传接口的base url
const _UPLOAD_IMAGE_API = 'base/api/image/upload'; // 图片上传接口
// 工资条
const _WORKFLOW_TO_SALARY_API = 'workflow/api/toSalary';
export const WORKFLOW_TO_SALARY_API = _WORKFLOW_TO_SALARY_API;
//工资条新增--列表
const _WORKFLOW_TO_AperationSates_SALARY_API = 'workflow/api/aperation-states/salary';
export const WORKFLOW_TO_AperationSates_SALARY_API = _WORKFLOW_TO_AperationSates_SALARY_API;
const _WORKFLOW_TO_SALARY_KeyCodde_API = 'workflow/api/salary-records/key-code';
const _WORKFLOW_TO_SALARY_Search_API = 'workflow/api/aperation-states/search-salary';
export const WORKFLOW_TO_SALARY_Search_API = _WORKFLOW_TO_SALARY_Search_API;
//工资条新增--详情
export const WORKFLOW_TO_SALARY_KeyCodde_API = _WORKFLOW_TO_SALARY_KeyCodde_API;
const _WORKFLOW_TO_SALARY_Detail_Search_API = 'workflow/api/salary-records/search-salary-records';
export const WORKFLOW_TO_SALARY_Detail_Search_API = _WORKFLOW_TO_SALARY_Detail_Search_API;

// 考勤
const _WORKFLOW_TO_ATTENDANCE_API = 'workflow/api/import-attendance';
export const WORKFLOW_TO_ATTENDANCE_API = _WORKFLOW_TO_ATTENDANCE_API;
//考勤新增--列表
const _WORKFLOW_TO_AperationSates_Attendance_API = 'workflow/api/aperation-states/attendance';
export const WORKFLOW_TO_AperationSates_Attendance_API = _WORKFLOW_TO_AperationSates_Attendance_API;
const _WORKFLOW_TO_Attendance_KeyCodde_API = 'workflow/api/attendance-records/key-code';
const _WORKFLOW_TO_Attendance_Search_API = 'workflow/api/aperation-states/search-attendance';
export const WORKFLOW_TO_Attendance_Search_API = _WORKFLOW_TO_Attendance_Search_API;
//考勤新增--详情
export const WORKFLOW_TO_Attendance_KeyCodde_API = _WORKFLOW_TO_Attendance_KeyCodde_API;
const _WORKFLOW_TO_Attendance_Detail_Search_API = 'workflow/api/attendance-records/search-attendance-records';
export const WORKFLOW_TO_Attendance_Detail_Search_API = _WORKFLOW_TO_Attendance_Detail_Search_API;

// 负面评价采集
const _WORKFLOW_APPRAISE_API = 'workflow/api/appraises';
const _WORKFLOW_APPRAISE_ORDER_API = 'workflow/api/appraise-orders';
const _WORKFLOW_UPLOAD_PARSE_HTML_API = 'workflow/api/parseHtml';

const _WORKFLOW_APPRAISE_SEARCH_BY_CUSTOMID_API = 'workflow/api/appraise-orders/findAllByCustomerId';
const _WORKFLOW_APPRAISE_SEARCH_BY_GOODSID_API = 'workflow/api/appraise-orders/findAllByGoodsId';
const _WORKFLOW_APPRAISE_SEARCH_BY_ORDERCODE_API = 'workflow/api/appraise-orders/findAllByOrderCode';
const _WORKFLOW_APPRAISE_SEARCH_BY_LABELS_API = 'workflow/api/appraise-orders/findAllByLabels';
const _WORKFLOW_APPRAISE_SEARCH_BY_CONTENT_API = 'workflow/api/appraise-orders/findAllByContent';
const _WORKFLOW_APPRAISE_SEARCH_BY_STORE_NAME_API = 'workflow/api/appraise-orders/findByStoreName';
const _WORKFLOW_APPRAISE_FIND_BY_TIME_BETWEEN_API = 'workflow/api/appraise-orders/findByTimeBetween';
const _WORKFLOW_APPRAISE_BATCH_MODIFY_API = 'workflow/api/appraise-orders/batchModify';
const _WORKFLOW_APPRAISE_BATCH_DELETE_API = 'workflow/api/appraise-orders/batchDelete';

export const WORKFLOW_APPRAISE_API = _WORKFLOW_APPRAISE_API;
export const WORKFLOW_APPRAISE_ORDER_API = _WORKFLOW_APPRAISE_ORDER_API;
export const WORKFLOW_UPLOAD_PARSE_HTML_API = _WORKFLOW_UPLOAD_PARSE_HTML_API;

export const WORKFLOW_APPRAISE_SEARCH_BY_CUSTOMID_API = _WORKFLOW_APPRAISE_SEARCH_BY_CUSTOMID_API;
export const WORKFLOW_APPRAISE_SEARCH_BY_GOODSID_API = _WORKFLOW_APPRAISE_SEARCH_BY_GOODSID_API;
export const WORKFLOW_APPRAISE_SEARCH_BY_ORDERCODE_API = _WORKFLOW_APPRAISE_SEARCH_BY_ORDERCODE_API;
export const WORKFLOW_APPRAISE_SEARCH_BY_LABELS_API = _WORKFLOW_APPRAISE_SEARCH_BY_LABELS_API;
export const WORKFLOW_APPRAISE_SEARCH_BY_CONTENT_API = _WORKFLOW_APPRAISE_SEARCH_BY_CONTENT_API;
export const WORKFLOW_APPRAISE_SEARCH_BY_STORE_NAME_API = _WORKFLOW_APPRAISE_SEARCH_BY_STORE_NAME_API;
export const WORKFLOW_APPRAISE_FIND_BY_TIME_BETWEEN_API = _WORKFLOW_APPRAISE_FIND_BY_TIME_BETWEEN_API;
export const WORKFLOW_APPRAISE_BATCH_MODIFY_API = _WORKFLOW_APPRAISE_BATCH_MODIFY_API;
export const WORKFLOW_APPRAISE_BATCH_DELETE_API = _WORKFLOW_APPRAISE_BATCH_DELETE_API;

//  上传
const _TASK_FILR_UPLOAD_API = 'task/api/file/upload';
const _TASK_EXPORT_GOOD_AND_SKU = 'workflow/api/import-good-and-sku';
export const TASK_FILR_UPLOAD_API = _TASK_FILR_UPLOAD_API;
export const TASK_EXPORT_GOOD_AND_SKU = _TASK_EXPORT_GOOD_AND_SKU;

// 系统-数据字典
const _BASE_SYS_DICT_API = 'base/api/sys-dicts'; // 系统-数据字典
const _BASE_SYS_DICT_BYPARENT_ID = 'base/api/sys-dicts/findAllByParentID';
const _BASE_SYS_DICT_BYPARENT_KIND = 'base/api/sys-dicts/findAllByParentKind';
const _BASE_SYS_DICT_BYKIND = 'base/api/sys-dicts/findByKind';

const _BASE_SYS_BANNER_API = 'base/api/banners'; // banner
// APP 更新
const _BASE_SYS_APP_UPDATE_API = 'base/api/app-updates'; // APP 更新
const _BASE_APP_UPDATE_UPDATE_STATUS = 'base/api/app-updates/issue'; // app 更新更改状态
// 用户中心
const _USER_BASE_API_URL = 'uaa/api/users'; // 用户管理
const _USER_CHANGE_PASSWORD_API = 'uaa/api/users/changePassword'; // 修改密码
const _USER_AUTHORITY_API = 'uaa/api/users/authorities'; // 用户角色
const _USER_BASE_SEARCHUSER_API = 'uaa/api/web/users/searchBy'; // *****用户搜索
// 公司人员信息
const _WORKFLOW_GET_DEPARTMENT_LIST_API = 'workflow/api/dingding/getDepartmentList'; // 获取部门列表
const _WORKFLOW_GET_DEPARTMENT_USER_API = 'workflow/api/dingding/getDepartmentUser'; // 获取部门人员

// 短信验证码
const _SELLER_ACCOUNT_SEND_VERIFICATION = 'uaa/api/send_verification_code';
// web修改密码
const _SELLER_ACCOUNT_WEB_CHANGE_PASSWORD_API = 'uaa/api/web/account/change_password';
// web_account 注册
const _SELLER_ACCOUNT_REGISTER_API = 'uaa/api/web/register_coupon_sellser';
// 反馈
const _BASE_FEEDBACK_API = 'base/api/feedbacks';
const _BASE_BASE_CONTENT_API = 'base/api/base-contents';
// 敏感词
const _BASE_TABOOED_WORDS_API = 'base/api/tabooed-words';

// 驳回理由
const _ARTICLE_REJECT_REASONS_API = 'article/api/reject-reasons';

// 举报
const _BASE_REPORT_API = 'base/api/reports';

// **********************                钉钉OA                 **************************
const _WORKFLOW_DINGDING_MEETING_API = 'workflow/api/apply-meetings';
const _WORKFLOW_DINGDING_DEPARTMENT_LIST_API = 'workflow/api/dingding/getDepartmentList';
const _WORKFLOW_DINGDING_DEPARTMENT_USER_API = 'workflow/api/dingding/getDepartmentUser';
// 商品
const _WORKFLOW_GOOD_API = 'workflow/api/goods';
const _WORKFLOW_GOOD_SEARCH_API = 'workflow/api/goods/search';
const _WORKFLOW_GOOD_DETAIL_API = 'workflow/api/goods/detail';
// const _WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API = 'workflow/api/goods/byShopIdAndBrandId';
const _WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API = 'workflow/api/goods/search';
// 品牌
const _WORKFLOW_BRAND_API = 'workflow/api/brands';
const _WORKFLOW_BRAND_SEARCH_API = 'workflow/api/_search/brands';
// 平台
const _WORKFLOW_PLATFORM_API = 'workflow/api/platforms';
const _WORKFLOW_PLATFORM_SEARCH_API = 'workflow/api/_search/platforms';
// 店铺
const _WORKFLOW_SHOP_API = 'workflow/api/shops';
const _WORKFLOW_SHOP_SEARCH_API = 'workflow/api/_search/shops';
// 商品SKU
const _WORKFLOW_GOOD_SKU_API = 'workflow/api/good-skus';
const _WORKFLOW_GOOD_SKU_SEARCH_API = 'workflow/api/_search/good-skus';
// 直通车
const _WORKFLOW_ZHI_TONG_CHE_API = 'workflow/api/zhi-tong-ches';
const _WORKFLOW_ZHI_TONG_CHE_EXPORT_API = 'workflow/api/zhi-tong-ches/export';
// const _WORKFLOW_ZHI_TONG_CHE_SEARCH_API = 'workflow/api/_search/zhi-tong-ches';
const _WORKFLOW_ZHI_TONG_CHE_SEARCH_API = 'workflow/api/zhi-tong-ches/search';
const _WORKFLOW_ZHI_TONG_CHE_DETAIL_API = 'workflow/api/zhi-tong-ches/detail';
// 默认审批人
const _WORKFLOW_DEFAULT_APPROVER_API = 'workflow/api/default-approvers';
const _WORKFLOW_DEFAULT_APPROVER_SEARCH_API = 'workflow/api/_search/default-approvers';
// 流程
const _WORKFLOW_ACTION_PROCESS_API = 'workflow/api/action-processes';
const _WORKFLOW_ACTION_PROCESS_SEARCH_API = 'workflow/api/_search/action-processes';
// 浏览
const _WORKFLOW_ACTION_BROWSE_API = 'workflow/api/action-browses';
const _WORKFLOW_ACTION_BROWSE_SEARCH_API = 'workflow/api/_search/action-browses';
const _WORKFLOW_HELP_ROLES_API = 'workflow/api/help-roles';
// 钻展
const _WORKFLOW_ZUAN_ZHAN_API = 'workflow/api/zuan-zhans';
const _WORKFLOW_ZUAN_ZHAN_DETAIL_API = 'workflow/api/zuan-zhans/detail';
const _WORKFLOW_ZUAN_ZHAN_EXPORT_API = 'workflow/api/zuan-zhans/export';
const _WORKFLOW_ZUAN_ZHAN_SEARCH_API = 'workflow/api/zuan-zhans/search';
// 达人
const _WORKFLOW_DA_REN_API = 'workflow/api/da-rens';
const _WORKFLOW_DA_REN_DETAIL_API = 'workflow/api/da-rens/detail';
const _WORKFLOW_DA_REN_EXPORT_API = 'workflow/api/da-rens/export';
const _WORKFLOW_DA_REN_SEARCH_API = 'workflow/api/da-rens/search';
// 淘宝客
const _WORKFLOW_TAO_KE_API = 'workflow/api/tao-kes';
const _WORKFLOW_TAO_KE_DETAIL_API = 'workflow/api/tao-kes/detail';
const _WORKFLOW_TAO_KE_EXPORT_API = 'workflow/api/tao-kes/export';
const _WORKFLOW_TAO_KE_SEARCH_API = 'workflow/api/tao-kes/search';
// 短信
const _WORKFLOW_MESSAGE_API = 'workflow/api/sms-applies';
const _WORKFLOW_MESSAGE_DETAIL_API = 'workflow/api/sms-applies/detail';
const _WORKFLOW_MESSAGE_SEARCH_API = 'workflow/api/sms-applies/search';
// 店广资源
const _WORKFLOW_SHOP_RESOURCE_API = '';

// *****   文章   ********
//文章
const _ARTICLE_BASE_API = 'article/api/articles';
const _ARTICLE_WEB_DETAIL_API = 'article/api/web/articles';
const _ARTICLE_COMMENT_LIST = 'article/api/app/articles/comment/list/byArticle';
const _ARTICLE_BASE_UPDATE_API = 'article/api/articles/activate'; // 更改状态
const _ARTICLE_BASE_TONEWS_API = 'article/api/articles/toNews'; // 设置为资讯
const _ARTICLE_BASE_SETSTICKY_API = 'article/api/articles/sticky'; // 是否置顶
const _ARTICLE_BASE_DISTILLATE_API = 'article/api/articles/distillate'; // 是否置顶
const _ARTICLE_CATEGORY_API = 'article/api/categories';
const _ARTICLE_CATEGORY_API_WEBVIEW = 'article/api/categories/byWebView';
const _ARTICLE_CATEGORY_UPDATE_API = 'article/api/categories/activate'; // 更改状态
const _ARTICLE_CATEGORY_SEARCH_API = 'article/api/web/categories/search'; // 搜索圈子
const _ARTICLE_LABEL_API = 'article/api/labels';
const _ARTICLE_LABEL_SEARCH_API = 'article/api/web/labels/search'; // 搜索标签
const _ARTICLE_LABEL_BY_CATEGORY_API = 'article/api/web/labels/byIssue/category';
const _ARTICLE_LABEL_UPDATE_API = 'article/api/labels/activate'; // 更改状态

const _ARTICLE_SEARCH_ARTICLE_API = 'article/api/web/articles/search'; // ******搜索文章
const _ARTICLE_ARTICLE_BY_CATEGORY_API = 'article/api/web/articles/byCategory'; // 根据圈子查看文章
const _ARTICLE_ARTICLE_BY_LABEL_API = 'article/api/web/articles/NewsAndIssue/byLabels'; // 根据标签查看文章
const _ARTICLE_ARTICLE_BY_LOGIN_API = 'article/api/web/articles/byLogin'; // 根据用户名查看文章
const _ARTICLE_HOT_REFRESH_API = 'article/api/articles/hot/refresh';
// 文章评论
const _ARTICLE_COMMENT_BY_ARTICLE = 'article/api/web/comments/tree/byArticle';
// 钉钉权限
//  钉钉权限--权限设置--业务审批权限
const _WORKFLOW_BUSINESS_PERMISSION_API = 'workflow/api/business-permissions';
const _WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API = 'workflow/api/business-module-permissions';
const _WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API = 'workflow/api/business-permissions/by-moduleId';
const _WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API = 'workflow/api/business-permissions/approve-permissions';
const _WORKFLOW_BUSINESS_PERMISSION_SEARCH_API = 'workflow/api/business-permissions/search';
export const WORKFLOW_BUSINESS_PERMISSION_API = _WORKFLOW_BUSINESS_PERMISSION_API;
export const WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API = _WORKFLOW_BUSINESS_PERMISSION_CREATE_PERMISSIONS_API;
export const WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API = _WORKFLOW_BUSINESS_PERMISSION_GET_BY_MODULEID_API;
export const WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API = _WORKFLOW_BUSINESS_PERMISSION_APPROVE_PERMISSIONS_API;
export const WORKFLOW_BUSINESS_PERMISSION_SEARCH_API = _WORKFLOW_BUSINESS_PERMISSION_SEARCH_API;
// 钉钉权限--模块管理--业务模块
const _WORKFLOW_BUSINESS_MODULE_API = 'workflow/api/business-modules'; // query modules
const _WORKFLOW_BUSINESS_MODULE_GET_CHILD_OR_PARENT_MODULES_API = 'workflow/api/business-modules/parent-or-child'; // 获取所有子模块或父模块
const _WORKFLOW_BUSINESS_MODULE_ADD_CHILD_RELATIONSHIP_API = 'workflow/api/business-modules/add-child-relationship';
const _WORKFLOW_BUSINESS_MODULE_ADD_PARENT_RELATIONSHIP_API = 'workflow/api/business-modules/add-parent-relationship';
const _WORKFLOW_BUSINESS_MODULE_REMOVE_RELATIONSHIP_API = 'workflow/api/business-modules/remove-relationship';
export const WORKFLOW_BUSINESS_MODULE_API = _WORKFLOW_BUSINESS_MODULE_API;
export const WORKFLOW_BUSINESS_MODULE_GET_CHILD_OR_PARENT_MODULES_API = _WORKFLOW_BUSINESS_MODULE_GET_CHILD_OR_PARENT_MODULES_API;
export const WORKFLOW_BUSINESS_MODULE_ADD_CHILD_RELATIONSHIP_API = _WORKFLOW_BUSINESS_MODULE_ADD_CHILD_RELATIONSHIP_API;
export const WORKFLOW_BUSINESS_MODULE_ADD_PARENT_RELATIONSHIP_API = _WORKFLOW_BUSINESS_MODULE_ADD_PARENT_RELATIONSHIP_API;
export const WORKFLOW_BUSINESS_MODULE_REMOVE_RELATIONSHIP_API = _WORKFLOW_BUSINESS_MODULE_REMOVE_RELATIONSHIP_API;
// 钉钉权限--部门管理
const _WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API = 'workflow/api/dingding/get_department_page';
export const WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API = _WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_API;
const _WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API = 'workflow/api/dingding/get_department_page/search';
export const WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API = _WORKFLOW_DINGDING_PERMISSION_DEPARTMENT_SERACH_API;
// 钉钉权限--人员管理
const _WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API = 'workflow/api/local-users';
export const WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API = _WORKFLOW_DINGDING_PERMISSION_PERSONNEL_API;
const _WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API = 'workflow/api/local-users/search';
export const WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API = _WORKFLOW_DINGDING_PERMISSION_PERSONNEL_SEARCH_API;
// 钉钉权限--角色管理
const _WORKFLOW_DINGDING_PERMISSION_ROLES_API = 'workflow/api/roles';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_API = _WORKFLOW_DINGDING_PERMISSION_ROLES_API;
const _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API = 'workflow/api/roles/add-person-role';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API = _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_ADD_API;
const _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API = 'workflow/api/roles/delete-person-role';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API = _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_REMOVE_API;
const _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API = 'workflow/api/roles/get_all';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API = _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_API;
const _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API = 'workflow/api/roles/by-person';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API = _WORKFLOW_DINGDING_PERMISSION_ROLES_PERSON_GET_ROLESNAME_BY_PERSON_API;
const _WORKFLOW_DINGDING_PERMISSION_ROLES_SEARCH_API = 'workflow/api/roles/search';
export const WORKFLOW_DINGDING_PERMISSION_ROLES_SEARCH_API = _WORKFLOW_DINGDING_PERMISSION_ROLES_SEARCH_API;

export const ARTICLE_BASE_API = _ARTICLE_BASE_API;
export const ARTICLE_WEB_DETAIL_API = _ARTICLE_WEB_DETAIL_API;
export const ARTICLE_COMMENT_LIST = _ARTICLE_COMMENT_LIST;
export const ARTICLE_BASE_SETSTICKY_API = _ARTICLE_BASE_SETSTICKY_API;
export const ARTICLE_BASE_DISTILLATE_API = _ARTICLE_BASE_DISTILLATE_API;
export const ARTICLE_BASE_UPDATE_API = _ARTICLE_BASE_UPDATE_API;
export const ARTICLE_BASE_TONEWS_API = _ARTICLE_BASE_TONEWS_API;
export const ARTICLE_CATEGORY_API = _ARTICLE_CATEGORY_API;
export const ARTICLE_CATEGORY_API_WEBVIEW = _ARTICLE_CATEGORY_API_WEBVIEW;
export const ARTICLE_CATEGORY_UPDATE_API = _ARTICLE_CATEGORY_UPDATE_API;
export const ARTICLE_CATEGORY_SEARCH_API = _ARTICLE_CATEGORY_SEARCH_API;
export const ARTICLE_LABEL_API = _ARTICLE_LABEL_API; // 标签
export const ARTICLE_LABEL_BY_CATEGORY_API = _ARTICLE_LABEL_BY_CATEGORY_API;// 根据圈子查看标签
export const ARTICLE_LABEL_SEARCH_API = _ARTICLE_LABEL_SEARCH_API; // 搜索标签
export const ARTICLE_LABEL_UPDATE_API = _ARTICLE_LABEL_UPDATE_API;

// 文章搜索
export const ARTICLE_SEARCH_ARTICLE_API = _ARTICLE_SEARCH_ARTICLE_API;
export const ARTICLE_ARTICLE_BY_CATEGORY_API = _ARTICLE_ARTICLE_BY_CATEGORY_API; // 根据圈子查看文章
export const ARTICLE_ARTICLE_BY_LABEL_API = _ARTICLE_ARTICLE_BY_LABEL_API; // 根据标签查看文章
export const ARTICLE_ARTICLE_BY_LOGIN_API = _ARTICLE_ARTICLE_BY_LOGIN_API;// 根据用户名查看文章
export const ARTICLE_HOT_REFRESH_API = _ARTICLE_HOT_REFRESH_API;// 刷新热门文章
// 文章评论
export const ARTICLE_COMMENT_BY_ARTICLE = _ARTICLE_COMMENT_BY_ARTICLE;

// 动态管理
const _MOOD_MOOD_NOTE_API = 'article/api/mood-notes';
const _MOOD_DETAIL_API = 'article/api/app/mood-notes';
const _MOOD_MOOD_NOTE_BY_LOGIN_API = 'article/api/web/mood-notes/byLogin'; // 根据用户名查看动态
const _MOOD_SEARCH_MOOD_PAI = 'article/api/web/moodNote/search'; // 搜索动态
// 评论
const _MOOD_COMMENT_API = 'article/api/comments';
const _MOOD_COMMENT_BY_MOODNOTE = 'article/api/app/moodNote/comment/list/byMoodNote';

// 动态管理
export const MOOD_MOOD_NOTE_API = _MOOD_MOOD_NOTE_API;
export const MOOD_DETAIL_API = _MOOD_DETAIL_API;
export const MOOD_COMMENT_API = _MOOD_COMMENT_API;
export const MOOD_COMMENT_BY_MOODNOTE = _MOOD_COMMENT_BY_MOODNOTE; // 根据动态查看评论
export const MOOD_MOOD_NOTE_BY_LOGIN_API = _MOOD_MOOD_NOTE_BY_LOGIN_API; // 查看用户动态
export const MOOD_SEARCH_MOOD_PAI = _MOOD_SEARCH_MOOD_PAI; // 搜索动态

// 圈子审批
const _ARTICLE_CATEGORY_BY_APPLY_API = 'article/api/app/categories/byApply'; // 圈子申请列表
const _ARTICLE_CATEGORY_APPLY_TO_EXAMINE = 'article/api/app/categories/applyToExamine'; // 审核圈子申请

const _ARTICLE_CATEGORY_FANS_API = 'article/api/web/attentions/byBusiness/kind'; // 查看圈子成员
const _ARTICLE_CATEGORY_FANS_BANNED_TO_POST_API = 'article/api/banned-to-posts/category'; // 禁言
const _ARTICLE_CATEGORY_FANS_ADD_MANAGER_API = 'article/api/categories/addManager'; // 设为管理员
const _ARTICLE_CATEGORY_FANS_REMOVE_MANAGER_API = 'article/api/categories/removeManager'; // 取消管理员

// 积分
const _POINT_LEVEL_STANDARD_API = 'base/api/level-standards'; // 积分等级
const _POINT_USER_LEVEL_API = 'base/api/user-levels'; // 用户等级
const _POINT_COIN_HISTORY_API = 'base/api/coin-histories'; // 金币记录
const _POINT_EXPERIENCE_HISTORY_API = 'base/api/experience-histories'; // 经验记录
const _POINT_ACTION_REWARD_API = 'base/api/action-rewards'; // 操作奖励
const _POINT_PRIVILEGES_API = 'base/api/privileges'; // 特权

export const USER_BASE_API_URL = _USER_BASE_API_URL;
export const USER_AUTHORITY_API = _USER_AUTHORITY_API;
export const USER_CHANGE_PASSWORD_API = _USER_CHANGE_PASSWORD_API;
export const USER_BASE_SEARCHUSER_API = _USER_BASE_SEARCHUSER_API;
export const WORKFLOW_GET_DEPARTMENT_LIST_API = _WORKFLOW_GET_DEPARTMENT_LIST_API; // 获取部门列表
export const WORKFLOW_GET_DEPARTMENT_USER_API = _WORKFLOW_GET_DEPARTMENT_USER_API; // 获取部门人员

export const IMAGE_API_URL = _IMAGE_API_URL;
export const UPLOAD_IMAGE_API = _UPLOAD_IMAGE_API;
export const SELLER_ACCOUNT_SEND_VERIFICATION = _SELLER_ACCOUNT_SEND_VERIFICATION;
export const SELLER_ACCOUNT_WEB_CHANGE_PASSWORD_API = _SELLER_ACCOUNT_WEB_CHANGE_PASSWORD_API;
export const SELLER_ACCOUNT_REGISTER_API = _SELLER_ACCOUNT_REGISTER_API;

// 字典
export const BASE_SYS_DICT_API = _BASE_SYS_DICT_API;
export const BASE_SYS_DICT_BYPARENT_ID = _BASE_SYS_DICT_BYPARENT_ID;
export const BASE_SYS_DICT_BYPARENT_KIND = _BASE_SYS_DICT_BYPARENT_KIND;
export const BASE_SYS_DICT_BYKIND = _BASE_SYS_DICT_BYKIND;

export const BASE_SYS_BANNER_API = _BASE_SYS_BANNER_API;

export const BASE_SYS_APP_UPDATE_API = _BASE_SYS_APP_UPDATE_API;
export const BASE_APP_UPDATE_UPDATE_STATUS = _BASE_APP_UPDATE_UPDATE_STATUS;

// 反馈
export const BASE_FEEDBACK_API = _BASE_FEEDBACK_API;
export const BASE_BASE_CONTENT_API = _BASE_BASE_CONTENT_API; // 规则
// 敏感词
export const BASE_TABOOED_WORDS_API = _BASE_TABOOED_WORDS_API;

// 敏感词
export const ARTICLE_REJECT_REASONS_API = _ARTICLE_REJECT_REASONS_API;

// 举报
export const BASE_REPORT_API = _BASE_REPORT_API;

export const WORKFLOW_DINGDING_MEETING_API = _WORKFLOW_DINGDING_MEETING_API;

export const WORKFLOW_DINGDING_DEPARTMENT_LIST_API = _WORKFLOW_DINGDING_DEPARTMENT_LIST_API;
export const WORKFLOW_DINGDING_DEPARTMENT_USER_API = _WORKFLOW_DINGDING_DEPARTMENT_USER_API;

// 商品
export const WORKFLOW_GOOD_API = _WORKFLOW_GOOD_API;
export const WORKFLOW_GOOD_SEARCH_API = _WORKFLOW_GOOD_SEARCH_API;
export const WORKFLOW_GOOD_DETAI_API = _WORKFLOW_GOOD_DETAIL_API;
export const WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API = _WORKFLOW_FIND_GOOD_BY_SHOP_AND_BRAND_API; // 根据店铺和品牌获取商品

// 品牌
export const WORKFLOW_BRAND_API = _WORKFLOW_BRAND_API;
export const WORKFLOW_BRAND_SEARCH_API = _WORKFLOW_BRAND_SEARCH_API;

// 平台
export const WORKFLOW_PLATFORM_API = _WORKFLOW_PLATFORM_API;
export const WORKFLOW_PLATFORM_SEARCH_API = _WORKFLOW_PLATFORM_SEARCH_API;

// 店铺
export const WORKFLOW_SHOP_API = _WORKFLOW_SHOP_API;
export const WORKFLOW_SHOP_SEARCH_API = _WORKFLOW_SHOP_SEARCH_API;

// 商品SKU
export const WORKFLOW_GOOD_SKU_API = _WORKFLOW_GOOD_SKU_API;
export const WORKFLOW_GOOD_SKU_SEARCH_API = _WORKFLOW_GOOD_SKU_SEARCH_API;

// 直通车
export const WORKFLOW_ZHI_TONG_CHE_API = _WORKFLOW_ZHI_TONG_CHE_API;
export const WORKFLOW_ZHI_TONG_CHE_EXPORT_API = _WORKFLOW_ZHI_TONG_CHE_EXPORT_API;
export const WORKFLOW_ZHI_TONG_CHE_SEARCH_API = _WORKFLOW_ZHI_TONG_CHE_SEARCH_API;
export const WORKFLOW_ZHI_TONG_CHE_DETAIL_API = _WORKFLOW_ZHI_TONG_CHE_DETAIL_API;

// 默认审批人
export const WORKFLOW_DEFAULT_APPROVER_API = _WORKFLOW_DEFAULT_APPROVER_API;
export const WORKFLOW_DEFAULT_APPROVER_SEARCH_API = _WORKFLOW_DEFAULT_APPROVER_SEARCH_API;

// 流程
export const WORKFLOW_ACTION_PROCESS_API = _WORKFLOW_ACTION_PROCESS_API;
export const WORKFLOW_ACTION_PROCESS_SEARCH_API = _WORKFLOW_ACTION_PROCESS_SEARCH_API;

// 浏览
export const WORKFLOW_ACTION_BROWSE_API = _WORKFLOW_ACTION_BROWSE_API;
export const WORKFLOW_ACTION_BROWSE_SEARCH_API = _WORKFLOW_ACTION_BROWSE_SEARCH_API;

export const WORKFLOW_HELP_ROLES_API = _WORKFLOW_HELP_ROLES_API;

// 钻展
export const WORKFLOW_ZUAN_ZHAN_API = _WORKFLOW_ZUAN_ZHAN_API;
export const WORKFLOW_ZUAN_ZHAN_DETAIL_API = _WORKFLOW_ZUAN_ZHAN_DETAIL_API;
export const WORKFLOW_ZUAN_ZHAN_EXPORT_API = _WORKFLOW_ZUAN_ZHAN_EXPORT_API;
export const WORKFLOW_ZUAN_ZHAN_SEARCH_API = _WORKFLOW_ZUAN_ZHAN_SEARCH_API;
// 达人
export const WORKFLOW_DA_REN_API = _WORKFLOW_DA_REN_API;
export const WORKFLOW_DA_REN_DETAIL_API = _WORKFLOW_DA_REN_DETAIL_API;
export const WORKFLOW_DA_REN_EXPORT_API = _WORKFLOW_DA_REN_EXPORT_API;
export const WORKFLOW_DA_REN_SEARCH_API = _WORKFLOW_DA_REN_SEARCH_API;
// 淘宝客
export const WORKFLOW_TAO_KE_API = _WORKFLOW_TAO_KE_API;
export const WORKFLOW_TAO_KE_DETAIL_API = _WORKFLOW_TAO_KE_DETAIL_API;
export const WORKFLOW_TAO_KE_EXPORT_API = _WORKFLOW_TAO_KE_EXPORT_API;
export const WORKFLOW_TAO_KE_SEARCH_API = _WORKFLOW_TAO_KE_SEARCH_API;
// 短信
export const WORKFLOW_MESSAGE_API = _WORKFLOW_MESSAGE_API;
export const WORKFLOW_MESSAGE_DETAIL_API = _WORKFLOW_MESSAGE_DETAIL_API;
export const WORKFLOW_MESSAGE_SEARCH_API = _WORKFLOW_MESSAGE_SEARCH_API;
// 店广资源
export const WORKFLOW_SHOP_RESOURCE_API = _WORKFLOW_SHOP_RESOURCE_API;

// 圈子审批
export const ARTICLE_CATEGORY_BY_APPLY_API = _ARTICLE_CATEGORY_BY_APPLY_API;
export const ARTICLE_CATEGORY_APPLY_TO_EXAMINE = _ARTICLE_CATEGORY_APPLY_TO_EXAMINE;

export const ARTICLE_CATEGORY_FANS_API = _ARTICLE_CATEGORY_FANS_API; // 查看圈子成员
export const ARTICLE_CATEGORY_FANS_BANNED_TO_POST_API = _ARTICLE_CATEGORY_FANS_BANNED_TO_POST_API; // 禁言
export const ARTICLE_CATEGORY_FANS_ADD_MANAGER_API = _ARTICLE_CATEGORY_FANS_ADD_MANAGER_API; // 设为管理员
export const ARTICLE_CATEGORY_FANS_REMOVE_MANAGER_API = _ARTICLE_CATEGORY_FANS_REMOVE_MANAGER_API; // 取消管理员

// 积分
export const POINT_LEVEL_STANDARD_API = _POINT_LEVEL_STANDARD_API; // 积分等级
export const POINT_USER_LEVEL_API = _POINT_USER_LEVEL_API; // 用户等级
export const POINT_COIN_HISTORY_API = _POINT_COIN_HISTORY_API; // 金币记录
export const POINT_EXPERIENCE_HISTORY_API = _POINT_EXPERIENCE_HISTORY_API; // 经验记录
export const POINT_ACTION_REWARD_API = _POINT_ACTION_REWARD_API; // 操作奖励
export const POINT_PRIVILEGES_API = _POINT_PRIVILEGES_API; // 特权

// 消息管理
const _TASK_ALI_SMS_PUSH_API = 'base/api/ali-sms-push-records'; // 短信推送
const _TASK_BAIDU_PUSH_RECORD_API = 'base/api/baidu-push-records'; // 百度推送记录
const _TASK_BAIDU_PUSH_TO_ALL_API = 'base/api/BaiduPush/toDevice'; // 百度推送给全部用户
const _TASK_BAIDU_PUSH_TO_SINGLE_API = 'base/api/BaiduPush/toSingleDevice'; // 百度推送给特定用户
const _TASK_BAIDU_PUSH_TO_TAG_API = 'base/api/BaiduPush/toTag'; // 百度推送给tag组用户

const _TASK_BAIDU_PUSH_QUERY_MSG_STATUS_API = 'base/api/BaiduPush/queryMsgStatus'; // 百度推送 查询信息发生状态

const _TASK_BAIDU_PUSH_DEVICE_NUM_IN_TAG_API = 'base/api/BaiduPush/queryDevicesNumInTag'; // 百度推送 查询标签下的设备数
const _TASK_BAIDU_PUSH_ADD_DEVICE_TO_TAG_API = 'base/api/BaiduPush/addDevicesToTag'; // 百度推送 在标签下添加设备
const _TASK_BAIDU_PUSH_DEL_DEVICE_FROM_TAG_API = 'base/api/BaiduPush/deconsteDevicesFromTag'; // 百度推送  删除便签下的某用户

const _TASK_BAIDU_PUSH_CREATE_TAG_API = 'base/api/BaiduPush/createTag'; // 百度推送  创建标签
const _TASK_BAIDU_PUSH_QUERY_TAG_API = 'base/api/BaiduPush/queryTags'; // 百度推送 查询标签
const _TASK_BAIDU_PUSH_DEL_TAG_API = 'base/api/BaiduPush/deconsteTag'; // 百度推送  删除标签

const _TASK_MESSAGE_API = 'base/api/messages';
// 消息管理
export const TASK_ALI_SMS_PUSH_API = _TASK_ALI_SMS_PUSH_API;
export const TASK_BAIDU_PUSH_RECORD_API = _TASK_BAIDU_PUSH_RECORD_API;
export const TASK_BAIDU_PUSH_TO_ALL_API = _TASK_BAIDU_PUSH_TO_ALL_API;// 百度推送给全部用户
export const TASK_BAIDU_PUSH_TO_SINGLE_API = _TASK_BAIDU_PUSH_TO_SINGLE_API;// 百度推送给特定用户
export const TASK_BAIDU_PUSH_TO_TAG_API = _TASK_BAIDU_PUSH_TO_TAG_API;// 百度推送给tag组用户

// 消息通知
export const TASK_MESSAGE_API = _TASK_MESSAGE_API;

export const TASK_BAIDU_PUSH_QUERY_MSG_STATUS_API = _TASK_BAIDU_PUSH_QUERY_MSG_STATUS_API; // 百度推送 查询信息发生状态

export const TASK_BAIDU_PUSH_DEVICE_NUM_IN_TAG_API = _TASK_BAIDU_PUSH_DEVICE_NUM_IN_TAG_API; // 百度推送 查询标签下的设备数
export const TASK_BAIDU_PUSH_ADD_DEVICE_TO_TAG_API = _TASK_BAIDU_PUSH_ADD_DEVICE_TO_TAG_API; // 百度推送 在标签下添加设备
export const TASK_BAIDU_PUSH_DEL_DEVICE_FROM_TAG_API = _TASK_BAIDU_PUSH_DEL_DEVICE_FROM_TAG_API; // 百度推送  删除便签下的某用户

export const TASK_BAIDU_PUSH_CREATE_TAG_API = _TASK_BAIDU_PUSH_CREATE_TAG_API; // 百度推送  创建标签
export const TASK_BAIDU_PUSH_QUERY_TAG_API = _TASK_BAIDU_PUSH_QUERY_TAG_API; // 百度推送 查询标签
export const TASK_BAIDU_PUSH_DEL_TAG_API = _TASK_BAIDU_PUSH_DEL_TAG_API; // 百度推送  删除标签

// 消息通知--myNotification
//消息中心
const _WORKFLOW_Notification_API = 'workflow/api/announcements';
//消息中心--暴露接口
export const WORKFLOW_Notification_API = _WORKFLOW_Notification_API;

//错漏发登记管理
const _WORKFLOW_CUO_LOU_FA_API = 'workflow/api/error-delivery-records';
const __WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API = 'workflow/api/errorDeliveryRecord/viewDataYear';
const __WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API = 'workflow/api/errorDeliveryRecord/viewDataMonth';
const __WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API = 'workflow/api/errorDeliveryRecord/viewDataDay';
const _WORKFLOW_CUO_LOU_FA_SEARCH_BY_API = 'workflow/api/search-ErrorDeliveryRecord';
const _WORKFLOW_CUO_LOU_FA_BatchEdit_API = 'workflow/api/error-delivery-records/LotUpdateStatus';
const _WORKFLOW_CUO_LOU_FA_BatchDelete_API = 'workflow/api/error-delivery-records/LotDeleteStatus';
const _WORKFLOW_CUO_LOU_FA_Export_API = 'workflow/api/errorDeliveryRecord/export';
// 错漏发登记管理--暴露接口
export const WORKFLOW_CUO_LOU_FA_API = _WORKFLOW_CUO_LOU_FA_API;
export const WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API = __WORKFLOW_CUO_LOU_FA_VIEWDATA_YEAR_API ;
export const WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API = __WORKFLOW_CUO_LOU_FA_VIEWDATA_MONTH_API;
export const WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API = __WORKFLOW_CUO_LOU_FA_VIEWDATA_DAY_API ;
export const WORKFLOW_CUO_LOU_FA_SEARCH_BY_API = _WORKFLOW_CUO_LOU_FA_SEARCH_BY_API ;
export const WORKFLOW_CUO_LOU_FA_BatchEdit_API = _WORKFLOW_CUO_LOU_FA_BatchEdit_API ;
export const WORKFLOW_CUO_LOU_FA_BatchDelete_API = _WORKFLOW_CUO_LOU_FA_BatchDelete_API ;
export const WORKFLOW_CUO_LOU_FA_Export_API = _WORKFLOW_CUO_LOU_FA_Export_API ;

// 产品管理--价格申请
const _WORKFLOW_PRICE_MANAGE_API = 'workflow/api/price-manages';
const _WORKFLOW_PRICE_MANAGE_SEARCH_API = 'workflow/api/price-manages/search';
// 产品管理--价格申请--暴露接口
export const WORKFLOW_PRICE_MANAGE_API = _WORKFLOW_PRICE_MANAGE_API;
export const WORKFLOW_PRICE_MANAGE_SEARCH_API = _WORKFLOW_PRICE_MANAGE_SEARCH_API;
// 产品管理--上下架
const _WORKFLOW_SHELVES_API = 'workflow/api/shelves-manages';
const _WORKFLOW_SHELVES_SEARCH_API = 'workflow/api/shelves-manages/search';
// 产品管理--上下架--暴露接口
export const WORKFLOW_SHELVES_API = _WORKFLOW_SHELVES_API;
export const WORKFLOW_SHELVES_SEARCH_API = _WORKFLOW_SHELVES_SEARCH_API;
// 产品管理--预售
const _WORKFLOW_PRESELLS_API = 'workflow/api/presells';
const _WORKFLOW_PRESELLS_SEARCH_API = 'workflow/api/presells/search';
// 产品管理--预售--暴露接口
export const WORKFLOW_PRESELLS_API = _WORKFLOW_PRESELLS_API;
export const WORKFLOW_PRESELLS_SEARCH_API = _WORKFLOW_PRESELLS_SEARCH_API;
// 产品管理--库存调拨
const _WORKFLOW_STOCK_API = 'workflow/api/storage-transfers';
const _WORKFLOW_STOCK_SEARCH_API = 'workflow/api/storage-transfers/search';
// 产品管理--库存调拨--暴露接口
export const WORKFLOW_STOCK_MANAGE_API = _WORKFLOW_STOCK_API;
export const WORKFLOW_STOCK_MANAGE_SEARCH_API = _WORKFLOW_STOCK_SEARCH_API;

//促销管理
// 促销管理--预售
const _WORKFLOW_GIFTS_API = 'workflow/api/gift-applies';
const _WORKFLOW_GIFTS_SEARCH_API = 'workflow/api/gift-applies/search';
// 促销管理--预售--暴露接口
export const WORKFLOW_GIFTS_API = _WORKFLOW_GIFTS_API;
export const WORKFLOW_GIFTS_SEARCH_API = _WORKFLOW_GIFTS_SEARCH_API;
// 促销管理--满减
const _WORKFLOW_REDUCES_LESS_API = 'workflow/api/discounts/less';
const _WORKFLOW_REDUCES_API = 'workflow/api/discounts';
const _WORKFLOW_REDUCES_LESS_SEARCH_API = 'workflow/api/discounts/less-search';
// 促销管理--满减--暴露接口
export const WORKFLOW_REDUCES_LESS_API = _WORKFLOW_REDUCES_LESS_API;
export const WORKFLOW_REDUCES_API = _WORKFLOW_REDUCES_API;
export const WORKFLOW_REDUCES_LESS_SEARCH_API = _WORKFLOW_REDUCES_LESS_SEARCH_API;
// 促销管理--优惠券
const _WORKFLOW_COUPONS_COUPON_API = 'workflow/api/discounts/coupon';
const _WORKFLOW_COUPONS_API = 'workflow/api/discounts';
const _WORKFLOW_COUPONS_SEARCH_API = 'workflow/api/discounts/coupon-search';
// 促销管理--优惠券--暴露接口
export const WORKFLOW_COUPONS_COUPON_API = _WORKFLOW_COUPONS_COUPON_API;
export const WORKFLOW_COUPONS_API = _WORKFLOW_COUPONS_API;
export const WORKFLOW_COUPONS_SEARCH_API = _WORKFLOW_COUPONS_SEARCH_API;

//主页
const _WORKFLOW_HOME_API = 'workflow/api/statistics-applications/total';
const _WORKFLOW_HOME_YEAR_TREND_API = 'workflow/api/statistics-applications/year-trends';
const _WORKFLOW_HOME_MONTH_TREND_API = 'workflow/api/statistics-applications/month-trends';
const _WORKFLOW_HOME_DAY_TREND_API = 'workflow/api/statistics-applications/day-trends';
const _WORKFLOW_HOME_YEAR_TREND_EXPORT_API = 'workflow/api/statistics-applications/year-export';
const _WORKFLOW_HOME_MONTH_TREND_EXPORT_API = 'workflow/api/statistics-applications/month-export';
const _WORKFLOW_HOME_DAY_TREND_EXPORT_API = 'workflow/api/statistics-applications/day-export';
const _WORKFLOW_HOME_BUSINESS_YEAR_TREND_API = 'workflow/api/statistics-applications/module-trends';//业务模块年趋势
const _WORKFLOW_HOME_BUSINESS_MONTH_TREND_API = 'workflow/api/statistics-applications/module-month-trends';//业务模块月趋势
const _WORKFLOW_HOME_BUSINESS_DAY_TREND_API = 'workflow/api/statistics-applications/module-day-trends';//业务模块日趋势
const _WORKFLOW_HOME_BUSINESS_DETAIL_API = 'workflow/api/statistics-applications/module-details';//业务模块趋势
const _WORKFLOW_HOME_BUSINESS_SEARCH_API = 'workflow/api/statistics-applications/module-search';//业务查询
const _WORKFLOW_HOME_GOODS_YEAR_TREND_API = 'workflow/api/statistics-applications/good-trends';//商品年趋势
const _WORKFLOW_HOME_GOODS_MONTH_TREND_API = 'workflow/api/statistics-applications/good-month-trends';//商品月趋势
const _WORKFLOW_HOME_GOODS_DAY_TREND_API = 'workflow/api/statistics-applications/good-day-trends';//商品日趋势
const _WORKFLOW_HOME_GOODS_SEARCH_API = 'workflow/api/statistics-applications/good-search';//商品查询
const _WORKFLOW_HOME_GOODS_TREND_DETAIL_API = 'workflow/api/statistics-applications/good-details';//商品趋势
const _WORKFLOW_HOME_PERSON_YEAR_TREND_API = 'workflow/api/statistics-applications/applicant-trends';//人员年趋势
const _WORKFLOW_HOME_PERSON_MONTH_TREND_API = 'workflow/api/statistics-applications/applicant-month-trends';//人员月趋势
const _WORKFLOW_HOME_PERSON_DAY_TREND_API = 'workflow/api/statistics-applications/applicant-day-trends';//人员日趋势
const _WORKFLOW_HOME_PERSON_SEARCH_API = 'workflow/api/statistics-applications/applicant-search';//人员查询
const _WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API = 'workflow/api/statistics-applications/applicant-details';//人员分析明细
const _WORKFLOW_HOME_DETAIL_PERSON_API = 'workflow/api/statistics-applications/applicant';//人员分析明细
const _WORKFLOW_HOME_DETAIL_BUSINESS_API = 'workflow/api/statistics-applications/module';//业务分析明细
const _WORKFLOW_HOME_DETAIL_GOODS_API = 'workflow/api/statistics-applications/good';//商品分析明细
// 主页--暴露接口
export const WORKFLOW_HOME_API = _WORKFLOW_HOME_API;
export const WORKFLOW_HOME_YEAR_TREND_API = _WORKFLOW_HOME_YEAR_TREND_API;
export const WORKFLOW_HOME_MONTH_TREND_API = _WORKFLOW_HOME_MONTH_TREND_API;
export const WORKFLOW_HOME_DAY_TREND_API = _WORKFLOW_HOME_DAY_TREND_API;
export const WORKFLOW_HOME_MONTH_TREND_EXPORT_API = _WORKFLOW_HOME_MONTH_TREND_EXPORT_API;
export const WORKFLOW_HOME_YEAR_TREND_EXPORT_API = _WORKFLOW_HOME_YEAR_TREND_EXPORT_API;
export const WORKFLOW_HOME_DAY_TREND_EXPORT_API = _WORKFLOW_HOME_DAY_TREND_EXPORT_API;
export const WORKFLOW_HOME_BUSINESS_YEAR_TREND_API = _WORKFLOW_HOME_BUSINESS_YEAR_TREND_API;
export const WORKFLOW_HOME_BUSINESS_MONTH_TREND_API = _WORKFLOW_HOME_BUSINESS_MONTH_TREND_API;
export const WORKFLOW_HOME_BUSINESS_DAY_TREND_API = _WORKFLOW_HOME_BUSINESS_DAY_TREND_API;
export const WORKFLOW_HOME_BUSINESS_DETAIL_API = _WORKFLOW_HOME_BUSINESS_DETAIL_API;
export const WORKFLOW_HOME_BUSINESS_SEARCH_API = _WORKFLOW_HOME_BUSINESS_SEARCH_API;
export const WORKFLOW_HOME_GOODS_YEAR_TREND_API = _WORKFLOW_HOME_GOODS_YEAR_TREND_API;
export const WORKFLOW_HOME_GOODS_MONTH_TREND_API = _WORKFLOW_HOME_GOODS_MONTH_TREND_API;
export const WORKFLOW_HOME_GOODS_DAY_TREND_API = _WORKFLOW_HOME_GOODS_DAY_TREND_API;
export const WORKFLOW_HOME_GOODS_SEARCH_API = _WORKFLOW_HOME_GOODS_SEARCH_API;
export const WORKFLOW_HOME_GOODS_TREND_DETAIL_API = _WORKFLOW_HOME_GOODS_TREND_DETAIL_API;
export const WORKFLOW_HOME_PERSON_YEAR_TREND_API = _WORKFLOW_HOME_PERSON_YEAR_TREND_API;
export const WORKFLOW_HOME_PERSON_MONTH_TREND_API = _WORKFLOW_HOME_PERSON_MONTH_TREND_API;
export const WORKFLOW_HOME_PERSON_DAY_TREND_API = _WORKFLOW_HOME_PERSON_DAY_TREND_API;
export const WORKFLOW_HOME_PERSON_SEARCH_API = _WORKFLOW_HOME_PERSON_SEARCH_API;
export const WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API = _WORKFLOW_HOME_DETAIL_PERSON_DETAIL_API;
export const WORKFLOW_HOME_DETAIL_PERSON_API = _WORKFLOW_HOME_DETAIL_PERSON_API;
export const WORKFLOW_HOME_DETAIL_BUSINESS_API = _WORKFLOW_HOME_DETAIL_BUSINESS_API;
export const WORKFLOW_HOME_DETAIL_GOODS_API = _WORKFLOW_HOME_DETAIL_GOODS_API;
