const makeInput = () => {
  for (let cnt = 0; cnt < 5; cnt++) {
    const div = document.createElement('div');
    const input = new Array(5);

    for (let i = 0; i < 5; i++) {
      input[i] = document.createElement('input');
      input[i].setAttribute('maxlength', '1');
      input[i].setAttribute('disabled', 'true');
      div.appendChild(input[i]);
    }

    $main.appendChild(div);
    $main.firstElementChild.firstElementChild.removeAttribute('disabled');
    $main.firstElementChild.firstElementChild.focus();
  }
}

const inputFoucs = (event) => {
  if (event.data.length > 1 || !(/^[a-zA-Z]/.test(event.data))) {
    event.target.value = '';
    return;
  }
  else {
    event.target.value = event.target.value.toUpperCase();
    event.target.setAttribute('disabled', 'true');
    if (event.target.nextElementSibling === null) {
      const $div = event.target.parentNode;
      if (answerCheck($div)) {
        return false;
      }

      if ($div.nextElementSibling === null) {
        gameOver(false);
      } 
      else {
        $div.nextElementSibling.firstElementChild.removeAttribute('disabled');
        $div.nextElementSibling.firstElementChild.focus();
      }
    }
    else {
      event.target.nextElementSibling.removeAttribute('disabled');
      event.target.nextElementSibling.focus();
    }
  }
}

const answerCheck = (div) => {
  let string = '';
  let element = div.firstElementChild;

  for (let i = 0; i < 5; i++) {
    string += element.value;
    element = element.nextElementSibling;
  }

  if (string === ans) {
    element = div.firstElementChild;
    for (let i = 0; i < 5; i++) {
      element.style.backgroundColor = '#5EB160';
      element.style.color = 'white';
      element.setAttribute('disabled', 'true');
      element = element.nextElementSibling;
    }

    gameOver(true);
    return true;
  }
  else {
    const $elem = div.getElementsByTagName('input');
    for (let i = 0; i < 5; i++) {
      if (ans.includes(string[i])) {
        if (ans.indexOf(string[i]) === i) {
          $elem[i].style.backgroundColor = '#5EB160';
          $elem[i].style.color = 'white';
        }
        else {
          $elem[i].style.backgroundColor = '#FDFD96';
        }
      }
      else {
        $elem[i].style.backgroundColor = 'lightgray';
      }
    }
  }
  return false;
}

const gameOver = (game) => {
  const $finish = document.createElement('div');
  $finish.appendChild(document.createElement('h2'));
  if (!game) {
    $finish.firstElementChild.textContent = `당신은 루저입니다. 정답은 ${ans}.`;
    $finish.style.backgroundColor = '#DB4455';
  }
  else {
    $finish.firstElementChild.textContent = '당신이 이겼습니다!';
    $finish.style.backgroundColor = '#5EB160';
  }
  $main.parentNode.appendChild($finish);
}

const $main = document.getElementById('main');
var ans = '';

window.onload = () => {
  ans = words[Math.floor(Math.random() * (words.length - 1))].toUpperCase();
  console.log(ans);
  makeInput();
  $main.addEventListener('input', inputFoucs);
}