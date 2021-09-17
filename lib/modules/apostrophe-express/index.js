const express = require('express');

module.exports = {
  session: {
    // If this still says `undefined`, set a real secret!
    secret: 'c27f70844bbb1f1a'
  },
    middleware: [express.static("dist")]
};
