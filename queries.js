
register = (req, res) => {
	res.json({success: true});
}

startSession = (req, res) => {
	res.json({success: true});
}

endSession = (req, res) => {
	res.json({success: true});
}

module.exports = {
	register,
	startSession,
	endSession
}
