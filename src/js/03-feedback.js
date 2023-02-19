import trottle from 'lodash.throttle';


const STORAGE_KEY = "feedback-form-state";
const formData = {};
const parsedData = load(STORAGE_KEY);


const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('.feedback-form input');
const textareaRef = document.querySelector('.feedback-form textarea');

populateFormInput(parsedData);

formRef.addEventListener('input', trottle(onInput, 500, {leading: true, trailing: false,}));
// formRef.addEventListener('input', onLengthCheck);
formRef.addEventListener('submit', onSubmit);




//---Handlers---------------------------------------------------
function onInput(event) {
    if (!event.target.value.trim()) return;
    formData[event.target.name] = event.target.value.trim();
    save(STORAGE_KEY, formData);   
}


// function onLengthCheck(event) {
//     if (!inputRef.value.trim() || !textareaRef.value.trim()) {
//         localStorage.removeItem(STORAGE_KEY);
//     }
// }

function onSubmit(event) {
    event.preventDefault();
    console.log(parsedData);    
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function populateFormInput(obj) {
    if (obj === undefined) return;
    inputRef.value = obj.email;
    textareaRef.value = obj.message;
}



//----Helpers-------------------------------------------------------
function save(key, value) {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
}

function load(key) {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
}


