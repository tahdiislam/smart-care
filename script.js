const services = document.getElementById('services');

const loadServices = () => {
    fetch('https://testing-8az5.onrender.com/services/')
        .then(res => res.json())
        .then(data => displayServices(data))
        .catch(error => console.log(error))
}

const displayServices = (data) => {
    data?.map(service => {
        const serviceList = document.createElement('li');
        serviceList.innerHTML = `
            <div class="card shadow h-100">
                <div class="ratio ratio-16x9">
                    <img src="${service.image}" class="card-img-top" loading="lazy" alt="${service.name}">
                </div>
                <div class="card-body p-3 p-xl-5">
                    <h3 class="card-title h5">${service.name}</h3>
                    <p class="card-text" style='width:100%'>${service.description.slice(0, 100)}</p>
                    <div><a href="#" class="btn btn-primary">See Details</a>
                    </div>
                </div>
            </div>
        `
        services.appendChild(serviceList);
    })
}

loadServices()