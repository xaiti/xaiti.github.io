// ----------------- //
// CUSTOM SELECT BOX //
// ----------------- //
const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach( o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        optionsContainer.classList.remove("active");
    });
});

// --------------------- //
// GAME SPECIFIC OPTIONS //
// --------------------- //
function gameSpecificFunc() {
  // overwatch
  $('.overwatch-content').each (function(){
    $(this).css('display', selected.textContent.includes('Overwatch') ? '' : 'none');
  });
  const asheRow = '<tr id="overwatch-ashe-row" class="overwatch-content"><td>Ashe</td><td id="ashe-sens-output"></td><td id="ashe-cm-output"></td><td id="ashe-coefficient"></td></tr>'
  if(selected.textContent.includes('Overwatch')){
    $('#sensitivity-overview').append(asheRow);
  }else{
    $('#overwatch-ashe-row').remove();
  };
  
  // csgo
  $('.csgo-content').each (function(){
    $(this).css('display', selected.textContent.includes('CS:GO') ? '' : 'none');
  });
  // apex
  $('.apex-content').each (function(){
    $(this).css('display', selected.textContent.includes('Apex Legends') ? '' : 'none');
  });
  // valorant
  $('.valorant-content').each (function(){
    $(this).css('display', selected.textContent.includes('Valorant') ? '' : 'none');
  });
  // fortnite
  $('.fortnite-content').each (function(){
    $(this).css('display', selected.textContent.includes('Fortnite') ? '' : 'none');
  });
  console.log('gameSpecificFunc loaded')
}$().ready(gameSpecificFunc);


