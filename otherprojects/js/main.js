var variable = 0;
var baseDelay = 100;
var accelerator = 0;
var multiplier = 1;
var additor = 1;
var acceleratorCost = 10;
var multiplierCost = 10;
var additorCost = 10;

function incrementVariableForever() {
    var delay = baseDelay - accelerator;
    variable += additor*multiplier;
    $("#var").text(variable);
    setTimeout(incrementVariableForever, delay);
}
incrementVariableForever();

$("#accelerator").text("Increment accelerator for " + acceleratorCost);
$("#additor").text("Increment additor for " + additorCost);
$("#multiplier").text("Increment multiplier for " + multiplierCost);

$("#accelerator").click(incrementAccelerator);
$("#additor").click(incrementAdditor);
$("#multiplier").click(incrementMultiplier);

function incrementAccelerator() {
    if (variable > acceleratorCost) {
        accelerator++;
        variable -= acceleratorCost;
        acceleratorCost = acceleratorCost+10;
        $("#accelerator").text("Increment accelerator for " + acceleratorCost);
    }
}

function incrementAdditor() {
    if (variable > additorCost) {
        additor++;
        variable -= additorCost;
        additorCost = additorCost*2;
        $("#additor").text("Increment additor for " + additorCost);
    }
}

function incrementMultiplier() {
    if (variable > multiplierCost) {
        multiplier++;
        variable -= multiplierCost;
        multiplierCost = multiplierCost*multiplierCost;
        $("#multiplier").text("Increment multiplier for " + multiplierCost);
    }
}