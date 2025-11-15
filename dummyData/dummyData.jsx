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
    { id: 1, email: "admin@deskmate.com", password: "password" },
    { id: 2, email: "user@deskmate.com", password: "password" }
];

export const USERSTODESKS = 
[
    { id: 1, userid: 1, deskid: 1,  since: new Date('2025-11-12T18:12') },
    { id: 2, userid: 2, deskid: 1,  since: new Date('2025-11-12T18:12') },
    { id: 3, userid: 2, deskid: 2,  since: new Date('2025-11-27T14:42') }
];

export const PERMISSIONS =
[
    { id: 1, label: 'Dashboard', route: "/" },
    { id: 2, label: 'Desk', route: "/desk" },
    { id: 3, label: 'Maintenance', route: "/maintenance" },
    { id: 4, label: 'Database', route: "/database" }
];

export const USERTOPERMISSONS = 
[
    { id: 1, userid: 1, permissionid: 1 },
    { id: 2, userid: 1, permissionid: 2 },
    { id: 3, userid: 2, permissionid: 1 },
    { id: 4, userid: 2, permissionid: 2 },
    { id: 5, userid: 2, permissionid: 3 },
    { id: 6, userid: 2, permissionid: 4 },
];

