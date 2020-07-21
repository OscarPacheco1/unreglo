function ImageLoader()
{
  this.TIMER_DURATION = 50;
	this.image = null;
	this.timer = null;
 	this.onEndFunction = null;
};
 
ImageLoader.prototype.TIMER_DURATION = 50;
ImageLoader.prototype.image = null;
ImageLoader.prototype.timer = null;
ImageLoader.prototype.onEndFunction = null;

ImageLoader.prototype.setOnEndFunction = function(onEndFunction)
{
  this.onEndFunction = onEndFunction;
};

ImageLoader.prototype.loadImage = function(source)
{
  if (this.timer != null)
  {
    clearTimeout(this.timer);
  }
  var _this = this;
  this.image = new Image();
  this.image.onerror = function()
  {
    clearTimeout(_this.timer);
    if (_this.onEndFunction != null)
    {
      _this.onEndFunction.call(this, false, 0, 0);
    }
  };
  this.image.src = source;
  this.timer = setTimeout(function() { _this._waitLoad(); }, 10);
};

ImageLoader.prototype._waitLoad = function()
{
  if (this.image.complete)
  {
    if (this.onEndFunction != null)
    {
     var isLoaded = true;
     var width = this.image.width;
     var height = this.image.height;
     if ((width <= 0) || (height <= 0))
     {
      isLoaded = false;
      width = 0;
      height = 0;
     }
     this.onEndFunction.call(this, isLoaded, width, height);
    }
  }
  else
  {
    var _this = this;
    this.timer = setTimeout(function() { _this._waitLoad(); }, this.TIMER_DURATION);
  }
};

/*
ImageLoader.prototype._onLoadError = function()
{
  clearTimeout(this.timer);
  if (this.onEndFunction != null)
  {
     this.onEndFunction.call(this, false, 0, 0);
  }
};
*/

