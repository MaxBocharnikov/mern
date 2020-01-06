const {Router} = require('express');
const router = Router();
const Link = require('../models/Link');

router.get('/:code', async (req, res) => {
    console.log('here code');
   try {
       const link = await Link.findOne({code: req.params.code});
       if(link) {
           link.clicks++;
           link.save();
           return res.redirect(link.from);
       }
       res.status(404).json('Link not found')

   } catch (e) {
       res.status(500).json({message: `something went wrong: ${e}`})
   }
});

module.exports = router;
