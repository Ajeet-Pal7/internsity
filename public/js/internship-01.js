function isLoggedIn() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (user) {
        console.log(user);

    } else window.location.href = 'login';
}

function dbaInternship() {
    isLoggedIn();
    const category = window.location.search;
    console.log("Category : ", category);
    alert(`Category : ${category}`)
    internship = `
        <div class="find-job-item">
            <div class="job-title">
                <h4 class="awards-name">Web Development</h4>
            </div>
            <div class="job-details">
                <div class="job-image">
                    <img class="img-fluid" src="images/jobs/01.jpg" alt="" />
                </div>
                <div class="job-content">
                    <div class="job-time">Part Time</div>
                    <div class="job-location">Location : <span>Remote</span></div>
                    <div class="job-desc">
                        <p>
                            HTML, CSS, JavaScript, and responsive design principles.
                            <br>
                            Work with React, Angular, or Vue.js.
                            <br>
                            Work with peers to understand teamwork in project scenarios.
                        </p>
                    </div>
                    <div class="job-info">
                        <div class="info-item info-experience">Experience : <span>Fresher</span></div>
                        <div class="info-item info-salary">Salary : <span>$0</span></div>
                        <div class="info-item info-deadline">Deadline : <span>31/Jan/2025</span></div>

                    </div>
                </div>
                <div class="job-action">
                    <a class="btn btn-effect" href="#">
                        <span>Apply Now</span>
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_59_253)">
                                <path
                                    d="M19.4854 11.4293L17.0513 12.221C13.1214 13.4993 10.3036 16.9595 9.84784 21.0668C9.49371 16.981 6.71926 13.5081 2.81255 12.2604L0.210283 11.4293"
                                    stroke="white" stroke-width="2" />
                                <path d="M9.83594 20.8889L9.83594 0" stroke="white" stroke-width="2" />
                            </g>
                            <defs>
                                <clipPath id="clip0_59_253">
                                    <rect width="21.3333" height="20" fill="white"
                                      transform="translate(20) rotate(90)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `

}

async function getInternships() {
    try {
        const param = new URLSearchParams(window.location.search)
        const category = param.get('category') || "Featured internships"

        try {
            const response = await fetch(`http://localhost:3000/internships/data?category=${category}`);

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
                                <div class="find-job-item">
                                    <div class="job-title">
                                        <h4 class="awards-name">${internship.title}</h4>
                                    </div>
                                    <div class="job-details">
                                        <div class="job-image"><img class="img-fluid" src="${internship.imageURL}" alt="" /></div>
                                        <div class="job-content">
                                            <div class="job-time">${internship.type}</div>
                                            <div class="job-location">Location : <span>${internship.location}</span></div>
                                            <div class="job-desc">
                                                ${internship.description}
                                            </div>
                                            <div class="job-info">
                                                <div class="info-item info-experience">Experience : <span>${internship.experience} </span></div>
                                                <div class="info-item info-salary">Salary : <span>$${internship.salary} </span></div>
                                                <div class="info-item info-deadline">Deadline : <span>${internship.deadline} </span></div>

                                            </div>
                                        </div>
                                        <div class="job-action">
                                            <a class="btn btn-effect" href="#">
                                                <span>Apply Now</span>
                                                <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_59_253)">
                                                      <path
                                                        d="M19.4854 11.4293L17.0513 12.221C13.1214 13.4993 10.3036 16.9595 9.84784 21.0668C9.49371 16.981 6.71926 13.5081 2.81255 12.2604L0.210283 11.4293"
                                                        stroke="white" stroke-width="2" />
                                                      <path d="M9.83594 20.8889L9.83594 0" stroke="white" stroke-width="2" />
                                                    </g>
                                                    <defs>
                                                      <clipPath id="clip0_59_253">
                                                        <rect width="21.3333" height="20" fill="white" transform="translate(20) rotate(90)" />
                                                      </clipPath>
                                                    </defs>
                                                </svg>
                                            </a>
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


        // if (category === 'featured') {
        //     let container = document.getElementById('container');
        //     const internship = {
        //         id: "internshp001",
        //         title: "Web Development Dynamic",
        //         date: Date.now(),
        //         type: "Part Time",
        //         location: "Remote",
        //         experience: "Fresher",
        //         salary: 0,
        //         deadline: "04/02/2025",
        //         imageURL: "/images/jobs/01.jpg",
        //         description: `<p>
        //                     HTML, CSS, JavaScript, and responsive design principles.
        //                     <br>
        //                     Work with React, Angular, or Vue.js.
        //                     <br>
        //                     Work with peers to understand teamwork in project scenarios.
        //                     </p>`,
        //         status: "applied",
        //         category: "development"
        //     }
        //     let item = `
        //     <div class="find-job-item">
        //         <div class="job-title">
        //             <h4 class="awards-name">${internship.title}</h4>
        //         </div>
        //         <div class="job-details">
        //             <div class="job-image"><img class="img-fluid" src="${internship.imageURL}" alt="" /></div>
        //             <div class="job-content">
        //                 <div class="job-time">${internship.type}</div>
        //                 <div class="job-location">Location : <span>${internship.location}</span></div>
        //                 <div class="job-desc">
        //                     ${internship.description}
        //                 </div>
        //                 <div class="job-info">
        //                     <div class="info-item info-experience">Experience : <span>${internship.experience} </span></div>
        //                     <div class="info-item info-salary">Salary : <span>$${internship.salary} </span></div>
        //                     <div class="info-item info-deadline">Deadline : <span>${internship.deadline} </span></div>

        //                 </div>
        //             </div>
        //             <div class="job-action">
        //                 <a class="btn btn-effect" href="#">
        //                     <span>Apply Now</span>
        //                     <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                         <g clip-path="url(#clip0_59_253)">
        //                           <path
        //                             d="M19.4854 11.4293L17.0513 12.221C13.1214 13.4993 10.3036 16.9595 9.84784 21.0668C9.49371 16.981 6.71926 13.5081 2.81255 12.2604L0.210283 11.4293"
        //                             stroke="white" stroke-width="2" />
        //                           <path d="M9.83594 20.8889L9.83594 0" stroke="white" stroke-width="2" />
        //                         </g>
        //                         <defs>
        //                           <clipPath id="clip0_59_253">
        //                             <rect width="21.3333" height="20" fill="white" transform="translate(20) rotate(90)" />
        //                           </clipPath>
        //                         </defs>
        //                     </svg>
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        //     `;
        //     container.innerHTML += item;
        // }

    } catch (err) {
        alert(`Error : ${err}`);
    }
}