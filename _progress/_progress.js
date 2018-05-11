    class Progress {
        constructor(model = {type:'circle',bgc:'cyan',fgc:'red',per:'60'}){
            //type:类型，默认circle（环形），可选rect(矩形)，可选cone（锥形）
            //bgc：进度槽背景颜色
            //fgc: 进度槽前景颜色
            //per：进度百分比
            this.model = model;
            this.render();
        }
        render(){
            let head = document.getElementsByTagName('head')[0];
            let linkTag = document.createElement('link');
            const cssUrl = './style.css';
            linkTag.href = cssUrl;
            linkTag.setAttribute('rel','stylesheet');
            linkTag.setAttribute('type','text/css');
            head.appendChild(linkTag);
            let modelHtml = '';
            if(this.model.type == 'circle'){
                modelHtml = `
                <div id="outerCircle">
                    <div id="innerCircle">
                        <span class="percent">
                        </span>
                    </div>
                </div>`;
            }else if (this.model.type == 'rect'){
                modelHtml = `
                <div id="outerRect">
                    <div id="innerRect">
                        <span class="percent">
                        </span>
                    </div>
                </div>`;
            }else if (this.model.type == 'cone'){
                modelHtml = `
                <div id="outerCone">
                    <div id="innerCone">
                    </div>
                    <span class="percent">
                    </span>
                </div>`;
            }
            document.body.innerHTML = modelHtml;
            this.setModel();
            this.setPercent();
        }
        setModel(){
            if(this.model.type == 'circle'){
                let circle_b = document.getElementById('outerCircle');
                circle_b.style.background = `conic-gradient(${this.model.fgc} 0 ${this.model.per+'%'},${this.model.bgc} 0 100%)`;
            }else if (this.model.type == 'rect'){
                let rect_b = document.getElementById('outerRect');
                let rect_f = document.getElementById('innerRect');
                rect_b.style.background = this.model.bgc;
                rect_f.style.background = this.model.fgc;
                rect_f.style.width = this.model.per + 'px';
            }else if (this.model.type == 'cone'){
                let cone_b = document.getElementById('outerCone');
                let cone_f = document.getElementById('innerCone');
                let _h = Math.sqrt((100-parseInt(this.model.per))*100) + 'px';
                cone_b.style.background = `conic-gradient(${this.model.bgc} 12.5%,#fff 0 37.5%,${this.model.fgc} 0 62.5%,#fff 0 87.5%,${this.model.bgc} 0)`;
                cone_f.style.background = `conic-gradient(${this.model.fgc} 12.5%,#fff 0 37.5%,${this.model.bgc} 0 62.5%,#fff 0 87.5%,${this.model.fgc} 0)`;
                cone_f.setAttribute('style','height:'+_h);                         
            }   
        }
        setPercent(){
            let _p = document.getElementsByClassName('percent');
            for(let i = 0; i < _p.length; i++){
                _p[i].innerHTML = this.model.per+'%';
            }
        }
    }
