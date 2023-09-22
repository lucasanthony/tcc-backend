const router = require("express").Router();
const { save, findByProject, update, remove } = require("./NewsController");
const {
  validatedUser,
  authorizedUser,
  authorizedLeadership,
  authorizedMemberOnProject,
  isOwnerOfNews,
} = require("@middlewares/auth");

router.post("/news/:projectId", authorizedLeadership || authorizedMemberOnProject, save);
router.get("/news/:projectId", validatedUser, findByProject);
router.patch("/news/:newsId", authorizedUser || isOwnerOfNews, update);
router.delete("/news/:projectId", authorizedLeadership || isOwnerOfNews, remove);

module.exports = router;