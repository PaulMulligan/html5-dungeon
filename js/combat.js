var encounter = {};
var player = {
        maxhp: 10,
        hp: 10,
        attack: 2,
        defense: 0,
        exp: 0,
        level: 1,
        skills: []
};
$("#hp1").attr("title", "10");

var skills = {
        drain: {
            name: "Last Breath",
            cost: 0,
            description: "Attempt to heal yourself while striking down an enemy. Only works on weakened foes.",
            effect: function() {
                var damage = player.attack/2;
                if (damage > encounter.monster.hp) {
                    encounter.monster.hp = 0;
                    var healQuantity = Math.floor(encounter.monster.hp/2);
                    heal(player, healQuantity);
                    consoleLog("You are healed for " + healQuantity + " health!");
                } else {
                    consoleLog("The enemy is too healthy to drain!");
                }
            }
        }
};

function generateEncounter(monster) {
    encounter.monster = $.extend({}, monster);
};

function heal(target, quantity) {
    target.hp += quantity;
    if (target.maxhp > target.hp) {
        target.hp = target.maxhp;
    }
}

function clickAttack()
{
    if(mode == 'battle')
    {
        var playerDamage = calculateDamage(player.attack, encounter.monster.defense);
        encounter.monster.hp -= playerDamage;
        if(encounter.monster.hp <= 0) {
            endBattle();
        } else {
            var monsterDamage = calculateDamage(encounter.monster.attack, player.defense);
            player.hp -= monsterDamage;
            updateHP();
            if(player.hp <= 0) {
                lose();
            } else {
                consoleLog("You bonk the " + encounter.monster.name + " for " + playerDamage + " damage!");
                consoleLog("The " + encounter.monster.name + " " + encounter.monster.verb + " you for " + monsterDamage + " damage!");
            }
        }
    }
};

function calculateDamage(attack, defense) {
    attackAdjustment = Math.random() + 0.5;
    defenseAdjustment = Math.random() + 0.5;
    attackDamage = attack*attackAdjustment - defense*defenseAdjustment;
    return Math.floor(attackDamage);
};

function clickSkill()
{
    if (player.skills.length == 0) {
        consoleLog("You don't have any skills yet.");
    } else {
        //Skill goes here
    }
};

function clickDefend()
{
    if(mode == 'battle')
    {
        var monsterDamage = calculateDamage(encounter.monster.attack, (player.defense*2)+1);
        player.hp -= monsterDamage;
        updateHP();
        consoleLog("You defend!");
        consoleLog("The " + encounter.monster.name + " " + encounter.monster.verb + " you for " + monsterDamage + " damage!");
        if(player.hp <= 0) {
            lose();
        }
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