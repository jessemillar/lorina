l.loader = new Object()
l.images = new Array()

l.loader.image = function(image)
{    
    l.images[l.images.length].image = new Image()
        l.images[l.images.length].src = image
}