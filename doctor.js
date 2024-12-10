/** @format */

const param = new URLSearchParams(window.location.search).get("docId");

const docDetails = document.getElementById("docDetails");
const reviews = document.getElementById("doctor-reviews");
const times = document.getElementById("time");
const reviewContainer = document.getElementById("doctor-reviews-container");

const getParams = () => {
  fetch(`https://test-thto.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data));

  fetch(`https://test-thto.onrender.com/doctor/review/?doctor_id=${param}`)
    .then((res) => res.json())
    .then((data) => displayReviews(data));
};

const displayDetails = (data) => {
  const div = document.createElement("div");
  div.innerHTML = `
                <div class="d-flex justify-content-center align-items-start gap-5 details">
                <img src="${data?.image}" alt="" srcset="">
                <div class="w-50">
                    <h1 class="doctor_name">
                       ${data?.full_name} 
                    </h1>
                    <p>${data?.specialization}</p>
                    <h3>
                        ${data?.designation}
                    </h3>
                    <p class="w-50">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam natus debitis veritatis! Aut
                        minus maiores, sit neque vitae commodi consectetur?
                    </p>
                    <h3>Fees: ${data?.fee} BDT</h3>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Take Appointment
                    </button>
                </div>
            </div>`;
  docDetails.appendChild(div);
};

const displayReviews = (data) => {
  if (data.length === 0) {
    reviewContainer.style.display = "none";
  }
  data?.map((review) => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="review_card shadow-lg">
                        <div class="d-flex justify-content-between gap-3">
                            <img src="./Images/girl.png" alt="">
                            <div>
                                <h3>${review.reviewer}</h3>
                                <p>${review.rating}</p>
                            </div>
                        </div>
                        <p>
                           ${review.body.slice(0, 150)} 
                        </p>
                    </div>`;
    reviews.appendChild(li);
  });
};

const loadAvailableTimes = () => {
  fetch(
    `https://test-thto.onrender.com/doctor/availabletime/?doctor_id=${param}`
  )
    .then((res) => res.json())
    .then((data) => {
      data?.map((time) => {
        const option = document.createElement("option");
        option.value = time.id;
        option.innerHTML = time.name;
        times.appendChild(option);
      });
    });
};

const submitForm = () => {
  const status = document.getElementsByName("status");
  const selectedStatus = Array.from(status).find((button) => button.checked);
  const symptom = document.getElementById("symptom").value;
  const time = document.getElementById("time").value;
  const info = {
    appointment_type: selectedStatus.value,
    appointment_status: "Pending",
    symptom: symptom,
    cancel: false,
    patient: 1,
    doctor: param,
    time: time,
  };
  console.log(info);
  fetch("https://test-thto.onrender.com/appointment/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

getParams();
loadAvailableTimes();
