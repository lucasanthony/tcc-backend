const router = require("express").Router();
const { save, findByEj, update, remove } = require("./NewsController");
const {
  validatedUser,
  authorizedUser,
  authorizedLeadership,
  authorizedMemberOnProject,
} = require("@middlewares/auth");

router.post("/news", authorizedLeadership || authorizedMemberOnProject, save);
router.get("/news", validatedUser, findByEj);
router.patch("/news/:id-project", authorizedUser || authorizedMemberOnProject, update);
router.delete("/news/:id-project", authorizedLeadership || authorizedMemberOnProject, remove);

module.exports = router;