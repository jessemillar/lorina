var GameCenter = function()
{
	this.authed = false
	this.socket = new Ejecta.GameCenter()

	this.softLogin = function()
	{
	    this.socket.softAuthenticate()
	}

	this.hardLogin = function()
	{
	    this.socket.authenticate()
	}

	this.submitScore = function(board, score)
	{
	    this.socket.reportScore(board, score)
	}

	this.showLeaderboard = function(board)
	{
	    this.socket.showLeaderboard(board)
	}
}