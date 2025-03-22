import formatData from "./helper.js";
const level=localStorage.getItem("level")|| "medium";
const loader = document.getElementById("loader")
const container = document.getElementById("container")
const questionText = document.getElementById("question-text")
const error = document.getElementById("error")
const answerlist = document.querySelectorAll(".answer-text")
 const scoreText=document.getElementById("score") 
 const nextbutton=document.getElementById("next-button")
 const finishbutton=document.getElementById("finish-button")

const URL=`https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

const correctBonus=10;
const questionNumber=document.getElementById("question-number")

let formattedData=null;
let questionIndex = 0;
let correctAnswer = null;
let score=0;
let isAccepted=true;

 

const fetchData = async ()=> {
    try{
      const response = await fetch(URL);
    const json = await response.json();
    formattedData =formatData(json.results);
    start ();
    }
    catch (error){
     loader.style.display="none"
     error.style.display="block"
    }
}

const start = () => {
    showQuestion();

loader.style.display ="none"
container.style.display ="block"
}

const showQuestion = () => {
  questionNumber.innerText = questionIndex +1;
 const { question , answers , correctAnswerIndex} = 
 formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerlist.forEach((button , index) =>{
    button.innerText = answers[index];
  })
}
 const checkAnswer =( event,index) => {
   if(!isAccepted) return;
   isAccepted=false;
  const isCorrect = index === correctAnswer ? true : false;
  if(isCorrect){
   event.target.classList.add("correct");
   score+=correctBonus;
   scoreText.innerText=score;
  }
  else{

    event.target.classList.add("incorrect");
    answerlist[correctAnswer].classList.add("correct");

  }
    
 }
 const nextHandler= () => {
  questionIndex++;
  if (questionIndex < formattedData.length){
    removeClass();
  showQuestion();
  isAccepted=true;}
  else{
    finishHandler();
  }
 }
 const finishHandler = () => {
  localStorage.setItem("score",JSON.stringify(score))
  window.location.assign("end.html")
 }
 const removeClass = () => {
  answerlist.forEach((button) => (button.className = "answer-text"))
 }
window.addEventListener("load" , fetchData);
nextbutton.addEventListener("click" , nextHandler);
finishbutton.addEventListener("click" , finishHandler);

answerlist.forEach((button , index) => {
   button.addEventListener( "click" , (event) => checkAnswer(event, index));
    // use another function instead of checkanswer because we could not use it  staightly there becuse it has  input 
    //if in addevent.. we give a function bracket it will be called immediately
}) ;