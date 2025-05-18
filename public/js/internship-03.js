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

        const now = new Date(Date.now());
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];

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
                    let card = `
                                <div class="blog-post-wrapper blog-style-1">
                                    <div class="blog-post-info">
                                        <div class="post-meta">
                                              <div class="post-meta-date"><span id="start-date">${internship.deadline}</span> - <span id="end-date">${internship.endedAt}</span></div>
                                        </div>
                                        <h5 class="post-title"><a href="projects.html">${internship.title}</a></h5>
                                    </div>
                                    <div class="blog-post-img"><img class="img-fluid" src="${internship.imageURL}" alt="" /></div>
                                    <div class="blog-action-info">
                                        <h5 class="post-category"><a href="profile.html">${internship.skills[0]}</a></h5>
                                        <div class="post-link">
                                            <a class="btn-arrow" href="projects.html">
                                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
                                                  xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_923_144)">
                                                        <path d="M8.70801 0.959961L9.29825 2.7665C10.2512 5.68321 12.8308 7.77453 15.8928 8.1128C12.8468 8.37564 10.2578 10.4348 9.3276 13.3343L8.70801 15.2657"
                                                            stroke="inherit" stroke-width="2" />
                                                        <path d="M15.7602 8.12158H0.1875" stroke="inherit" stroke-width="2" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_923_144">
                                                          <rect width="15.904" height="14.8437" fill="inherit"
                                                            transform="translate(0.1875 0.578125)" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                `

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
        //         id:"internshp001",
        //         title:"Web Development Dynamic",
        //         date:`${monthNames[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
        //         skills:["Frontend&nbsp;Development"],
        //         type:"Part Time",
        //         location:"Remote",
        //         experience:"Fresher",
        //         salary:0,
        //         deadline:"04/02/2025",
        //         imageURL:"/images/jobs/01.jpg",
        //         description:`<p>
        //                     HTML, CSS, JavaScript, and responsive design principles.
        //                     <br>
        //                     Work with React, Angular, or Vue.js.
        //                     <br>
        //                     Work with peers to understand teamwork in project scenarios.
        //                     </p>`,
        //         status:"applied",
        //         category:"development"
        //     }
        //     let item = `
        //     <div class="blog-post-wrapper blog-style-1">
        //         <div class="blog-post-info">
        //             <div class="post-meta">
        //                   <div class="post-meta-date"><span id="start-date">${internship.date}</span> - <span id="end-date">Apr 12, 2025</span></div>
        //             </div>
        //             <h5 class="post-title"><a href="projects.html">${internship.title}</a></h5>
        //         </div>
        //         <div class="blog-post-img"><img class="img-fluid" src="${internship.imageURL}" alt="" /></div>
        //         <div class="blog-action-info">
        //             <h5 class="post-category"><a href="profile.html">${internship.skills[0]}</a></h5>
        //             <div class="post-link">
        //                 <a class="btn-arrow" href="projects.html">
        //                     <svg width="17" height="16" viewBox="0 0 17 16" fill="none"
        //                       xmlns="http://www.w3.org/2000/svg">
        //                         <g clip-path="url(#clip0_923_144)">
        //                             <path d="M8.70801 0.959961L9.29825 2.7665C10.2512 5.68321 12.8308 7.77453 15.8928 8.1128C12.8468 8.37564 10.2578 10.4348 9.3276 13.3343L8.70801 15.2657"
        //                                 stroke="inherit" stroke-width="2" />
        //                             <path d="M15.7602 8.12158H0.1875" stroke="inherit" stroke-width="2" />
        //                         </g>
        //                         <defs>
        //                             <clipPath id="clip0_923_144">
        //                               <rect width="15.904" height="14.8437" fill="inherit"
        //                                 transform="translate(0.1875 0.578125)" />
        //                             </clipPath>
        //                         </defs>
        //                     </svg>
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        //     `
        //     container.innerHTML += item;
        // }

    } catch (err) {
        alert(`Error : ${err}`);
    }
}