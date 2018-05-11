class Process {
	constructor(id, {type = 'bar',bg='grey', color = 'green',data = 0.9} = {}){
		this.container = document.getElementById(id);
		this.options = {
			type: type,
			bg: bg,
			color: color,
			data: data
		}
		this.container.innerHTML = this.render(this.options);
		this.setProcess(this.options.data);
		this.setColor(this.options.color,this.options.bg);
	}

	render(options){
		const content = `<div class="${options.type}-container">
							<div class="${options.type}-process"></div>
						</div>`
		return content;
	}

	getProcess(){
		const type = this.options.type;
		const outerClassName = type + "-container";
		const innerClassName = type + "-process";
		const outer = this.container.querySelector('.' + outerClassName);
		const inner = outer.querySelector('.' + innerClassName);
		let pro = 0;

		switch(type){
			case 'sandglass':
				const matrixStr = getStyle(inner,'transform');
				const slice = /matrix\((1|0.\d+)/.exec(matrixStr)[1];
				pro = 1 - parseFloat(slice);
				break;
			case 'pan':
				const style = getStyle(outer,'background');
				const slice2 = /(100|\d{2})%/.exec(style)[1];
				pro = parseFloat(slice2/100);
				break;
			default: 
				pro = parseInt(getStyle(inner,'width'))/parseInt(getStyle(outer,'width'));
				break;
		}

		return pro;
	}

	setProcess(data){
		const type = this.options.type;
		const outerClassName = type + "-container";
		const innerClassName = type + "-process";
		const outer = this.container.querySelector('.' + outerClassName);
		const inner = outer.querySelector('.' + innerClassName);

		switch(type){
			case 'sandglass':
			inner.style.transform = `scale(${1-data})`;
			break;
			case 'pan':
			const color = this.options.color;
			const bg = this.options.bg;
			const num = data * 100 + '%';
			outer.style.background = `conic-gradient(${color} 0, ${color} ${num}, ${bg} ${num}, ${bg} 100%)`;
			inner.innerText = parseInt(num)+'%';
			break;
			default: 
			inner.style.width = parseInt(getStyle(outer,'width')) * data + 'px';
			break;
		}
	}

	setColor(color,bg){
		const type = this.options.type;
		const outerClassName = type + "-container";
		const innerClassName = type + "-process";
		const outer = this.container.querySelector('.' + outerClassName);
		const inner = outer.querySelector('.' + innerClassName);

		switch(type){
			case 'sandglass':
				outer.style.borderBottomColor = color;
				outer.style.borderTopColor = bg;
				inner.style.borderTopColor = color;
				inner.style.borderBottomColor = bg;
				break;
			case 'pan':
				break;
			default:
				inner.style.background = color;
				outer.style.background = bg;
				break;
		}
	}
}

function getStyle(ele,prop){
	if(ele.currentStyle){
		return ele.currentStyle[prop];
	}else{
		return window.getComputedStyle(ele,null)[prop];
	}
}

const process1 = new Process('container1',{color:'red', bg: 'black', type:'bar',data:0.75});
const process2 = new Process('container2',{color:'green',bg: 'grey', type:'sandglass',data:0.24});
const process3 = new Process('container3',{color:'yellow',bg: 'pink',type:'pan',data:0.51});
var progress = 0;
var timer = setInterval(() =>{
	process1.setProcess(progress);
	process2.setProcess(progress);
	process3.setProcess(progress);
	if(progress > 1) clearInterval(timer);
	progress += 0.01;
},100)