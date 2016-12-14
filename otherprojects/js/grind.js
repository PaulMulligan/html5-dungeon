$(document).ready(function() {
    var names = {
        monster: {
            prefix: ['a cardboard', 'a wooden', 'a metallic', 'a robotic', 'a lizardy', 'a demonic', 'a slanderous', 'a rude', 'a charming', 'a furry', 'a slimy', 'a vicious', 'a deadly', 'a nasty', 'a frumious', 'an evil', 'an atrocious', 'an unsettling', 'a ludicrous', 'a gigantic', 'a tiny', 'an inanimate', 'a hazardous', 'a futuristic', 'a medieval', 'a half'],
            type: ['box', 'rat', 'slime', 'kobold', 'crate', 'barrel', 'spider', 'newt', 'imp', 'golem', 'gnoll', 'dragon', 'demon', 'warrior', 'mage', 'archer', 'sorceror', 'bandit', 'elf', 'werewolf', 'snake', 'tentacle', 'bouncy ball', 'washing machine', 'crumpet', 'baseball pitcher', 'chef', 'patissiere', 'software developer', 'management consultant', 'lawyer', 'robot', 'ghost', 'zombie']
        },
        helmet: ['Saucepan', 'Colander', 'Beret', 'Hat', 'Helmet', 'Beanie', 'Headphone Set', 'Cat Ears', 'Wizard Cap', 'Dunce Cap', 'Bowl of Spaghetti', 'Parrot', 'Glasses', 'Goggles', 'Tiny Bathtub', 'Clown Nose', 'Moustache'],
        cloak: ['Curtain', 'Bedsheet', 'Cape', 'Cloak', 'Duster', 'Carpet', 'Magic Carpet', 'Scarf', 'Christmas Scarf', 'Pauldrons', 'Shoulder Pads', 'Necklace', 'Choker', 'Live Ferret'],
        chest: ['Vest', 'Harness', 'Waistcoat', 'Bag', 'Chainmail', 'Platemail', 'T-shirt', 'Shirt', 'Tuxedo', 'Mummy Wrappings', 'Mascot Costume', 'Bomber Jacket', 'Dress', 'Blouse', 'Corset'],
        hand: ['Stick', 'Ladle', 'Teddy Bear', 'Club', 'Mace', 'Sword', 'Carrot', 'Frozen Salmon', 'Particularly Sharp Clipboard', 'Paper Fan', 'Mop', 'Toy Reindeer', 'Tree', 'Bookcase', 'Waffle Iron', 'Toaster', 'Drill'],
        offhand: ['Trashcan Lid', 'Frisbee', 'Rubix Cube', 'Buckler', 'Shield', 'Kite Shield', 'Comfort Blanket', 'Oreo', 'Sense of Shame', 'Burger Bun', 'Pizza', 'Manhole Cover', 'Large Book', 'Binder', 'Egg'],
        boots: ['Uggs', 'Sandals', 'Skis', 'Boots', 'Bread Bags', 'Greaves', 'Cleats', 'Pogo Stick', 'Heelies', 'Balance Board', 'Segway', 'Roller Skates', 'Unicycle', 'Clown Shoes', 'Steel-tipped Boots'],
        ring: ['Washer', 'Ring', 'Wedding Ring', 'Nibelung', 'Diamond Ring', 'Onion Ring', 'Cog', 'Brass Knuckles', 'Gloves', 'MMA Gloves', 'Fingerless Gloves', 'Handcuffs', 'Mittens', 'Muffler', 'Boxing Gloves'],
        equip: ['Spoony', 'Cowboy', 'Gummy', 'Operatic', 'Plastic', 'Buttoned', 'Gothic', 'Cardboard', 'Soft', 'Sticky', 'Spiny', 'Comfortable', 'Chocolate', 'Dwarven', 'Preppy', 'Popular', 'Living', 'Opinionated', 'Singing', 'Magical', 'Inappropriate', 'Unexpected', 'Incorrectly-spelled', 'Hardened', 'Diamond', 'Vegan', 'Vegetarian', 'Untrustworthy', 'Soggy', 'Damp', 'Burned', 'Strangely Humorous', 'Mysteriously Smoking', 'Lacy', 'Glowing', 'Ghostly', 'Zombie', 'Glorious', 'Furry', 'Handsome', 'Floppy'],
        dungeon: {
            prefix: ['Training', 'Sunny', 'Gloomy', 'Spidery', 'Sinister', 'Jolly', 'Worthless', 'Crystal', 'Flaming', 'Frosty', 'Conference', 'Legal', 'Squatters', 'Crow-infested', 'Tiresome', 'Expansive', 'Tiny', 'Enormous', 'Floating', 'Underwater', 'Retro', 'Popular', 'Spooky'],
            type: ['Field', 'Dungeon', 'Disco', 'Library', 'Castle', 'Farm', 'Maze', 'Cave', 'Mountain', 'Chasm', 'Swamp', 'Desert', 'Igloo', 'Bedroom', 'Bookshelf', 'Labyrinth', 'Office', 'Pirate Ship', 'Pyramid', 'Cavern']
        }
    };
    
    var equipTypes = ['helmet', 'cloak', 'chest', 'hand', 'offhand', 'boots', 'ring'];
    
    var baseHero = {
        hp: 20,
        attack: 5,
        defence: 5,
        level: 1,
        exp: 0
    };
    
    var equipment = [{
        attack: 0,
        defence: 0
    }];
    
    var dungeons = [1];
    
    var shopFailureMessages = ['The shopkeeper falls asleep while you are purchasing. Try again later', 
                               'The shopkeeper spontaneously combusts. Try again later.',
                               'The shopkeeper falls into a plot hole. Try again later',
                               'The shopkeeper is crushed under a giant pile of paper fans. Try again later',
                               'The shopkeeper and the store have run away on giant chicken legs. Try again later',
                               'The shopkeeper turns out to be a figment of your imagination. Try again later',
                               'The shopkeer was just a convincing cardboard cutout. Try again later'];
    
    $("#purchaseitem").click(function() {
        var gold = parseInt($('#gold').val());
        if (gold < (baseHero.level*100)) {
            consoleLog('Not enough cash');
        } else {
            if (generateRandomEquipment(baseHero.level)) {
                consoleLog(getRandom(shopFailureMessages));
            } else {
                $('#gold').val(gold - (baseHero.level*100));
            }
        }
    });
    
    $("#purchasedungeon").click(function() {
        var gold = parseInt($('#gold').val());
        if (gold < 500) {
            consoleLog('Not enough cash');
        } else {
            if (generateDungeon(baseHero.level)) {
                consoleLog('No dungeon found for your level');
            } else {
                $('#gold').val(gold - 500);
            }
        }
    });
    
    function generateDungeon(baseLevel) {
        var prefix = getRandom(names.dungeon.prefix);
        var type = getRandom(names.dungeon.type);
        var name = prefix + ' ' + type;
        var level = baseLevel + 1 + Math.floor(Math.random()*3);
        if (dungeons.includes(level)) {
            return true;
        } else {
            var index = dungeons.push(level) -1;
            $('#dungeon').append('<option value="' + index + '">' + name + ' ' + level + '</option>');
            consoleLog('Discovered a ' + name);
        }
    };
    
    function generateRandomEquipment(level) {
        var type = getRandom(equipTypes);
        var adjective = getRandom(names.equip);
        var category = getRandom(names[type]);
        var name = adjective + ' ' + category;
        var successes = level;
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
        if (addEquipment(type, name, att, def)) {
            return true;
        }
    };
    
    function addEquipment(type, name, attack, defence) {
        var dupe = false;
        var newitem = {type: type, attack: attack, defence: defence};
        for (var i = 0; i < equipment.length; i++) {
            var existingitem = equipment[i];
            if (existingitem.type == newitem.type && existingitem.attack == newitem.attack && existingitem.defence == newitem.defence) {
                dupe = true;
            }
        }
        if (!dupe) {
            var index = (equipment.push({type: type, attack: attack, defence: defence})) -1;
            $('#' + type).append('<option value="' + index + '">' + name + ' ' + attack + '/' + defence + '</option>')
            consoleLog('Found a ' + name);
        } else {
            return true;
        }
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
        } else if (heroStatus == 'challenging') {
            consoleLog('Already in the final castle!');
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
        monster.attack = Math.floor(Math.random()*(8 * level)+1);
        monster.defence = Math.floor(Math.random()*(3 * level)+1);
        monster.gold = Math.floor(Math.random()*(10 * level)+level);
        monster.exp = level;
        consoleLog(values.firstname + ' encountered ' + monster.name + '!');
        heroStrike(values, monster);
    };
    
    $("#finalchallenge").click(function() {
        doFinalChallenge();
    });
    
    function doFinalChallenge() {
        if (heroStatus == 'ready') {
            heroStatus = 'challenging'; 
            var values = {};
            $.each($('#heroform').serializeArray(), function(i, field) {
                values[field.name] = field.value;
            });
            
            shake('good2');
            $('#evil2').css('background-color', 'red');
            $('#evil2').animate({
                right: 250
            }, 2500, 'swing', function() {
                var monster = {
                    exp: 50,
                    name: 'The Fiend of Swords',
                    attack: 50,
                    defence: 25,
                    gold: 1000,
                    hp: 300
                };
                finalConsoleLog('The Fiend of Swords blocks your path!');
                finalHeroStrike(values, monster);
            });
        }
    }
    
    function getLevel(hero) {
        return dungeons[hero.dungeon];
    };
    
    function heroStrike(hero, monster) {
        var damage = hero.attack - monster.defence;
        if(damage <= 0) damage = 1;
        monster.hp -= damage;
        generateFloatingNumber(damage, 363, 70);
        setTimeout(function() {
            if (monster.hp <= 0) {
                killMonster(hero, monster);
            } else {
                monsterStrike(hero, monster);
            }
        }, 100);
    };
    
    function monsterStrike(hero, monster) {
        var damage = monster.attack - hero.defence;
        if(damage <= 0) damage = 1;
        hero.hp -= damage;
        updateHeroHp(hero);
        generateFloatingNumber(damage, 333, 70);
        setTimeout(function() {
            if (hero.hp <= 0) {
                killHero(hero, monster);
            } else {
                heroStrike(hero, monster);
            }
        }, 100);
    };
    
    function finalHeroStrike(hero, monster) {
        var damage = hero.attack - monster.defence;
        if(damage <= 0) damage = 1;
        monster.hp -= damage;
        generateFloatingNumber(damage, 363, 260);
        setTimeout(function() {
            if (monster.hp <= 0) {
                if (monster.name == 'The Fiend of Swords') {
                    $('#evil2').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100, function(){
                        $('#evil2').css('right', '-15px');
                        var currentGold = parseInt($('#gold').val());
                        $('#gold').val(currentGold + monster.gold);
                        finalConsoleLog(hero.firstname + ' defeated ' + monster.name + ' and gained ' + monster.gold + ' gold!');
                        baseHero.exp += monster.exp;
                        levelUp();
                        
                        shake('good2');
                        $('#evil2').css('background-color', 'blue');
                        $('#evil2').animate({
                            right: 250
                        }, 2500, 'swing', function() {
                            var newmonster = {
                                exp: 50,
                                name: 'The Fiend of Shields',
                                attack: 25,
                                defence: 50,
                                gold: 1000,
                                hp: 300
                            };
                            finalConsoleLog('The Fiend of Shields blocks your path!');
                            finalHeroStrike(hero, newmonster);
                        });
                    });
                } else if (monster.name == 'The Fiend of Shields') {
                    
                    $('#evil2').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100, function(){
                        $('#evil2').css('right', '-150px');
                        var currentGold = parseInt($('#gold').val());
                        $('#gold').val(currentGold + monster.gold);
                        finalConsoleLog(hero.firstname + ' defeated ' + monster.name + ' and gained ' + monster.gold + ' gold!');
                        baseHero.exp += monster.exp;
                        levelUp();
                        
                        $('#battle2').animate({'height': '150px'}, 1000, function() {
                            shake('good2');
                            $('#evil2').css('background-color', 'black');
                            $('#evil2').css('height', '100px');
                            $('#evil2').css('width', '100px');
                            $('#evil2').animate({
                                right: 175
                            }, 2500, 'swing', function() {
                                var newmonster = {
                                    exp: 500,
                                    name: 'The Dark Lord',
                                    attack: 100,
                                    defence: 100,
                                    hp: 500,
                                    gold: 1000000
                                };
                                finalConsoleLog('The Dark Lord scoffs at your weakness! Now die!');
                                finalHeroStrike(hero, newmonster);
                            });
                        });
                    });
                } else if (monster.name == 'The Dark Lord') {
                    $('#evil2').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100, function(){
                        $('#evil2').css('right', '-150px');
                        var currentGold = parseInt($('#gold').val());
                        $('#gold').val(currentGold + monster.gold);
                        finalConsoleLog(hero.firstname + ' defeated ' + monster.name + ' and gained ' + monster.gold + ' gold!');
                        baseHero.exp += monster.exp;
                        levelUp();
                        
                        $('#finalchallenge').hide();
                        finalConsoleLog('The Dark Lord is finally defeated! Goodness triumphs once again. Hooray for the great hero, ' + hero.firstname + '!');
                        heroStatus = 'ready';
                        setTimeout(function() {
                            doConfetti(0);
                        }, 100);
                    });
                }
    //            killMonster(hero, monster);
            } else {
                finalMonsterStrike(hero, monster);
            }
        }, 100);
    };
    
    function finalMonsterStrike(hero, monster) {
        var damage = monster.attack - hero.defence;
        if(damage <= 0) damage = 1;
        hero.hp -= damage;
        generateFloatingNumber(damage, 333, 260);
        setTimeout(function() {
            updateHeroHp(hero);
            if (hero.hp <= 0) {
                finalKillHero(hero, monster);
            } else {
                finalHeroStrike(hero, monster);
            }
        }, 100);
    };
    
    function updateHeroHp(values) {
        $('#hp').val(values.hp);
    };
    
    function killHero(hero, monster) {
        $('#evil').css('right', '-15px');
        consoleLog(monster.name + ' defeated ' + hero.firstname + '!');
        consoleLog(hero.firstname + ' limps home...');
        $('#status').val('Injured');
        heroStatus = 'injured';
        enableGo();
    };
    
    function finalKillHero(hero, monster) {
        $('#evil2').css('right', '-150px');
        $('#battle2').css('height', '15px');
        $('#evil2').css('height', '10px');
        $('#evil2').css('width', '10px');
        $('#evil2').css('right', '-15px');
        finalConsoleLog(monster.name + ' defeated ' + hero.firstname + '!');
        finalConsoleLog(hero.firstname + ' limps home...');
        $('#status').val('Injured');
        heroStatus = 'injured';
        enableGo();
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
            baseHero.exp += monster.exp;
            levelUp();
            initBattle();
        });
    };
    
    function levelUp() {
        if (baseHero.exp > baseHero.level*50) {
            baseHero.exp = 0;
            baseHero.level += 1;
            $('#level').val(baseHero.level);
            var bonusHp = Math.floor((Math.random()*10)+1);
            baseHero.hp += bonusHp;
            var bonusAttack = Math.floor((Math.random()*5)+1);
            baseHero.attack += bonusAttack;
            var bonusDefence = Math.floor((Math.random()*5)+1);
            baseHero.defence += bonusDefence;
            var currentAttack = parseInt($('#attack').val());
            var currentDefence = parseInt($('#defence').val());
            $('#attack').val(currentAttack + bonusAttack);
            $('#defence').val(currentDefence + bonusDefence);
            consoleLog('Level up! Max HP increased by ' + bonusHp + ', attack increased by ' + bonusAttack + ', defence increased by ' + bonusDefence + '.');
            $('#purchaseitem').text('Purchase Rank ' + baseHero.level + ' Item for ' + baseHero.level*100 + ' gold')
        }
    };
    
    function getRandom(array) {
        return array[Math.floor(Math.random()*(array.length))];
    };
    
    function shake(id, interval, distance, times) {
        var div = document.getElementById(id);
        var interval = interval || 100;
        var distance = distance || 5;
        var times = times || 20;

        for (var iter = 0; iter < (times + 1) ; iter++) {
            $(div).animate({
                bottom: ((iter % 2 == 0 ? distance : distance +2))
            }, interval);
        }
    };

    function consoleLog(text) {
        $("#console").append(text + "<br/>");
        $("#console").scrollTop($("#console")[0].scrollHeight);
    };
    
    function finalConsoleLog(text) {
        $("#console2").append(text + "<br/>");
        $("#console2").scrollTop($("#console2")[0].scrollHeight);
    };
    
    function generateFloatingNumber(number, left, top) {
        var newNumber = $('<div class="floatingNumber">' + number + '</div>');
        newNumber.css('left', left);
        newNumber.css('top', top);
        newNumber.appendTo('body');
        newNumber.fadeOut(1000);
        newNumber.animate({'top': top-20}, {queue: false, duration: 500, complete: function() {
            newNumber.remove();
        }});
    };
    
    function confetti() {
        var confetti = $('<div class="confetti"></div>');
        var left = Math.floor(Math.random()*700);
        var rotation = Math.floor(Math.random()*180);
        var rotate = "rotate(" + rotation + "deg)";
        var colorint = Math.floor(Math.random()*3);
        if (colorint == 0) {
            confetti.css('background-color', 'red');
        } else if (colorint == 1) {
            confetti.css('background-color', 'green');
        }else if (colorint == 2) {
            confetti.css('background-color', 'yellow');
        } 
        confetti.css('top', '-10px');
        confetti.css('left', left);
        confetti.css('transform', rotate);
        confetti.css('-ms-transform', rotate);
        confetti.css('-webkit-transform', rotate);
        confetti.appendTo('body');
        confetti.animate({'top': 1000}, {queue: false, duration: 5000, complete: function() {
            confetti.remove();
        }});
    };
    
    function doConfetti(index) {
        if (index < 10) {
            index++;
            for (var i = 0; i < 20; i++) {
                confetti();
            }
            setTimeout(function() {
                doConfetti(index);
            }, 100);
        }
    }
    
    function heal() {
        var delay = 220-baseHero.hp;
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