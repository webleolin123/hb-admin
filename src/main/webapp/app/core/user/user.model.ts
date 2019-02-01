export class User {
    public id ?: any;
    public activated ?: any;
    public address ?: string;
    public authorities ?: any[];
    public birthday ?: string;
    public createdBy?: string;
    public createdDate?: any;
    public email?: string;
    public emailVerified?: any;
    public firstName?: string;
    public imageUrl?: string;
    public langKey?: string;
    public lastModifiedBy?: string;
    public lastModifiedDate?: string;
    public lastName?: string;
    public login?: string;
    public mobilePhone?: string;
    public mobilePhoneVerified?: any;
    public nickname?: any;
    public password?: string;
    public qqNickName?: string;
    public qqOpenId?: string;
    public remarks?: string;
    public sex?: any;
    public signature?: string;
    public wechatNickName?: string;
    public wechatOpenId?: string;
    constructor(id ?: any,
                activated ?: any,
                address ?: string,
                authorities?: any[],
                birthday?: string,
                createdBy?: string,
                createdDate?: any,
                email?: string,
                emailVerified?: any,
                firstName?: string,
                imageUrl?: string,
                langKey?: string,
                lastModifiedBy?: string,
                lastModifiedDate?: string,
                lastName?: string,
                login?: string,
                mobilePhone?: string,
                mobilePhoneVerified?: any,
                nickname?: any,
                password?: string,
                qqNickName?: string,
                qqOpenId?: string,
                remarks?: string,
                sex?: any,
                signature?: string,
                wechatNickName?: string,
                wechatOpenId?: string) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.langKey = langKey ? langKey : null;
        this.authorities = authorities ? authorities : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.password = password ? password : null;
        this.address = address ? address : null;
        this.birthday = birthday ? birthday : null;
        this.emailVerified = emailVerified ? emailVerified : null;
        this.imageUrl = imageUrl ? imageUrl : null;
        this.mobilePhone = mobilePhone ? mobilePhone : null;
        this.mobilePhoneVerified = mobilePhoneVerified ? mobilePhoneVerified : null;
        this.nickname = nickname ? nickname : null;
        this.qqNickName = qqNickName ? qqNickName : null;
        this.qqOpenId = qqOpenId ? qqOpenId : null;
        this.remarks = remarks ? remarks : null;
        this.sex = sex ? sex : null;
        this.signature = signature ? signature : null;
        this.wechatNickName = wechatNickName ? wechatNickName : null;
        this.wechatOpenId = wechatOpenId ? wechatOpenId : null;
    }
}
