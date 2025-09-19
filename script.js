
let slideIndex = 0;
  const slides = document.getElementsByClassName("slide");

  function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
  }

  function changeSlide(n) {
    slideIndex = (slideIndex + n + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  showSlide(slideIndex);

let currentStep = 1;
const steps = document.querySelectorAll('.step');
const formContainer = document.getElementById('formContainer');
let selectedEventType = "";

function initForm() {
  document.getElementById('startBtn').addEventListener('click', () => {
    document.getElementById('startBtn').style.display = 'none';
 document.getElementById("slideshow").style.display = "none";
    formContainer.style.display = 'block';
    steps[0].classList.add('active');
  });
}
function prevStep() {
  if (currentStep > 1) {
    steps[currentStep - 1].classList.remove('active');
    steps[currentStep - 2].classList.add('active');
    currentStep--;
  }
}

function nextStep() {
  if (!validateStep(currentStep)) return;

  if (currentStep < steps.length) {
    steps[currentStep - 1].classList.remove('active');
    steps[currentStep].classList.add('active');
    currentStep++;
  }
}

function validateStep(step) {
  switch (step) {
    case 1:
      if (!selectedEventType) {
        alert("Please select an event type.");
        return false;
      }
      return true;
    case 2:
      const scheme = document.querySelector('input[name="scheme"]:checked');
      if (!scheme) {
        alert("Please select a colour scheme.");
        return false;
      }
      return true;
    case 3:
      const india = document.querySelector('input[name="location"]:checked');
      if (!india) {
        alert("Please select a destination location.");
        return false;
      }
      if (india.value === "India") {
        const city = document.getElementById("citySelect").value;
        if (!city) {
          alert("Please select a city.");
          return false;
        }
        if (city === "Other" && !document.getElementById("cityName").value.trim()) {
          alert("Please specify the city name.");
          return false;
        }
      }
      return true;
    case 4:
      const numEvents = document.getElementById("numEvents").value;
      if (!numEvents || numEvents <= 0) {
        alert("Please enter the number of events.");
        return false;
      }
      return true;
    case 5:
      const from = document.getElementById("dateFrom").value;
      const to = document.getElementById("dateTo").value;
      if (!from || !to) {
        alert("Please enter both start and end dates.");
        return false;
      }
      if (new Date(to) < new Date(from)) {
        alert("End date cannot be before start date.");
        return false;
      }
      return true;
    case 6:
      const budget = document.getElementById("budget").value;
      if (!budget || budget <= 0) {
        alert("Please enter a valid budget.");
        return false;
      }
      return true;
    case 7:
      const phone = document.getElementById("phone").value;
      const email = document.getElementById("email").value;
      if (!phone.match(/^\d{10}$/)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
      }
      if (!email.match(/^\S+@\S+\.\S+$/)) {
        alert("Please enter a valid email address.");
        return false;
      }
      return true;
    default:
      return true;
  }
}

function selectEvent(eventType) {
  selectedEventType = eventType;
  document.querySelectorAll('.event-option').forEach(opt => opt.classList.remove('selected'));
  document.querySelector(`.event-option[onclick*="${eventType}"]`).classList.add('selected');

  document.getElementById('weddingDetails').classList.add('hidden');
  document.getElementById('birthdayDetails').classList.add('hidden');
  document.getElementById('anniversaryDetails').classList.add('hidden');

  if (eventType === 'Wedding') document.getElementById('weddingDetails').classList.remove('hidden');
  else if (eventType === 'Birthday') document.getElementById('birthdayDetails').classList.remove('hidden');
  else if (eventType === 'Anniversary') document.getElementById('anniversaryDetails').classList.remove('hidden');
}

function toggleFestivities() {
  const checkBox = document.getElementById('otherFestivities');
  document.getElementById('festivitiesInput').classList.toggle('hidden', !checkBox.checked);
}

function showColorPickers(type) {
  document.getElementById('solidColorPicker').classList.add('hidden');
  document.getElementById('gradientColorPicker').classList.add('hidden');

  if (type === 'solid') {
    document.getElementById('solidColorPicker').classList.remove('hidden');
  } else {
    document.getElementById('gradientColorPicker').classList.remove('hidden');
  }
}

function toggleCity(showIndia) {
  const cityDropdown = document.getElementById('cityDropdown');
  const otherCityInput = document.getElementById('otherCityInput');
  cityDropdown.classList.toggle('hidden', !showIndia);
  otherCityInput.classList.add('hidden');
  if (!showIndia) {
    document.getElementById('citySelect').value = '';
  }
}

function handleCityChange(value) {
  const otherCityInput = document.getElementById('otherCityInput');
  otherCityInput.classList.toggle('hidden', value !== 'Other');
}

function submitForm() {
  if (!validateStep(7)) return;
  const ref = "REF" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('step7').classList.remove('active');
  document.getElementById('step8').classList.add('active');
  document.getElementById('refNum').textContent = ref;
}


function scrollGallery(direction) {
  const gallery = document.getElementById('templateGallery');
  const scrollAmount = 150;
  gallery.scrollLeft += direction * scrollAmount;
}

window.onload = initForm;
