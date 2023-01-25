const { Router } = require("express");
const initData = require('../seeders/initData');
const db = require('../database/database')

const router = Router();

router.get("/init-data", async (_req, res, next) => {
  try {
    await initData(db)
    res
      .status(200)
      .json({
        message: "Init db data DONE!"
      })
  } catch (error) {
    next({
      status: 418,
      errorContent: error,
      message: "Error initialization db data."
    })
  }
});

module.exports = router;