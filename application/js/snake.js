/*
 * 定义地图类
 * @param1	Number	width	地图宽
 * @param2	Number	height	地图高
*/
function Map(width,height){
	//定义地图属性
	this.width = width ? width : 800;
	this.height = height ? height : 400;
	this.color = '#E6CD97';
	this.image = "bg.jpg";
	this.position = 'absolute';
	this._map = null;
	
	//定义显示地图方法
	this.show = function(){
		this._map = document.createElement('div');
		this._map.style.width = this.width + 'px';
		this._map.style.height = this.height + 'px';
		//this._map.style.backgroundColor = this.color;
		//this._map.style.backgroundImage = "url(images/" + this.image + ")";
		this._map.style.position = this.position;
		$('map').appendChild(this._map);
	}
}

/*
 * 定义食物类
 * @param1	Number	width	食物宽
 * @param2	Number	height	食物高
*/
function Food(width,height){
	//定义食物属性
	this.width = width ? width : 20;
	this.height = height ? height : 20;
	this.color = '#E6CD97';
	this.image = "food.png";
	this.position = 'absolute';
	this._food = null;
	this.x = 0;
	this.y = 0;
	
	//定义显示食物方法
	this.show = function(){
		if(this._food == null){
			this._food = document.createElement('div');
			this._food.style.width = this.width + 'px';
			this._food.style.height = this.height + 'px';
			//this._food.style.backgroundColor = this.color;
			this._food.style.backgroundImage = "url(images/" + this.image + ")";
			this._food.style.position = this.position;
			map._map.appendChild(this._food);
		}

		if(snake){
			this.randomXY();
		}else{
			this.x = Math.floor(Math.random() * map.width / this.width);
			this.y = Math.floor(Math.random() * map.height / this.height);
		}
		this._food.style.left = this.x * this.width + 'px';
		this._food.style.top = this.y * this.height + 'px';
	}
	
	//定义食物随机出现方法
	this.randomXY = function(){
		this.x = Math.floor(Math.random() * map.width / this.width);
		this.y = Math.floor(Math.random() * map.height / this.height);
		this.check();
	}
	
	//定义检查食物是否与蛇出现位置重合方法
	this.check = function(){
		var length = snake.body.length;
		for(var i = 0;i < length;i++){
			if(this.x == snake.body[i][0] && this.y == snake.body[i][1]){
				this.randomXY();
			}
		}
	}	
}

