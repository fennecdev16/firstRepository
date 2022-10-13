const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    
      
        res.json({ msg: "Welcome to your our restaurant!!", status: 200 });
    
});

module.exports = router;