const bcrypt = require('bcrypt')
const saltRounds = 10 // jumlah berapa kali password kita bakal di acak

module.exports = {
// hash ini gunanya untuk meng encrypt atau meng hash password (Kebon123 jadi 192jfasfnq0ibn1f%$)
    hash: async(password) => {
        try{
            const result = await bcrypt.hash(password, saltRounds)
            return result
        } catch (error) {
            return error
        }
    },
// match ini gunanya untuk mencocokan password yang udah di hash di database dengan inputtan si user
    match: async(passwordFromLogin, passwordFromDatabase) => { 
        try {
            return bcrypt.compare(passwordFromLogin, passwordFromDatabase)
        } catch (error) {
            return error
        }
    }
}
