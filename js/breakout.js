rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
canvas =  document.getElementById('canvas')
ctx = canvas.getContext('2d')
score = 0
brickRowCount = 9
brickColumnCount = 5

paddle =
{
    x: canvas.width / 2 - 40,
    y: canvas.height - 20px,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

ball =
{
    x: canvas.width / 2,
    y: canvas.height /2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
}

brickInfo =
{
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}

bricks = []
for (let i = 0; i < brickRowCount; i++)
{
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++)
    {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickinfo.offsetY
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

function drawBall()
    {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ad1e1c'
        ctx.fill()
        ctx.closePath()
    }

function drawPaddle()
    {
        ctx.beginPath()
        ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
        ctx.fillStyle = '#ad1e1c'
        ctx.fill()
        ctx.closePath()
    }

function drawScore()
    {
        ctx.font = '20px Comic Sans MS'
        ctx.fillText(`score: ${score}`, canvas.width-100, 30)
    }

function drawBricks()
{
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#ad1e1c' : 'transparent';
            ctx.fill()
            ctz.closePath()
        })
    })
}


function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

function movePaddle()
{
    paddle.x = paddle.x + paddle.dx

    if (paddle.x < 0)
    {
        paddle.x = 0
    }

    if (paddle.x + paddle.w > canvas.width)
    {
        paddle.x = canvas.width - paddle.w
    }
}

function moveBall()
    {
        ball.x = ball.x + ball.dx
        ball.y = ball.y + ball.dy

        //top
        if (ball.y + ball.size < 0)
        {
            ball.dy = -1 * ball.dy
        }

        //right
        if (ball.x + ball.size < canvas.width)
        {
            ball.dx = -1 * ball.dx
        }

        //bottom
        if (ball.y + ball.size < canvas.height)
        {
            ball.dy = -1 * ball.dy
        }

        //left
        if (ball.x + ball.size < 0)
        {
            ball.dx = -1 * ball.dx
        }

        //paddle stuff bb
        if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y)
        {
            ball.dy = -1 * ball.speedcu
        }

        //brick stuff
        bricks.forEach(column => {
            if (brick.visible)
            {
               if (ball.x -ball.size > brick.x && ball.x + ball.size < brick.x + brick.w &&  ball.y - ball.size < brick.y + brick.h)
               {
                    ball.dy = -1 * ball.dy
                    brick.visible = false
               }
            }
        })
    }

function keyDown(e)
{
    if (e.key == 'ArrowRight' || e.key == 'Right')
    {
        paddle.dx = paddle.speed
    }

    if (e.key == 'ArrowLeft' || e.key == 'Left')
    {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e)
{
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'ArrowLeft' || e.key == 'Left')
    {
        paddle.dx = 0
    }
}

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function update()
{
    moveBall()
    movePaddle()
    draw()
    requestAnimationFrame(update)
}

update()

rulesBtn.addEventListener('click', () => {
    rulesclassList.add('show')
})

closeBtn.addEventListener('click', () => {
    rulesclassList.remove('show')
})