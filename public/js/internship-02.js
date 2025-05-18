function getUser() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (user) {
        return user;

    } else {
        alert("Please login!!!")
        window.location.href = '/auth/login';
    }
}

async function applyForInternship(internship) {
    const user = getUser();
    if (user) {
        alert(user)
        const applyFor = {
            id:user.id,
            email:user.email,
            appylingFor:internship.id
        };
        const response =await fetch(`https://internsity.in/internship/apply`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(applyFor)
        });
        if(!response.ok){
            alert("Failed to apply")
        }
        data = response.json();
        if(data){
            alert(data)
        }
    }
}
document.addEventListener("click", function (event) {
    if (event.target.closest(".apply-btn")) {
        let data = event.target.closest(".apply-btn").dataset.internship;
        let internship = JSON.parse(data);
        applyForInternship(internship);
    }
});
async function getInternships() {
    try {
        const param = new URLSearchParams(window.location.search)
        const category = param.get('category') || "Featured internships"

        try {
            const response = await fetch(`https://internsity.in/internships/data?category=${category}`);

            if (!response.ok) {
                alert("Failed to get Internships");
                return
            }

            const internships = await response.json();
            const container1 = document.getElementById("container-1");
            const container2 = document.getElementById("container-2");
            if (internships.length > 0) {
                internships.forEach((internship) => {
                    let card = `
                        <div class="team-item team-style-2">
                            <div class="team-img">
                                <img class="img-fluid" src="images/team/02.jpg" alt="">
                                    <div class="image-overlay"></div>
                                    <div class="team-social">
                                        <div class="share-icon">
                                            <img class="img-fluid" src="images/svg/apply.svg" alt="">
                                                <ul>
                                                    <li data-internship='${JSON.stringify(internship)}' class="apply-btn"><div><a href="#"><span>Apply</span><img src="images/svg/apply.svg"></a></div></li>
                                                    <li><a href="#"><span>Share&nbsp;on&nbsp;Linkedin</span><i class="fa-brands fa-linkedin-in"></i></a></li>
                                                    <li><a href="#"><span>Share&nbsp;on&nbsp;Facebook</span><i class="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><span>Share&nbsp;on&nbsp;WhatsApp</span><i class="fa-brands fa-whatsapp"></i></a></li>
                                                </ul>
                                        </div>
                                    </div>
                            </div>
                            <div class="team-info">
                                <a href="team-detail.html" class="team-title">${internship.title}</a>
                                <span class="team-destination">${internship.description}</span>
                            </div>
                        </div>
                        `;
                    if (internships.indexOf(internship) % 2 === 0)
                        container1.innerHTML += card;
                    else
                        container2.innerHTML += card;

                });
            }
            else {
                container1.innerHTML += `
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