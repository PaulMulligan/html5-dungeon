$(document).ready(function() {
    var names = {
        monster: {
            prefix: ['a cardboard', 'a slimy', 'a vicious', 'a deadly', 'a nasty', 'a frumious', 'an evil'],
            type: ['box', 'rat', 'slime', 'kobold', 'crate', 'barrel', 'spider', 'newt']
        },
        helmet: ['Saucepan', 'Colander', 'Beret', 'Hat', 'Helmet'],
        cloak: ['Curtain', 'Bedsheet', 'Cape', 'Cloak'],
        chest: ['Vest', 'Harness', 'Waistcoat', 'Bag', 'Chainmail', 'Platemail'],
        hand: ['Stick', 'Ladle', 'Teddy Bear', 'Club', 'Mace'],
        offhand: ['Trashcan Lid', 'Frisbee', 'Rubix Cube', 'Buckler', 'Shield'],
        boots: ['Uggs', 'Sandals', 'Skis', 'Boots', 'Bread Bags', 'Greaves'],
        ring: ['Washer', 'Ring', 'Wedding Ring', 'Nibelungingung'],
        equip: ['Spoony', 'Cowboy', 'Gummy', 'Operatic', 'Plastic', 'Buttoned', 'Cardboard', 'Soft', 'Sticky', 'Spiny', 'Comfortable', 'Chocolate', 'Dwarven'],
        dungeon: {
            prefix: ['Training', 'Sunny', 'Gloomy', 'Spidery', 'Sinister', 'Jolly', 'Worthless', 'Crystal', 'Flaming'],
            type: ['Field', 'Dungeon', 'Disco', 'Library', 'Castle', 'Farm', 'Maze']
        }
    };
    
    var equipTypes = ['helmet', 'cloak', 'chest', 'hand', 'offhand', 'boots', 'ring'];
    
    var baseHero = {
        hp: 20,
        attack: 5,
        defence: 5,
        level: 1
    };
    
    var equipment = [{
        attack: 0,
        defence: 0
    }];
    
    var dungeons = [1];
    
    $("#purchaseitem").click(function() {
        var gold = parseInt($('#gold').val());
        if (gold < (baseHero.level*100)) {
            consoleLog('Not enough cash');
        } else {
            $('#gold').val(gold - (baseHero.level*100));
            generateRandomEquipment(baseHero.level);
        }
    });
    
    $("#purchasedungeon").click(function() {
        var gold = parseInt($('#gold').val());
        if (gold < (baseHero.level*500)) {
            consoleLog('Not enough cash');
        } else {
            $('#gold').val(gold - (baseHero.level*500));
            generateDungeon(baseHero.level);
        }
    });
    
    function generateDungeon(baseLevel) {
        var prefix = getRandom(names.dungeon.prefix);
        var type = getRandom(names.dungeon.type);
        var name = prefix + ' ' + type;
        var level = baseLevel + 1 + Math.floor(Math.random()*3);
        var index = dungeons.push(level) -1;
        $('#dungeon').append('<option value="' + index + '">' + name + ' ' + level + '</option>');
        consoleLog('Discovered a ' + name);
    };
    
    function generateRandomEquipment(level) {
        var type = getRandom(equipTypes);
        var adjective = getRandom(names.equip);
        var category = getRandom(names[type]);
        var name = adjective + ' ' + category;
        var successes = 1;
        var def = 0;
        var att = 0;
        for (var i = 0; i < level; i++) {
            if (Math.random() < (1/6)) {
                successes++;
            }
        }
        for (var i = 0; i < successes; i++) {
            if (Math.random() > (0.5)) {
                def++;
            } else {
                att++;
            }
        }
        consoleLog('Found a ' + name);
        addEquipment(type, name, att, def);
    };
    
    function addEquipment(type, name, attack, defence) {
        var index = (equipment.push({attack: attack, defence: defence})) -1;
        $('#' + type).append('<option value="' + index + '">' + name + ' ' + attack + '/' + defence + '</option>')
    };
    
    var heroStatus = 'ready';
    
    function animateBattle() {
        $("#good").effect("shake");//, {times:4, direction:"up"}, 1000);
        return false;
    }
    
    $("#heroequip").submit(function(e) {
        e.preventDefault();
        stripItems();
        var values = {};
        $.each($('#heroequip').serializeArray(), function(i, field) {
            applyItem(parseInt(field.value));
        });
    });
    
    function stripItems() {
        $('#attack').val(baseHero.attack);
        $('#defence').val(baseHero.defence);
    };
    
    function applyItem(index) {
        item = equipment[index];
        var attack = parseInt($('#attack').val()) + item.attack;
        var defence = parseInt($('#defence').val()) + item.defence;
        $('#attack').val(attack);
        $('#defence').val(defence);
    };
    
    $("#heroform").submit(function(e) {
        e.preventDefault();
        
        leaveForBattle();
    });

    function leaveForBattle() {
        if (heroStatus == 'injured') {
            consoleLog('Too injured to adventure!');
        } else {
            heroStatus = 'battling';
            initBattle();
        }
    };
    
    function initBattle() {
        if (heroStatus == 'battling') {
            disableGo();
            var values = {};
            $.each($('#heroform').serializeArray(), function(i, field) {
                values[field.name] = field.value;
            });
            
            shake('good');
            $('#evil').animate({
                right: 250
            }, 2500, 'swing', function() {
                doBattle(values);
            });
        }
    };
    
    function disableGo() {
        $('#go').val('Recall');
        $("#heroform").unbind('submit');
        $("#heroform").submit(function(e) {
            e.preventDefault();
            
            flee();
        });
    };
    
    function doBattle(values) {
        var monster = {};
        var level = getLevel(values);
        var prefix = getRandom(names.monster.prefix);
        var type = getRandom(names.monster.type);
        monster.name = prefix + ' ' + type;
        monster.hp = Math.floor(Math.random()*(30 * level)+1);
        monster.attack = Math.floor(Math.random()*(4 * level)+1);
        monster.defence = Math.floor(Math.random()*(2 * level)+1);
        monster.gold = Math.floor(Math.random()*(10 * level)+1);
        consoleLog(values.firstname + ' encountered ' + monster.name + '!');
        heroStrike(values, monster);
    };
    
    function getLevel(hero) {
        return dungeons[hero.dungeon];
    };
    
    function heroStrike(hero, monster) {
        var damage = hero.attack - monster.defence;
        if(damage <= 0) damage = 1;
        monster.hp -= damage;
        if (monster.hp <= 0) {
            killMonster(hero, monster);
        } else {
            monsterStrike(hero, monster);
        }
    };
    
    function monsterStrike(hero, monster) {
        var damage = monster.attack - hero.defence;
        if(damage <= 0) damage = 1;
        hero.hp -= damage;
        updateHeroHp(hero);
        if (hero.hp <= 0) {
            killHero(hero, monster);
        } else {
            heroStrike(hero, monster);
        }
    };
    
    function updateHeroHp(values) {
        $('#hp').val(values.hp);
    };
    
    function killHero(hero, monster) {
        $('#good').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100, function(){
            $('#evil').css('right', '-15px');
            consoleLog(monster.name + ' defeated ' + hero.firstname + '!');
            consoleLog(hero.firstname + ' limps home...');
            $('#status').val('Injured');
            heroStatus = 'injured';
            enableGo();
        });
    };
    
    function flee() {
        $('#evil').css('right', '-15px');
        consoleLog('Returning home!');
        getReady();
        enableGo();
    };
    
    function enableGo() {
        $('#go').val('Go');
        $("#heroform").unbind('submit');
        $("#heroform").submit(function(e) {
            e.preventDefault();
            
            leaveForBattle();
        });
    };
    
    function getReady() {
        heroStatus = 'ready';
        $('#status').val('Ready');
    };
    
    function killMonster(hero, monster) {
        $('#evil').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100, function(){
            $('#evil').css('right', '-15px');
            var currentGold = parseInt($('#gold').val());
            $('#gold').val(currentGold + monster.gold);
            consoleLog(hero.firstname + ' defeated ' + monster.name + ' and gained ' + monster.gold + ' gold!');
            if (Math.random() < 1/10) {
                generateRandomEquipment(getLevel(hero))
            }
            if (Math.random() < 1/20) {
                generateDungeon(getLevel(hero))
            }
            initBattle();
        });
    };
    
    function getRandom(array) {
        return array[Math.floor(Math.random()*(array.length))];
    };
    
    function shake(id, interval, distance, times) {
        var div = document.getElementById(id);
        var interval = interval || 100;
        var distance = distance || 10;
        var times = times || 20;

        for (var iter = 0; iter < (times + 1) ; iter++) {
            $(div).animate({
                top: ((iter % 2 == 0 ? distance : distance -2))
            }, interval);
        }
    };

    function consoleLog(text) {
        $("#console").append(text + "<br/>");
        $("#console").scrollTop($("#console")[0].scrollHeight);
    };
    
    function heal() {
        var delay = 100;
        var currentHP = parseInt($('#hp').val());
        if (currentHP < baseHero.hp && (heroStatus == 'ready' || heroStatus == 'injured')) {
            $("#hp").val(currentHP + 1);
        } else if (currentHP == baseHero.hp && heroStatus == 'injured') {
            getReady();
        }
        setTimeout(heal, delay);
    };
    heal();
});