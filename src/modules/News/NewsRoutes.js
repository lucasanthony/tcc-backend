const router = require("express").Router();
const { save, findByEj, update, remove } = require("./NewsController");
const {
  validatedUser,
  authorizedUser,
  authorizedLeadership,
  authorizedMemberOnProject,
} = require("@middlewares/auth");

router.post("/news/:project-id", authorizedLeadership || authorizedMemberOnProject, save);
router.get("/news", validatedUser, findByEj);
router.patch("/news/:id", authorizedUser || authorizedMemberOnProject, update);
router.delete("/news/:news-id", authorizedLeadership || authorizedMemberOnProject, remove);

module.exports = router;