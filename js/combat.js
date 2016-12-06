var encounter = {
        actors: [],
        monsters: []
};

var skills = {
        drain: {
            name: "Last Breath",
            id: "drain",
            cost: 0,
            type: "target",
            description: "Attempt to heal yourself while striking down an enemy. Only works on weakened foes.",
            effect: function(user, target) {
                var modUser = applyModifiers(user);
                var damage = modUser.attack/2;
                if (damage >= target.hp) {
                    target.hp = 0;
                    var healQuantity = Math.floor(target.maxhp/2);
                    heal(user, healQuantity);
                    consoleLog(user.name + " strikes with dark magic!");
                    consoleLog(user.name + " is healed for " + healQuantity + " health!");
                } else {
                    consoleLog("The " + target.name + " is too healthy to drain!");
                }
            }
        },
        blast: {
            name: "Darkblast",
            id: "blast",
            cost: 5,
            type: "automatic",
            description: "Strike all foes with a wave of dark damage.",
            effect: function() {
                var modUser = applyModifiers(player);
                for (var i = 0; i < encounter.monsters.length; i++) {
                    var modTarget = applyModifiers(encounter.monsters[i]);
                    var damage = calculateDamage(modUser.tec, modTarget.defense);
                    encounter.monsters[i].hp -= damage;
                    consoleLog("The " + encounter.monsters[i].name + " is chilled for " + damage + " damage!");
                    if(encounter.monsters[i].hp <= 0) {
                        killMonster(i);
                    }
                }
                battleContinue();
            }
        },
        focus: {
            name: "Focus",
            id: "focus",
            cost: 0,
            type: "automatic",
            description: "Charge magical energy for next turn",
            effect: function() {
                addModifier(player, modifiers.focused, 2);
                consoleLog(user.name + " focuses...");
                battleContinue();
            }
        }
};

var modifiers = {
        defending: function(target) {
            target.defense = (target.defense*2)+1;
        },
        sharp: function(target) {
            target.attack = target.attack*2;
        },
        focused: function(target) {
            target.tec += 10;
        } 
};

var party = [];
var player1 = {
        user: true,
        name: 'Hero',
        maxhp: 10,
        hp: 10,
        maxsp: 5,
        sp: 5,
        attack: 2,
        defense: 0,
        speed: 10,
        tec: 1,
        exp: 0,
        level: 1,
        initiative: 0,
        skills: [skills.drain, skills.blast, skills.focus],
        modifiers: []
};
party.push(player1);
var player = player1;
$("#hp1").attr("title", "10");

function generateEncounter(monsters) {
    encounter.actors = [];
    encounter.monsters = [];
    for (var i = 0; i < party.length; i++) {
        encounter.actors.push(party[i]);
    }
    for (var i = 0; i < monsters.length; i++) {
        var monsterClone = $.extend({}, monsters[i]);
        encounter.actors.push(monsterClone);
        encounter.monsters.push(monsterClone);
    }
};

function applyModifiers(actor) {
    var modified = $.extend({}, actor);
    for (var i = 0; i < actor.modifiers.length; i++) {
        actor.modifiers[i].modifier(modified);
    }
    return modified;
};

function addModifier(actor, modifier, duration) {
    actor.modifiers.push({
        duration: duration,
        modifier: modifier
    });
};

function countdownTimers(actor) {
    var newModifiers = [];
    for (var i = 0; i < actor.modifiers.length; i++) {
        if (actor.modifiers[i].duration > 1) {
            actor.modifiers[i].duration -= 1;
            newModifiers.push(actor.modifiers[i]);
        }
    }
    actor.modifiers = newModifiers;
};

var turnorder = 0;
function getTurn() {
        if (turnorder == undefined || turnorder >= encounter.actors.length) {
            turnorder = 0;
        }
        var actor = encounter.actors[turnorder];
        actor.initiative += actor.speed;
        if (actor.initiative >= 100 && actor.hp > 0) {
            actor.initiative = 0;
            doTurn(actor);
        } else {
            turnorder++;
            getTurn(turnorder);
        }
};

function doTurn(actor) {
    countdownTimers(actor);
    if (actor.user) {
        player = actor;
        consoleLog(player.name + " stands ready!");
    } else {
        monsterTurn(actor);
    }
};

function heal(target, quantity) {
    target.hp += quantity;
    if (target.hp > target.maxhp) {
        target.hp = target.maxhp;
    }
};

function lookMonster(event)
{
    var index = $(event.target).attr('index');
    consoleLog("You clicked monster " + index);
};
    
function clickMonster(e) {lookMonster(e)};

function clickAttack()
{
    if(mode == 'battle')
    {
        consoleLog("Please select a target");
        bindMonster(doAttack);
    }
};

function bindMonster(clickEvent) {
    $('#monster').unbind('click');
    $("#monster").click(clickEvent);
};

