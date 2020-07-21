function fillStringLeft(str, size, filling)
{
 var finalStr = str;
 while (finalStr.length < size)
 {
  finalStr = filling + finalStr;
 }
 
 return finalStr;
}

function fillStringRight(str, size, filling)
{
 var finalStr = str;
 while (finalStr.length < size)
 {
  finalStr = finalStr + filling
 }
 
 return finalStr;
}

function serializeDate(dt)
{
 var serializedDate = dt.getFullYear();
 serializedDate += fillStringLeft('' + (dt.getMonth()+1), 2, '0');
 serializedDate += fillStringLeft('' + dt.getDate(), 2, '0');
 
 return serializedDate;
}

function serializeDatetime(dt)
{
 var serializedDatetime = dt.getFullYear();
 serializedDatetime += fillStringLeft('' + (dt.getMonth()+1), 2, '0');
 serializedDatetime += fillStringLeft('' + dt.getDate(), 2, '0');
 serializedDatetime += fillStringLeft('' + dt.getHours(), 2, '0');
 serializedDatetime += fillStringLeft('' + dt.getMinutes(), 2, '0');
 serializedDatetime += fillStringLeft('' + dt.getSeconds(), 2, '0');
 
 return serializedDatetime;
}

function prepareCompareString(str)
{
 var finalStr = trim(str);
 if (finalStr != null)
 {
  finalStr = finalStr.toLowerCase();
  finalStr = finalStr.replace(/[àáâãäå]/, 'a');
  finalStr = finalStr.replace(/[èéêëæ]/, 'e');
  finalStr = finalStr.replace(/[ìíîï]/, 'i');
  finalStr = finalStr.replace(/[òóôõöøœ]/, 'o');
  finalStr = finalStr.replace(/[ùúûü]/, 'u');
  finalStr = finalStr.replace(/[ýÿ]/, 'y');
  finalStr = finalStr.replace(/[š]/, 's');
  finalStr = finalStr.replace(/[ž]/, 'z');
  finalStr = finalStr.replace(/[ð]/, 'd');
  finalStr = finalStr.replace(/[þ]/, 'th');
 }
 
 return finalStr;
}

function trim(str)
{
 var finalStr = str;
 while ((finalStr != null) && (finalStr.length > 0) && (finalStr.charAt(0) == ' '))
 {
  finalStr = finalStr.substring(1);
 }
 while ((finalStr != null) && (finalStr.length > 0) && (finalStr.charAt(finalStr.length - 1) == ' '))
 {
  finalStr = finalStr.substring(0, finalStr.length - 1);
 }
 
 return finalStr;
}

function getValues(str)
{
 var i;
 var values = new Array();
 if ((str != null) && (str.length > 0))
 {
  var strParts = str.split(',');
  for (i = 0; i < strParts.length; i++)
  {
   values[values.length] = trim(strParts[i]);
  }
 }
 
 return values;
}

function getElementPosition(el)
{
 var l = 0;
 var t = 0;
 do
 {
  l += el.offsetLeft;
  t += el.offsetTop;
  
  el = el.offsetParent;
 }
 while (el != null);
 
 return [l, t];
}

function getDocumentScrollPosition()
{
 var l = window.pageXOffset || document.documentElement['scrollLeft'] || document.body.scrollLeft;
 var t = window.pageYOffset || document.documentElement['scrollTop'] || document.body.scrollTop;
  
 return [l, t];
}

function setDocumentScrollPosition(p)
{
 window.scrollTo(p[0], p[1]);
 //window.pageXOffset = document.documentElement['scrollLeft'] = document.body.scrollLeft = p[0];
 //window.pageYOffset = document.documentElement['scrollTop'] = document.body.scrollTop = p[1];
}

function getDocumentSize()
{
 var w = document.documentElement['clientWidth'];
 var h = document.documentElement['clientHeight'];
 
 return [w, h];
}

function getDocumentScrollSize()
{
 var w = document.documentElement['scrollWidth'];
 var sw = document.documentElement['clientWidth'];
 if (w < sw)
 {
  w = sw;
 }
 var h = document.documentElement['scrollHeight'];
 var sh = document.documentElement['clientHeight'];
 if (h < sh)
 {
  h = sh;
 }
 
 return [w, h];
}

