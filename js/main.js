var feedbackLink = document.querySelector('.contacts-button');
var feedbackPopup = document.querySelector('.modal-feedback');
var feedbackClose = feedbackPopup.querySelector('.close-modal');
var feedbackForm = feedbackPopup.querySelector('.modal-feedback-form');
var feedbackName = feedbackPopup.querySelector('.modal-feedback-name');
var feedbackEmail = feedbackPopup.querySelector('.modal-feedback-email');
var feedbackText = feedbackPopup.querySelector('.modal-feedback-text');
var feedbackFields = feedbackPopup.querySelectorAll('.modal-feedback-input');

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
    storageName = localStorage.getItem('name');
    storageEmail = localStorage.getItem('email');
} catch (err) {
    isStorageSupport = false;
}

feedbackLink.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.add('modal-show');

    if (storageName && storageEmail) {
        feedbackName.value = storageName;
        feedbackEmail.value = storageEmail;
        feedbackText.focus();
    } else {
        feedbackName.focus();
    }
});

feedbackForm.addEventListener('submit', function(evt) {
    if (!feedbackName.value || !feedbackEmail.value || !feedbackText.value) {
        evt.preventDefault();
        feedbackPopup.classList.remove('modal-error');
        feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
        feedbackPopup.classList.add('modal-error');

        feedbackFields.forEach(function(elem, idx) {
            if (!elem.value) {
                elem.classList.add('modal-feedback-input-error');
            }
        });
    } else {
        if (isStorageSupport) {
            localStorage.setItem('name', feedbackName.value);
            localStorage.setItem('email', feedbackEmail.value);
        }
    }
});

feedbackClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    feedbackPopup.classList.remove('modal-show');
    feedbackPopup.classList.remove('modal-error');
});

window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
        if (feedbackPopup.classList.contains('modal-show')) {
            evt.preventDefault();
            feedbackPopup.classList.remove('modal-show');
            feedbackPopup.classList.remove('modal-error');
        }
    }
});