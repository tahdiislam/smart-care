/** @format */

const docDetails = document.getElementById("docDetails");
const reviews = document.getElementById("doctor-reviews");

const getParams = () => {
  const param = new URLSearchParams(window.location.search).get("docId");
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
                    <h1>
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
                    <button class="btn btn-primary">Take Appointment</button>
                    <div>
                </div>
            </div>`;
  docDetails.appendChild(div);
};

const displayReviews = (data) => {
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

getParams();