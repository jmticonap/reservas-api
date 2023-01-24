const UserModel = require('../models/user.model')
const RoomModel = require('../models/room.model')
const ClientModel = require('../models/client.model')
const ReservationModel = require('../models/reservation.model')
const PayModel = require('../models/pay.model')
const ReservationRoomModel = require('../models/reservationRoom.model')

const initModels = () => {
  /**
    * ************* USER <----> RESERVATION *************
    */
  UserModel.hasMany(ReservationModel, {
    as: "userReservations",
    foreignKey: "user_id",
    sourceKey: "id"
  })
  ReservationModel.belongsTo(UserModel, {
    as: "user",
    foreignKey: "user_id",
    targetKey: "id"
  })

  /**
    * ************* CLIENT <----> RESERVATION *************
    */
  ClientModel.hasMany(ReservationModel, {
    as: "clientReservations",
    foreignKey: "client_id",
    sourceKey: "id"
  })
  ReservationModel.belongsTo(ClientModel, {
    as: "client",
    foreignKey: "client_id",
    targetKey: "id"
  })

  /**
    * ************* PAY <----> RESERVATION *************
    */
  ReservationModel.hasOne(PayModel, {
    as: "pay",
    foreignKey: "reservation_id",
    sourceKey: "id"
  })
  PayModel.belongsTo(ReservationModel, {
    as: "reservation",
    foreignKey: "reservation_id",
    targetKey: "id"
  })

  /**
    * ************* RESERVATION <--[ReservationRoomModel]--> ROOM *************
    */
  ReservationModel.belongsToMany(RoomModel, {
    through: ReservationRoomModel,
    as: "reservationRoom"
  })
  RoomModel.belongsToMany(ReservationModel, {
    through: ReservationRoomModel,
    as: "reservationRoom"
  })
  ReservationRoomModel.belongsTo(ReservationModel, { as: "reservation" })
  ReservationRoomModel.belongsTo(RoomModel, { as: "room" })
}

module.exports = initModels