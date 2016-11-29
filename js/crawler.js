var LOOKSPEED = 0.03;
var MOVESPEED = 1;
var PLAYERSIZE = 0;
var FOV = 70;

window.addEventListener( 'resize', onWindowResize, false );

var keydown = false;
var titleScreen = true;
var lock = false;

this.lockkeys   = function(event){
    if (titleScreen) {
        titleScreen = false;
        lock = false;
        $("#coverscreen").hide();
        onWindowResize();
    }
    keydown = true;
};
this.unlockkeys = function(event){
    keydown = false; 
};

document.addEventListener("keydown", this.lockkeys, false);
document.addEventListener("keyup", this.unlockkeys, false);

function onWindowResize()
{
    camera.aspect = game.offsetWidth/game.offsetHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(game.offsetWidth, game.offsetHeight);

}

function de2ra(degree)
{ 
    return degree*(Math.PI/180); 
}

function addWall(x, y)
{
    var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), wallMat);
    cube.position.set(x,0,y);
    scene.add(cube);
}

var game = document.getElementById("game");

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 0.1, 10);

var camera = new THREE.PerspectiveCamera(FOV, game.offsetWidth/game.offsetHeight, 0.01, 30);
camera.position.set(2, 0.2, 6);

var keyboard = new THREEx.KeyboardState();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(game.offsetWidth, game.offsetHeight);
game.appendChild(renderer.domElement);

var wallTex = THREE.ImageUtils.loadTexture('./images/stone2_b.jpg');
var celingTex = THREE.ImageUtils.loadTexture('./images/411.png');
var floorTex = THREE.ImageUtils.loadTexture('./images/woodfloor.jpg');
var goonTex = THREE.ImageUtils.loadTexture('./images/goon.png');

wallTex.magFilter = THREE.NearestFilter;
var wallMat = new THREE.MeshBasicMaterial({map: wallTex});

floorTex.magFilter = THREE.NearestFilter;
floorTex.wrapS = THREE.RepeatWrapping;
floorTex.wrapT = THREE.RepeatWrapping;
floorTex.repeat.set(35, 35);
var floorMat = new THREE.MeshBasicMaterial({map: floorTex});
var floor = new THREE.Mesh(new THREE.PlaneGeometry(35, 35), floorMat);
floor.position.set(0,-0.5,0);
floor.rotation.x = de2ra(-90);
scene.add(floor)

celingTex.magFilter = THREE.NearestFilter;
celingTex.wrapS = THREE.RepeatWrapping;
celingTex.wrapT = THREE.RepeatWrapping;
celingTex.repeat.set(35, 35);
var celingMat = new THREE.MeshBasicMaterial({map: celingTex});
var celing = new THREE.Mesh(new THREE.PlaneGeometry(35, 35), celingMat);
celing.position.set(0,0.5,0);
celing.rotation.x = de2ra(90);
scene.add(celing)

goonTex.magFilter = THREE.NearestFilter;
var goonMat = new THREE.MeshBasicMaterial({map: goonTex, transparent: true});

function mob(x,y)
{
    this.geometry = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), goonMat);
    this.geometry.position.set(x, -0.05, y);
    scene.add(this.geometry);
    this.dead = false;
    this.update = function()
    {
        this.geometry.lookAt(new THREE.Vector3(
            camera.position.x,
            this.geometry.position.y,
            camera.position.z));
    }
    this.glib = function()
    {
        if(this.dead == false){
            scene.remove(this.geometry);
            for(var i=0; i < 200; i++)
            {
                var Vx = (Math.random()*0.1)-0.05;
                var Vy = Math.random()*0.02;
                var Vz = (Math.random()*0.1)-0.05;
                particles.push(new particle(
                    this.geometry.position.x, 
                    this.geometry.position.y, 
                    this.geometry.position.z, 
                    Vx, Vy, Vz, 0.3, 0.001, 0.08, 200, 0xff0000));
            }
            this.dead = true;
        }
    }
}

var particles = [];
var mobs = [];
mobs.push(new mob(5, 7));

function particle(x, y, z, Vx, Vy, Vz, bounce, weight, size, life, color)
{   
    this.mat = new THREE.MeshBasicMaterial({color: color});
    this.geometry = new THREE.Mesh(new THREE.PlaneGeometry(size, size), this.mat);
    this.geometry.position.set(x, y, z);
    scene.add(this.geometry);

    this.update = function()
    {
        this.geometry.lookAt(camera.position);
        if (this.geometry.position.y < -0.5)
        {
            this.geometry.position.y = -0.5;
            Vx *= bounce;
            Vy *= -bounce;
            Vz *= bounce;
        }
        if (this.geometry.position.y > 0.5)
        {
            this.geometry.position.y = 0.5;
            Vx *= bounce;
            Vy *= -bounce;
            Vz *= bounce;
        }
        this.geometry.position.x += Vx;
        this.geometry.position.y += Vy;
        this.geometry.position.z += Vz;
        Vy -= weight;
        life -= 1;
        if(life == 0)
        {
            this.kill();
        }
    }

    this.kill = function()
    {
        scene.remove(this.geometry);
        particles.splice(particles.indexOf(this), 1);       
    }
}

