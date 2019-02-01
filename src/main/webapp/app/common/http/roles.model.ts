import {RolesPeople} from './roles-people.model';
export class RolesInfo {
    public id ?: any;
    public roleName ?: any;
    public roleType?: any;
    public level?: any;
    public people ?: RolesPeople;
    constructor(
        id ?: any,
        roleName ?: any,
        roleType?: any,
        level?: any,
        people ?: RolesPeople,
    ) {
        this.id = id ? id : null;
        this.roleName = roleName ? roleName : null;
        this.roleType = roleType ? roleType : null;
        this.level = level ? level : null;
        this.people = people ? people : null;
    }
}
