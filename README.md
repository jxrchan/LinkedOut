![LinkedOut](https://github.com/jxrchan/LinkedOut/assets/169599607/30a196d2-7168-48a5-8c48-24bc4dc63bdc)
<h1 align="center">LinkedOut Job Portal</h1>

# OverView
Linkedout is a job portal application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). Our Project is designed to bridge the gap between job seekers and employers, providing a seemless experience for both parties. Job Seekers can apply for job directly through the platforms and check which which job they have already applied for. Employers can post, update,remove job listings, view applicants and their resumes.

For project planning and progress, visit our public board [here](https://trello.com/b/jukg9IGY/project-3)

# Features
## Login And Register

<img width="1419" alt="Screenshot 2024-07-10 at 11 15 54 AM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/421b4584-834c-43f1-ad91-8b4fe8164a01">
This is our main page. If you don't have an account, you can sign up first by clicking "Register" button.

<img width="1419" alt="Screenshot 2024-07-10 at 11 22 09 AM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/e0a92c0a-bde1-4718-9ef5-1c71f59263e1">
Here, you can select your role !

<img width="1437" alt="Screenshot 2024-07-10 at 11 11 59 AM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/31dd2cf7-16fe-4aa1-a295-dfbd07a99cf4">
Emma chooses her role as a Job Seeker, fills in her email, and click "Register" button.

<img width="821" alt="Screenshot 2024-07-10 at 11 15 08 AM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/13c6c7e1-ca9e-4495-9d31-949ae69d3e92">

There will be a pop up box coming down which asks for password, name and description about yourself. You have completed your registration by clicking "Register" button again. Then, you can click "Login Now!" to go back to Log in Page which is the first image that we show you before.

## Job Seeker's Dashboard
<img width="1347" alt="Screenshot 2024-07-10 at 4 42 56 PM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/7e8ad22e-c429-4d37-b74b-9f63444cdd16">

After logging in as a ***Job Seeker***, for example, you can see ***John Doe***'s Dashboard. There is a list of jobs posted by different companies. 
When a job seeker finds a job they're interested in, they click on the "Apply" button associated with that job listing. Grey colour "Apply" button is the job you have already applied.

<img width="843" alt="Screenshot 2024-07-10 at 4 42 27 PM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/75b937b8-cd2e-40e9-81ee-8977fa855ece">

Clicking "Apply" button shows a pop-up Box, displaying detailed information such as 
* ***Job Title***: job position you are going to apply for.
* ***Job Description***: Provides a clear description of the job role and responsibilities.
* ***Employer's Name***: Name of the company or employer offering the job.
* ***About Employer***: Offers a brief introduction of the employer.
* ***Resume Submission box***: Job Seeker fills out their related work experience, education, name, and contact.
 Then, you can just click "Submit Resume" to submit your resume to a company or "Cancel" if you want to go back to your Dashboard.


## Employer's Dashboard
<img width="951" alt="Screenshot 2024-07-10 at 4 37 51 PM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/9b2c6ed1-9972-4fdc-8fb3-86b1e807a7ea">

<img width="958" alt="Screenshot 2024-07-10 at 4 39 38 PM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/c573cf4f-bd7e-4f77-a9f8-5cbfffb03375">

You can also register and log in as a ***Employer***. This is ***General Disassembly***'s Dashboard.

***Post a Job***:Employers can create new job postings by filling in details such as job position and job description and any other relevant details about the position.

***Active Job Listings***: Shows all current job postings that are actively receiving applications.
* Number of Applicants: Indicates how many candidates have applied for each job.
* Update: Allows employers to edit the job posting details.
* Delete: Enables employers to completely remove a job posting immediately.
* Remove: Terminates the job posting so that it is no longer active and stops accepting new applicants.

***Terminated Job Listings***: Displays job postings that have been terminated or removed by the employer. This section helps employers keep track of past postings.

<img width="1243" alt="Screenshot 2024-07-10 at 4 48 36 PM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/5d586d97-9e00-40b6-8311-8b5a4d6debd9">

Clicking "Update" button shows this image where you can edit job position and description.

<img width="698" alt="Screenshot 2024-07-10 at 4 45 53 PM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/45b8ed66-8279-4e13-9954-008ad570e1b1">

Clicking "see applicants" shows this image where you can see the name of applicants. There you can click applicant's name, for example, "John Doe" to see his resume.

<img width="1382" alt="Screenshot 2024-07-10 at 4 40 32 PM" src="https://github.com/jxrchan/LinkedOut/assets/169599607/38718eb2-d967-4282-979f-6a29bd9eef62">

This is John Doe's resume. You can scroll up and down to see full resume and click "cancel" button to go back to the image before.


# Technologies Used
* React.js
* Node.js
* Express.js
* MongoDB
* JWT (JSON Web Tokens)


# Next Steps
* Receiving notifications about new job postings that match Job Seeker's criteria.
* Create and edit Job Seeker's profile with personal details, skills, experiences, and education.
* Search for jobs easily using filters such as location, industry, job title, experience level, and salary range.
* Create and manage the company profile, showcasing company culture and benefits.

***.env***

Backend

```
PORT=

DATABASE=

ACCESS_SECRET=

REFRESH_SECRET=
```

Frontend
```
VITE_SERVER=http://localhost:5002
```


