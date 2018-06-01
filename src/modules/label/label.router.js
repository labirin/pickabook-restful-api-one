const router=require('express-promise-router')()
import * as labelController from './label.controller'
import auth from '../../services/auth'

router.route('/')
      .post(auth,labelController.addLabel)
      .get(auth,labelController.getAllLabel)
router.route('/:id')
      .get(auth,labelController.getLabel)
      .patch(auth,labelController.updateLabel)
      .delete(auth,labelController.deleteLabel)

export default router;
