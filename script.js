// RANDOM SENSITIVITY FUNCTION
function randomSensFunc() {
  var mDecimal = document.getElementById("mDecimal");
  var icm      = document.getElementById("icm");
  var sens     = document.getElementById("sens");
  var dpi      = $("#dpi").val() || '800';
  var yaw      = $("#convert-sens-from").val();

  var generate = Math.random() * 100;
  var low      = Math.random() * (45 - 34.99) + 34.99;
  var mLow     = Math.random() * (35 - 32.1) + 32.1;
  var medium   = Math.random() * (32 - 28) + 28;
  var mHigh    = Math.random() * (27.99 - 25) + 25;
  var high     = Math.random() * (24.99 - 15) + 15;
  var random   = generate < 25 ?
  low
  : generate < 40 ?
  mLow
  : generate < 60 ?
  medium
  : generate < 75 ?
  mHigh
  : generate < 99.99 ?
  high
  : 1.33;

  icm.value  = Number(random).toFixed(mDecimal.checked ? 5 : 2);
  sens.value = Number(2.54 * 360 / (random * yaw * dpi)).toFixed(mDecimal.checked ? 5 : 2);
}

// RANDOM COEFFICIENT FUNCTION
function randomCoFunc() {
  var co = document.getElementById('coefficient');

  var generate = Math.random() * 100;
  var low      = Math.random() * (1.06 - 1.01) + 1.01;
  var medium   = Math.random() * (1.15 - 1.07) + 1.075;
  var high     = Math.random() * (1.25 - 1.16) + 1.15;
  var random   = generate < 60 ? medium : generate < 80 ? low : high;

  co.value = Number(random).toFixed(2);
}

// CONVERT FROM CM360 FUNCTION
function conCmFunc() {
  var conCm = document.getElementById("con-cm");
  var icmContainer = document.getElementById("icm-container");
  var sensContainer = document.getElementById("sens-container");

  if (conCm.checked){
    sensContainer.style.display = "none";
    icmContainer.style.display = "";
  } else {
    sensContainer.style.display = "";
    icmContainer.style.display = "none";
  }
}
// SCALE SENSITIVITY FUNCTION
function ssFunc() {
  var ss = document.getElementById("ss");
  var cc = document.getElementById("cc")
  var sensRangeTitle = document.getElementById("sens-range-title");
  var newFovContainer = document.getElementById("new-fov-container");
  var newFovTr = document.getElementById("new-fov-tr");
  var fovInput = document.getElementById('fov-input');
  var fovTableHead = document.getElementById("fov-table-head");
  var fovInputFov = document.getElementById("fov-input-fov");
  
  if (ss.checked){
    sensRangeTitle.innerHTML = "Scaled by Focal Length";
    newFovContainer.style.display = "";
    newFovTr.style.display = "";
    fovInput.style.display = '';
    fovInputFov.style.display = "";
    fovTableHead.colSpan = "4";
    document.getElementById("cc").disabled = true;
  } else {
    sensRangeTitle.innerHTML = "Range";
    newFovContainer.style.display = "none";
    newFovTr.style.display = "none";
    fovInput.style.display = 'none';
    fovInputFov.style.display = "none";
    fovTableHead.colSpan = "3";
    document.getElementById("cc").disabled = false;
  }
}

// COEFFICIENT FUNCTION
function ccFunc() {
  var cc         = document.getElementById('cc');
  var cContainer = document.getElementById('coefficient-container');
  var ranCoCont  = document.getElementById('random-co-container');
  var title      = document.getElementById('sens-range-title');
  var posCoRow   = document.getElementById('pos-coefficient-row');
  var negCoRow   = document.getElementById('neg-coefficient-row');

  if (cc.checked) {
    title.innerHTML = 'Coefficient';
    posCoRow.style.display = "";
    negCoRow.style.display = "";
    cContainer.style.display = "";
    ranCoCont.style.display = '';
    document.getElementById("ss").disabled = true;
  } else {
    title.innerHTML = 'Range';
    posCoRow.style.display = "none";
    negCoRow.style.display = "none";
    cContainer.style.display = "none";
    ranCoCont.style.display = 'none';
    document.getElementById("ss").disabled = false;
  }
}

