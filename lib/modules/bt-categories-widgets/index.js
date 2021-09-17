module.exports = {
    extend: 'apostrophe-pieces-widgets',
    label: 'Categories',
    piecesModuleName: 'bt-categories',
    construct: function(self, options) {
        self.pushAsset('script', 'always', {when: 'always'});
    }
}