/*
var animateScrollPositionTimer = null;
var lastScrollPosY = -1;
function animateScrollPositionTo(id, offset)
{
 if (animateScrollPositionTimer != null)
 {
  clearTimeout(animateScrollPositionTimer);
  animateScrollPositionTimer = null;
 }
 
 var offs = offset;
 if (!offset)
 {
  offs = 0;
 }
 
 var finalScrollPos = getElementPosition(elem(id));
 var currentScrollPos = getDocumentScrollPosition();
 
 var finalScrollPosY = parseInt(finalScrollPos[1] + offs);
 var currentScrollPosY = parseInt(currentScrollPos[1]);
 var step = parseInt((finalScrollPosY - currentScrollPosY) / 6);
 
 if (step == 0)
 {
  if (finalScrollPosY > currentScrollPosY)
  {
   step = 1;
  }
  if (finalScrollPosY < currentScrollPosY)
  {
   step = -1;
  }
 }
 currentScrollPosY += step;
 finalScrollPos[1] = currentScrollPosY;
 setDocumentScrollPosition(finalScrollPos);
 if ((currentScrollPosY != finalScrollPosY) && (lastScrollPosY != currentScrollPos[1]))
 {
  lastScrollPosY = currentScrollPos[1];
  animateScrollPositionTimer = setTimeout("animateScrollPositionTo('" + id + "', " + offs + ")", 15);
 }
 else
 {
  lastScrollPosY = -1;
 }
}
*/

var animateScrollPositionTimer = null;
var animateScrollPositionLastY = -1;
var animateScrollPositionLastCount = 0;
function animateScrollPositionTo(id, offset)
{
 if (animateScrollPositionTimer != null)
 {
  clearTimeout(animateScrollPositionTimer);
  animateScrollPositionTimer = null;
 }
 
 var offs = offset;
 if (!offset)
 {
  offs = 0;
 }
 
 var finalScrollPos = getElementPosition(elem(id));
 var finalScrollPosY = parseInt(finalScrollPos[1] + offs);
 
 var currentScrollPos = getDocumentScrollPosition();
 var currentScrollPosX = parseInt(currentScrollPos[0]);
 var currentScrollPosY = parseInt(currentScrollPos[1]);
 
 var factor = Math.log(Math.abs(finalScrollPosY - currentScrollPosY) + 2);
 var step = parseInt((finalScrollPosY - currentScrollPosY) / factor);
 
 if (step == 0)
 {
  if (finalScrollPosY > currentScrollPosY)
  {
   step = 1;
  }
  if (finalScrollPosY < currentScrollPosY)
  {
   step = -1;
  }
 }
 var newScrollPosX = currentScrollPosX;
 var newScrollPosY = currentScrollPosY + step;
 var newScrollPos = new Array(newScrollPosX, newScrollPosY);
 setDocumentScrollPosition(newScrollPos);
 
 if (newScrollPosY == finalScrollPosY)
 {
  animateScrollPositionLastY = -1;
  animateScrollPositionLastCount = 0;
  return;
 }
 if (newScrollPosY == animateScrollPositionLastY)
 {
  animateScrollPositionLastCount++;
  if (animateScrollPositionLastCount > 5)
  {
   animateScrollPositionLastY = -1;
   animateScrollPositionLastCount = 0;
   return;
  }
 }
 
 animateScrollPositionLastY = newScrollPosY;
 
 animateScrollPositionTimer = setTimeout("animateScrollPositionTo('" + id + "', " + offs + ")", 25 + 25 * animateScrollPositionLastCount);
}

function setCookie(name, value, expireDate)
{
 var cookieStr = name + '=' + value + '; ';
 if (expireDate != null)
 {
  cookieStr += 'expires=' + expireDate.toGMTString() + '; ';
 }
 cookieStr += 'path=/';
 
 document.cookie = cookieStr;
}

function delCookie(name)
{
 var expireDate = new Date();
 expireDate.setTime(2000, 0, 0, 1, 0, 0, 0);
 var cookieStr = name + '=; expires=' + expireDate.toGMTString() + '; path=/';
 
 document.cookie = cookieStr;
}

function getCookie(name)
{
 var i;
 var value = null;
 var cookiesParts = document.cookie.split(';');
 for (i = 0; i < cookiesParts.length; i++)
 {
  var cookiePart = trim(cookiesParts[i]);
  if (cookiePart.indexOf(name + '=') == 0)
  {
   value = trim(cookiePart.substring(name.length + 1));
   break;
  }
 }
 
 return value;
}