var floorLevel = 1;

var dungeon = 
    [
    [1,1,1,1,1,1,1],
    [1,0,0,0,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,0,0,1,0,1],
    [1,1,0,1,1,0,1],
    [1,0,0,0,1,0,1],
    [1,0,0,0,1,0,1],
    [1,0,0,0,1,0,1],
    [1,1,1,1,1,1,1]
    ];
    
for(var y = 0; y < dungeon.length; y++)
{
    for(var x = 0; x < dungeon[0].length; x++)
    {
        if( dungeon[y][x] == 1 )
        {
            addWall(x, y);                  
        }
    }
}

var monsterGenerated;

var mode = 'move';

var playerHP = 10;
var playerMaxHP = 10;
var monster;

var render = function () {
    requestAnimationFrame(render);
    if(mode == 'move'){
        handleMovement();
        for(var i in mobs)
        {
            mobs[i].update();
        }
        for(var i in particles)
        {
            particles[i].update();
        }
    }
    renderer.render(scene, camera);
    if(monsterGenerated)
    {
        generateEncounter(monsterGenerated);
        monsterGenerated = false;
        consoleLog("You encountered a " + encounter.monster.name + "!");
        lock = true;
        $("#monster_image").attr("src", encounter.monster.image);
        $("#monster_image").show();
        mode = 'battle';
    }
};

$("#attack").click(clickAttack);
$("#skill").click(clickSkill);
$("#defend").click(clickDefend);
$("#item").click(clickItem);
$("#flee").click(clickFlee);

function consoleLog(text) {
    $("#console").append("<p>" + text + "</p>");
    $("#console").scrollTop($("#console")[0].scrollHeight);
}

function generateMonster()
{
    var rate = encounterRate[floorLevel];
    
    if (Math.random() < rate)
    {
        monsterGenerated = encounterTable[floorLevel][Math.floor(Math.random()*(encounterTable[floorLevel].length))];
    }
}

function handleMovement()
{
    if (keydown == true && lock == false) {
        if( keyboard.pressed("F") )
        {
            //if( mobs[0].geometry.position.x == camera.position.x )
            //{
            //  mobs[0].glib();
            //}             
        }
        if( keyboard.pressed("Q") && keydown == true )
        {
            lock = true;
            var i = 0;
            var rotateSlightly = function(i) {
                if (i < 5) {
                    setTimeout(function() {
                        i += 1;
                        camera.rotation.y += (Math.PI / 2)/5;
                        renderer.render(scene, camera);
                        rotateSlightly(i);
                    }, 30);
                } else {lock = false;}
            }
            rotateSlightly(i);
        }
        if( keyboard.pressed("E") && keydown == true )
        {
            lock = true;
            var i = 0;
            var rotateSlightly = function(i) {
                if (i < 5) {
                    setTimeout(function() {
                        i += 1;
                        camera.rotation.y -= (Math.PI / 2)/5;
                        renderer.render(scene, camera);
                        rotateSlightly(i);
                    }, 30);
                } else {lock = false;}
            }
            rotateSlightly(i);
        }
        
        if( keyboard.pressed("W"))
        {
            generateMonster();
            camera.translateZ( -MOVESPEED-PLAYERSIZE );
            if(dungeon[Math.round(camera.position.z)][Math.round(camera.position.x)] == 1)
            {
                camera.translateZ( MOVESPEED + PLAYERSIZE );
            }
            else
            {
                camera.translateZ( PLAYERSIZE );
            }
        }
        if( keyboard.pressed("S"))
        {
            generateMonster();
            camera.translateZ( MOVESPEED+PLAYERSIZE );
            if(dungeon[Math.round(camera.position.z)][Math.round(camera.position.x)] == 1)
            {
                camera.translateZ( -MOVESPEED-PLAYERSIZE );
            }
            else
            {
                camera.translateZ( -PLAYERSIZE );
            }
        }
        if( keyboard.pressed("A"))
        {
            generateMonster();
            camera.translateX( -MOVESPEED -PLAYERSIZE );
            if(dungeon[Math.round(camera.position.z)][Math.round(camera.position.x)] == 1)
            {
                camera.translateX( MOVESPEED + PLAYERSIZE );
            }
            else
            {
                camera.translateX( PLAYERSIZE );
            }
        }
        if( keyboard.pressed("D"))
        {
            generateMonster();
            camera.translateX( MOVESPEED+PLAYERSIZE );
            if(dungeon[Math.round(camera.position.z)][Math.round(camera.position.x)] == 1)
            {
                camera.translateX( -MOVESPEED-PLAYERSIZE );
            }
            else
            {
                camera.translateX( -PLAYERSIZE );
            }
        }
        keydown = false;
    }
    
    floor.position.set(camera.position.x, -0.5, camera.position.z);
    celing.position.set(camera.position.x, 0.5, camera.position.z);
    floorTex.offset.x = camera.position.x;
    floorTex.offset.y = -camera.position.z;
    celingTex.offset.x = camera.position.x;
    celingTex.offset.y = camera.position.z;
}

render();