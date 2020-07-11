import React, { Component } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class UserPage extends Component
{
    
 static navigationOptions =
 {
    title: 'UserPage',
 };

 render()
 {
    return(
       <View style = { styles.MainContainer }>

          <Text style = { styles.ActivityNameTextCss }> This Is UserPage. </Text>

       </View>
    );
 }
}

const styles = StyleSheet.create({

     MainContainer: {
    
        flex:1,
        justifyContent: 'center',
        margin: 5
      
     },
    
     ActivityNameTextCss: {
    
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
     },
    
    });


export default UserPage;