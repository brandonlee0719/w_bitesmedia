module.exports = {
    handleError: function(res, error) {
        return res.status(200).json({
            success: false,
            error: error.message
        });
    }
};