/*
 * 定义地图类
 * @param1	Number	width	地图宽
 * @param2	Number	height	地图高
*/
function Map(width,height){
	//定义地图属性
	this.width = width ? width : 600;
	this.height = height ? height : 600;
	this.color = '#000';
	this.position = 'absolute';
	this._map = null;
	
	//定义显示地图方法
	this.show = function(){
		this._map = document.createElement('div');
		this._map.style.width = this.width + 'px';
		this._map.style.height = this.height + 'px';
		this._map.style.backgroundColor = this.color;
		this._map.style.position = this.position;
		$('map').appendChild(this._map);
	}
}

/*
 * 定义地形类
 * @param1	Number	width	单个地形宽
 * @param2	Number	height	单个地形高
*/
function Ground(width,height,body){
	//定义地形属性
	this.width = width ? width : 60;
	this.height = height ? height : 60;
	this.image = "ground.png";
	this.position = 'absolute';
	this.body =  new Array();
	for(var i = 0;i < body.length;i++){
		this.body[i] = body[i];
	}
	
	//定义显示地形方法
		this.show = function(){
		var length = this.body.length;
		for(var i = 0;i < length;i++){
			var div = document.createElement('div');
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.backgroundImage = "url(images/" + this.image + ")";
			div.style.position = this.position;
			div.style.left = this.body[i][0] * this.width + 'px';
			div.style.top = this.body[i][1] * this.height + 'px';
			map._map.appendChild(div);		
		}
	}
}

/*
 * 定义墙类
 * @param1	Number	width	单个墙宽
 * @param2	Number	height	单个墙高
*/
function Wall(width,height,body){
	//定义墙属性
	this.width = width ? width : 60;
	this.height = height ? height : 60;
	//this.color = '#fff';
	this.image = "wall.png";
	this.position = 'absolute';
	this.body =  new Array();
	for(var i = 0;i < body.length;i++){
		this.body[i] = body[i];
	}
	
	//定义显示墙方法
	this.show = function(){
		var length = this.body.length;
		for(var i = 0;i < length;i++){
			var div = document.createElement('div');
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.backgroundImage = "url(images/" + this.image + ")";
			div.style.position = this.position;
			div.style.left = this.body[i][0] * this.width + 'px';
			div.style.top = this.body[i][1] * this.height + 'px';
			map._map.appendChild(div);		
		}
	}	
}

/*
 * 定义终点类
 * @param1	Number	width	单个终点宽
 * @param2	Number	height	单个终点高
*/
function EndPoint(width,height,body){
	//定义终点属性
	this.width = width ? width : 60;
	this.height = height ? height : 60;
	this.image = "endpoint.png";
	this.position = 'absolute';
	this.body =  new Array();
	for(var i = 0;i < body.length;i++){
		this.body[i] = body[i];
	}
	
	//定义显示终点方法
	this.show = function(){
		var length = this.body.length;
		for(var i = 0;i < length;i++){
			var div = document.createElement('div');
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.backgroundImage = "url(images/" + this.image + ")";
			div.style.position = this.position;
			div.style.left = this.body[i][0] * this.width + 'px';
			div.style.top = this.body[i][1] * this.height + 'px';
			map._map.appendChild(div);		
		}
	}	
}

