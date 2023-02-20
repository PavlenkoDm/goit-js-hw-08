import trottle from 'lodash.throttle';


const STORAGE_KEY = "feedback-form-state";
const formData = {};

const formRef = document.querySelector('.feedback-form');

populateFormInput(load(STORAGE_KEY));

formRef.addEventListener('input', trottle(onInput, 500, {leading: true, trailing: false,}));
formRef.addEventListener('submit', onSubmit);




//---Handlers---------------------------------------------------
function onInput(event) {
    if (!event.target.value.trim()) return;
    formData[event.target.name] = event.target.value.trim();
    save(STORAGE_KEY, formData);   
}


function onSubmit(event) {
    event.preventDefault();
    console.log(formData);    
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function populateFormInput(obj) {
    if (obj === undefined) return;
    Object.entries(obj).forEach(subArr => {
        formRef.elements[subArr[0]].value = subArr[1];
    });
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


