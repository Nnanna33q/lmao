let modal = document.querySelector('.modal');
    let card = document.querySelector('.card');
    let cardCoords = card.getBoundingClientRect();
    let input = document.querySelector('#name');
    let space = ' ';
    let gender = document.querySelector('.one');
    let prob = document.querySelector('.two');
    document.querySelector('.button').addEventListener('click', (e)=> {
      if(input.value === '' || input.value === ' ' || input.value.length < 3) {
        alert('Please input a valid name')
      } else {
        document.body.classList.add('opacity');
        let array = input.value.split(' ');
        fetch(`https://api.genderize.io/?name=${array[0]}`)
            .then(response => {
              return response.json();
            })
            .then(data => {
              document.body.classList.remove('opacity');
              document.querySelector('.one').innerText = data.gender;
              document.querySelector('.two').innerText = `${data.probability * 100}%`;

              if(gender.innerText === 'male') {
              card.classList.add('male');
              gender.classList.add('man');
            } else {
              card.classList.add('female');
              gender.classList.add('woman');
            }

            if(data.probability <= 0.49) {
              prob.classList.add('red');
            } else if(data.probability >= 0.5 && data.probability <= 0.74) {
              prob.classList.add('orange');
            } else {
              prob.classList.add('green');
            }
            })
            .catch(error => {
              alert(`${error}. Check your connection!!!`);
            })

      }
    })
    input.addEventListener('focus', ()=> {
      input.classList.add('shadow');
      card.classList.add('shadow');
    })
    input.addEventListener('blur', ()=> {
      input.classList.remove('shadow')
      card.classList.remove('shadow');
    })
    input.addEventListener('input', ()=> {
      document.querySelector('.one').innerText = 'NULL';
      document.querySelector('.two').innerText = 'NAN';
      card.classList.remove('male')
      gender.classList.remove('man');
      card.classList.remove('female');
      gender.classList.remove('woman');
      prob.classList.remove('red');
      prob.classList.remove('orange');
      prob.classList.remove('green');
      if(input.value === '' || input.value === ' ' || input.value.length < 3) {
        return;
      } else {
        document.querySelector('.button').classList.add('black');
        document.querySelector('.button').classList.add('button-active');
      }
    })