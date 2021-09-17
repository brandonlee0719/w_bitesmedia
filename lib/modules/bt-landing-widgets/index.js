module.exports = {
    extend: 'apostrophe-blog-widgets',
    label: 'Landing',
    piecesModuleName: 'apostrophe-blog',
    construct: function(self, options) {
        self.pushAsset('script', 'always', {when: 'always'});
    }
}