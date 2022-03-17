'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

function likes(names) {
  if (names.length === 0) console.log(`no one likes this`);
  else {
    const message = [...names];
    console.log(`${message.replace('', 'and')} likes this`);
  }
}

likes([]);
likes(['Peter']);

// function likes (names) {
//   if (names.length === 0) {
//     return 'no one likes this';
//   } else if (names.length === 1) {
//     return `${[...names].join(' and ')} likes this`;
//   } else if (names.length === 2) {
//     return `${[...names].join(' and ')} like this`;
//   } else if (names.length === 3) {
//     return `${[...names].slice(0,2).join(', ')} and ${[...names].slice(2)} like this`;
//   } else if (names.length > 3) {
//     return `${[...names].slice(0,2).join(', ')} and ${names.length - 2} others like this`;
//   }
// }
