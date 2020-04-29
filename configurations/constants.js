
const Constants = {
    Users: {
        USER: 1,
        PRIVILEDGED_USER:3,
        COMPANY_ADMIN: 5,
        GESTOR: 10,
        ADMIN: 99
    },
    Lang:{
        Default:"ptbr",
        Supporteds:["ptbr"]
    },
    Paths:{
        Upload:'./public/uploads/' 
    },
    Ports:{
        http:8888,
        https:443
    },
    Debug: true,
    SSL:{
        Key: "/etc/letsencrypt/live/hydra/privkey.pem",
        Cert: "/etc/letsencrypt/live/hydra/fullchain.pem"
    }
}

module.exports = Constants