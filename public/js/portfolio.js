async function getPortfolio() {

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
                                                        <li><a href="#"><span>Apply</span><img src="images/svg/apply.svg"></a></li>
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