const { Sequelize, DataTypes } = require('sequelize');
// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' // Nombre del archivo de la base de datos
});

// Definición del modelo User
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
sequelize.sync();
module.exports = User;
