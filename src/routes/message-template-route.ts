import express from 'express';
import messageTemplateController from '../controllers/message-template-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(messageTemplateController.create))
router.get('/',am(messageTemplateController.findAll))
router.get('/:id',am(messageTemplateController.findOne))
router.patch('/:id',am(messageTemplateController.update))
router.delete('/:id',am(messageTemplateController.destroy))


export default router;