function doAttack(event) {
    bindMonster(lookMonster);
    var index = $(event.target).attr('index');
    var monster = encounter.monsters[index];
    var modMonster = applyModifiers(monster);
    var modPlayer = applyModifiers(player);
    var playerDamage = calculateDamage(modPlayer.attack, modMonster.defense);
    monster.hp -= playerDamage;
    consoleLog(player.name + " bonks the " + monster.name + " for " + playerDamage + " damage!");
    if(monster.hp <= 0) {
        killMonster(index);
    }
    battleContinue();
};

function battleContinue() {
    if(combatOver()) {
        endBattle();
    } else {
        getTurn();
    }
}

function checkDefeats() {
    for (var i = 0; i < encounter.monsters.length; i++) {
        if (encounter.monsters[i].hp <= 0) {
            killMonster(i);
        }
    }
};

function combatOver() {
    for (var i = 0; i < encounter.monsters.length; i++) {
        if (encounter.monsters[i].hp > 0) {
            return false;
        }
    }
    return true;
};

function monsterTurn(monster)
{
    var modMonster = applyModifiers(monster);
    var target = party[Math.floor(Math.random()*(party.length))]; 
    var modTarget = applyModifiers(target);
    var monsterDamage = calculateDamage(modMonster.attack, modTarget.defense);
    target.hp -= monsterDamage;
    updateHP();
    consoleLog("The " + monster.name + " " + monster.verb + " " + target.name +" for " + monsterDamage + " damage!");
    if(player.hp <= 0) {
        lose();
    }
    getTurn();
};

function calculateDamage(attack, defense) {
    attackAdjustment = Math.random() + 0.5;
    defenseAdjustment = Math.random() + 0.5;
    attackDamage = attack*attackAdjustment - defense*defenseAdjustment;
    finalDamage = Math.floor(attackDamage);
    if (finalDamage < 0) {
        return 0;
    }
    return Math.floor(attackDamage);
};

function clickSkillMenu()
{
    if (player.skills.length == 0) {
        consoleLog("You don't have any skills yet.");
    } else {
        $("#skillmenu").toggle();
    }
};

function learnSkill(skill)
{
    $("#skillmenu").append("<div class='skill' skill='" + skill.id + "'><h3>" + skill.name + " " + skill.cost + "AP</h3><p>" + skill.description +"</p></div>");
};

var boundSkill = lookMonster;

function clickSkill(event)
{
    $("#skillmenu").toggle();
    var skillname = $(event.target).attr('skill');
    var skill = skills[skillname];
    if (skill.type = "target") {
        consoleLog("Please select a target");
        boundSkill = skill;
        bindMonster(doSkill);
    } else {
        doSkill();
    }
};

function doSkill(event)
{
    bindMonster(lookMonster);
    player.sp -= boundSkill.cost;
    updateSP();
    var index = $(event.target).attr('index');
    var monster = encounter.monsters[index];
    boundSkill.effect(player, monster);
    checkDefeats();
    battleContinue();
};

function clickDefend()
{
    if(mode == 'battle')
    {
        consoleLog(player.name + " defends!");
        addModifier(player, modifiers.defending, 1);
        getTurn();
    }
};

function clickItem()
{
    consoleLog("You are not carrying anything.");
};

function clickFlee()
{
    if(mode == 'battle')
    {
        consoleLog("You flee!");
        for (var i = 0; i < encounter.monsters.length; i++) {
            player.exp += encounter.monsters[i].exp;
            $("#monster"+i).hide();
        }
        lock = false;
        mode = 'move';
    }
};

function updateHP() {
    var hpwidth = ((player.hp/player.maxhp)*100) + "%";
    $("#hp1").css("width", hpwidth);
    $("#hp1").attr("title", player.hp);
};

function updateSP() {
    var spwidth = ((player.sp/player.maxsp)*100) + "%";
    $("#mag1").css("width", spwidth);
    $("#mag").attr("title", player.sp);
};

function lose()
{
    consoleLog("The monsters defeated you!");
    lock = false;
    mode = 'dead';
};

function killMonster(index)
{
    $("#monster"+index).hide();
};

function endBattle()
{
    for (var i = 0; i < party.length; i++) {
        party[i].modifiers = [];
    }
    consoleLog("You are victorious!");
    
    var expTotal = 0;
    for (var i = 0; i < encounter.monsters.length; i++) {
        expTotal += encounter.monsters[i].exp;
        $("#monster"+i).hide();
    }
    for (var i = 0; i < party.length; i++) {
        var expGained = Math.floor(expTotal/party.length);
        party[i].exp += expGained;
        consoleLog(party[i].name + " gained " + expGained + " experience points");
    }
    calculateExp();
    lock = false;
    mode = 'move';
};

function calculateExp() 
{
    for (var i = 0; i < party.length; i++) {
        var player = party[i];
        if (player.exp >= player.level*10) {
            if (player.level % 2 == 0) {
                player.attack += 1;
                consoleLog(player.name + " has advanced a level! They feel stronger.");
            } else {
                player.defense += 1;
                consoleLog(player.name + " has advanced a level! They feel tougher.");
            }
            player.maxhp += (Math.floor((Math.random()*5) + 1));
            player.exp = 0;
            player.level += 1;
        }
    }
};