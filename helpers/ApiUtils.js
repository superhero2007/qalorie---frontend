var ApiUtils = {

  createHeader:function(){
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  },
  getMessage: function(errorCode){
    switch(errorCode){
      case 401:
        return "Wrong username or password";
        break;
      default:
        return "Unknown error";
    }
  },
  parseResponse : function(response){
    if (response.status === 200) {
      return response.json();
    } else {
      let error = new Error();
      error.response = "Wrong username or password";
      throw error;
    }
  },
  login:function(email, password) {
    return fetch('http://localhost:3000/api/v1/auth/local', {
      method: 'POST',
      headers: this.createHeader(),
      body: JSON.stringify({
        email:email,
        password:password
      })
    }).then(this.parseResponse);
  },
  signup:function(name, email, password) {
    return fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: this.createHeader(),
      body: JSON.stringify({
        first_name: name,
        last_name: name,
        password: password,
        email: email
      })
    });
  },
  info:function(token, id, body) {
    let headers = this.createHeader()
    headers.Authorization = "Bearer " + token
    return fetch('http://localhost:3000/api/v1/users/' + id, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    });
  },
  patient:function(token, id, body) {
    let headers = this.createHeader()
    headers.Authorization = "Bearer " + token
    return fetch('http://localhost:3000/api/v1/patient_preferences/' + id, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body)
    });
  },
  resetpassword:function(email) {
    return fetch('http://localhost:3000/api/v1/recovery/password', {
      method: 'POST',
      headers: this.createHeader(),
      body: JSON.stringify({
        email_user:email
      })
    });
  },
  getUser:function(id, token) {
    let headers = this.createHeader()
    headers.Authorization = "Bearer " + token
    return fetch('http://localhost:3000/api/v1/users/' + id, {
      method: 'GET',
      headers: headers
    });
  }
};

module.exports = ApiUtils;
