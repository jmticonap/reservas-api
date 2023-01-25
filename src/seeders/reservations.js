
const reservations = [
  {
    state: 'pendiente',
    dateCheckIn: new Date(Date.now() + (1000 * 60 * 60 * 24 * 2)),
    dateCheckOut: new Date(Date.now() + (1000 * 60 * 60 * 24 * 6)),
    pay: {
      quantity: 250.5
    }
  },
  {
    state: 'pendiente',
    dateCheckIn: new Date(Date.now() + (1000 * 60 * 60 * 24 * 10)),
    dateCheckOut: new Date(Date.now() + (1000 * 60 * 60 * 24 * 14)),
    pay: {
      quantity: 340.5
    }
  }
]

module.exports = reservations