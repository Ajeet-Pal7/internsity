// const { response, response } = require("express");


async function register() {
    // const inputtedFile = document.getElementById('resume');
    // if (inputtedFile.files.length === 0) {
    //     alert('upload resume');
    //     return;
    // }
    // const uploadedResume = inputtedFile.files[0];
    // alert(uploadedResume);
    const user = {
        id: "",
        profilePhoto: "",
        personalInfo: {
            fullName: document.getElementById('fullName').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            gender: document.querySelector('input[name="gender"]:checked')?.id || "",
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            password: '',
        },
        matriculationDetails: {
            matrixSchoolName: '',
            matrixBoard: '',
            matrixPercentage: '',
            matrixPassingYear: '',
        },
        intermediateDetails: {
            interSchoolName: '',
            interBoard: '',
            stream: '',
            interPercentage: '',
            interPassingYear: '',
        },
        graduationDetails: {
            collegeName: '',
            university: '',
            course: '',
            graduationPercentage: '',
            yearOfCompletion: '',
        },
        professionalInfo: {
            currentStatus: '',
            objective: '',
        },
        skills: {
            technicalSkills: '',
            softSkills: '',
        },
        hobbiesAndInterests: {
            personalInterest: '',
            extracurricularActivities: '',
        },
        achievementsAndAwards: {
            academicAchievements: '',
            extracurricularAwards: '',
            competitionsParticipated: '',
        },
        projects: {
            projectTitle: '',
            technologiesUsed: '',
            roleInProject: '',
            projectDescription: '',
            outcomeOfProject: '',
        },
        certifications: {
            certificationNames: '',
            issuingAuthority: '',
            dateOfCompletion: '',
        },
        isEmailVerified: false,
        agreeWithTermsAndConditions: document.getElementById('agreeWithTermsAndConditions').checked,
        allowMSGOnWhatsApp: document.getElementById('allowMSGOnWhatsApp').checked,
    };

    if(!user.agreeWithTermsAndConditions){
        alert("Please agree with terms & conditions to continue");
        return
    }

    if (!user.personalInfo.fullName || !user.personalInfo.dateOfBirth || !user.personalInfo.gender || !user.personalInfo.phone || !user.personalInfo.email || !user.personalInfo.address) {
        alert("Please fill all the required details...");
        return
    }



    try {
        // Sending data to the server
        const response = await fetch("https://internsity-production.up.railway.app/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.error || 'An error ocurred!');
            throw new Error(error.error || 'Failed to Register');
        }

        const data = await response.json();
        if (data) {
            localStorage.setItem('authToken', JSON.stringify(data.token));
            localStorage.setItem('user', JSON.stringify(data.user));
            alert('User Registered successfully');
            console.log(JSON.stringify(data));
            window.location.href = '/pages/profile';
        }

    } catch (error) {
        console.error('Error: ', error);
        alert("Failed to submit the form. Please try again.");
    }
}
