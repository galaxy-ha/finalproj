import React from "react"
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






function SignUp (){
	const Loginimage = { uri: "https://imgbbb.com/images/2020/06/05/image.jpg" };
	return (
		<div>
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
		</div>
		)
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
export default SignUp