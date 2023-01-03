export const timeout = function <TData>(s: number): Promise<TData> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// const animationDuration = 3000; // duration of the animation in milliseconds
// // const element = document.querySelector('#myDiv'); // the element to display the text in
// let startTime: number = new Date().getTime(); // will be used to track the start time of the animation
// // let index:number = 0; // will be used to track the index of the current character
// const text =
//   'Hello, world! i banowef wifjeiowjf woifjewoi foiwjf iwofjoiw fjewoifj woifj woifj woifjw oifjwoi fjwofi jweiofjw ofijwie fwifj wfje'; // the text to display
// let cursor = true;

// function animate() {
//   // get the current time
//   const currentTime = new Date().getTime();
//   console.log(cursor);

//   // calculate the elapsed time
//   const elapsedTime = currentTime - startTime;

//   // calculate the number of characters to display based on the elapsed time
//   const charactersToShow = Math.floor(
//     (elapsedTime / animationDuration) * text.length
//   );

//   // update the text of the element
//   const cursorElem = '<span id="cursor">|</span>';
//   // recipeContainer.innerHTML = text.substring(0, charactersToShow) + cursorElem;

//   const cursorId = document.getElementById('cursor') as HTMLElement;
//   cursorId.style.display = cursor ? 'inline' : 'none';

//   // if the animation has completed, stop the interval
//   if (charactersToShow >= text.length) {
//     cursor = !cursor;
//     cursorId.style.display = cursor ? 'inline' : 'none';
//     clearInterval(intervalId);
//   }
// }

// start the animation
// startTime = new Date().getTime();
// const intervalId = setInterval(animate, 1000 / 60); // call animate every 16.6ms (60 fps)

// const writingAnimation = (text: string) => {
//   let index = 0;
//   let fullText = '';

//   const intervalTime = setInterval(() => {
//     fullText += text[index];
//     recipeContainer.textContent = fullText;
//     if (index > text.length - 1) {
//       clearInterval(intervalTime);
//     }
//     index += 1;
//   }, 100);
// };

// writingAnimation(
//   'THis is the text that I wanna write hellwojfowijefwef lorem20'
// );

// const rippleButton = document.querySelector(
//   '.rippleButton'
// ) as HTMLButtonElement;

// rippleButton.addEventListener('click', e => {
//   addRipple(e);
// });
// function addRipple(event: MouseEvent) {
//   let button = event.currentTarget as HTMLButtonElement;
//   let x = event.clientX - button.offsetLeft;
//   let y = event.clientY - button.offsetTop;

//   let ripple = document.createElement('div') as HTMLDivElement;
//   ripple.classList.add('ripple');
//   ripple.style.top = y + 'px';
//   ripple.style.left = x + 'px';
//   button.appendChild(ripple);

//   setTimeout(() => {
//     ripple.remove();
//   }, 5000);
// }
