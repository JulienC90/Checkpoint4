const express = require("express");

const router = express.Router();

// -- -- -- -- IMPORTS -- -- -- --

const {
  verifyName,
  hashPassword,
  verifyToken,
  verifyPassword,
} = require("./auth");

// -- -- -- -- CONTROLLERS -- -- -- --

const itemControllers = require("./controllers/itemControllers");
const siteControllers = require("./controllers/siteControllers");
const activityControllers = require("./controllers/activityControllers");
const adminControllers = require("./controllers/adminControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// -- -- -- -- PROJECT ROUTES -- -- -- --

// -- -- -- PUBLIC ROUTES -- -- --
// -- -- SITE ROUTES -- --
//  -- GET --
router.get("/sites", siteControllers.browse);
router.get("/sites/:id", siteControllers.read);

// -- -- ACTIVITY ROUTES -- --
// -- GET --
router.get("/activities", activityControllers.browse);
router.get("/activities/:id", activityControllers.read);

// -- -- ADMIN ROUTES -- --
// -- POST --
// REGISTER (TEST ONLY)
router.post("/register", verifyName, hashPassword, adminControllers.add);
router.post("/login", adminControllers.login, verifyPassword);

// -- -- -- PROTECTED ROUTES -- -- --
router.use(verifyToken);

// -- -- SITES ROUTES -- --
// -- POST --
router.post("/sites", siteControllers.add);

// -- PUT --
router.put("/sites/:id", siteControllers.edit);

// -- DELETE --
router.delete("/sites/:id", siteControllers.destroy);

// -- -- ACTIVITY ROUTES -- --
// -- POST --
router.post("/activities", activityControllers.add);

// -- PUT --
router.put("/activities/:id", activityControllers.edit);

// -- DELETE --
router.delete("/activities/:id", activityControllers.destroy);

// -- -- ADMIN ROUTES -- --
// -- GET --
router.get("/admin", adminControllers.browse);

// -- PUT --
router.put("/admin/:id", adminControllers.edit);

module.exports = router;
