import { useDispatch } from "react-redux";
// import { setCurrentStatus } from "../../app/features/appSlice";

import { setCurrentStatus } from "../app/features/appSlice";

var MAINDOMAIN = `https://37eb-102-69-208-230.in.ngrok.io`;

async function SignIn(Email, Password) {
  // window.alert('Registration failed');
  try {
    const response = await fetch(
     MAINDOMAIN+ `/api/devfinder/GetDeveloperProfile`,
      {
        method: "POST",
        body: JSON.stringify({ username: Email, password: Password }),
      }
    );
    const result = await response.json();
    console.log("Result :", result);
    // localStorage.setItem('developerProfile', JSON.stringify(data.Data));
  } catch (error) {
    window.alert("New Error Right Here Player");
    console.log(error);
  }
}

//Update Image Function
async function UpdateImageAPI(ID, ImageString, Email) {
  let response = fetch(
    "https://0dc3-102-32-6-107.in.ngrok.io" +
      "/api/devfinder/GetDeveloperExperienceRedis",
    {
      method: "POST",
      body: JSON.stringify({
        developer_id: ID,
        imageUrl: ImageString,
        email_address: Email,
      }),
    }
  );
  response = await response.json();
  if (response.Status) {
    return response;
  } else {
    return null;
  }
}
//Fetch Experience Function
async function FetchExpeience(userName) {
  console.log("Inside Fetch", userName);
  fetch(MAINDOMAIN + `/api/devfinder/GetDeveloperExperienceRedis`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({ username: userName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.Status) {
        console.log(data.Message);
      } else {
        localStorage.setItem("developerExperience", JSON.stringify(data.Data));
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
//
//Fetch Experience Function
function AddExpeience(Id, Description, Title, Company, Start, End, Username) {
  debugger;
  fetch(MAINDOMAIN + `/api/devfinder/AddDeveloperExperience`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      _developer_id: Id,
      description: Description,
      title_name: Title,
      company: Company,
      start_date: Start,
      end_date: End,
      username: Username,
    }),
  }).catch((err) => {
    console.log(err.message);
  });
}
//Get Developer Education
async function FetchEducation(userName) {
  
  fetch(MAINDOMAIN + `/api/devfinder/GetDeveloperEducation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({ username: userName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.Status) {
        localStorage.setItem("developerEducation", JSON.stringify(data.Data));
      } else {
        localStorage.setItem("developerEducation", JSON.stringify(data.Data));
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
async function AddEducation(
  Id,
  UserName,
  Intsitution,
  Start_date,
  EndDate,
  Qualification_name,
  Qualification_type_
) {
  debugger;
  fetch(MAINDOMAIN + `/api/devfinder/AddEducation`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      _developer_id: Id,
      username: UserName,
      intsitution_: Intsitution,
      start_date_: Start_date,
      end_date_: EndDate,
      qualification_name_: Qualification_name,
      qualification_type: Qualification_type_,
    }),
  }).catch((err) => {
    console.log(err.message);
  });
}

//Fetch Resume Function
async function FetchResume(userName) {
  let response = await fetch(MAINDOMAIN + process.env.GETRESUME, {
    method: "GET",
    body: JSON.stringify({ username: userName }),
  });
  response = await response.json();
  if (response.Status) {
    return response;
  } else {
    return null;
  }
}
function AddResumeDesc(ID, Description) {
  debugger;
  fetch(MAINDOMAIN + `/api/devfinder/AddResumeDesc`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({ _developer_id: ID, short_desc: Description }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.Status) {
        alert(data.Message);
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
//
async function FetchResumeDesc(userName) {
  fetch(MAINDOMAIN + `/api/devfinder/GetDeveloperResumedesc`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({ username: userName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.Status) {
        alert(data.Message);
      } else {
        localStorage.setItem("developerResumeDesc", JSON.stringify(data.Data));
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
}
//Export All Methods
//Get Developer Education
async function FetchLinks(userName) {
  
  fetch(MAINDOMAIN + `/api/devfinder/GetDeveloperLinksRedis`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({ username: userName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.Status) {
        localStorage.removeItem('developerLinks');
        localStorage.setItem("developerLinks", JSON.stringify(data.Data));
      } 
    })
    .catch((err) => {
      console.log(err.message);
    });
}

//

async function AddLink(Id, Username, Link, LinkType) {
  let Status ;
  fetch(MAINDOMAIN + `/api/devfinder/AddResumeLink`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      _developer_id: Id,
      _link_type: LinkType,
      Link_: Link,
      username: Username,
    }),
  })
  .then((response) => response.json())
  .then(data => {
    Status = data.Status;
 })
.catch((err) => {
    console.log(err.message);
  });
  
}
//Update Link UpdateDeveloperLink
async function UpdateLink(Id, LinkId, Link, Username) {
  debugger
  fetch(MAINDOMAIN + `/api/devfinder/UpdateDeveloperLink`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      _developer_id: Id,
      link_id: LinkId,
      Link_: Link,
      username: Username,

    }),
  }).catch((err) => {
    alert(err.message);
  });
}
//DeleteDeveloperLink
async function DeleteLink(Id, LinkId, Username) {
  debugger
  fetch(MAINDOMAIN + `/api/devfinder/DeleteDeveloperLink`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: JSON.stringify({
      _developer_id: Id,
      link_id: LinkId,
      username: Username,

    }),
  }).catch((err) => {
    alert(err.message);
  });
}
export {
  SignIn,
  UpdateImageAPI,
  AddEducation,
  AddExpeience,
  FetchExpeience,
  FetchEducation,
  FetchResume,
  AddResumeDesc,
  FetchResumeDesc,
  FetchLinks,
  AddLink,
  UpdateLink,
  DeleteLink
};
