const db = require("../database/database");
const { DataTypes } = require("sequelize")
const bcrypt = require("bcrypt")

const encryptPassword = user => {
  const { password } = user;
  const hash = bcrypt.hashSync(password, 8);
  user.password = hash;
}

const UserModel = db.define("user", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }  
}, {
  timestamps: false,
  hooks: {
    beforeCreate:   encryptPassword,
    beforeBulkCreate: users => {
      users.forEach(encryptPassword)
    }
  }
})

module.exports = UserModel