// --------------------------- //
// RANDOM SENSITIVITY FUNCTION //
// --------------------------- //
function randomSensFunc() {
  const mDecimals = $('#more-decimals').is(':checked');
  const icm      = document.getElementById('icm');
  const sens     = document.getElementById('sens');
  const dpi      = $('#dpi').val() || '800';
  const rbs      = document.querySelectorAll('input[name="game"]');
  let yaw; for (const rb of rbs) {if (rb.checked) {yaw = rb.value;break;}}
  $('#overwatch').val('0.0066');$('#apex').val('0.022');$('#cs').val('0.022');
  $('#valorant').val('0.07');$('#fortnite').val('0.005555');$('#quake').val('0.022');

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

  icm.value  = random.toFixed(mDecimals ? 5 : 2);
  sens.value = (2.54 * 360 / (random * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
}


// --------------------------- //
// RANDOM COEFFICIENT FUNCTION //
// --------------------------- //
function randomCoefficientFunc() {
  var generate = Math.random() * 100;
  var low      = Math.random() * (1.06 - 1.01) + 1.01;
  var medium   = Math.random() * (1.15 - 1.07) + 1.075;
  var high     = Math.random() * (1.25 - 1.16) + 1.15;
  var random   = generate < 60 ? medium : generate < 80 ? low : high;

  document.getElementById('coefficient').value = Number(random).toFixed(2);
}


// --------------------------- //
// CONVERT FROM CM360 FUNCTION //
// --------------------------- //
function convertCmFunc() {
  const conCm = $('#convert-by-cm').is(':checked');
  document.getElementById('icm-container').style.display = conCm ? '' : 'none';
  document.getElementById('sens-container').style.display = conCm ? 'none' : '';
}$().ready(convertCmFunc);


// -------------------------- //
// SCALE SENSITIVITY FUNCTION //
// -------------------------- //
function ssFunc() {
  document.querySelectorAll('.scale-sensitivity-content').forEach(x => {
    document.getElementById('fov-table-head').colSpan = document.getElementById('ss').checked ? '4' : '3';
    x.style.display = document.getElementById('ss').checked ? '' : 'none'
  });
  var ssRow = '<tr id="scaled-sens-row" class="hidden-row scale-sensitivity-content"><td>Scaled by FOV</td><td id="scaled-sens"></td><td id="scaled-cm"></td><td id="scaled-range"></td></tr>'
    if($('#ss').is(':checked')){
      $('#sensitivity-overview > tbody > tr').eq(1).after(ssRow);
    }else{
      $('#scaled-sens-row').remove();
    };
}$().ready(ssFunc);


// -------------------- //
// COEFFICIENT FUNCTION //
// -------------------- //
function ccFunc() {
  $('#coefficient-container').css('display', $('#cc').is(':checked') ? '' : 'none');

  var ccRow = "<tr id='coefficient-row' class='coefficient-content'><td>Hipfire Coefficient</td><td id='coefficient-sens'>sens</td><td id='coefficient-cm'>cm</td><td id='coefficient-range'>range</td></tr>"
    if($('#cc').is(':checked')){
      $('#sensitivity-overview > tbody > tr').eq(1).after(ccRow);
    }else{
      $('#coefficient-row').remove();
    };
}$().ready(ccFunc);


// ------------------ //
// CALCULATE FUNCTION //
// ------------------ //
function calculate() {
// math
const tan    = Math.tan;
const atan   = Math.atan;
const pi     = Math.PI;
const log    = Math.log;

// inputs
$('#overwatch').val('0.0066');
$('#apex').val('0.022');
$('#cs').val('0.022');
$('#valorant').val('0.07');
$('#fortnite').val('0.005555');
$('#quake').val('0.022');
const rbs = document.querySelectorAll('input[name="game"]');
let yaw;
for (const rb of rbs) {
  if (rb.checked) {
    yaw = rb.value;
    break;
  }
}
var dpi       = $('#dpi').val() || '800';
var sens      = $('#sens').val() || '6';
var icm       = $('#icm').val() || '30';
var fov       = $('#fov').val() || '103';
var newFov    = $('#new-fov').val() || '113';
var mDecimals = $('#more-decimals').is(':checked');
var conCm     = $('#convert-by-cm').is(':checked');
var sens      = conCm ? (2.54 * 360 / (icm * yaw * dpi)).toFixed(mDecimals ? 5 : 2) : Number(sens).toFixed(mDecimals ? 5 : 2);
var cm360     = conCm ? Number(icm).toFixed(mDecimals ? 5 : 2) : (2.54 * 360 / (sens * yaw * dpi)).toFixed(mDecimals ? 5 : 2);

// outputs //
var sensRange = document.getElementById("sens-range");
var sensOutput = document.getElementById("sens-output");
var cmOutput = document.getElementById("cm-output");

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
var ow = (sens * yaw * 10000 / 66).toFixed(mDecimals ? 5 : 2);
var quake = (sens * yaw * 1000 / 22).toFixed(mDecimals ? 5 : 2);
var val = (sens * yaw * 100 / 7).toFixed(mDecimals ? 5 : 2);
var fort = (sens * yaw * 1000000 / 5555).toFixed(mDecimals ? 5 : 2);

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
 'Nonce'
: 'Retard sens';

/*
  FOV Converter
*/
$('#16by9i').val(16/9);
$('#4by3i').val(4/3);
$('#1by1i').val(1/1);
const fovRbs = document.querySelectorAll('input[name="fov"]');
let fovType;
for (const fovRb of fovRbs) {
  if (fovRb.checked) {
    fovType = fovRb.value;
    break;
  }
}
const fbt = ((360 * atan(4/3 * 1/ fovType * tan((fov) * pi/360)))/pi).toFixed(mDecimals ? 5 : 2);
const sbn = ((360 * atan(16/9 * 1/ fovType * tan((fov) * pi/360)))/pi).toFixed(mDecimals ? 5 : 2);
const oto = ((360 * atan(1/ fovType * tan((fov) * pi/360)))/pi).toFixed(mDecimals ? 5 : 2);

const newFbt = ((360 * atan(4/3 * 1/(fovType) * tan((newFov) * pi/360)))/pi).toFixed(mDecimals ? 5 : 2);
const newSbn = ((360 * atan(16/9 * 1/(fovType) * tan((newFov) * pi/360)))/pi).toFixed(mDecimals ? 5 : 2);
const newOto = ((360 * atan(1/(fovType) * tan((newFov) * pi/360)))/pi).toFixed(mDecimals ? 5 : 2);

/*
  Scaling Sensitivity
*/
var scaledSens  = (sens / ((tan((fov) * pi/360) / tan((newFov) * pi/360)))).toFixed(mDecimals ? 5 : 2);
var scaledCm    = (2.54 * 360 / (scaledSens * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
var scaledRange = scaledCm == 92 ?
'Certified accel user'
: scaledCm > 50 ?
'Retard sens'
: scaledCm >= 45 ?
'Cringe snoozer'
: scaledCm >= 40 ?
'Very low'
: scaledCm > 35 ? 
'Low'
: scaledCm > 32 ?
'Mid-low'
: scaledCm >= 28 ?
'Mid'
: scaledCm >= 25 ?
'Mid-high'
: scaledCm == 23.09 || ow == 7.5 && dpi == 800 ?
'шпион'
: scaledCm >= 20 ? 
'High'
: scaledCm >= 15 ? 
'Very high'
: scaledCm >= 12 ?
'Zoomin'
: scaledCm == 1.33 ?
'God sens'
: scaledCm == 0.3 ?
'Nonce'
: 'Retard sens';




// Coefficient
var coefficient       = $('#coefficient').val() || '1.1';
var coefficientSens   = (sens * coefficient).toFixed(mDecimals ? 5 : 2);
var coefficientCm     = (cm360 / coefficient).toFixed(mDecimals ? 5 : 2);
var coefficientRange  =  coefficientCm == 92 ?
'Certified accel user'
: coefficientCm > 50 ?
'Retard sens'
: coefficientCm >= 45 ?
'Cringe snoozer'
: coefficientCm >= 40 ?
'Very low'
: coefficientCm > 35 ? 
'Low'
: coefficientCm > 32 ?
'Mid-low'
: coefficientCm >= 28 ?
'Mid'
: coefficientCm >= 25 ?
'Mid-high'
: coefficientCm == 23.09 || ow == 7.5 && dpi == 800 ?
'шпион'
: coefficientCm >= 20 ? 
'High'
: coefficientCm >= 15 ? 
'Very high'
: coefficientCm >= 12 ?
'Zoomin'
: coefficientCm == 1.33 ?
'God sens'
: coefficientCm == 0.3 ?
'Nonce'
: 'Retard sens';

// Overwatch Settings
const widowZoom = $('#overwatch-widow-input').val() || '37.89';
const asheZoom = $('#overwatch-ashe-input').val() || '51.47';
const widowSens = (sens * (widowZoom / 100)).toFixed(mDecimals ? 5 : 2);
const asheSens = (sens * (asheZoom / 100)).toFixed(mDecimals ? 5 : 2);

const widowCo = ((0.01 / 0.37890917574) * widowZoom).toFixed(mDecimals ? 5 : 2);
const asheCo = ((0.01 / 0.51469332771) * asheZoom).toFixed(mDecimals ? 5 : 2);

// Apex Settings
const apex1x = $('#apex-1x-input').val() || '1';
const apex2x = $('#apex-2x-input').val() || '1';
const apex3x = $('#apex-3x-input').val() || '1';
const apex4x = $('#apex-4x-input').val() || '1';
const apex6x = $('#apex-6x-input').val() || '1';
const apex8x = $('#apex-8x-input').val() || '1';
const apex10x = $('#apex-10x-input').val() || '1';

const apex1xFov = fbt / (7/6);
const apexArFov = fbt / (70/55);
const apex2xFov = fbt / (70/38.6);
const apex3xFov = fbt / (70/26.28);
const apex4xFov = fbt / (70/19.86);
const apex6xFov = fbt / (70/13.312);
const apex8xFov = fbt / (70/10.004);
const apex10xFov = fbt / (70/8.01);

const apex1xOutput = (sens / ((tan((fbt) * pi/360) / tan((apex1xFov) * pi/360))) * apex1x).toFixed(mDecimals ? 5 : 2);
const apexArOutput = (sens / ((tan((fbt) * pi/360) / tan((apexArFov) * pi/360))) * apex1x).toFixed(mDecimals ? 5 : 2);
const apex2xOutput = (sens / ((tan((fbt) * pi/360) / tan((apex2xFov) * pi/360))) * apex2x).toFixed(mDecimals ? 5 : 2);
const apex3xOutput = (sens / ((tan((fbt) * pi/360) / tan((apex3xFov) * pi/360))) * apex3x).toFixed(mDecimals ? 5 : 2);
const apex4xOutput = (sens / ((tan((fbt) * pi/360) / tan((apex4xFov) * pi/360))) * apex4x).toFixed(mDecimals ? 5 : 2);
const apex6xOutput = (sens / ((tan((fbt) * pi/360) / tan((apex6xFov) * pi/360))) * apex6x).toFixed(mDecimals ? 5 : 2);
const apex8xOutput = (sens / ((tan((fbt) * pi/360) / tan((apex8xFov) * pi/360))) * apex8x).toFixed(mDecimals ? 5 : 2);
const apex10xOutput = (sens / ((tan((fbt) * pi/360) / tan((apex10xFov) * pi/360))) * apex10x).toFixed(mDecimals ? 5 : 2);

//---------------//
// Table Outputs //
//---------------//
// Sensitivity Overview //
sensOutput.innerHTML = sens;
cmOutput.innerHTML = cm360;
$('#sens-range').html(range);
// console.log(document.getElementById('cmOutput').innerHTML);
// console.log($('#sens-range').html());
// scaled sensitivity
if($('#ss').is(':checked')){
document.getElementById('scaled-sens').innerHTML = scaledSens;
document.getElementById('scaled-cm').innerHTML = scaledCm;
document.getElementById('scaled-range').innerHTML = scaledRange;
};
// coefficient
if($('#cc').is(':checked')){
document.getElementById('coefficient-sens').innerHTML = coefficientSens;
document.getElementById('coefficient-cm').innerHTML = coefficientCm;
document.getElementById('coefficient-range').innerHTML = coefficientRange;
};

// Sensitivity Converter //
owSens.innerHTML = ow;
quakeSens.innerHTML = quake;
valSens.innerHTML = val;
fortSens.innerHTML = fort;

// FOV Converter //
sixteenByNine.innerHTML = sbn;
fourByThree.innerHTML = fbt;
oneByOne.innerHTML = oto;
newSixteenByNine.innerHTML = newSbn;
newFourByThree.innerHTML = newFbt;
newOneByOne.innerHTML = newOto;

// Overwatch Settings //
if(selected.textContent.includes('Overwatch')){
document.getElementById('widow-sens-output').innerHTML = widowSens;
document.getElementById('ashe-sens-output').innerHTML = asheSens;
document.getElementById('widow-cm-output').innerHTML = (2.54 * 360 / (widowSens * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('ashe-cm-output').innerHTML = (2.54 * 360 / (asheSens * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('widow-coefficient').innerHTML = widowCo;
document.getElementById('ashe-coefficient').innerHTML = asheCo;
}
// Apex Overview //
document.getElementById('hipfire-sens').innerHTML = sens;
document.getElementById('1x-sens').innerHTML = apex1xOutput;
document.getElementById('ar-sens').innerHTML = apexArOutput;
document.getElementById('2x-sens').innerHTML = apex2xOutput;
document.getElementById('3x-sens').innerHTML = apex3xOutput;
document.getElementById('4x-sens').innerHTML = apex4xOutput;
document.getElementById('6x-sens').innerHTML = apex6xOutput;
document.getElementById('8x-sens').innerHTML = apex8xOutput;
document.getElementById('10x-sens').innerHTML = apex10xOutput;
document.getElementById('hipfire-cm').innerHTML = cm360;
document.getElementById('1x-cm').innerHTML = (2.54 * 360 / (apex1xOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('ar-cm').innerHTML = (2.54 * 360 / (apexArOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('2x-cm').innerHTML = (2.54 * 360 / (apex2xOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('3x-cm').innerHTML = (2.54 * 360 / (apex3xOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('4x-cm').innerHTML = (2.54 * 360 / (apex4xOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('6x-cm').innerHTML = (2.54 * 360 / (apex6xOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('8x-cm').innerHTML = (2.54 * 360 / (apex8xOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('10x-cm').innerHTML =(2.54 * 360 / (apex10xOutput * yaw * dpi)).toFixed(mDecimals ? 5 : 2);
document.getElementById('hipfire-fov').innerHTML = fbt;
document.getElementById('1x-fov').innerHTML = (fbt / (7/6)).toFixed(mDecimals ? 5 : 2);
document.getElementById('ar-fov').innerHTML = (fbt / (70/55)).toFixed(mDecimals ? 5 : 2);
document.getElementById('2x-fov').innerHTML = (fbt / (70/38.6)).toFixed(mDecimals ? 5 : 2);
document.getElementById('3x-fov').innerHTML = (fbt / (70/26.28)).toFixed(mDecimals ? 5 : 2);
document.getElementById('4x-fov').innerHTML = (fbt / (70/19.86)).toFixed(mDecimals ? 5 : 2);
document.getElementById('6x-fov').innerHTML = (fbt / (70/13.312)).toFixed(mDecimals ? 5 : 2);
document.getElementById('8x-fov').innerHTML = (fbt / (70/10.004)).toFixed(mDecimals ? 5 : 2);
document.getElementById('10x-fov').innerHTML = (fbt / (70/8.01)).toFixed(mDecimals ? 5 : 2);
}$().ready(calculate);



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

// Uncheck all checkboxes on refresh
$().ready(function() {
  $('input[type="checkbox"]').each(function(){
  $(this).prop('checked', false);
  });
});