import React, {useState, useEffect, Component } from 'react';
import { Button, AppRegistry, Linking, View, Text, TouchableOpacity, Image, ImageBackground,TextInput,StyleSheet , Switch, SafeAreaView, ScrollView, Alert, FlatList} from 'react-native';
import firebase from 'firebase';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import TimerMixin from 'react-timer-mixin';
import { encrypt, decrypt } from 'react-native-simple-encryption';


export default class App extends React.Component {

   async componentDidMount() {
    this.getPermissionsAsync();
    this.ShowUserRequests();
    this.ShowUserSignUpRequests();
    this.ShowUserHistoryRequests();
    //setTimeout(this.firebaseAdminLoginKey(), 50000);
    this.timer = setInterval(()=> this.firebaseAdminLoginKey(), 86400000)
  }
  mixins: [TimerMixin]
  constructor(props) {
    super(props);
    const comments = [
      {reply: ''}]; 
    this.state = {
      username: '',
      password: '',
      adminusername: '',
      adminpassword: '',
      adminID: '',
      adminaccesspin: '',
      password2: '',
      employeeId: '',
      email: '',
      allRequests: '',
      actualpincode: '',
      ADusername: '',
      ADdoorId: '' ,
      ADemployeeId: '',
      keygen: '',
      allRequestedUsers: '',
      HistoryRequestedUsers: '',
      blockaccount: false,
      Loginshow: true,
      AdminLoginshow: false,
      Signupshow: false,
      qrscannershow: false,
      UserMenueshow: false,
      UserAuthorizationshow: false,
      UserUnlockshow: false,
      AdminMainPage: false,
      Adminshow: false,
      UserModification: false,
      AdminApproval: false,
      datatext: '',
      datatextpin: '',
      hasCameraPermission: null,
      scanned: false,
      comments: comments,
      switchValue: false,
      Userhistory: false,
    };
  }
  encryptvalue() {
    var aaa = encrypt('1356', 'Hello World');
    //var Receivedstatus2 = JSON.stringify(aaa);
    
 
  // decrypt('key','encrypted_data');
  var bbbb = decrypt('1546', "AwIGAg==");
  Alert.alert(bbbb);
  }
  _handleToggleSwitch = value => {
  this.setState({ switchValue: value });
  this.userhistoryComponent(); 
    };
 getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
UserLoginshowMessage = () =>{
  showMessage({
              message: "Welcome as User Mode",
              type: "success",
            });
}
AdminLoginshowMessage= () =>{
              showMessage({
              message: "Welcome as Admin Mode",
              type: "info",
            });
}
LoginfailshowMessage = () =>{
  showMessage({
              message: "Login Failed",
              type: "danger",
            });
}
LoginwarningshowMessage = () =>{
  showMessage({
              message: "Fill The Requeired Fields",
              type: "warning",
            });
}
KeyExistshowMessage = () =>{
  showMessage({
              message: "KEY ALREADY EXIST",
              type: "warning",
            });
}
successshowMessage = () =>{
  showMessage({
              message: "SUCCESS",
              type: "success",
            });
}
failedhowMessage = () =>{
  showMessage({
              message: "FAILED",
              type: "danger",
            });
}
passwordshowMessage = () =>{
  showMessage({
              message: "Password Does Not Match",
              type: "danger",
            });
}

blockComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: true });
      this.setState({ AdminApproval: false });
  };
  LoginComponent = () => {
      this.setState({ Loginshow: true });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  
  AdminLoginComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: true });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  SignupComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: true });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  qrscannerComponent = () => {
      if (this.state.qrscannershow == true) {
      this.setState({ qrscannershow: false });
    } else {
      this.setState({ qrscannershow: true });
    }
  };
  userhistoryComponent = () => {
      if (this.state.switchValue == false) {
      this.setState({ Userhistory: true });
    } else {
      this.setState({ Userhistory: false });
    }
  };
  UserMenueComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: true });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  UserAuthorizationComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: true });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  UserUnlockComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: true });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  AdminComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: true });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  AdminMainPageComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: true });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  UserModificationComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: true });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: false });
  };
  AdminApprovalComponent = () => {
      this.setState({ Loginshow: false });
      this.setState({ Signupshow: false });
      this.setState({ UserMenueshow: false });
      this.setState({ UserAuthorizationshow: false });
      this.setState({ UserUnlockshow: false });
      this.setState({ Adminshow: false });
      this.setState({ AdminLoginshow: false });
      this.setState({ AdminMainPage: false });
      this.setState({ UserModification: false });
      this.setState({ blockaccount: false });
      this.setState({ AdminApproval: true });
  };
  onLogin() {
  	const { username, password } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  	}
    firebase.database().ref('SignUpRequest'+'/'+`${username}`+'/'+'username').once('value', (data) => {
      var Receivedusername = JSON.stringify(data);
      firebase.database().ref('SignUpRequest'+'/'+`${username}`+'/'+'password').once('value', (data2) => {
      var Receivedpassword = JSON.stringify(data2);
      firebase.database().ref('SignUpRequest'+'/'+`${username}`+'/'+'status').on('value', (data3) => {
      var Receivedstatus = JSON.stringify(data3);
      
      if (Receivedusername == '"'+`${username}`+'"' && Receivedpassword == '"'+`${password}`+'"' && Receivedstatus == '"'+'ACTIVE'+'"')
      {
        this.UserLoginshowMessage();
        this.UserMenueComponent();
      } 
      if (Receivedstatus == '"'+'BLOCKED'+'"') 
      {
        this.blockComponent();
      } 
      if (`${username}` == '' && `${password}` == '') 
      {
        this.LoginwarningshowMessage();
      } 
      
    })

    })
    })
  }
  AdminonLogin() {
    const { adminusername, adminpassword , adminaccesspin} = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
    }
    firebase.database().ref('Admins'+'/'+`${adminusername}`+'/'+'username').once('value', (data) => {
      var Receivedusername = JSON.stringify(data);
      firebase.database().ref('Admins'+'/'+`${adminusername}`+'/'+'password').once('value', (data2) => {
      var Receivedpassword = JSON.stringify(data2);
      firebase.database().ref('AdminKey/key').once('value', (data) => {
      var adminpin = JSON.stringify(data);
      var cleanedstr = adminpin.replace(/[^a-zA-Z0-9-_@.,:=]+/g, '');
      var decryptedkey = decrypt('1234', cleanedstr);
      if (Receivedusername == '"'+`${adminusername}`+'"' && Receivedpassword == '"'+`${adminpassword}`+'"' && `${adminaccesspin}` == decryptedkey)
      {
        this.AdminLoginshowMessage();
        this.AdminMainPageComponent();
      } else {
        this.failedhowMessage();
      } 
       if (`${adminusername}` == '' && `${adminpassword}` == '') 
      {
        this.LoginwarningshowMessage();
      } 
      })
    })

    })
  }
  firebaseconn() {
    const { doorId, employeeId,username } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
  if (`${doorId}` != null) {
    firebase.database().ref('AccessRequest'+'/'+`${doorId}`+'/'+`${username}`).set(
    {
      unlockCode:'',
      ExpirationDate: '',
      doorId: `${doorId}`,
    });
    var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    var year = new Date().getFullYear();
    var hours = new Date().getHours(); 
    var min = new Date().getMinutes(); 
    var sec = new Date().getSeconds(); 
	let fulldate = date+':'+month+':'+year;
	let fulltime = hours+ ':'+min+':'+sec;
	var userinfo = 'DOOR ID: '+`${doorId}`+'   USER: '+`${username}`+'   DATE: '+fulldate;
    firebase.database().ref('Requests/').set(
    {
      FullData: userinfo,
    });
    firebase.database().ref('History'+'/'+`${fulldate}`+'/'+`${fulltime}`).set(
    {
      FullData: 'DOOR ID: '+`${doorId}`+'   USER: '+`${username}`,
    });
    this.successshowMessage();
} else {
  this.failedhowMessage();
}
}
firebasesignup() {    
    const { username, password, employeeId, email , password2 } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
  if (`${username}` != '' && `${password}` != '' && `${email}` != '' && `${password2}` != '' && `${employeeId}` != '' ) {
  	if (`${password}` == `${password2}`) {
      firebase.database().ref('SignUpRequest'+'/'+`${username}`+'/'+'username').once('value',(usernamedata) => {
      var userusername = JSON.stringify(usernamedata);
      var userusernameStr = userusername.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      if (userusernameStr != `${username}`) {
    firebase.database().ref('AdminApprovalPending'+'/'+`${username}`).set(
    {
      username: `${username}`,
    })
    var generatedkey= Math.floor(1000 + Math.random() * 9000);
    var FourDigitKey = JSON.stringify(generatedkey);
    firebase.database().ref('SignUpRequest'+'/'+`${username}`).set(
    {
      username: `${username}`,
      password: `${password}`,
      employeeId: `${employeeId}`,
      email : `${email}`,
      status: '',
      encryptionKey: `${FourDigitKey}`,
    }
    ).then(() => {
    this.successshowMessage();
  }).catch(() => {
    this.failedhowMessage();
  });
}else {
  this.failedhowMessage();
}
  })
} else {
	this.passwordshowMessage();
}
    } else {
      this.LoginwarningshowMessage();
    }
}
firebasedeleteuser() {    
    const { ADusername } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
  if (`${ADusername}` != '') {
   
    firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`).set(
    {
      
    }
    ).then(() => {
    this.successshowMessage();
  }).catch(() => {
    this.failedhowMessage();
  });

    }
} 
firebaseblockuser() {    
    const { ADusername } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
  if (`${ADusername}` != '') {
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'username').once('value',(usernamedata) => {
      var userusername = JSON.stringify(usernamedata);
      var userusernameString = userusername.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'email').once('value', (emaildata) => {
      var useremail = JSON.stringify(emaildata);
      var useremailString = useremail.replace(/[^a-zA-Z0-9-_@.]+/g, '');  
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'employeeId').once('value', (employeeIddata) => {
      var useremployeeId = JSON.stringify(employeeIddata);
      var useremployeeIdString = useremployeeId.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'password').once('value', (passworddata) => {
      var userpassword = JSON.stringify(passworddata);
      var userpasswordString = userpassword.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'encryptionKey').once('value', (keydata) => {
      var userkey = JSON.stringify(keydata);
      var userkeyString = userkey.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      
      
    firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`).set(
    {
      username: `${ADusername}`,
      password: `${userpasswordString}`,
      employeeId: `${useremployeeIdString}`,
      email : `${useremailString}`,
      status: 'BLOCKED',
      encryptionKey: `${userkeyString}`,
    }
    ).then(() => {
    this.successshowMessage();
  }).catch(() => {
    this.failedhowMessage();
  });
    })
    })
    })
    })
    })
    } 
}
firebaseunblockuser() {    
    const { ADusername } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
  if (`${ADusername}` != '') {      
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'email').once('value', (emaildata) => {
      var useremail = JSON.stringify(emaildata);
      var useremailString = useremail.replace(/[^a-zA-Z0-9-_@.]+/g, ''); 
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'employeeId').once('value', (employeeIddata) => {
      var useremployeeId = JSON.stringify(employeeIddata);
      var useremployeeIdString = useremployeeId.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'password').once('value', (passworddata) => {
      var userpassword = JSON.stringify(passworddata);
      var userpasswordString = userpassword.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'encryptionKey').once('value', (keydata) => {
      var userkey = JSON.stringify(keydata);
      var userkeyString = userkey.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      
    firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`).set(
    {
      username: `${ADusername}`,
      password: `${userpasswordString}`,
      employeeId: `${useremployeeIdString}`,
      email : `${useremailString}`,
      status: 'ACTIVE',
      encryptionKey: `${userkeyString}`,
    }
    ).then(() => {
    this.successshowMessage();
  }).catch(() => {
    this.failedhowMessage();
  });
    })
    })
    })
    })
    } 
}
firebaseuserinformation() {
const {ADusername} = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  	}
  	if (`${ADusername}` != '') {
  	  firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'email').once('value', (emaildata) => {
      var useremail = JSON.stringify(emaildata);
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'employeeId').once('value', (employeeIddata) => {
      var useremployeeId = JSON.stringify(employeeIddata);
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'password').once('value', (passworddata) => {
      var userpassword = JSON.stringify(passworddata);
      Alert.alert(
      "USER INFORMATION !",
      ` Email Address: ${useremail} \n Employee ID: ${useremployeeId} \n Password:  ${userpassword}`,
      [   
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    })
    })
    })
  }
}

firebaseuserauthcheck() {    
    const { username, doorId } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
    }
    firebase.database().ref('AccessRequest'+'/'+`${doorId}`+'/'+`${username}`+'/'+'doorId').on('value', (doordata) => {
      var ReceiveddoorData = JSON.stringify(doordata);
      var ReceiveddoorDataString = ReceiveddoorData.replace(/[^a-zA-Z0-9-_@.]+/g, ''); 
      firebase.database().ref('AccessRequest'+'/'+`${doorId}`+'/'+`${username}`+'/'+'EXPmonth').on('value', (expiredata) => {
      var ReceivedexpireData = JSON.stringify(expiredata);
      var expirestr = ReceivedexpireData.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      

    //var date = new Date().getDate(); 
    var month = new Date().getMonth() + 1; 
    //var year = new Date().getFullYear(); 
    //let fulldate = `${date}`+`${month}`+`${year}`;
    var fullmonthstring = JSON.stringify(month);
    //var datenow = '';
     // for (var i = 0; i < fulldatestring.length; i++) {
     // if (fulldatestring.charAt(i) == "1" || fulldatestring.charAt(i) == "2" || fulldatestring.charAt(i) == "3" || fulldatestring.charAt(i) == "4" || fulldatestring.charAt(i) == "5" || fulldatestring.charAt(i) == "6" || fulldatestring.charAt(i) == "7" || fulldatestring.charAt(i) == "8" || fulldatestring.charAt(i) == "9" || fulldatestring.charAt(i) == "0") 
       // {
       //   datenow += (fulldatestring.charAt(i));
      //  }
     // }
     
    if (expirestr != '' && expirestr <= fullmonthstring) {
    Alert.alert("Your unlock pin has been EXPIRED")
    firebase.database().ref('AccessRequest'+'/'+`${doorId}`+'/'+`${username}`).set(
    {
      unlockCode:"EXPIRED",
      ExpirationDate : "EXPIRED" ,
      doorId: `${ReceiveddoorDataString}`,
    });
    }
    firebase.database().ref('AccessRequest'+'/'+`${doorId}`+'/'+`${username}`+'/'+'doorId').on('value', (data) => {
      var ReceivedData = JSON.stringify(data);
      if (ReceivedData != "null") {
      this.setState({ datatext: ReceivedData });
    }
    })
    firebase.database().ref('AccessRequest'+'/'+`${doorId}`+'/'+`${username}`+'/'+'unlockCode').on('value', (data2) => {
      var generatedpin = JSON.stringify(data2);
      var passwordString = generatedpin.replace(/[^a-zA-Z0-9-_@.=]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${username}`+'/'+'encryptionKey').on('value', (encryptkey) => {
      var UserencryptkeyData = JSON.stringify(encryptkey);
      var userencryptkeyReceived = '';
      var userencryptkeyReceived = UserencryptkeyData.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      var decryptedkey = decrypt(userencryptkeyReceived, passwordString);    
      if (decryptedkey == "")
      {
        this.setState({ datatextpin: 'PENDING' });
      } else {
        this.setState({ datatextpin: decryptedkey});
      }
      
    })
      })
      })
    })

}
KeyGenerator() {
    const { ADdoorId, keygen, } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }  
  if (ADdoorId != '') {
    firebase.database().ref('DoorUnlockCode/'+`${ADdoorId}`).once('value', (completedata) => {
      var UserReceivedData = JSON.stringify(completedata);
      if (UserReceivedData == 'null') {
        var generatedkey= Math.floor(1000 + Math.random() * 9000);
    var FourDigitKey = JSON.stringify(generatedkey);
    this.setState({ keygen: FourDigitKey });
    firebase.database().ref('DoorUnlockCode'+'/'+`${ADdoorId}`).set(
    {
      unlockCode: `${FourDigitKey}`,
    });  
    this.successshowMessage();
   
  } else {
    firebase.database().ref('DoorUnlockCode'+'/'+`${ADdoorId}`+'/'+'unlockCode').once('value', (completedata) => {
      var UserData = JSON.stringify(completedata);
      var userpasswordReceived = '';
      var userpasswordReceived = UserData.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      
      this.setState({ keygen: userpasswordReceived });
    })
    this.KeyExistshowMessage();
  }
    })}  
}
ForceKeyGenerator() {
    const { ADdoorId, keygen, } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
  
  if (ADdoorId != '') {    
    var generatedkey= Math.floor(1000 + Math.random() * 9000);
    var FourDigitKey = JSON.stringify(generatedkey);
    this.setState({ keygen: FourDigitKey });
    firebase.database().ref('DoorUnlockCode'+'/'+`${ADdoorId}`).set(
    {
      unlockCode: FourDigitKey,
    });  
    this.successshowMessage();  
    }  
}

