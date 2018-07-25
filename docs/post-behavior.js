
var floorInfo = {users: []};
function mousePressed()
{
    let x = mouseX;
    let y = mouseY;
    let targetIndex = -1;
    for (let i = 0; i < floorInfo.users.length; ++i)
    {
        let user = floorInfo.users[i];
        if (dist(x, y, user.x, user.y) < 75)
        {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex > -1)
    {
        floorInfo.users.splice(targetIndex, 1);
    }
    else
    {
        floorInfo.users.push({
            x: x,
            y: y,
            id: Math.round(random(100))
        })
    }

    return false;
}

function setup()
{
    createCanvas(window.innerWidth*.9, window.innerHeight*.9);
    behavior.init();
    frameRate(60);
}

function draw()
{
    behavior.render(floorInfo);
}