const express = require('express');
const router = express.Router();
const DataModel = require('./models');

// Add data
router.post('/add', async (req, res) => {
  try {
    const data = await DataModel.findOne({});
    if (data) {
      data.text1 = req.body.text1 || data.text1;
      data.text2 = req.body.text2 || data.text2;
      data.text3 = req.body.text3 || data.text3;
      data.addCount += 1;
      await data.save();
    } else {
      const newData = new DataModel({
        text1: req.body.text1,
        text2: req.body.text2,
        text3: req.body.text3,
        addCount: 1
      });
      await newData.save();
    }
    res.status(200).json({ message: 'Data added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Update data
router.post('/update', async (req, res) => {
  try {
    const data = await DataModel.findOne({});
    if (data) {
      data.text1 = req.body.text1 || data.text1;
      data.text2 = req.body.text2 || data.text2;
      data.text3 = req.body.text3 || data.text3;
      data.updateCount += 1;
      await data.save();
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      res.status(404).json({ message: 'No data found to update' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

// Get count
router.get('/count', async (req, res) => {
  try {
    const data = await DataModel.findOne({});
    if (data) {
      res.status(200).json({
        addCount: data.addCount,
        updateCount: data.updateCount
      });
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
