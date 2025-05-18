
function isLoggedIn() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (user) {
        console.log(user);

    } else window.location.href = '/auth/login';
}

async function getInternships() {
    try {
        const param = new URLSearchParams(window.location.search)
        const category = param.get('category') || "Featured internships"


        try {
            const response = await fetch(`https://internsity.in/internships/data?category=${category}`);

            if (!(await response).ok) {
                alert("Failed to get Internships");
                return
            }

            const internships = await response.json();
            const container = document.getElementById("container");
            if (internships.length > 0) {
                internships.forEach((internship) => {
                    console.log("internship", internship);
                    let card = `
                        <div class="col-xxl-3 col-lg-4 col-sm-6">
                            <div class="service-wrapper service-style-1">
                                <div class="service-inner">
                                    <div class="service-icon">
                                        <img class="img-fluid" src="${internship.imageURL[0]}" alt="${internship.imageURL} icon">
                                    </div>
                                    <div class="bg-icon">
                                        <img class="img-fluid" src="${internship.imageURL[1]}" alt="${internship.imageURL} icon">
                                    </div>
                                    <div class="service-content">
                                        <h5 class="service-title">${internship.title}</h5>
                                        <p>${internship.description}</p>
                                        <div class="service-links">
                                            <a class="btn-arrow" href="#"><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_923_135)">
                                                    <path d="M8.70801 0.959961L9.29825 2.7665C10.2512 5.68321 12.8308 7.77453 15.8928 8.1128C12.8468 8.37564 10.2578 10.4348 9.3276 13.3343L8.70801 15.2657" stroke="inherit" stroke-width="2"></path>
                                                    <path d="M15.7602 8.12158H0.1875" stroke="inherit" stroke-width="2"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_923_135">
                                                        <rect width="15.904" height="14.8437" fill="inherit" transform="translate(0.1875 0.578125)"></rect>
                                                    </clipPath>
                                                </defs>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    container.innerHTML += card;
                });
            }
            else {
                container.innerHTML += `
                <h2> No internships available </h2>
                `
            }
        } catch (error) {
            console.log("Error : ", error);
        }



    } catch (err) {
        alert(`Error : ${err}`);
    }
}