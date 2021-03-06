$(document).ready(function() {
    var names = {
        monster: {
            prefix: ['a handsome', 'a shady', 'a boisterous', 'a cardboard', 'a wooden', 'a metallic', 'a robotic', 'a lizardy', 'a demonic', 'a slanderous', 'a rude', 'a charming', 'a furry', 'a slimy', 'a vicious', 'a deadly', 'a nasty', 'a frumious', 'an evil', 'an atrocious', 'an unsettling', 'a ludicrous', 'a gigantic', 'a tiny', 'an inanimate', 'a hazardous', 'a futuristic', 'a medieval', 'a half'],
            type: ['duke', 'farmer', 'peasant', 'box', 'rat', 'slime', 'kobold', 'crate', 'barrel', 'spider', 'newt', 'imp', 'golem', 'gnoll', 'dragon', 'demon', 'warrior', 'mage', 'archer', 'sorceror', 'bandit', 'elf', 'werewolf', 'snake', 'tentacle', 'bouncy ball', 'washing machine', 'crumpet', 'baseball pitcher', 'chef', 'patissiere', 'software developer', 'management consultant', 'lawyer', 'robot', 'ghost', 'zombie']
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
    
    var dungeonNames = ['Training Field'];
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
            dungeonNames.push(name);
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
                        finalConsoleLog('When all seems hopeless, you use the skills you learned in your quest! ' + heroSkills + '! The Dark Lord cannot stand against such might!');
                        finalConsoleLog('The Dark Lord is finally defeated! Goodness triumphs once again. Hooray for the great hero, ' + hero.firstname + '!');
                        if (currentPlot == 'macguffin') {
                            updatePlot(`The Dark Lord is defeated! You have retrieved the ${macguffin} and averted the ${doom1} of ${doom2}! Hooray for the great hero!`);
                        } else if (currentPlot == 'kidnapping') {
                            updatePlot(`The Dark Lord is defeated! You have rescued the ${macperson} and averted the ${doom1} of ${doom2}! Hooray for the great hero!`);
                        } else if (currentPlot == 'revenge') {
                            updatePlot(`The Dark Lord is defeated! Victory is yours, and the ${townType} of ${townName} has been avenged! Hooray for the great hero!`);
                        } else if (currentPlot == 'love') {
                            updatePlot(`The Dark Lord is defeated! The ${macperson} finally sees the power of your love and embraces you! Hooray for the great hero!`);
                        } else if (currentPlot == 'greatness') {
                            updatePlot(`The Dark Lord is defeated! You have proven yourself to be the greatest warrior to ever have lived! Hooray for the great hero!`);
                        }
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
        consoleLog(hero.firstname + ' was defeated by ' + monster.name + '!');
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
            if (Math.random() < 1/20) {
                doEncounter();
            }
            if (Math.random() < 1/20) {
                obtainQuest();
            }
            resolvePlot(monster.exp);
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
    
    function updatePlot(text) {
        $("#console3").append(text + "<br/>");
        $("#console3").scrollTop($("#console3")[0].scrollHeight);
    };
    
    function addSkill(text) {
        $("#console4").append(text + "<br/>");
        $("#console4").scrollTop($("#console4")[0].scrollHeight);
    };
    
    var speciesArray = ['lizard person', 'human', 'grey elf', 'dwarf', 'dog', 'halfling', 'robot', 'lawyer', 'software developer', 'half-dragon', 'half-elf', 'half-dwarf', 'vampire', 'zombie', 'werewolf', 'troll', 'gnome', 'spoonbender', 'lion tamer'];
    var species = getRandom(speciesArray);
    var townAdjectiveArray = ['sandy', 'floating', 'sunken', 'lost', 'hidden', 'perpetually on-fire', 'rainy', 'flooded', 'wandering', 'moving', 'spinning', 'temperate'];
    var townAdjective = getRandom(townAdjectiveArray);
    var townTypeArray = ['town', 'city', 'hamlet', 'village', 'forest', 'tower block', 'castle', 'pirate ship', 'island', 'swamp', 'mountain', 'dwarfhome', 'nest'];
    var townType = getRandom(townTypeArray);
    var townNameArray = ['Splurgenhein', 'Jurgenfen', 'Crossfell', 'Kirkwent', 'Splantchen', 'Crosstop', 'Kirfenfell', 'Jirninden', 'Gosfield', 'Entfield', 'Bloodpool', 'Mudpool'];
    var townName = getRandom(townNameArray);
    var townMoodArray = ['jolly', 'sinister', 'rainy', 'foggy', 'mysterious', 'forgotten', 'mystical', 'beautiful', 'convoluted', 'poorly-written', 'suspicious', 'lovely'];
    var adventureType = getRandom(townMoodArray);
    var townMood = getRandom(townMoodArray);
    var macGuffin1s = ['Orb', 'Chest', 'Amulet', 'Ring', 'Sword', 'Calculator', 'Toaster', 'Book', 'Magazine', 'Gun', 'Puppy', 'Dragon', 'Tax Return', 'Monocle'];
    var macGuffin2s = ['of Spheres', 'del Sol', 'of Cats', 'Dolorous', 'Unspeakable', 'of Burning', 'of Glitter', 'that Sings', 'that Dances', 'that Plays Sudoku'];
    var macguffin = getRandom(macGuffin1s) + " " + getRandom(macGuffin2s);
    var macPersons1 = ['Handsome', 'Snotty', 'Rude', 'Dignified', 'Pretty', 'Rich', 'Fabulous', 'Unspeakable', 'Chubby', 'Buxom', 'Fashionable', 'Socialist', 'Exploding'];
    var macPersons2 = ['Duke', 'Princess', 'Queen', 'King', 'Earl', 'Count', 'Countess', 'Contessa', 'Monumental', 'Captain', 'Wizard', 'Witch', 'Sorceress', 'Jester', 'Knight', 'Adventurer', 'Bandit'];
    var macperson = getRandom(macPersons1) + " " + getRandom(macPersons2);
    var doom1s = ['Rain', 'Doom', 'Fire', 'Collapse', 'Chasm', 'Vortex', 'Tsunami', 'Hurricane', 'Audit', 'Review', 'Form', 'Army', 'Gestalt', 'Window', 'Orchestra'];
    var doom1 = getRandom(doom1s);
    var doom2s = ['Squirrels', 'Balls', 'Dragons', 'Doom', 'Destruction', 'Explosions', 'Witches', 'the Living', 'the Lost', 'the Meek', 'Grass', 'Trees', 'Shattering'];
    var doom2 = getRandom(doom2s);
    var darkLands = ['Swamp of Misery', 'Dolorous Island', 'Island in the Sky', 'Chasm of Spikes', 'Forest of Doors', 'Belly of the Giant Rabbit', 'Airport of Queues'];
    var darkLand = getRandom(darkLands);
    var plotDevice = '';
    var plots = ['macguffin', 'kidnapping', 'revenge', 'love', 'greatness'];
    var starters = [`You are a ${species} from the ${townAdjective} ${townType} of ${townName}. It was a ${townMood} place.`,
                    `You were abandoned in the ${townAdjective} ${townType} of ${townName} as a baby. For a ${species} like you, it was a ${townMood} place.`,
                    `As a ${species}, you never liked the ${townAdjective} ${townType} of ${townName}, because it was a ${townMood} place.`];
    var macguffinPlot = [`But everything changed when the Dark Lord stole the ${macguffin}! Without it, the ${doom1} of ${doom2} would destroy everything!`,
                         `Then one day, the ${macguffin} disappeared! Surely the Dark Lord used the ${doom1} of ${doom2} to take it!`,
                         `Life was protected by the ${macguffin}, but then the Dark Lord stole it to bring about the ${doom1} of ${doom2}!`];
    var kidnappingPlot = [`But then the Dark Lord kidnapped the ${macperson}! Without their protection, surely the ${doom1} of ${doom2} would come!`,
                          `The leader, the ${macperson} kept the ${townType} safe...until the Dark Lord kidnapped them! Now the ${doom1} of ${doom2} will come!`,
                          `The Dark Lord was entranced by the beauty of the ${macperson}, and stole them away! Now the king has threatened the ${townType} with the ${doom1} of ${doom2}!`];
    var revengePlot = [`But everything changed when the ${doom1} of ${doom2} controlled by the Dark Lord burned your home to the ground! Now, you have sworn revenge!`,
                       `Until the Dark Lord summoned the ${doom1} of ${doom2}, destroying your home utterly! You will not rest without revenge!`,
                       `There, the ${doom1} of ${doom2} was sealed, until the Dark Lord released it and destroyed everything! You must get revenge!`];
    var lovePlot = [`But then your love, the ${macperson} was corrupted by the ${doom1} of ${doom2} and became the Dark Lord! You have sworn to rescue them!`,
                    `You fell in love with the ${macperson} until you discovered they were secretly the Dark Lord! You must bring them to the side of good!`,
                    `You hated it there, so you secretly loved the Dark Lord, the ${macperson}. Only by defeating them and will they see your love!`];
    var greatnessPlot = [`But everything was intensely dull so you decided to obtain fame with the ${doom1} of ${doom2} by defeating the legendary Dark Lord!`,
                         `To prove yourself the best, you decided to seek the ${doom1} of ${doom2} which was controlled by the legendary Dark Lord!`,
                         `Everyone said you would never amount to anything, but you will prove them wrong when you defeat the legendary Dark Lord!`];
    var enders = [`Now you must journey to the castle of the Dark Lord in the distant ${darkLand}. Your ${adventureType} adventure awaits!`,
                  `It will take much training before you can challenge the Dark Lord in ${darkLand}. Your ${adventureType} adventure awaits!`,
                  `Soon the ${darkLand} where the Dark Lord waits will fall to your might! Your ${adventureType} adventure awaits!`];
    var currentPlot = 'macguffin';
    
    function generatePlot() {
        var plot = "";
        var starter = getRandom(starters);
        plot += starter;
        var plotType = getRandom(plots);
        currentPlot = plotType; 
        if (plotType == 'macguffin') {
            plotDevice = macguffin;
            var plotMiddle = getRandom(macguffinPlot);
            plot += (" " + plotMiddle);
        } else if (plotType == 'kidnapping') {
            plotDevice = macperson;
            var plotMiddle = getRandom(kidnappingPlot);
            plot += (" " + plotMiddle);
        } else if (plotType == 'revenge') {
            var plotMiddle = getRandom(revengePlot);
            plot += (" " + plotMiddle);
        } else if (plotType == 'love') {
            plotDevice = macperson;
            var plotMiddle = getRandom(lovePlot);
            plot += (" " + plotMiddle);
        } else if (plotType == 'greatness') {
            var plotMiddle = getRandom(greatnessPlot);
            plot += (" " + plotMiddle);
        }
        var ending = getRandom(enders);
        plot += (" " + ending);
        updatePlot(plot);
    };
    
    generatePlot();
    
    var objects = ['tree', 'chest', 'boulder', 'painting', 'large anvil', 'skeleton', 'bookshelf', 'wardrobe', 'giant skull', 'maypole', 'rubix cube'];
    
    function doEncounter() {
        var location = getRandom(names.dungeon.type);
        var person = getRandom(macPersons2);
        var monster = getRandom(names.monster.type);
        var item = getRandom(names.hand);
        var mood = getRandom(townMoodArray);
        var object = getRandom(objects);
        var encounters = [`You find the corpse of a ${person} at the bottom of a ${location}. How sad.`,
                          `In a ${object}, you find a stuck ${item}, but it is too difficult to pull free, so you leave it alone`,
                          `A talking ${object} draws your attention. At first you listen, but it is very boring.`,
                          `You rescue a ${monster} who was stuck in a trap, and they run away quickly`,
                          `You pause a moment to reflect on the ${mood} nature of existence, and almost walk into a {$object}`,
                          `You become lost in a ${location}. By the time you get out, you feel very ${mood}`];
        updatePlot(getRandom(encounters));
        if (Math.random() < 0.5) {
            var randomGold = Math.floor(Math.random()*(50 * baseHero.level)+baseHero.level);
            var currentGold = parseInt($('#gold').val());
            $('#gold').val(currentGold + randomGold);
            updatePlot("You do find " + randomGold + " gold though.");
        }
    };
    
    var activeQuests = [];
    var skills = ['Punctuality', 'Singing', 'Snooker', 'Bowling', 'Grooming', 'Lawn Maintenance', 'Tickling', 'Weighing', 'Perfect Pitch', 'Handwriting', 'Criminal Profiling', 'Archiving', 'Reading Sheet Music'];
    var heroSkills = [];
    
    function obtainQuest() {
        var mac = getRandom(macGuffin1s);
        var questGiver = getRandom(macPersons2);
        var dungeon = getRandom(dungeonNames);
        var quests = [`A ${questGiver} promises you a great reward if you recover their ${mac} from the ${dungeon}`,
                      `You meet a beautiful ${questGiver} who begs you to find the ${mac} they lost in the ${dungeon}`,
                      `On the grave of a ${questGiver} a ghost appears and begs to be reunited with their ${mac} lost in the ${dungeon}.`,
                      `A wandering ${questGiver} says they will pay you to find them the ${mac} hidden in the ${dungeon}`,
                      `A mysterious ${questGiver} tells you there is a reward for any who can get the ${mac} from the ${dungeon}`,
                      `A ${questGiver} trapped in a mirror tells you that only the ${mac} in the ${dungeon} can free them`,
                      `A ${questGiver} tells you that only the ${mac} from the ${dungeon} can heal their terrible curse`,
                      `You receive a homing pigeon from a ${questGiver} asking for you to get the ${mac} from the ${dungeon}`,
                      `A ${questGiver} challenges you to prove your strength by obtaining the ${mac} from the ${dungeon}`,
                      `A ${questGiver} claims to have fallen in love with the ${mac} from the ${dungeon}`];
        updatePlot(getRandom(quests));
        activeQuests.push({mac: mac, questGiver: questGiver, dungeon: dungeon, active: true});
    };
    
    function resolvePlot(level) {
        for (var i = 0; i < activeQuests.length; i++) {
            var quest = activeQuests[i];
            if (quest.active && dungeonNames.indexOf(quest.dungeon) == dungeons.indexOf(level)) {
                if (Math.random() < 0.2) {
                    quest.active = false;
                    updatePlot(`You find the ${quest.mac}! You return it to the ${quest.questGiver}`);
                    var rewardType = Math.random();
                    if (rewardType < 0.3) {
                        if (Math.random < 0.5) {
                            var currentAttack = parseInt($('#attack').val());
                            $('#attack').val(currentAttack + 1);
                            updatePlot(`They can give you no reward, but this quest makes you feel stronger!`);
                        } else {
                            var currentDefence = parseInt($('#defence').val());
                            $('#defence').val(currentDefence + 1);
                            updatePlot(`They can give you no reward, but this quest makes you feel more durable!`);
                        }
                    } else if (rewardType < 0.6) {
                        var moneyEarned = Math.floor((Math.random()+Math.random()+Math.random())*(50 * baseHero.level));
                        var currentGold = parseInt($('#gold').val());
                        $('#gold').val(currentGold + moneyEarned);
                        updatePlot(`They reward you with ${moneyEarned} gold!`);
                    } else {
                        var randomSkill = getRandom(skills);
                        heroSkills.push(randomSkill);
                        addSkill(randomSkill);
                        updatePlot(`As a reward, they teach you a rank in the skill of ${randomSkill}!`);
                    }
                    break;
                }
            }
        };
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