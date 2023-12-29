import Utils from "./Utils.js";

export default class Slide {
  static styleCss = false;
  minNum = 0;
  maxNum;
  leftBtnLeft = 0;
  rightBtnLeft = 238;
  onChangeCallback = null;

  setOnChangeCallback(callback) {
    this.onChangeCallback = callback;
  }

  constructor(_max = 4000) {
    this.maxNum = _max;
    this.elem = this.createElem();
  }

  createElem() {
    if (this.elem) return this.elem;
    let div = Utils.createE("div");
    div.className = "slideContainer";
    div.innerHTML = `<p class="priceTxt">价格<span id="rangeText">￥${this.minNum}-${this.maxNum}</span></p>
      <div class="rangeContainer" id="rangeContainer">
          <div class="bgRange" id="bgRange"></div>
          <div class="priceRange" id="priceRange"></div>
          <span id="leftBtn" class="leftBtn"></span>
          <span id="rightBtn" class="rightBtn"></span>
      </div>`;
    Utils.getIdElem(div, this);
    Slide.setStyles();
    this.rangeContainer.addEventListener("mousedown", (e) => this.mouseHandler(e));
    return div;
  }

  appendTo(parent) {
    Utils.appendTo(this.elem, parent);
  }

  mouseHandler(e) {
    let rect = this.rangeContainer.getBoundingClientRect();
    switch (e.type) {
      case "mousedown":
        e.preventDefault();
        this.x = e.offsetX;
        this.btnType = e.target.id;
        if (/Range/.test(this.btnType)) {
          e.stopPropagation();
          this.rangeClick(e);
          return;
        }
        this.mouseHandlers = (e) => this.mouseHandler(e);
        document.addEventListener("mousemove", this.mouseHandlers);
        document.addEventListener("mouseup", this.mouseHandlers);
        break;
      case "mousemove":
        let x = e.clientX - rect.x - this.x;
        this.leftBtnLeft = parseInt(getComputedStyle(this.leftBtn).left);
        this.rightBtnLeft = parseInt(getComputedStyle(this.rightBtn).left);
        if (this.btnType === "leftBtn") {
          if (x < 0) x = 0;
          if (x > this.rightBtnLeft) x = this.rightBtnLeft;
          this.leftBtn.style.left = x + "px";
        } else if (this.btnType === "rightBtn") {
          if (x < this.leftBtnLeft) x = this.leftBtnLeft;
          if (x > this.bgRange.offsetWidth - 2) x = this.bgRange.offsetWidth - 2;
          this.rightBtn.style.left = x + "px";
        }
        this.changeRangeText();
        break;
      case "mouseup":
        document.removeEventListener("mousemove", this.mouseHandlers);
        document.removeEventListener("mouseup", this.mouseHandlers);
        break;
    }
  }

  rangeClick(e) {
    let click_X = e.clientX - this.rangeContainer.getBoundingClientRect().x - this.leftBtn.offsetWidth / 2;
    if (Math.abs(click_X - this.leftBtnLeft) < Math.abs(click_X - this.rightBtnLeft) ||
      (this.leftBtnLeft === this.rightBtnLeft && click_X < this.leftBtnLeft)) {
      this.leftBtn.style.left = click_X + "px";
    } else {
      this.rightBtn.style.left = click_X + "px";
    }
    this.leftBtnLeft = parseInt(getComputedStyle(this.leftBtn).left);
    this.rightBtnLeft = parseInt(getComputedStyle(this.rightBtn).left);
    this.changeRangeText();
  }

  changeRangeText() {
    let minTxt = Math.round(this.leftBtnLeft / (this.bgRange.clientWidth - 2) * this.maxNum);
    let maxTxt = Math.round(this.rightBtnLeft / (this.bgRange.clientWidth - 2) * this.maxNum);
    this.rangeText.innerText = `￥${minTxt}-${maxTxt}`;
    this.changeRangeSlide();
    if (this.onChangeCallback) {
      this.onChangeCallback({
        min: minTxt,
        max: maxTxt
      });
    }
  }

  changeRangeSlide() {
    this.priceRange.style.width = this.rightBtnLeft - this.leftBtnLeft + "px";
    this.priceRange.style.left = this.leftBtnLeft + "px";
  }

  static setStyles() {
    if (Slide.styleCss) return;
    Slide.styleCss = true;
    Utils.insertCss(".slideContainer", {
      width: "260px",
      height: "70px",
      margin: "50px"
    });
    Utils.insertCss(".priceTxt", {
      fontSize: "14px",
      color: "#666",
      marginBottom: "20px"
    });
    Utils.insertCss(".priceTxt span", {
      float: "right"
    });
    Utils.insertCss(".rangeContainer", {
      width: "260px",
      height: "20px",
      position: "relative",
    });
    Utils.insertCss(".bgRange", {
      width: "240px",
      height: "3px",
      backgroundColor: "#dedede",
      position: "absolute",
      left: "10px",
      top: "9px"
    });
    Utils.insertCss(".priceRange", {
      width: "240px",
      height: "3px",
      background: "#ffa800",
      position: "absolute",
      left: "10px",
      top: "9px"
    });
    Utils.insertCss(".rangeContainer span", {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      border: "1px solid #ccc",
      background: "#fff",
      position: "absolute",
      top: "0px",
      boxShadow: "2px 2px 2px #333"
    });
    Utils.insertCss(".leftBtn", {
      left: "0px"
    });
    Utils.insertCss(".rightBtn", {
      left: "238px"
    });
  }
}