ShowUserRequests() {
  //const { username, doorId , employeeId, unlockCode } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
    firebase.database().ref('Requests'+'/'+'FullData').on('value', (userdata) => {
      var userfullReceivedData = JSON.stringify(userdata);
      if (userfullReceivedData != 'null') {
      	const {comments} = this.state;
      	comments.unshift({reply: userfullReceivedData});
      	this.setState({ comments: comments.slice(0)});
      }
    })  
}
UpdateShowUserRequests() {
    const { ADemployeeId, ADdoorId,ADusername, keygen } = this.state;
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
  if (`${ADdoorId}` != '') {
  	var date = new Date().getDate(); 
    var month = new Date().getMonth() + 2; 
    var year = new Date().getFullYear(); 
	let fulldate = date+'/'+month+'/'+year;
  firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'encryptionKey').once('value', (encryptkey) => {
      var UserencryptkeyData = JSON.stringify(encryptkey);
      var userencryptkeyReceived = '';
      var userencryptkeyReceived = UserencryptkeyData.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      var encryoteddata = encrypt(userencryptkeyReceived, keygen);
    firebase.database().ref('AccessRequest'+'/'+`${ADdoorId}`+'/'+`${ADusername}`).set(
    {
      unlockCode:encryoteddata,
      ExpirationDate : fulldate ,
      doorId: `${ADdoorId}`,
      EXPmonth: month,
    });
  })
    this.successshowMessage();
} else {
  this.failedhowMessage();
}
}
ShowUserSignUpRequests() {
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
    firebase.database().ref('AdminApprovalPending/').on('value', (usersdata) => {
      
      var userfullReceivedData = JSON.stringify(usersdata);
      if (userfullReceivedData == "null") 
      {
        this.setState({ allRequestedUsers: " NO RECENT REQUESTS "});
      } else {
      var cleanedstr = userfullReceivedData.replace(/[^a-zA-Z0-9-_@.,:""]+/g, '');
      var datastr = '';
      for (var i = 0; i < cleanedstr.length; i++) {

        if (cleanedstr.charAt(i) == ',') {
          datastr += '\n \n';
        } else {
          datastr += cleanedstr.charAt(i);
        }
        
      }
        const {allRequestedUsers} = this.state;
        this.setState({ allRequestedUsers: datastr});
      }
      
    })  
}
firebaserejectuser() {
  const { ADusername } = this.state;
  const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
    }
    firebase.database().ref('AdminApprovalPending'+'/'+`${ADusername}`).set(
    {
    })
    firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`).set(
    {
    }) 
}
firebaseApproveuser() {
  const { ADusername } = this.state;
  const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
    }
    if (`${ADusername}` != '') {
    firebase.database().ref('AdminApprovalPending'+'/'+`${ADusername}`).set(
    {
    })

     firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'email').once('value', (emaildata) => {
      var useremail = JSON.stringify(emaildata);
      var useremailString = useremail.replace(/[^a-zA-Z0-9-_@.]+/g, ''); 
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'employeeId').once('value', (employeeIddata) => {
      var useremployeeId = JSON.stringify(employeeIddata);
      var useremployeeIdString = useremployeeId.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'password').once('value', (passworddata) => {
      var userpassword = JSON.stringify(passworddata);
      var userpasswordString = userpassword.replace(/[^a-zA-Z0-9-_@.]+/g, '');
      firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`+'/'+'encryptionKey').once('value', (keydata) => {
      var userkey = JSON.stringify(keydata);
      var userkeyString = userkey.replace(/[^a-zA-Z0-9-_@.]+/g, '');

    firebase.database().ref('SignUpRequest'+'/'+`${ADusername}`).set(
    {
      username: `${ADusername}`,
      password: `${userpasswordString}`,
      employeeId: `${useremployeeIdString}`,
      email : `${useremailString}`,
      status: 'ACTIVE',
      encryptionKey: `${userkeyString}`,
    }
    ).then(() => {
    this.successshowMessage();
  }).catch(() => {
    this.failedhowMessage();
  });
    })
    })
    })
    })
    } 
}
ShowUserHistoryRequests() {
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }
    firebase.database().ref('History/').on('value', (usersdata2) => {
      
      var AlluserfullReceivedData = JSON.stringify(usersdata2);
      if (AlluserfullReceivedData != "null") {
      var cleanedstr = AlluserfullReceivedData.replace(/[^a-zA-Z0-9-_@.,:"" ]+/g, '');
      var datastr2 = '';
      for (var i = 0; i < cleanedstr.length; i++) {

        if (cleanedstr.charAt(i) == ',') {
          datastr2 += '\n \n';
        } else {
          datastr2 += cleanedstr.charAt(i);
        }
        
      }
        const {HistoryRequestedUsers} = this.state;
        this.setState({ HistoryRequestedUsers: datastr2});
      } else {
        this.setState({ HistoryRequestedUsers: "NO AVAILABLE HISTORY"});
      }
    })  
}
firebaseAdminLoginKey() {
  const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
    } 
    var hours = new Date().getHours();
    var hoursstr = JSON.stringify(hours); 
    var min = new Date().getMinutes();
    var minstr = JSON.stringify(min);
    //var sec = new Date().getSeconds();
    //var secstr = JSON.stringify(sec);
    //Alert.alert(hoursstr);
    var generatedkey2= Math.floor(1000 + Math.random() * 9000);
        var FourDigitKey2 = JSON.stringify(generatedkey2);  
    //if (hoursstr == "22" && minstr == "22") {  
        var dateexp = new Date().getDate() + 1; 
        var monthexp = new Date().getMonth() + 1; 
        var yearexp = new Date().getFullYear(); 
        let fullexpdate = dateexp+'/'+monthexp+'/'+yearexp;
        var encryptedkey2 = encrypt('1234', FourDigitKey2);
      firebase.database().ref('AdminKey/').set(
      {
        key: encryptedkey2,
        expirationtime: fullexpdate,
      })
    //}
}   

