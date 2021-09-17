module.exports = {
    extend: 'apostrophe-pieces-widgets',
    label: 'Poll',
    piecesModuleName: 'bt-poll',
    construct: function(self, options) {
        self.pushAsset('script', 'always', {when: 'always'});
    }
}