function calculate() {
// math //
var tan    = Math.tan;
var atan   = Math.atan;
var pi     = Math.PI;
var log    = Math.log;

// inputs //
var yaw      = $("#convert-sens-from").val();
var dpi      = $("#dpi").val() || '800';
var sens     = $("#sens").val() || '6';
var icm      = $("#icm").val() || '30';
var fov      = $("#fov").val() || '103';
var newFov   = $("#new-fov").val() || '113';
var co       = $("#coefficient").val() || '1.1';
var mDecimal = document.getElementById("mDecimal");
var conCm    = document.getElementById("con-cm");
var ss       = document.getElementById("ss");
var sens     = conCm.checked ? (2.54 * 360 / (icm * yaw * dpi)).toFixed(mDecimal.checked ? 5 : 2) : Number(sens).toFixed(mDecimal.checked ? 5 : 2);
var cm360    = conCm.checked ? Number(icm).toFixed(mDecimal.checked ? 5 : 2) : (2.54 * 360 / (sens * yaw * dpi)).toFixed(mDecimal.checked ? 5 : 2);

// outputs //
var sensRange = document.getElementById("sens-range");
var sensOutput = document.getElementById("sens-output");
var cmOutput = document.getElementById("cm-output");
var posCoSensOutput = document.getElementById("pos-co-sens");
var posCoCmOutput = document.getElementById("pos-co-cm");
var negCoSensOutput = document.getElementById("neg-co-sens");
var negCoCmOutput = document.getElementById("neg-co-cm");

var owSens = document.getElementById("ow-sens");
var quakeSens = document.getElementById("quake-sens");
var valSens = document.getElementById("val-sens");
var fortSens = document.getElementById("fort-sens");

var sixteenByNine = document.getElementById("16by9");
var fourByThree = document.getElementById("4by3");
var oneByOne = document.getElementById("1by1");
var newSixteenByNine = document.getElementById("new16by9");
var newFourByThree = document.getElementById("new4by3");
var newOneByOne = document.getElementById("new1by1");

/*
  Sensitivty Converter 
*/
var ow = (sens * yaw * 10000 / 66).toFixed(mDecimal.checked ? 5 : 2);
var quake = (sens * yaw * 1000 / 22).toFixed(mDecimal.checked ? 5 : 2);
var val = (sens * yaw * 100 / 7).toFixed(mDecimal.checked ? 5 : 2);
var fort = (sens * yaw * 1000000 / 5555).toFixed(mDecimal.checked ? 5 : 2);

/*
  Sensitivity Range Method
*/
var range = cm360 == 92 ?
 'Certified accel user'
: cm360 > 50 ?
 'Retard sens'
: cm360 >= 45 ?
 'Cringe snoozer'
: cm360 >= 40 ?
 'Very low'
: cm360 > 35 ? 
 'Low'
: cm360 > 32 ?
 'Mid-low'
: cm360 >= 28 ?
 'Mid'
: cm360 >= 25 ?
 'Mid-high'
: cm360 == 23.09 || ow == 7.5 && dpi == 800 ?
 'шпион'
: cm360 >= 20 ? 
 'High'
: cm360 >= 15 ? 
 'Very high'
: cm360 >= 12 ?
 'Zoomin'
: cm360 == 1.33 ?
 'God sens'
: cm360 == 0.3 ?
 'Nonce sens'
: 'Retard sens';

/*
  FOV Converter
*/
const fovType = document.getElementById("16by9i").checked ?
 16/9
: document.getElementById("4by3i").checked ?
 4/3
: 1/1;
const fbt = ((360 * atan(4/3 * 1/ fovType * tan((fov) * pi/360)))/pi).toFixed(mDecimal.checked ? 5 : 2);
const sbn = ((360 * atan(16/9 * 1/ fovType * tan((fov) * pi/360)))/pi).toFixed(mDecimal.checked ? 5 : 2);
const oto = ((360 * atan(1/ fovType * tan((fov) * pi/360)))/pi).toFixed(mDecimal.checked ? 5 : 2);

const newFbt = ((360 * atan(4/3 * 1/(fovType) * tan((newFov) * pi/360)))/pi).toFixed(mDecimal.checked ? 5 : 2);
const newSbn = ((360 * atan(16/9 * 1/(fovType) * tan((newFov) * pi/360)))/pi).toFixed(mDecimal.checked ? 5 : 2);
const newOto = ((360 * atan(1/(fovType) * tan((newFov) * pi/360)))/pi).toFixed(mDecimal.checked ? 5 : 2);

/*
  Scaling Sensitivity
*/
var magnification = (sens / ((tan((fov) * pi/360) / tan((newFov) * pi/360)))).toFixed(mDecimal.checked ? 5 : 2);
//how to scale horrizontally = (newsbn / 2) / (sbn / 2) * sens

// Coefficients
var posCoSens = (sens * co).toFixed(mDecimal.checked ? 5 : 2);
var posCoCm   = (cm360 / co).toFixed(mDecimal.checked ? 5 : 2);
var negCoSens = (sens / co).toFixed(mDecimal.checked ? 5 : 2);
var negCoCm   = (cm360 * co).toFixed(mDecimal.checked ? 5 : 2);

//---------------//
// table outputs //
//---------------//
sensRange.innerHTML = ss.checked ?
 magnification
: cc.checked ?
 'None'
:range;
sensOutput.innerHTML = sens;
cmOutput.innerHTML = cm360;
posCoSensOutput.innerHTML = posCoSens;
posCoCmOutput.innerHTML = posCoCm;
negCoSensOutput.innerHTML = negCoSens;
negCoCmOutput.innerHTML = negCoCm;

owSens.innerHTML = ow;
quakeSens.innerHTML = quake;
valSens.innerHTML = val;
fortSens.innerHTML = fort;

sixteenByNine.innerHTML = sbn;
fourByThree.innerHTML = fbt;
oneByOne.innerHTML = oto;
newSixteenByNine.innerHTML = newSbn;
newFourByThree.innerHTML = newFbt;
newOneByOne.innerHTML = newOto;
}



