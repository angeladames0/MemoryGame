var mode_easy = 30;
var mode_intermediate = 25;
var mode_hard = 15;
var mode_inferno = 10;

var attempts = mode_easy;

var mode="";

var fails=0;

var arr=[];

var open_ele=[];

var total=0;


function SelectDifficulty()
{
  document.getElementsByClassName("difficulty")[0].style.display="block";
}

function DefineDifficulty(_mode)
{

  switch(_mode)
  {
    case 0:
      attempts = mode_easy;
      mode = "Level Easy";
      break;

    case 1:
      attempts = mode_intermediate;
      mode = "Level Intermediate";
      break;
    
    case 2:
      attempts = mode_hard;
      mode = "Level Hard";
      break;
    case 3:
      attempts = mode_inferno;
      mode = "Level Inferno";
      break;
  }

  ul = document.getElementsByClassName("score")[0];
  li_1 = document.createElement("li");
  li_2 = document.createElement("li");
 
  li_1.innerHTML="Jugador 1 : "+ mode +" <span style='color : rgb(227,72,20);'>Ongoing...</span>";
  li_2.innerHTML="Solved images :: " + String(total) + " / 9"; 
  
  ul.appendChild(document.createElement("br"));
  ul.appendChild(document.createElement("br"));
  ul.appendChild(li_1);
  ul.appendChild(document.createElement("br"));
  ul.appendChild(li_2);
  ul.appendChild(document.createElement("br"));
  ul.appendChild(document.createElement("br"));
  document.getElementsByTagName("attempt")[0].innerHTML = "Attempts : " + attempts;
  document.getElementsByClassName("difficulty")[0].style.display="none"; 
 }


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


function Changeimage(a)
{
  
  if(open_ele.length == 0)
  {
    a.style.backgroundColor="Transparent";
    a.style.backgroundImage="url('"+arr[Number(a.getAttribute("id"))]+"')";
    open_ele.push(a);
    return;
  }
  
  if(open_ele.length == 1)
  {
       a.style.backgroundColor="Transparent";
       a.style.backgroundImage="url('"+arr[Number(a.getAttribute("id"))]+"')";
       open_ele.push(a);
       
       if(open_ele[0].style.backgroundImage.split("/")[2] == open_ele[1].style.backgroundImage.split("/")[2])
       {
          window.setTimeout(function(){
          open_ele[0].style.backgroundColor="rgb(188, 194, 190)";
          open_ele[1].style.backgroundColor="rgb(188, 194, 190)";
          open_ele[0].style.visibility="hidden";
          open_ele[1].style.visibility="hidden";
          open_ele.length=0;

          },500);
          total++;
          var len = document.getElementsByClassName("score")[0].getElementsByTagName("li").length;
          document.getElementsByClassName("score")[0].getElementsByTagName("li")[len-1].innerHTML="Solved images : " + String(total) + " / 9"; 

          if(total == 9)
          {
            ShowModal();
             eles = document.getElementsByClassName("score")[0].getElementsByTagName("li");
             eles[eles.length-2].innerHTML="Player 1 : " + mode +" <span style='color : rgb(45,247,55);'>Completed</span>";
             document.getElementsByTagName("table")[0].style.display="none";
             document.getElementsByClassName("message")[0].style.display="block";
             document.getElementsByClassName("message")[0].innerHTML="Congratulations, you have completed the game!";
             document.getElementsByClassName("message-button")[0].style.display="block";
             return;
          }
        }
        else
        {
           attempts--;
          
          document.getElementsByTagName("attempt")[0].innerHTML = "Attempts : " + attempts;
          
          if(attempts == 0)
          {
            ShowModal();
            fallos=1;
            eles = document.getElementsByClassName("score")[0].getElementsByTagName("li");
            eles[eles.length-2].innerHTML="Player 1 : " + mode +" <span style='color : rgb(252,3,11);'>Fails</span>";
            document.getElementsByTagName("table")[0].style.display="none";
            document.getElementsByClassName("message")[0].style.display="block";
            document.getElementsByClassName("message")[0].innerHTML=":( F... You have run out of intnets.";
            document.getElementsByClassName("message-button")[0].style.display="block";
            open_ele.length=0;
             return;
          }

           

           window.setTimeout(function(){
           open_ele[0].style.backgroundColor="#1A4870";
           open_ele[1].style.backgroundColor="#1A4870";
           open_ele[0].style.backgroundImage="none";
           open_ele[1].style.backgroundImage="none";
           open_ele.length=0;
           },500);
        }
  }
 
}


function Playingagain()
{
  total=0;
  len = document.getElementsByClassName("score")[0].getElementsByTagName("li").length;
  if(fails == 1)
  {
    if(mode == "Nivel Facil")
    {
      attempts=mode_easy;
      total=0;
      document.getElementsByClassName("score")[0].getElementsByTagName("li")[len-1].innerHTML="Solved images : " + String(total) + " / 9";
    }

    if(mode == "Nivel Intermedio")
    {
      attempts=mode_intermediate;
      total=0;
      document.getElementsByClassName("score")[0].getElementsByTagName("li")[len-1].innerHTML="Solved images :: " + String(total) + " / 9";
    }

    if(mode == "Nivel Dificil")
    {
      attempts=mode_hard;
      total=0;
      document.getElementsByClassName("score")[0].getElementsByTagName("li")[len-1].innerHTML="Solved images : " + String(total) + " / 9";
    }
    if(mode == "Nivel Inferno")
    {
      attempts=mode_inferno;
      total=0;
      document.getElementsByClassName("score")[0].getElementsByTagName("li")[len-1].innerHTML="Solved images : " + String(total) + " / 9";
    }
    document.getElementsByTagName("attempt")[0].innerHTML = "Attempts : " + attempts;
    DefineBackground();
  }
  else
  {
  SelectDifficulty();
   DefineBackground();
  }
}


function RestartGame()
{
  fallos=0;
  document.getElementsByClassName("modal")[1].style.display="none";
  lis = document.getElementsByClassName("score")[0];
  lis.remove();


  ul = document.createElement("ul");
  ul.setAttribute("class","score");
  document.getElementsByClassName("leader")[0].appendChild(ul);
  total=0;
  SelectDifficulty();
  DefineBackground();
}

function DefineBackground()
{
  console.log("setb");
  arr.length=0;
  for(var i=1;i<=9;i++)
  {
    arr.push("img/img-game/"+String(i)+".png");
    arr.push("img/img-game/"+String(i)+".png");
  }
   arr = shuffle(arr);  

  document.getElementsByTagName("attempt")[0].innerHTML = "Intentos : " + 0;

  document.getElementsByClassName("message")[0].style.display="none";
  document.getElementsByClassName("message-button")[0].style.display="none";

  document.getElementsByTagName("table")[0].style.display="inline-block";

  td = document.getElementsByClassName("ele");
  for(var i=0;i<td.length;i++)
  {
    td[i].style.backgroundColor="#1A4870";
    td[i].style.backgroundImage="none";
    td[i].style.visibility="visible";
  }
}

function Intro()
{
    document.getElementsByClassName("difficulty")[0].style.display="none";
    SelectDifficulty();
    DefineBackground();
   }


function HideModal(a)
{
  document.getElementsByClassName("modal")[a].style.display="none";
}

function ShowModal()
{
  document.getElementsByClassName("modal")[0].style.display="block";
}

window.onresize = function()
{
  console.log(window.innerWidth);
}