ShowAdminPinCode() {
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
  }

  firebase.database().ref('AdminEmployeeID/id').once('value', (data2) => {
    var adminid = JSON.stringify(data2);
    var adminidstr = adminid.replace(/[^a-zA-Z0-9-_@.,=]+/g, '');
    //Alert.alert(adminidstr);
    const {adminID} = this.state;
    if (adminidstr == adminID) {

    firebase.database().ref('AdminKey/key').on('value', (data) => {
      
      var adminpin = JSON.stringify(data);
      var cleanedstr = adminpin.replace(/[^a-zA-Z0-9-_@.,:= ]+/g, '');
      var decryptedkey = decrypt('1234', cleanedstr);
      
        Alert.alert(
      "Generated PIN CODE will be expired in 24 hours!!!",
      decryptedkey,
      [
        
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
      
    })
  }
    })  
}
firebaseclearhistory() {
    Alert.alert(
      "DELETE HISTORY !!!",
      "Are you sure you want to clear the history?",
      [
        {
          text: "CANCEL",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "YES", onPress: this.clearhistory.bind() }
      ],
      { cancelable: false }
    );
}
clearhistory() {
    const firebaseConfig = {
      apiKey: "AIzaSyB-EjVday5WlSlLukGWL5KuCMAIuHqA5hs",
      authDomain: "kinetic-abbey-249018.firebaseapp.com",
      databaseURL: "https://kinetic-abbey-249018.firebaseio.com",
      projectId: "kinetic-abbey-249018",
      storageBucket: "kinetic-abbey-249018.appspot.com",
      messagingSenderId: "529159690881",
      appId: "1:529159690881:web:f734628c7fd665b66c4b80"
    };
    // Initialize Firebase
    if (!firebase.apps.length) 
    {
    firebase.initializeApp(firebaseConfig);
    }
    firebase.database().ref('History/').set(
    {
    })  
}

  render() {
    const Loginimage = { uri: "https://imgbbb.com/images/2020/06/05/image.jpg" };
    const AdminLoginimage = { uri: "https://imgbbb.com/images/2020/06/06/imag3e.jpg" };
    const image = { uri: "https://imgbbb.com/images/2020/06/08/image34.jpg" };
    const AuthorizationScreenimage = { uri: "https://i.pinimg.com/originals/50/3c/22/503c22ec2a8c43801fd557d6378f953c.jpg" };
    const UnlockScreenimage = { uri: "https://i.pinimg.com/originals/50/3c/22/503c22ec2a8c43801fd557d6378f953c.jpg" };
    const AdminScreenimage = { uri: "https://i.pinimg.com/originals/50/3c/22/503c22ec2a8c43801fd557d6378f953c.jpg" };
    const Adminmainpage = { uri: "https://imgbbb.com/images/2020/06/08/image34.jpg" };
    const Adminuserpage = { uri: "https://i.pinimg.com/originals/50/3c/22/503c22ec2a8c43801fd557d6378f953c.jpg" };
    const blockimage = { uri: "https://cdn.hipwallpaper.com/i/1/28/v2rqGw.jpg" };
    const aprovalimage = { uri: "https://i.pinimg.com/originals/50/3c/22/503c22ec2a8c43801fd557d6378f953c.jpg" };
    
    const { hasCameraPermission, scanned } = this.state;
    
    

    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        
        {this.state.blockaccount ? (
        <ImageBackground source={blockimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
       position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        </ImageBackground>
        ) : null}


        {this.state.Loginshow ? (
        <ImageBackground source={Loginimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
       position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
      <View style={styles.containerCenter}>

      <View style={{width:280}}>
      <Input 
      value={this.state.username}
      onChangeText={(username) => this.setState({ username })}
      placeholder='Username'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='user'
        size={24}
        color='white'/>}/>
        <Input
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        secureTextEntry={true}
      placeholder='Password'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='lock'
        size={24}
        color='white'/>}/>
    </View>
        <View style={{marginTop:40, alignItems: 'center', justifyContent: 'center'}}>
         <View>
         <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)',padding: 5, justifyContent: 'center',alignItems: 'center',borderColor:'white', borderWidth: 1,width:180, borderRadius:50,fontSize: 20,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}} 
            onPress={this.onLogin.bind(this)}>
            <Text style={{fontSize: 20,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}}>SIGN IN</Text>
            </TouchableOpacity>
            </View>
      <View style={{marginTop:40, justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
      <Text style={{fontSize: 15,color: 'gray',fontFamily: 'serif' }}>Don't have account yet? </Text>            
      <TouchableOpacity 
            onPress={this.SignupComponent.bind(this)}>
            <Text style={{fontSize: 17,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}}>Sign Up</Text>
            </TouchableOpacity>
            </View>
            <View style={{marginTop:20, justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
      		<Text style={{fontSize: 15,color: 'gray',fontFamily: 'serif' }}>Login as </Text>            
      		<TouchableOpacity 
            onPress={this.AdminLoginComponent.bind(this)}>
            <Text style={{fontSize: 17,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}}>ADMIN</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 15,color: 'gray',fontFamily: 'serif' }}> mode</Text>
            </View>
            </View>
        </View>
        </ImageBackground>
        ) : null}




        {this.state.AdminLoginshow ? (
        <ImageBackground source={AdminLoginimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
       position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
      <View style={styles.containerCenter}>

      <View style={{width:280}}>
      <Input 
      value={this.state.adminusername}
      onChangeText={(adminusername) => this.setState({ adminusername })}
      placeholder='Username'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='user'
        size={24}
        color='white'/>}/>
        <Input
        value={this.state.adminpassword}
        onChangeText={(adminpassword) => this.setState({ adminpassword })}
        secureTextEntry={true}
      placeholder='Password'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='lock'
        size={24}
        color='white'/>}/>
        <Input
        value={this.state.adminID}
        onChangeText={(adminID) => this.setState({ adminID })}
        secureTextEntry={true}
      placeholder='Employee ID'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='star'
        size={24}
        color='white'/>}/>


        <View style={{alignItems: 'center', flexDirection: 'row',}}>
        <View style={{width:200}}>
        <Input
        value={this.state.adminaccesspin}
        onChangeText={(adminaccesspin) => this.setState({ adminaccesspin })}
        secureTextEntry={true}
      placeholder='PIN'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='lock'
        size={24}
        color='white'/>}/>
        </View>
        <View style={{width:50}}>
         <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)',padding: 3, justifyContent: 'center',alignItems: 'center',borderColor:'white', borderWidth: 1,width:70}}
            onPress={this.ShowAdminPinCode.bind(this)}>
            <Text style={{fontSize: 15,color: 'white',fontFamily: 'serif' ,fontWeight: "bold",}}>CHECK</Text>
            </TouchableOpacity>
            </View>
        </View>

    </View>
        <View style={{marginTop:40, alignItems: 'center', justifyContent: 'center'}}>
         <View>
         <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)',padding: 5,width:100, justifyContent: 'center',alignItems: 'center',borderColor:'white', borderWidth: 1,width:180, borderRadius:50}}
            onPress={this.AdminonLogin.bind(this)}>
            <Text style={{fontSize: 20,color: 'white',fontFamily: 'serif' ,fontWeight: "bold",}}>SIGN IN</Text>
            </TouchableOpacity>
            </View>
      
            <View style={{marginTop:40, justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
          <Text style={{fontSize: 15,color: 'gray',fontFamily: 'serif' }}>Login as </Text>            
          <TouchableOpacity 
            onPress={this.LoginComponent.bind(this)}>
            <Text style={{fontSize: 17,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}}>USER</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 15,color: 'gray',fontFamily: 'serif' }}> mode</Text>
            </View>
            </View>
        </View>
        </ImageBackground>
        ) : null}







        {this.state.Signupshow ? (
        <ImageBackground source={Loginimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
       position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
      <View style={styles.containerCenter}>
      <ScrollView style={{paddingTop:70}}>
      <View style={{width:280}}>
      <Input 
      value={this.state.username}
      onChangeText={(username) => this.setState({ username })}
      placeholder='Username'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='user'
        size={24}
        color='white'
      />}/>
      <Input 
      value={this.state.email}
      onChangeText={(email) => this.setState({ email })}
      placeholder='Email Address'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='envelope'
        size={24}
        color='white'
      />}/>
      <Input 
      value={this.state.employeeId}
      onChangeText={(employeeId) => this.setState({ employeeId })}
      placeholder='Employee ID'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='credit-card'
        size={24}
        color='white'
      />}/>
        <Input
        value={this.state.password}
        onChangeText={(password) => this.setState({ password })}
        secureTextEntry={true}
      placeholder='Password'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='lock'
        size={24}
        color='white'/>}/>
        <Input
        value={this.state.password2}
        onChangeText={(password2) => this.setState({ password2 })}
        secureTextEntry={true}
      placeholder='Repeat Password'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='lock'
        size={24}
        color='white'/>}/>
    </View>
        <View style={{marginTop:40, alignItems: 'center', justifyContent: 'center'}}>
         <View>
         <TouchableOpacity style={{backgroundColor: 'rgba(255, 255, 255, 0.1)',padding: 5,width:100, justifyContent: 'center',alignItems: 'center',borderColor:'white', borderWidth: 1,width:180, borderRadius:50}}
            onPress={this.firebasesignup.bind(this)}>
            <Text style={{fontSize: 20,color: 'white',fontFamily: 'serif' ,fontWeight: "bold",}}>SIGN UP</Text>
            </TouchableOpacity>
            </View>
            </View>
            <View style={{marginTop:40, alignItems: 'center', justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
      <Text style={{fontSize: 15,color: 'gray',fontFamily: 'serif' }}>Already have account? </Text>            
      <TouchableOpacity 
            onPress={this.LoginComponent.bind(this)}>
            <Text style={{fontSize: 17,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}}>Sign IN</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
        </ImageBackground>
        ) : null}



        {this.state.UserMenueshow ? (
        <ImageBackground source={image} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        <View style={styles.containerCenter}>
        <View >
         <TouchableOpacity style={{ width: 280,backgroundColor: 'rgba(255, 255, 255, 0.4)',alignItems: 'center',padding: 5,borderRadius:50 ,borderColor: 'white',borderWidth:0.5}} 
            onPress={this.UserAuthorizationComponent.bind()}>
            <Text style={{fontSize: 20,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}}>Request for Authorization</Text>
         </TouchableOpacity>
        </View>
        <View >
         <TouchableOpacity style={{ width: 280,backgroundColor: 'rgba(255, 255, 255, 0.4)',alignItems: 'center',padding: 5,marginTop:30,borderRadius:50, borderColor: 'white',borderWidth:0.5}}
            onPress={this.UserUnlockComponent.bind()}>
            <Text style={{fontSize: 20,color: 'white', fontFamily: 'serif' ,fontWeight: "bold"}}>Unlock the door</Text>
         </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginTop:20}}
              onPress={this.LoginComponent.bind()}>
            <Image
            style={{height:42,width:42}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/logout.png',
            }}/>
            </TouchableOpacity>
        </View>
      </ImageBackground>
      ) : null}


      {this.state.UserAuthorizationshow ? (
      <ImageBackground source={AuthorizationScreenimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        {this.state.qrscannershow ? (
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}/>
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />)}
        </View>
        ) : null}
        <View style={styles.containerCenter}>
        <View style={{justifyContent: 'center',alignItems: 'center', width: 300}}>
            
        </View>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>
            <TouchableOpacity 
            onPress={this.qrscannerComponent.bind()}>
            <Image
          style={{width:50,height:50, backgroundColor: 'black'}}
          source={{
            uri: 'https://imgbbb.com/images/2020/05/30/qrcode-icon.png',
          }}/>
            </TouchableOpacity>
        </View> 
        <View style={{paddingTop:20 ,}}>
            <TouchableOpacity style={{width: 160,height:30,borderWidth: 1,borderColor: 'white',alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
            onPress={this.firebaseconn.bind(this) }>
            <Text style={{fontSize: 20,color: 'white',fontWeight: "bold", fontFamily: 'serif'}}>SUBMIT</Text>
            </TouchableOpacity>
            <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}}
              onPress={this.UserMenueComponent.bind()}>
            <Image
            style={{height:40,width:40}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/26/icon-png.png',
            }}/>
            </TouchableOpacity>
             <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginLeft:5}}
              onPress={this.LoginComponent.bind()}>
            <Image
            style={{height:41,width:41}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/logout.png',
            }}/>
            </TouchableOpacity>
            </View>
        </View>
        </View>
      </ImageBackground>
      ) : null}




      {this.state.UserUnlockshow ? (
      <ImageBackground source={UnlockScreenimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        {this.state.qrscannershow ? (
        <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}/>
        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />)}
        </View>
        ) : null}
        <View style={styles.containerCenter}>     
        <View style={{width:300,height:70}}>    
          <View style={{width:300 , height: 70 ,justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
            <View style={{width:150 , height: 70 ,backgroundColor: 'rgba(0, 0, 0, 0.7)',alignItems: 'center', borderColor: 'gray', borderWidth: 1}}>
            <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)',width:150 , height: 25 ,justifyContent: 'center',alignItems: 'center',}}>
            <Text style={{fontSize: 15,color: 'black',fontFamily: 'serif' ,fontWeight: "bold", paddingTop:10,}}>DOOR ID</Text>
            </View>
            <Text style={{fontSize: 17,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", paddingTop:10}}>{this.state.datatext}</Text>
            </View>
            <View style={{width:150 , height: 70 ,backgroundColor: 'rgba(0, 0, 0, 0.7)',alignItems: 'center', borderColor: 'gray', borderWidth: 1}}>
            <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)',width:150 , height: 25 ,justifyContent: 'center',alignItems: 'center',}}>
            <Text style={{fontSize: 15,color: 'black',fontFamily: 'serif' ,fontWeight: "bold", paddingTop:10}}>ACCESS CODE</Text>
            </View>
            <Text style={{fontSize: 17,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", paddingTop:10}}>{this.state.datatextpin}</Text>
            </View>
          </View>       
        </View>        
        <View style={{justifyContent: 'center',alignItems: 'center', paddingTop: 15}}>
            <TouchableOpacity 
            onPress={this.qrscannerComponent.bind()}>
            <Image
          style={{width:50,height:50, backgroundColor: 'black'}}
          source={{
            uri: 'https://imgbbb.com/images/2020/05/30/qrcode-icon.png',
          }}/>
            </TouchableOpacity>
        </View> 
        <View style={{marginTop:10,alignItems: 'center', justifyContent: 'center',borderColor: 'white'}}>
      <TouchableOpacity style={{width:160,height:30, backgroundColor: 'rgba(0, 0, 0, 0.6)',alignItems: 'center', justifyContent: 'center', borderWidth:1,borderColor: 'white'}}
              onPress={this.firebaseuserauthcheck.bind(this)}>
            <Text style={{fontSize: 20,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>CHECK</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}}
              onPress={this.UserMenueComponent.bind()}>
            <Image
            style={{height:40,width:40}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/26/icon-png.png',
            }}/>
            </TouchableOpacity>
             <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginLeft:5}}
              onPress={this.LoginComponent.bind()}>
            <Image
            style={{height:42,width:42}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/logout.png',
            }}/>
            </TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
      ) : null}

      


      {this.state.AdminMainPage ? (
      <ImageBackground source={Adminmainpage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        <View style={styles.containerCenter}>
        <View >
         <TouchableOpacity style={{ width: 280,backgroundColor: 'rgba(255, 255, 255, 0.4)',alignItems: 'center',padding: 5,borderRadius:50, borderColor: 'white',borderWidth:0.5}} 
            onPress={this.AdminComponent.bind()}>
            <Text style={{fontSize: 20,color: 'white',fontFamily: 'serif' ,fontWeight: "bold"}}>Access Code Modification</Text>
         </TouchableOpacity>
        </View>
        <View >
         <TouchableOpacity style={{ width: 280,backgroundColor: 'rgba(255, 255, 255, 0.4)',alignItems: 'center',padding: 5,marginTop:30,borderRadius:50, borderColor: 'white',borderWidth:0.5}}
            onPress={this.UserModificationComponent.bind()}>
            <Text style={{fontSize: 20,color: 'white', fontFamily: 'serif' ,fontWeight: "bold"}}>User Modification</Text>
         </TouchableOpacity>
        </View>
        <View >
         <TouchableOpacity style={{ width: 280,backgroundColor: 'rgba(255, 255, 255, 0.4)',alignItems: 'center',padding: 5,marginTop:30,borderRadius:50, borderColor: 'white',borderWidth:0.5}}
            onPress={this.AdminApprovalComponent.bind()}>
            <Text style={{fontSize: 20,color: 'white', fontFamily: 'serif' ,fontWeight: "bold"}}>SIGN UP REQUESTS</Text>
         </TouchableOpacity>
        </View>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginTop:20}}
              onPress={this.LoginComponent.bind()}>
            <Image
            style={{height:42,width:42}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/logout.png',
            }}/>
            </TouchableOpacity>
        </View>
        </ImageBackground>
      ) : null}


      {this.state.AdminApproval ? (
        <ImageBackground source={aprovalimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
       position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        <View style={styles.containerCenter}>
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.7)', width: 330,height:200,borderWidth:1,borderColor: 'gray'}}>
        <ScrollView>
          <Text style={{fontSize: 17,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>{this.state.allRequestedUsers}</Text>
        </ScrollView>
        </View>
        <View style={{width:280, paddingTop: 20}}>
        <View style={{justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
        <View style={{width : 250}}>
      <Input 
      value={this.state.ADusername}
      onChangeText={(ADusername) => this.setState({ ADusername })}
      placeholder='Username'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='user'
        size={24}
        color='white'/>}/>
        </View>
        <View>
        <TouchableOpacity
              onPress={this.firebaseuserinformation.bind(this)}>
            <Image
            style={{height:30,width:30}}
            source={{uri: 'https://imgbbb.com/images/2020/06/03/png.png',}}/>
             </TouchableOpacity>
            </View>
        </View>
        </View>
        <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth:1, width: 90,height: 30, backgroundColor: 'rgba(255, 0, 0, 0.5)'}}
              onPress={this.firebaserejectuser.bind(this)}>
            <Text style={{fontSize: 16,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>REJECT</Text>
            </TouchableOpacity>
             <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth:1, width: 90,height: 30, backgroundColor: 'rgba(0, 255, 0, 0.5)',marginLeft:15}}
              onPress={this.firebaseApproveuser.bind(this)}>
            <Text style={{fontSize: 16,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>APPROVE</Text>
            </TouchableOpacity>
            </View>
        <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}}
              onPress={this.AdminMainPageComponent.bind()}>
            <Image
            style={{height:40,width:40}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/26/icon-png.png',
            }}/>
            </TouchableOpacity>
             <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginLeft:5}}
              onPress={this.LoginComponent.bind()}>
            <Image
            style={{height:42,width:42}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/logout.png',
            }}/>
            </TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
        ) : null}





      {this.state.UserModification ? (
      <ImageBackground source={Adminuserpage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        <View style={styles.containerCenter}>
        {this.state.Userhistory ? (
          <View style={{backgroundColor:'rgba(0, 0, 0, 0.7)', width: 330,height:200,borderWidth:1,borderColor: 'gray'}}>
        <ScrollView>
          <Text style={{fontSize: 11,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>{this.state.HistoryRequestedUsers}</Text>
        </ScrollView>
        </View>
          ) : null}
        <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
        <Text style={{fontSize: 16,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>SHOW REQUESTS HISTORY</Text>
        <Switch
          onValueChange={this._handleToggleSwitch}
          value={this.state.switchValue}
          tintColor={'grey'}
        />

        </View>
        <View style={{paddingTop:15}}>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth:1, width: 160,height: 20, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
              onPress={this.firebaseclearhistory.bind(this)}>
            <Text style={{fontSize: 16,color: 'red',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>CLEAR HISTORY</Text>
            </TouchableOpacity>
            </View>


        <View style={{width: 280,paddingTop:20}}>
        <Input 
      value={this.state.ADusername}
      onChangeText={(ADusername) => this.setState({ ADusername })}
      placeholder='Username'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='user'
        size={24}
        color='white'/>}/>
        </View>
        <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth:1, width: 90,height: 30, backgroundColor: 'rgba(255, 0, 0, 0.5)'}}
              onPress={this.firebasedeleteuser.bind(this)}>
            <Text style={{fontSize: 16,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginLeft:15,marginRight:15 , borderColor: 'white', borderWidth:1, width: 90,height: 30, backgroundColor: 'rgba(255, 255, 0, 0.5)'}}
              onPress={this.firebaseblockuser.bind(this)}>
            <Text style={{fontSize: 16,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>BLOCK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', borderColor: 'white', borderWidth:1, width: 90,height: 30, backgroundColor: 'rgba(0, 0, 255, 0.5)'}}
              onPress={this.firebaseunblockuser.bind(this)}>
            <Text style={{fontSize: 16,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>UNBLOCK</Text>
            </TouchableOpacity>
        </View>
        <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}}
              onPress={this.AdminMainPageComponent.bind()}>
            <Image
            style={{height:40,width:40}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/26/icon-png.png',
            }}/>
            </TouchableOpacity>
             <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginLeft:5}}
              onPress={this.LoginComponent.bind()}>
            <Image
            style={{height:42,width:42}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/logout.png',
            }}/>
            </TouchableOpacity>
            </View>
            </View>
        </ImageBackground>
      ) : null}








      {this.state.Adminshow ? (
      <ImageBackground source={AdminScreenimage} style={{flex: 1,resizeMode: "stretch",justifyContent: "center",
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0}}>
        <View style={styles.containerCenter}>
        <View style={{backgroundColor:'rgba(0, 0, 0, 0.7)', width: 330,height:200,borderWidth:1,borderColor: 'gray'}}>
        <ScrollView>
        <FlatList
          contentContainerStyle={{color: 'red'}}
          data={this.state.comments}
          renderItem={({item}) => <Text style={{color: 'white',fontWeight: "bold",fontSize: 12,padding:5}}>{item.reply}</Text>}
         />
        </ScrollView>
        </View>
        <View style={{width:280, paddingTop: 20}}>
        <View style={{justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
        <View style={{width : 250}}>
      <Input 
      value={this.state.ADusername}
      onChangeText={(ADusername) => this.setState({ ADusername })}
      placeholder='Username'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='user'
        size={24}
        color='white'/>}/>
        </View>
        <View>
        <TouchableOpacity
              onPress={this.firebaseuserinformation.bind(this)}>
            <Image
            style={{height:30,width:30}}
            source={{uri: 'https://imgbbb.com/images/2020/06/03/png.png',}}/>
             </TouchableOpacity>
            </View>
        </View>
        <Input
        value={this.state.ADdoorId}
        onChangeText={(ADdoorId) => this.setState({ ADdoorId })}
      placeholder='Door ID'
      inputStyle={{color: 'white'}}
      leftIcon={
      <Icon
        name='star'
        size={24}
        color='white'/>}/>
        

        <View style={{justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
        <View>
        <Text style={{fontSize: 25,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5,}}>{this.state.keygen}</Text>
        </View>
        <View style={{justifyContent: 'center',alignItems: 'center', flexDirection: 'row',}}>
        <TouchableOpacity
              onPress={this.KeyGenerator.bind(this)}>
            <Image
            style={{height:50,width:50}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/unnamed.png',
            }}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.ForceKeyGenerator.bind(this)}>
            <Image
            style={{height:44,width:44}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/31/smart.png',
            }}/>
            </TouchableOpacity>
        </View>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'center',paddingTop:15}}>
        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginLeft:5 , borderColor: 'white', borderWidth:1, width: 200,height: 40, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius:30}}
              onPress={this.UpdateShowUserRequests.bind(this)}>
            <Text style={{fontSize: 25,color: 'white',fontFamily: 'serif' ,fontWeight: "bold", padding:5}}>SUBMIT</Text>
            </TouchableOpacity>
            </View>
            <View style={{paddingTop:20,alignItems: 'center', justifyContent: 'center', flexDirection: 'row',}}>
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',}}
              onPress={this.AdminMainPageComponent.bind()}>
            <Image
            style={{height:40,width:40}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/26/icon-png.png',
            }}/>
            </TouchableOpacity>
             <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center',marginLeft:5}}
              onPress={this.LoginComponent.bind()}>
            <Image
            style={{height:42,width:42}}
            source={{
              uri: 'https://imgbbb.com/images/2020/05/30/logout.png',
            }}/>
            </TouchableOpacity>
            </View>
    </View>
        </View>
      </ImageBackground>
      ) : null}

      <FlashMessage position="top" />

      </View>

    );
  }
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    this.setState({ doorId: data });
    
     Alert.alert(
      "SCAN RESULT :",
      `Bar code with \n TYPE: ${type} \n DATA:  ${data} \n has been scanned!`,
      [
        
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  containerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 250,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color:'white',
  },
});
