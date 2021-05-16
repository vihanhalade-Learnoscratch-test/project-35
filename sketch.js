//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
	database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,350, 2, 2);
  dog.scale = 0.15;
  dog.addImage(dogImg);

  database.ref('/').update({
    Food: 25
  });

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here

  textSize(20);
  fill("white");
  stroke(7);
  text("Food Remaining : "+foodS,160,250);
}

function readStock(data) {
  foodS = data.val();
  console.log(foodS);
}


function writeStock(x) {
  if(x<=0) {
    x = 0;
  }
  else {
    x=x-1;
  }

  database.ref('/').update({
    Food: x
  });
}