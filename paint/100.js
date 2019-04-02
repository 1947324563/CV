// 绘画圆形进度条
let radius = document.getElementById('radius'),
    context = radius.getContext('2d'),
    centerX = radius.width/2,
    centerY = radius.height/2,
    rad = Math.PI*2/100,
    spend = 0.1;
// 蓝色外圈
let blueLine = (n)=>{
    context.save();
    context.beginPath();
    context.strokeStyle = "#49f";
    context.lineWidth = 12;
    context.arc(centerX, centerY, 100 , -Math.PI/2, -Math.PI/2 + n*rad, false);
    context.stroke();
    context.restore();
};
// 白色外圈
let whiteLine = () => {
    context.save();
    context.beginPath();
    context.strokeStyle = "#A5DEF1";
    context.lineWidth = 12;
    context.arc(centerX, centerY, 100 , 0, Math.PI*2, false);
    context.stroke();
    context.closePath();
    context.restore();
};
// 百分比文字绘制
let text = (n) => {
    context.save();
    context.fillStyle = "#F47C7C";
    context.font = '40px Arial';
    context.textAlign = 'center';
    context.Baseline = 'middle';
    context.fillText(n.toFixed(0)+"%",centerX,centerY);
    context.restore();
};
// 动画循环
(function drawFrame() {
    window.requestAnimationFrame(drawFrame,radius);
    context.clearRect(0,0,radius.width,radius.height);
    whiteLine();
    text(spend);
    blueLine(spend);
    if (spend > 100) spend = 0;
    spend += 0.1
}());