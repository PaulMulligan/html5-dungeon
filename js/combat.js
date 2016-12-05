var encounter = {};

var skills = {
        drain: {
            name: "Last Breath",
            id: "drain",
            cost: 0,
            description: "Attempt to heal yourself while striking down an enemy. Only works on weakened foes.",
            effect: function() {
                var damage = player.attack/2;
                if (damage >= encounter.monster.hp) {
                    encounter.monster.hp = 0;
                    var healQuantity = Math.floor(encounter.monster.maxhp/2);
                    heal(player, healQuantity);
                    consoleLog("You strike with dark magic!");
                    consoleLog("You are healed for " + healQuantity + " health!");
                } else {
                    consoleLog("The enemy is too healthy to drain!");
                }
            }
        }
};

var player = {
        maxhp: 10,
        hp: 10,
        maxsp: 5,
        sp: 5,
        attack: 2,
        defense: 0,
        exp: 0,
        level: 1,
        skills: [skills.drain]
};
$("#hp1").attr("title", "10");

function generateEncounter(monster) {
    encounter.monster = $.extend({}, monster);
};

function heal(target, quantity) {
    target.hp += quantity;
    if (target.hp > target.maxhp) {
        target.hp = target.maxhp;
    }
}

function clickAttack()
{
    if(mode == 'battle')
    {
        var playerDamage = calculateDamage(player.attack, encounter.monster.defense);
        encounter.monster.hp -= playerDamage;
        consoleLog("You bonk the " + encounter.monster.name + " for " + playerDamage + " damage!");
        if(encounter.monster.hp <= 0) {
            endBattle();
        } else {
            monsterTurn(player.defense);
        }
    }
};

function monsterTurn(playerDefense)
{
    var monsterDamage = calculateDamage(encounter.monster.attack, playerDefense);
    player.hp -= monsterDamage;
    updateHP();
    consoleLog("The " + encounter.monster.name + " " + encounter.monster.verb + " you for " + monsterDamage + " damage!");
    if(player.hp <= 0) {
        lose();
    }
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

function clickSkill(event)
{
    if (encounter.monster) {
        $("#skillmenu").toggle();
        var skillname = $(event.target).attr('skill');
        var skill = player.skills[skillname];
        player.sp -= skill.cost();
        updateSP();
        skill.effect();
        if(encounter.monster.hp <= 0) {
            endBattle();
        } else {
            monsterTurn(player.defense);
        }
    }
};

function clickDefend()
{
    if(mode == 'battle')
    {
        consoleLog("You defend!");
        monsterTurn((player.defense*2)+1);
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
        $("#monster_image").hide();
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
    consoleLog("The " + encounter.monster.name + " defeated you!");
    lock = false;
    mode = 'dead';
};

function endBattle()
{
    consoleLog("You defeated the " + encounter.monster.name + "!");
    player.exp += encounter.monster.exp;
    $("#monster_image").hide();
    lock = false;
    mode = 'move';
};

function calculateExp() 
{
    if (player.exp >= player.level*10) {
        if (player.level % 2 == 0) {
            player.attack += 1;
            consoleLog("You have advanced a level! You feel stronger.");
        } else {
            player.defense += 1;
            consoleLog("You have advanced a level! You feel tougher.");
        }
        player.maxhp += (Math.floor((Math.random()*5) + 1));
        player.exp = 0;
        player.level += 1;
    }
};