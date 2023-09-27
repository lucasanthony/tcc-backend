const router = require("express").Router();
const { save, findByProject, update, remove } = require("./NewsController");
const {
  validatedUser,
  authorizedMemberOnProject,
  authorizedMemberOnNews,
} = require("@middlewares/auth");

router.post("/news/:projectId", authorizedMemberOnProject, save);
router.get("/news/:projectId", validatedUser, findByProject);
router.patch("/news", authorizedMemberOnNews, update);
router.delete("/news/:projectId", authorizedMemberOnNews, remove);

module.exports = router;