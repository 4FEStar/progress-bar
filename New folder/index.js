class progressBar {
    constructor(id, bur = 300) {
        this.container = document.getElementById(id);
        this.type = this.container.dataset.type;
        this.number = this.changeNumber(this.container.dataset.number);
        this.container.dataset.number = this.number;
        this.color = this.container.dataset.color;
        this.bgcolor = this.container.dataset.bgcolor;
        this.container.innerHTML = this.render();
        this.timer = setInterval(() => {
            if (this.type !== this.container.dataset.type || this.container.dataset.number !== this.number || this.container.dataset.color !== this.color || this.container.dataset.bgcolor !== this.bgcolor) {
                this.type = this.container.dataset.type;
                this.number = this.changeNumber(this.container.dataset.number);
                this.color = this.container.dataset.color;
                this.bgcolor = this.container.dataset.bgcolor;
                this.container.innerHTML = this.render();
            }
        }, bur);
    }
    render() {
        switch (this.type) {
            case 'circle':
                return this.setCircle();
            case 'bar':
                return this.setBar();
            case 'sandglass':
                return this.setSandglass();
        }
    }
    changeNumber(number) {
        if (number < 0) {
            return 0;
        } else if (number > 100) {
            return 100;
        } else {
            return parseInt(number);
        }
    }
    setCircle() {
        let leftDeg, rightDeg;
        if (this.number >= 50) {
            leftDeg = -225 + (this.number - 50) * 3.6;
            rightDeg = 45;
        } else {
            leftDeg = -225;
            rightDeg = -135 + (this.number) * 3.6;
        }
        let data = '<div class="circleProgress_wrapper"><div class="bgcircle" style="border-color:' + this.bgcolor + ';"></div><div class="wrapper right"><div class="circleProgress rightcircle" style="transform:rotate(' + rightDeg + 'deg);border-top-color:' + this.color + ';border-right-color:' + this.color + ';"></div></div><div class="circle_number">' + this.number + '%</div><div class="wrapper left"><div class="circleProgress leftcircle" style="transform:rotate(' + leftDeg + 'deg);border-top-color:' + this.color + ';border-left-color:' + this.color + ';"></div></div></div>';
        return data;
    }
    setBar() {
        let data = '<div class="barProgress" style="background-color:' + this.bgcolor + ';"><div class="barProgress-in" style="background-color:' + this.color + ';width:' + this.number * 2 + 'px;"></div></div>';
        return data;
    }
    setSandglass() {
        let data = '<div class="sandglass-bar" style="background-color:' + this.bgcolor + ';"><div class="sandglass-first" style="background-color:' + this.color + ';height:' + (100 - this.number) / 100 * 50 + 'px;"></div><div class="sandglass-last" style="background-color:' + this.color + ';height:' + this.number / 100 * 50 + 'px;"></div><div class="sandglass"></div></div>';
        return data;
    }
}