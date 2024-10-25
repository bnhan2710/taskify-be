import { Router } from "express";
const router:Router = Router()
import WorkspaceController from "./workspace.controller";
import { isLoggedIn } from "../../middleware/auth.middleware";
import validate from "../../middleware/validate";
import { NewWorkspaceValidation } from "./validator/workspace.validate";
import asyncHandler from "../../middleware/asyncHandle";

router.post('/', isLoggedIn, validate(NewWorkspaceValidation), asyncHandler(WorkspaceController.NewWorkSpace))

export default router