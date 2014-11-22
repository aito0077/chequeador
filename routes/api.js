var api = require('../api'),
    express = require('express'),
    router = express.Router();


var authAPI = function(req, res, next) {
    /*
    if (false && (!req.session || !req.session.user)) {
        res.json(401, { error: 'Please sign in' });
        return;
    }
    */

    next();
};

router.get('/users/', authAPI, api.requestHandler(api.users.browse));
router.get('/users/:id/', authAPI, api.requestHandler(api.users.read));
router.put('/users/:id/', authAPI, api.requestHandler(api.users.edit));

router.get('/actions/', authAPI, api.requestHandler(api.actions.browse));
router.get('/actions/:id/', authAPI, api.requestHandler(api.actions.read));
router.put('/actions/:id/', authAPI, api.requestHandler(api.actions.edit));

router.get('/action-types/', authAPI, api.requestHandler(api.actionTypes.browse));
router.get('/action-types/:id/', authAPI, api.requestHandler(api.actionTypes.read));
router.put('/action-types/:id/', authAPI, api.requestHandler(api.actionTypes.edit));

router.get('/categories/', authAPI, api.requestHandler(api.categories.browse));
router.get('/categories/:id/', authAPI, api.requestHandler(api.categories.read));
router.put('/categories/:id/', authAPI, api.requestHandler(api.categories.edit));

router.get('/checkups/', authAPI, api.requestHandler(api.checkups.browse));
router.get('/checkups/:id/', authAPI, api.requestHandler(api.checkups.read));
router.put('/checkups/:id/', authAPI, api.requestHandler(api.checkups.edit));
router.post('/checkups/', authAPI, api.requestHandler(api.checkups.add));

router.get('/checkup-users/', authAPI, api.requestHandler(api.checkupUsers.browse));
router.get('/checkup-users/:id/', authAPI, api.requestHandler(api.checkupUsers.read));
router.put('/checkup-users/:id/', authAPI, api.requestHandler(api.checkupUsers.edit));

router.get('/comments/', authAPI, api.requestHandler(api.comments.browse));
router.get('/comments/:id/', authAPI, api.requestHandler(api.comments.read));
router.put('/comments/:id/', authAPI, api.requestHandler(api.comments.edit));

router.get('/contexts/', authAPI, api.requestHandler(api.contexts.browse));
router.get('/contexts/:id/', authAPI, api.requestHandler(api.contexts.read));
router.put('/contexts/:id/', authAPI, api.requestHandler(api.contexts.edit));
router.post('/contexts/', authAPI, api.requestHandler(api.contexts.add));

router.get('/entities/', authAPI, api.requestHandler(api.entities.browse));
router.get('/entities/:id/', authAPI, api.requestHandler(api.entities.read));
router.put('/entities/:id/', authAPI, api.requestHandler(api.entities.edit));

router.get('/entity-relations/', authAPI, api.requestHandler(api.entityRelations.browse));
router.get('/entity-relations/:id/', authAPI, api.requestHandler(api.entityRelations.read));
router.put('/entity-relations/:id/', authAPI, api.requestHandler(api.entityRelations.edit));

router.get('/entity-types/', authAPI, api.requestHandler(api.entityTypes.browse));
router.get('/entity-types/:id/', authAPI, api.requestHandler(api.entityTypes.read));
router.put('/entity-types/:id/', authAPI, api.requestHandler(api.entityTypes.edit));

router.get('/inputs/', authAPI, api.requestHandler(api.inputs.browse));
router.get('/inputs/:id/', authAPI, api.requestHandler(api.inputs.read));
router.put('/inputs/:id/', authAPI, api.requestHandler(api.inputs.edit));

router.get('/qualifications/', authAPI, api.requestHandler(api.qualifications.browse));
router.get('/qualifications/:id/', authAPI, api.requestHandler(api.qualifications.read));
router.put('/qualifications/:id/', authAPI, api.requestHandler(api.qualifications.edit));

router.get('/quotes/', authAPI, api.requestHandler(api.quotes.browse));
router.get('/quotes/:id/', authAPI, api.requestHandler(api.quotes.read));
router.put('/quotes/:id/', authAPI, api.requestHandler(api.quotes.edit));

router.get('/rates/', authAPI, api.requestHandler(api.rates.browse));
router.get('/rates/:id/', authAPI, api.requestHandler(api.rates.read));
router.put('/rates/:id/', authAPI, api.requestHandler(api.rates.edit));
router.post('/rates/', authAPI, api.requestHandler(api.rates.add));

router.get('/relation-types/', authAPI, api.requestHandler(api.relationTypes.browse));
router.get('/relation-types/:id/', authAPI, api.requestHandler(api.relationTypes.read));
router.put('/relation-types/:id/', authAPI, api.requestHandler(api.relationTypes.edit));

router.get('/role-types/', authAPI, api.requestHandler(api.roleTypes.browse));
router.get('/role-types/:id/', authAPI, api.requestHandler(api.roleTypes.read));
router.put('/role-types/:id/', authAPI, api.requestHandler(api.roleTypes.edit));

router.get('/scores/', authAPI, api.requestHandler(api.scores.browse));
router.get('/scores/:id/', authAPI, api.requestHandler(api.scores.read));
router.put('/scores/:id/', authAPI, api.requestHandler(api.scores.edit));

router.get('/checkups/:checkup_id/sources', authAPI, api.requestHandler(api.sources.browse));
router.get('/sources/', authAPI, api.requestHandler(api.sources.browse));
router.get('/sources/:id/', authAPI, api.requestHandler(api.sources.read));
router.put('/sources/:id/', authAPI, api.requestHandler(api.sources.edit));
router.post('/sources/', authAPI, api.requestHandler(api.sources.add));

router.get('/source-types/', authAPI, api.requestHandler(api.sourceTypes.browse));
router.get('/source-types/:id/', authAPI, api.requestHandler(api.sourceTypes.read));
router.put('/source-types/:id/', authAPI, api.requestHandler(api.sourceTypes.edit));

module.exports = router;
