export const DESKS = 
[
    { id: 1, name: "DCD1", manufacturer: "Linak", position: 145, 
        status: "Online", lasterrors: [], activationcounter: 42, sitstandcounter: 11 },
    { id: 2, name: "DCD2", manufacturer: "Linak", position: 124, 
        status: "Online", lasterrors: ["Pressure Sensor", "Connection Issue"], activationcounter: 16, sitstandcounter: 5 },
    { id: 3, name: "DCD3", manufacturer: "Linak", position: 148, 
        status: "Offline", lasterrors: [], activationcounter: 12, sitstandcounter: 2 },
    { id: 4, name: "DCD4", manufacturer: "Linak", position: 131, 
        status: "Offline", lasterrors: ["Pressure Sensor"], activationcounter: 24, sitstandcounter: 6 },
    { id: 5, name: "DCD5", manufacturer: "Linak", position: 176, 
        status: "Online", lasterrors: [], activationcounter: 64, sitstandcounter: 1 }
];

export const USERS = 
[
    { id: 1, name: "Guest", email: "guest@guest.com", password: "guest" },
    { id: 2, name: "Admin", email: "admin@admin.com", password: "admin" }
];

export const USERSTODESKS = 
[
    { id: 1, userid: 1, deskid: 1,  since: "12/09/2025" },
    { id: 2, userid: 1, deskid: 2,  since: "27/09/2025" }
];

export const PERMISSIONS =
[
    { id: 1, route: "/desk" },
    { id: 2, route: "/maintenance" },
    { id: 3, route: "/database" }
];

export const USERTOPERMISSONS = 
[
    { id: 1, userid: 1, permissionid: 1 },
    { id: 2, userid: 2, permissionid: 1 },
    { id: 3, userid: 2, permissionid: 2 },
    { id: 4, userid: 2, permissionid: 3 },
];

