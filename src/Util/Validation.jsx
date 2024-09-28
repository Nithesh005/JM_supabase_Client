
const errors = {};
const V_mail = (Entered_mail) => {
    if (!Entered_mail || Entered_mail == null || Entered_mail == "") {
        errors.mail = "Email can't be empty";
        return errors;
    }
    const mail_re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!mail_re.test(Entered_mail)) {
        errors.mail = "Invalid email address";
    } 
    else {
        errors.mail = null;
    }
    return errors;
}
const V_name = (Entered_name) => {
    if (!Entered_name || Entered_name == null || Entered_name == "") {
        errors.name = "Name can't be empty";
        return errors;
    }
    const name_re = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    if (!name_re.test(Entered_name)) {
        errors.name = "Invalid Name Format";
    } 
    else {
        errors.name = null;
    }
    return errors;
}

//project name
const V_Project_name = (Project_name) => {
    if (!Project_name || Project_name == null || Project_name == "") {
        errors.Projet_name = "Project Name can't be empty";
        return errors;
    }
    const name_re = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    if (!name_re.test(Project_name)) {
        errors.Projet_name = "Invalid Project Name Format";
    } 
    else {
        errors.Projet_name = null;
    }
    return errors;
}
//Client name
const V__Client_name = (Client_name) => {
    if (!Client_name || Client_name == null || Client_name == "") {
        errors.Client_name = "Client Name can't be empty";
        return errors;
    }
    const name_re = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    if (!name_re.test(Client_name)) {
        errors.Client_name = "Invalid Client Name Format";
    } 
    else {
        errors.Client_name = null;
    }
    return errors;
}
//location
const V__location = (V_CF_location) => {
    if (!V_CF_location || V_CF_location == null || V_CF_location == "") {
        errors.V_CF_location = "Location can't be empty";
        return errors;
    }
    const name_re = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
    if (!name_re.test(V_CF_location)) {
        errors.V_CF_location = "Invalid Location Format";
    } 
    else {
        errors.V_CF_location = null;
    }
    return errors;
}
//Assigned to
const V__assign = (V_GL_assign) => {
    if (!V_GL_assign || V_GL_assign == null || V_GL_assign == "") {
        errors.V_GL_assign = "Assigned Field can't be empty";
        return errors;
    }

    return errors;
}

//phone number
const V_phoneNumber = (Entered_name) => {
    if (!Entered_name || Entered_name == null || Entered_name == "") {
        errors.phoneNumber = "Mobile Number can't be empty";
        return errors;
    }
    const name_re = /^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
    if (!name_re.test(Entered_name)) {
        errors.phoneNumber = "Invalid Mobile Number";
    } 
    else {
        errors.phoneNumber = null;
    }
    return errors;
}

//Outlet count
const V_Outlet = (V_Outlet_Count) => {
    if (!V_Outlet_Count || V_Outlet_Count == null || V_Outlet_Count == "") {
        errors.V_Outlet_Count = "Outlet Cont can't be empty";
        return errors;
    }
    const name_re = /^\d*$/;
    if (!name_re.test(V_Outlet_Count)) {
        errors.V_Outlet_Count = "Invalid Outlet Count";
    } 
    else {
        errors.V_Outlet_Count = null;
    }

    return errors;
}


const V_message = (Entered_name) => {
    console.log(Entered_name);
    if (!Entered_name || Entered_name == null || Entered_name == "") {
        errors.message = "Message can't be empty";
        return errors;
    }
    const name_re = /^.{3,200}$/;
    if (!name_re.test(Entered_name)) {
        errors.message = "Min 3 characters should be there and max 200 characters";
    } 
    else {
        errors.message = null;
    }
    return errors;
}


const V_Form = (formdata) => {
    V_name(formdata.full_name);
    V_mail(formdata.e_mail);
    V_phoneNumber(formdata.phone_number);
    V_message(formdata.message);
    return errors;
}
const Create_Job_Form = (jobstate) => {
    // console.log(jobstate);
    V_Project_name(jobstate.projectname);
    V__Client_name(jobstate.clietname);
    V_name(jobstate.cename);
    V_phoneNumber(jobstate.ce_number);
    V__location(jobstate.location);
    V_Outlet(jobstate.no_outlets);
    V__assign(jobstate.assignto);
    V_message(jobstate.aboutjob);
    return errors;
}




const V_password = () => {
    alert("validate password");
}
export { V_Form, V_mail, V_name,V_phoneNumber,V_message,V_Project_name,V__Client_name,V__location,V_Outlet,V__assign,Create_Job_Form, errors }