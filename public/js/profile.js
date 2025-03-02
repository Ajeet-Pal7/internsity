
async function getData() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = '/auth/login'
    }
    const response = await fetch("https://internsity-production.up.railway.app/profile/getProfile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: user,
    });

    if (!response.ok) {
        const err = await response.json();
        console.log("Error : ", err);
        alert("Something went wrong");

    }
    const data = await response.json();
    if (!data) {
        alert("Session expired please login...")
        window.location.href = 'login'
    }
    return data;
}
async function setData() {
    const data = await getData();
    if (data) {
        // personalInfo
        if (data.personalInfo.fullName) document.getElementById('fullName').value = data.personalInfo.fullName;
        if (data.personalInfo.dateOfBirth) document.getElementById('dateOfBirth').value = data.personalInfo.dateOfBirth;
        if (data.personalInfo.phone) document.getElementById('phone').value = data.personalInfo.phone;
        if (data.personalInfo.email) document.getElementById('email').value = data.personalInfo.email;
        if (data.personalInfo.address) document.getElementById('address').value = data.personalInfo.address;

        // Matriculation Details
        if (data.matriculationDetails.matrixSchoolName) document.getElementById('matrixSchoolName').value = data.matriculationDetails.matrixSchoolName;
        if (data.matriculationDetails.matrixBoard) document.getElementById('matrixBoard').value = data.matriculationDetails.matrixBoard;
        if (data.matriculationDetails.matrixPercentage) document.getElementById('matrixPercentage').value = data.matriculationDetails.matrixPercentage;
        if (data.matriculationDetails.matrixPassingYear) document.getElementById('matrixPassingYear').value = data.matriculationDetails.matrixPassingYear;

        // Intermediate Details
        if (data.intermediateDetails.interSchoolName) document.getElementById('interSchoolName').value = data.intermediateDetails.interSchoolName;
        if (data.intermediateDetails.stream) document.getElementById('stream').value = data.intermediateDetails.stream;
        if (data.intermediateDetails.interBoard) document.getElementById('interBoard').value = data.intermediateDetails.interBoard;
        if (data.intermediateDetails.interPercentage) document.getElementById('interPercentage').value = data.intermediateDetails.interPercentage;
        if (data.intermediateDetails.interPassingYear) document.getElementById('interPassingYear').value = data.intermediateDetails.interPassingYear;

        // Graduation Details
        if (data.graduationDetails.collegeName) document.getElementById('collegeName').value = data.graduationDetails.collegeName;
        if (data.graduationDetails.university) document.getElementById('university').value = data.graduationDetails.university;
        if (data.graduationDetails.course) document.getElementById('course').value = data.graduationDetails.course;
        if (data.graduationDetails.graduationPercentage) document.getElementById('graduationPercentage').value = data.graduationDetails.graduationPercentage;
        if (data.graduationDetails.yearOfCompletion) document.getElementById('yearOfCompletion').value = data.graduationDetails.yearOfCompletion;

        // Professional Information
        if (data.professionalInfo.currentStatus) document.getElementById('currentStatus').value = data.professionalInfo.currentStatus;
        if (data.professionalInfo.objective) document.getElementById('objective').value = data.professionalInfo.objective;

        // Skills 
        if (data.skills.technicalSkills) document.getElementById('technicalSkills').value = data.skills.technicalSkills;
        if (data.skills.softSkills) document.getElementById('softSkills').value = data.skills.softSkills;

        // Hobbies and Interests
        if (data.hobbiesAndInterests.personalInterest) document.getElementById('personalInterest').value = data.hobbiesAndInterests.personalInterest;
        if (data.hobbiesAndInterests.extracurricularActivities) document.getElementById('extracurricularActivities').value = data.hobbiesAndInterests.extracurricularActivities;

        // Achievements and Awards  
        if (data.achievementsAndAwards.academicAchievements) document.getElementById('academicAchievements').value = data.achievementsAndAwards.academicAchievements;
        if (data.achievementsAndAwards.extracurricularAwards) document.getElementById('extracurricularAwards').value = data.achievementsAndAwards.extracurricularAwards;
        if (data.achievementsAndAwards.competionsParticipated) document.getElementById('competitionsParticipated').value = data.achievementsAndAwards.competionsParticipated;

        // Projects
        if (data.projects.projectTitle) document.getElementById('projectTitle').value = data.projects.projectTitle;
        if (data.projects.technologiesUsed) document.getElementById('technologiesUsed').value = data.projects.technologiesUsed;
        if (data.projects.roleInProject) document.getElementById('roleInProject').value = data.projects.roleInProject;
        if (data.projects.projectDescription) document.getElementById('projectDescription').value = data.projects.projectDescription;
        if (data.projects.outcomeOfProject) document.getElementById('outcomeOfProject').value = data.projects.outcomeOfProject;

        // Certifications
        if (data.certifications.certificationNames) document.getElementById('certificationNames').value = data.certifications.certificationNames;
        if (data.certifications.issuingAuthority) document.getElementById('issuingAuthority').value = data.certifications.issuingAuthority;
        if (data.certifications.dateOfCompletion) document.getElementById('dateOfCompletion').value = data.certifications.dateOfCompletion;

        // Other 
        document.getElementById('userName').innerText = `${data.personalInfo.fullName} (${data.id})`;
        const profilePictureElement = document.getElementById('profilePicture');
        if (data.profilePhoto) {
            profilePictureElement.src = data.profilePhoto; // Use base64 image
        } else {
            // Fallback for missing profile photo
            profilePictureElement.src =
                data.personalInfo.gender === "female"
                    ? "../images/avatar/avatar-female.png"
                    : "../images/avatar/avatar-male.png";
        }
        getProfilePicture(data.id);
    }

}
async function getProfilePicture(id) {
    try {
        const userId = { "id": id }
        const response = await fetch('https://internsity-production.up.railway.app/profile/getProfilePicture', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userId),
        });
        if (!response.ok) {
            alert('Could not get your image.');
            return;
        }

        // const responseData = await response.json();

        const blob = await response.blob();  // Convert response to blob
        const imageUrl = URL.createObjectURL(blob);  // Create a URL for the image
        const profileImage = document.getElementById('profilePicture');


        profileImage.src = imageUrl; // Update the image source

    } catch (err) {
        alert(err)
    }
}
async function updatePersonalInfo() {
    const personalInfo = {
        fullName: document.getElementById('fullName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
    }

    data = await getData();

    if (personalInfo.fullName === data.personalInfo.fullName && personalInfo.dateOfBirth === data.personalInfo.dateOfBirth && personalInfo.phone === data.personalInfo.phone && personalInfo.email === data.personalInfo.email && personalInfo.address === data.personalInfo.address) {
        alert("Can not update the same details");
        return
    }
    let phoneRegex = /^[0-9]{10}$/
    if(!phoneRegex.test(personalInfo.phone)){
        alert("Invalid phone number");
        return
    }

    if (personalInfo.email != data.personalInfo.email) {
        alert("Permission denied, Contact internsity to change your email");
        return
    }

    if (!personalInfo.fullName || !personalInfo.dateOfBirth || !personalInfo.phone || !personalInfo.email || !personalInfo.address) {
        alert("All the information in this section are required");
        return
    }
    const response = await fetch('https://internsity-production.up.railway.app/profile/updatePersonalInfo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(personalInfo),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);
}
async function updateMatriculationDetails() {
    data = await getData();
    const matriculationDetails = {
        email: data.personalInfo.email,
        matrixSchoolName: document.getElementById('matrixSchoolName').value,
        matrixBoard: document.getElementById('matrixBoard').value,
        matrixPercentage: document.getElementById('matrixPercentage').value,
        matrixPassingYear: document.getElementById('matrixPassingYear').value,
    }

    if (!matriculationDetails.matrixSchoolName || !matriculationDetails.matrixBoard || !matriculationDetails.matrixPercentage || !matriculationDetails.matrixPassingYear) {
        alert("All the information in this section are required");
        return
    }
    if (matriculationDetails.matrixSchoolName === data.matriculationDetails.matrixSchoolName && matriculationDetails.matrixBoard === data.matriculationDetails.matrixBoard && matriculationDetails.matrixPercentage === data.matriculationDetails.matrixPercentage && matriculationDetails.matrixPassingYear === data.matriculationDetails.matrixPassingYear) {
        alert("Can not update the same details");
        return
    }
    if (matriculationDetails.matrixPercentage > 100 || matriculationDetails.matrixPercentage < 33) {
        alert("Please type correct details!");
        return
    }
    const response = await fetch('https://internsity-production.up.railway.app/profile/updateMatriculationDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(matriculationDetails),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);
}
async function updateIntermediateDetails() {
    data = await getData();
    const intermediateDetails = {
        email: data.personalInfo.email,
        interSchoolName: document.getElementById('interSchoolName').value,
        interBoard: document.getElementById('interBoard').value,
        stream: document.getElementById('stream').value,
        interPercentage: document.getElementById('interPercentage').value,
        interPassingYear: document.getElementById('interPassingYear').value,
    }

    if (!intermediateDetails.interSchoolName || !intermediateDetails.interBoard || !intermediateDetails.stream || !intermediateDetails.stream || !intermediateDetails.interPercentage || !intermediateDetails.interPassingYear) {
        alert("All the information in this section are required");
        return
    }
    if (intermediateDetails.interSchoolName === data.intermediateDetails.interSchoolName && intermediateDetails.interBoard === data.intermediateDetails.interBoard && intermediateDetails.stream === data.intermediateDetails.stream && intermediateDetails.interPercentage === data.intermediateDetails.interPercentage && intermediateDetails.interPassingYear === data.intermediateDetails.interPassingYear) {
        alert("Can not update the same details");
        return
    }
    if (intermediateDetails.interPercentage > 100 || intermediateDetails.interPercentage < 33) {
        alert("Please type correct details!");
        return
    }
    const response = await fetch('https://internsity-production.up.railway.app/profile/updateIntermediateDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(intermediateDetails),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function updateGraduationDetails() {
    data = await getData();
    const graduationDetails = {
        email: data.personalInfo.email,
        collegeName: document.getElementById('collegeName').value,
        university: document.getElementById('university').value,
        course: document.getElementById('course').value,
        graduationPercentage: document.getElementById('graduationPercentage').value,
        yearOfCompletion: document.getElementById('yearOfCompletion').value,
    }

    if (!graduationDetails.collegeName || !graduationDetails.university || !graduationDetails.course || !graduationDetails.graduationPercentage || !graduationDetails.yearOfCompletion) {
        alert("All the information in this section are required");
        return
    }
    if (graduationDetails.collegeName === data.graduationDetails.collegeName && graduationDetails.university === data.graduationDetails.university && graduationDetails.course === data.graduationDetails.course && graduationDetails.graduationPercentage === data.graduationDetails.graduationPercentage && graduationDetails.yearOfCompletion === data.graduationDetails.yearOfCompletion) {
        alert("Can not update the same details");
        return
    }
    if (graduationDetails.graduationPercentage > 100 || graduationDetails.graduationPercentage < 33) {
        alert("Please type correct details!");
        return
    }
    const response = await fetch('https://internsity-production.up.railway.app/profile/updateGraduationDetails', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(graduationDetails),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function updateProfessionalInfo() {
    data = await getData();
    const professionalInfo = {
        email: data.personalInfo.email,
        currentStatus: document.getElementById('currentStatus').value,
        objective: document.getElementById('objective').value,
    }

    if (!professionalInfo.currentStatus || !professionalInfo.objective) {
        alert("All the information in this section are required");
        return
    }
    if (professionalInfo.currentStatus === data.professionalInfo.currentStatus && professionalInfo.objective === data.professionalInfo.objective) {
        alert("Can not update the same details");
        return
    }
    const response = await fetch('https://internsity-production.up.railway.app/profile/updateProfessionalInfo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(professionalInfo),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function updateSkills() {
    data = await getData();
    const skills = {
        email: data.personalInfo.email,
        technicalSkills: document.getElementById('technicalSkills').value,
        softSkills: document.getElementById('softSkills').value,
    }
    if (skills.technicalSkills === data.skills.technicalSkills && skills.softSkills === data.skills.softSkills) {
        alert("Can not update the same details");
        return
    }
    const response = await fetch('https://internsity-production.up.railway.app/profile/updateSkills', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(skills),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function updateHobbiesAndInterests() {
    data = await getData();
    const hobbiesAndInterests = {
        email: data.personalInfo.email,
        personalInterest: document.getElementById('personalInterest').value,
        extracurricularActivities: document.getElementById('extracurricularActivities').value,
    }
    if (hobbiesAndInterests.personalInterest === data.hobbiesAndInterests.personalInterest && hobbiesAndInterests.personalInterest === data.hobbiesAndInterests.personalInterest) {
        alert("Can not update the same details");
        return
    }
    const response = await fetch('https://internsity-production.up.railway.app/profile/updateHobbiesAndInterests', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hobbiesAndInterests),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function updateAchievementsAndAwards() {
    data = await getData();
    const achievementsAndAwards = {
        email: data.personalInfo.email,
        academicAchievements: document.getElementById('academicAchievements').value,
        extracurricularAwards: document.getElementById('extracurricularAwards').value,
        competionsParticipated: document.getElementById('competitionsParticipated').value,
    }
    if (achievementsAndAwards.academicAchievements === data.achievementsAndAwards.academicAchievements && achievementsAndAwards.extracurricularAwards === data.achievementsAndAwards.extracurricularAwards && achievementsAndAwards.competionsParticipated === data.achievementsAndAwards.competionsParticipated) {
        alert("Can not update the same details");
        return
    }
    const response = await fetch(https://internsity-production.up.railway.app/profile/updateAchievementsAndAwards', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(achievementsAndAwards),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function updateProjects() {
    data = await getData();
    const projects = {
        email: data.personalInfo.email,
        projectTitle: document.getElementById('projectTitle').value,
        technologiesUsed: document.getElementById('technologiesUsed').value,
        roleInProject: document.getElementById('roleInProject').value,
        projectDescription: document.getElementById('projectDescription').value,
        outcomeOfProject: document.getElementById('outcomeOfProject').value,
    }

    if (projects.projectTitle)
        if (!projects.technologiesUsed || !projects.roleInProject || !projects.projectDescription || !projects.outcomeOfProject) {
            alert("All fields are required while mentioning Project");
            return
        }
    if (projects.projectTitle === data.projects.projectTitle && projects.technologiesUsed === data.projects.technologiesUsed && projects.roleInProject === data.projects.roleInProject && projects.projectDescription === data.projects.projectDescription && projects.outcomeOfProject === data.projects.outcomeOfProject) {
        alert("Can not update the same details");
        return
    }
    const response = await fetch(https://internsity-production.up.railway.app/profile/updateProjects', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projects),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function updateCertifications() {
    data = await getData();
    const certifications = {
        email: data.personalInfo.email,
        certificationNames: document.getElementById('certificationNames').value,
        issuingAuthority: document.getElementById('issuingAuthority').value,
        dateOfCompletion: document.getElementById('dateOfCompletion').value,
    }
    if (certifications.certificationNames === data.certifications.certificationNames && certifications.issuingAuthority === data.certifications.issuingAuthority && certifications.dateOfCompletion === data.certifications.dateOfCompletion) {
        alert("Can not update the same details");
        return
    }
    const response = await fetch(https://internsity-production.up.railway.app/profile/updateCertifications', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(certifications),
    });
    if (!response.ok) {
        const err = response.json();
        alert("Error : ", err);
        console.log(err);
        return
    }
    data = await response.json();
    alert(data.msg);

}
async function changeProfilePicture() {
    try {
        const profileImage = document.getElementById('profilePicture');
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            const fileSizeKB = Math.round(file.size / 1024);

            if (fileSizeKB > 500) {
                alert("File too large. Max: 500KB.");
                return;
            } else if (fileSizeKB < 200) {
                alert("File too small. Min: 200KB.");
                return;
            }

            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();

                reader.onload = async (e) => {
                    const formData = new FormData();
                    const data = await getData(); // Ensure getData returns the required user data

                    if (!file.name.startsWith(data.id)) {
                        alert(`Please rename your file with ${data.id}`);
                        return
                    }
                    formData.append('profilePhoto', file);
                    formData.append('email', data.personalInfo.email);

                    const response = await fetch(https://internsity-production.up.railway.app/profile/updateProfilePicture', {
                        method: "POST",
                        body: formData,
                    });
                    if (!response.ok) {
                        alert('Could not upload your image.');
                        return;
                    }

                    const responseData = await response.json();

                    if (responseData) {
                        profileImage.src = e.target.result; // Update the image source
                        alert('Profile picture updated successfully!');
                    }
                };

                reader.readAsDataURL(file); // Read the file as a data URL
            } else {
                alert('Please select a valid image file.');
            }
        });

        fileInput.click();
    } catch (err) {
        console.error(err);
    }
}