/*
 * 定义箱子类
 * @param1	Number	width	箱子宽
 * @param2	Number	height	箱子高
*/
function Box(width,height,body){
	//定义箱子属性
	this.width = width ? width : 60;
	this.height = height ? height : 60;
	this.image = "box.png";
	this.image_end = "box_end.png";
	this.body =  new Array();
	this.position = 'absolute';
		for(var i = 0;i < body.length;i++){
		this.body[i] = body[i];
	}
	
	//定义显示箱子方法
	this.show = function(){
		var length = this.body.length;
		for(var i = 0;i < length;i++){
			if(this.body[i][2] == null){
				this.body[i][2] = document.createElement('div');
				this.body[i][2].style.width = this.width + 'px';
				this.body[i][2].style.height = this.height + 'px';
				this.body[i][2].style.position = this.position;		
				map._map.appendChild(this.body[i][2]);
			}
			if(this.body[i][3]){
				this.body[i][2].style.backgroundImage = "url(images/" + this.image_end + ")";
			}else{
				this.body[i][2].style.backgroundImage = "url(images/" + this.image + ")";
			}
			this.body[i][2].style.left = this.body[i][0] * this.width + 'px';
			this.body[i][2].style.top = this.body[i][1] * this.height + 'px';
		}
	}
	
	//定义箱子运动方法
	this.move = function(i,direct){
		var x = this.body[i][0];
		var y = this.body[i][1];
		if(direct == 'right'){
			//如果是向右运动，那么人的横坐标要进行+1操作
			x += 1;
			this.direct = 'right';
		}
		if(direct == 'left'){
			//如果是向左运动，那么人的横坐标要进行-1操作
			x -= 1;
			this.direct = 'left';
		}
		if(direct == 'up'){
			//如果是向上运动，那么人的纵坐标要进行-1操作
			y -= 1;
			this.direct = 'up';
		}
		if(direct == 'down'){
			//如果是向下运动，那么人的纵坐标要进行+1操作
			y += 1;
			this.direct = 'down';
		}
		
		var len = wall.body.length;
		for(var n = 0;n < len;n++){
			if(x == wall.body[n][0] && y == wall.body[n][1]){
				person.status = false;
			}
		}
		
		if(person.status){
			var length = this.body.length;
			for(var j = 0;j < length;j++){
				if(j != i){
					if(this.body[j][0] == x && this.body[j][1] == y){
						person.status = false;
					}
				}
			}
		}
		
		if(person.status){
			var len = endpoint.body.length;
			this.body[i][3] = false;
			for(var n = 0;n < len;n++){
				if(x == endpoint.body[n][0] && y == endpoint.body[n][1]){
					this.body[i][3] = true;
				}
			}
		}
		
		if(person.status){
			this.body[i][0] = x;
			this.body[i][1] = y;	
		}
		
		//调用显示方法重新定位
		this.show();
	}
	
}

/*
 * 定义人类
 * @param1	Number	width	人宽
 * @param2	Number	height	人高
*/
function Person(width,height,body){
	//定义人属性
	this.width = width ? width : 60;
	this.height = height ? height : 60;
	this.image = "person";
	this.position = 'absolute';
	this._person = null;
	this.x = body[0];
	this.y = body[1];
	this.direct = 'down';
	this.status = true;
	
	//定义显示人方法
	this.show = function(){
		if(this._person == null){
			this._person = document.createElement('div');
			this._person.style.width = this.width + 'px';
			this._person.style.height = this.height + 'px';
			this._person.style.position = this.position;
			map._map.appendChild(this._person);
		}
		this._person.style.backgroundImage = "url(images/" + this.image + "_" + this.direct + ".png)";
		this._person.style.left = this.x * this.width + 'px';
		this._person.style.top = this.y * this.height + 'px';
	}
	
	//定义人运动方法
	this.move = function(direct){
		var x = this.x;
		var y = this.y;
		if(direct == 'right'){
			//如果是向右运动，那么人的横坐标要进行+1操作
			x += 1;
			this.direct = 'right';
		}
		if(direct == 'left'){
			//如果是向左运动，那么人的横坐标要进行-1操作
			x -= 1;
			this.direct = 'left';
		}
		if(direct == 'up'){
			//如果是向上运动，那么人的纵坐标要进行-1操作
			y -= 1;
			this.direct = 'up';
		}
		if(direct == 'down'){
			//如果是向下运动，那么人的纵坐标要进行+1操作
			y += 1;
			this.direct = 'down';
		}
		
		var length = box.body.length;
		//判断人是否跟箱子一起
		for(var i = 0;i < length;i++){
			if(x == box.body[i][0] && y == box.body[i][1]){
				box.move(i,this.direct);
			}
		}
		
		if(person.status){
			var len = wall.body.length;
			for(var n = 0;n < len;n++){
				if(x == wall.body[n][0] && y == wall.body[n][1]){
					person.status = false;
				}
			}
		}
		
		if(this.status){
			this.x = x;
			this.y = y;
		}
		
		//调用显示方法重新定位
		this.show();
		this.status =true;
		var len = box.body.length;
		var flag = 0;
		for(var n = 0;n < len;n++){
			if(box.body[n][3]){
				flag += 1;
			}
		}
		if(flag == len){
			if(confirm('你赢了，要重新开始吗？')){
				window.location.href += '?' + Math.random();
			}
			document.onkeydown ='';
		}
	}
	
	//定义人的运动方向
	this.setDirect = function(code){
		//判断当前按键
		switch(code){
			case 37:
			case 65:
				this.move('left');
				break;
			case 38:
			case 87:
				this.move('up');
				break;
			case 39:
			case 68:
				this.move('right');
				break;
			case 40:
			case 83:
				this.move('down');
				break;
		}
	}
}