/*
// Sensitivity Coverter //
const source    = sens * yaw * 1000 / 22;
const sensTable = [
 {
    game    : 'Overwatch',
    gameSens: sens * yaw * 10000 / 66,
    fovC    : 'Horizontal 16:9',
  }, {
    game    : 'Quake/Source',
    gameSens: sens * yaw * 1000 / 22,
    fovC    : 'Horizontal 4:3',
  }, {
    game    : 'Valorant',
    gameSens: (sens * yaw * 100 / 7).toFixed(3),
    fovC    : 'Horizontal 16:9',
  }, {
    game    : 'Fortnite',
    gameSens: (sens * yaw * 1000000 / 5555),
    fovC    : 'Horizontal 16:9',
  }, {
    game    : 'COD MW2 (90)',
    gameSens: source * 0.6371,
    fovC    : 'Horizontal 4:3',
  }, {
    game    : 'COD MW3 (100)',
    gameSens: source * 0.53457,
    fovC    : 'Horizontal 4:3',
  }, {
    game    : 'COD WW2 (95)',
    gameSens: source * 0.63,
    fovC    : 'Horizontal 4:3',
  }, {
    game    : 'Ironsight',
    gameSens: sens * yaw * 100 / 1,
    fovC    : 'Vertical 1:1',
  }, {
    game    : 'Splitgate',
    gameSens: (sens * yaw * 100) / (29997/32000 * sbn / 90),
    fovC    : 'Clamped Horizontal',
  }, {
    game    : 'PUBG',
    gameSens: log(Math.pow(((sens * yaw/(2.222 * 103/80))/0.002), 50))/log(10),
    fovC    : 'Horizontal 16:9',
  }, {
    game    : 'Battalion',
    gameSens: 52000 / ((1.73/source) * 400 * 60.0631),
    fovC    : 'Clamped Horizontal',
  }, {
    game    : 'Rainbow Six Siege',
    gameSens: sens * yaw * 100000 / 573,
    fovC    : 'Vertical 1:1',
  },
]; */