/*
 * 定义蛇类
 * @param1	Number	width	单节蛇宽
 * @param2	Number	height	单节蛇高
*/
function Snake(width,height){
	//定义蛇属性
	this.width = width ? width : 20;
	this.height = height ? height : 20;
	this.color = 'red';
	this.position = 'absolute';
	this.body = [[3,2,'head',null,'right'],[2,2,'body',null,'right'],[1,2,'body',null,'right']];
	this.direct = 'right';
	this.status = 'stop';
	this.score = 0;
	this.speed = 200;
	this.level = 1;
	
	//定义初始化蛇方法
	this.init = function(){
		var direct = Math.floor(Math.random() * 4);
		var length = this.body.length;
		var x = Math.floor(Math.random() * ((map.width / this.width) - (length * 2)) + length);
		var y = Math.floor(Math.random() * ((map.height / this.height) - (length * 2)) + length);
		switch(direct){
			case 0:
				this.direct = 'up';
				for(var i = length - 1;i >= 0;i--){
					this.body[i][0] = x;
					this.body[i][1] = y + i;
				}
				break;
			case 1:
				this.direct = 'down';
				for(var i = 0;i < length;i++){
					this.body[i][0] = x;
					this.body[i][1] = y - i;
				}
				break;
			case 2:
				this.direct = 'left';
				for(var i = 0;i < length;i++){
					this.body[i][0] = x + i;
					this.body[i][1] = y;
				}
				break;
			case 3:
				this.direct = 'right';
				for(var i = 0;i < length;i++){
					this.body[i][0] = x - i;
					this.body[i][1] = y;
				}
				break;
		}
	}
	
	//定义显示蛇方法
	this.show = function(){
		var length = this.body.length;
		for(var i = 0;i < length;i++){
			if(this.body[i][3] == null){
				this.body[i][3] = document.createElement('div');
				this.body[i][3].style.width = this.width + 'px';
				this.body[i][3].style.height = this.height + 'px';
				//this.body[i][3].style.backgroundColor = this.color;
				this.body[i][3].style.position = this.position;
				map._map.appendChild(this.body[i][3]);
			}
			//this.body[i][3].style.backgroundImage = "url(images/" + this.body[i][2] + "-" + this.body[i][4] + ".png)";
			this.body[i][3].style.backgroundImage = "url(images/" + this.body[i][2] + ".png)";
			this.body[i][3].style.left = this.body[i][0] * this.width + 'px';
			this.body[i][3].style.top = this.body[i][1] * this.height + 'px';
		}
		var length = this.score.toString().length;
		var score = '';
		for(var i = 0;i < length;i++){
			score += "<img src='images/" + this.score.toString()[i] + ".gif' />";
		}
		$('score').innerHTML = score;
		var level = this.level;
		$('message').innerHTML = '';
		if(this.score % 10 == 0){
			level = (this.score / 10) + 1;
		}
		if(this.level != level){
			this.level = level;
			this.speed -= 10;
			$('message').innerHTML = "速度加快了~";
		}
		$('level').innerHTML = "<img src='images/" + this.level + ".gif' />";
		time = setTimeout('snake.move()',this.speed);
	}
	
	//定义蛇运动方法
	this.move = function(){
		//判断是否吃到食物
		if(this.body[0][0] == food.x && this.body[0][1] == food.y){
			this.body.splice(1,0,[food.x,food.y,'body',null,this.body[1][4]]);
			this.score += 1; 
			food.show();
		}
		var length = this.body.length;
		//如果蛇的长度等于地图的最大容量，则游戏获胜
		if(length == ((map.width * map.height) / (this.width * this.height))){
			if(confirm('你已经赢了，要重新开始吗？')){
				this.restart();
			}else{
				this.stop();
				this.status = 'die';
				return;
			}
		}
		for(var i = length - 1;i > 0;i--){
			//除蛇头外，其他位置横纵坐标要进行交换
			this.body[i][0] = this.body[i - 1][0];
			this.body[i][1] = this.body[i - 1][1];
			this.body[i][4] = this.body[i - 1][4];
		}
		if(this.direct == 'right'){
			//如果是向右运动，那么蛇头的横坐标要进行+1操作
			this.body[0][0] += 1;
			this.body[0][4] = 'right';
		}
		if(this.direct == 'left'){
			//如果是向左运动，那么蛇头的横坐标要进行-1操作
			this.body[0][0] -= 1;
			this.body[0][4] = 'left';
		}
		if(this.direct == 'up'){
			//如果是向上运动，那么蛇头的纵坐标要进行-1操作
			this.body[0][1] -= 1;
			this.body[0][4] = 'up';
		}
		if(this.direct == 'down'){
			//如果是向下运动，那么蛇头的纵坐标要进行+1操作
			this.body[0][1] += 1;
			this.body[0][4] = 'down';
		}
		//判断蛇是否超出地图边界
		if(this.body[0][0] == map.width / this.width || this.body[0][0] == -1 || this.body[0][1] == map.height / this.height || this.body[0][1] == -1){
			if(confirm('游戏结束，要重新开始吗？')){
				this.restart();
			}else{
				this.stop();
				this.status = 'die';
				return;
			}
		}
		//判断蛇头是否跟蛇身体重合
		for(var i = 1;i < length;i++){
			if(this.body[0][0] == this.body[i][0] && this.body[0][1] == this.body[i][1]){
				if(confirm('游戏结束，要重新开始吗？')){
					this.restart();
				}else{
					this.stop();
					this.status = 'die';
					return;
				}
			}
		}
		//改变蛇的运动状态为'move'
		this.status = 'move';
		//调用显示方法重新定位
		this.show();
	}
	
	//定义蛇停止运动方法
	this.stop = function(){
		clearTimeout(time);
		//clearInterval(time);
	}
	
	//定义蛇重新开始方法
	this.restart = function(){
		window.location.href += '?' + Math.random();
	}
	
	//定义蛇继续运动方法
	this.goon = function(){
		time = setTimeout('snake.move()',100);
		//time = setInterval('snake.move()',100);
	}
	
	//定义蛇的运动方向
	this.setDirect = function(code){
		//判断当前按键
		switch(code){
			case 37:
			case 65:
				if(this.direct != 'right'){
					this.direct = 'left';
				}
				break;
			case 38:
			case 87:
				if(this.direct != 'down'){
					this.direct = 'up';
				}
				break;
			case 39:
			case 68:
				if(this.direct != 'left'){
					this.direct = 'right';
				}
				break;
			case 40:
			case 83:
				if(this.direct != 'up'){
					this.direct = 'down';
				}
				break;
			case 32:
				if(this.status == 'stop'){
					this.goon();
					this.status = 'move';
				}else if(this.status == 'move'){
					this.stop();
					this.status = 'stop';
				}
				break;
		}
	}		
}