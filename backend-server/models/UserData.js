// clase
module.exports = class UserData {
    // COMO UNA CLASE NORMAL, AQUÍ ESTÁ MI MODELO COMO EN EL FRONT END, QUE TIENE MI MATRIZ
    // EN ESTE MODELO ES DONDE SE CARGARÁN LOS DATOS DEL REQUEST DE MI FRONT END
    // ES UNA CLASE NORMAL CON METODOS NADA MÁS ES EL MODELO
    // LOGICA DE JUEGO
    constructor(userData) {
        this.userName = userData;
    }
    setUserData(userData) {
        this.userName = userData;
    }
    getUserData() {
        return this.userName;
    }
}