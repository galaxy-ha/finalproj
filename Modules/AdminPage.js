import React, { Component } from 'react';

import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class AdminPage extends Component {

static navigationOptions =
 {
    title: 'AdminPage',
 };

 NavigateActivityFunction = () =>
 {
    this.props.navigation.navigate('Second');
    
 }

 render()
 {
    return(
       <View style = { styles.MainContainer }>

          <Text style = { styles.ActivityNameTextCss }> This Is AdminPage. </Text>

          <Button onPress = { this.NavigateActivityFunction } title = 'Open Second Activity'/>
        
       </View>
    );
 }
}

const styles = StyleSheet.create(
{
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

export default AdminPage;