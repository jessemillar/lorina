l.gamecenter = new Object()
l.gamecenter.socket = new Ejecta.GameCenter()
l.gamecenter.authed = false

l.gamecenter.login = new Object()

l.gamecenter.login.soft = function()
{
    l.gamecenter.socket.softAuthenticate(function(error)
    {
        if (error)
        {
            if (l.debug.gamecenter)
            {
                console.log('GameCenter soft login failed')
            }
        }
        else
        {
            l.gamecenter.authed = true

            if (l.debug.gamecenter)
            {
                console.log('GameCenter soft login succeeded')
            }
        }
    })
}

l.gamecenter.login.hard = function()
{
    l.gamecenter.socket.authenticate(function(error)
    {
        if (error)
        {
            if (l.debug.gamecenter)
            {
                console.log('GameCenter hard login failed')
            }
        }
        else
        {
            l.gamecenter.authed = true

            if (l.debug.gamecenter)
            {
                console.log('GameCenter hard login succeeded')
            }
        }
    })
}

l.gamecenter.submit = new Object()

l.gamecenter.submit.score = function(board, score)
{
    l.gamecenter.socket.reportScore(board, score, function(error)
    {
        if (error)
        {
            if (l.debug.gamecenter)
            {
                console.log('Reporting of ' + score + ' to ' + board + ' failed')
            }
        }
        else
        {
            if (l.debug.gamecenter)
            {
                console.log('Reporting of ' + score + ' to ' + board + ' succeeded')
            }
        }
    })
}

l.gamecenter.show = new Object()

l.gamecenter.show.leaderboard = function(board)
{
    l.gamecenter.socket.showLeaderboard(board)

    if (l.debug.gamecenter)
    {
        console.log('Opened ' + board + ' leaderboard')
    }
}

l.ad = new Object()

l.ad.banner = new Object()
l.ad.banner.socket = new Ejecta.AdBanner()

l.ad.banner.show = function(position)
{
    l.ad.banner.socket.alwaysPortrait = false // Make the ad auto conform to width

    if (position == 'top')
    {
        l.ad.banner.socket.isAtBottom = false
    }
    else
    {
        l.ad.banner.socket.isAtBottom = true
    }

    l.ad.banner.socket.show()
}

l.ad.banner.hide = function()
{
    l.ad.banner.socket.hide()
}