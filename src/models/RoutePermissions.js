import { USERTOPERMISSONS, PERMISSIONS } from "../../dummyData/dummyData";

export function getRoutesForUser(userid){
    const permissionIds = USERTOPERMISSONS.filter(utp => utp.userid == userid)
    const permissions = PERMISSIONS.filter(p => permissionIds.map(pid => pid.permissionid).includes(p.id))
    return permissions;
}