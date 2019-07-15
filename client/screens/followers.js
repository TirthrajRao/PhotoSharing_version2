import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import userService from '../services/user.service';

export default class Followers extends Component {
   constructor(props) {
      super(props)
      global.curruntUserData = ""
      this.state = {
         followers: [],
         ButtonStateHolder: false,
      }
      this.props.navigation.addListener(
         'didFocus',
         payload => {
            this.componentDidMount();
         });
   }

   componentDidMount = async () => {
      try {
         const curruntUser = await AsyncStorage.getItem('curruntUser');
         if (curruntUser) {
            data = JSON.parse(curruntUser);
            global.curruntUserData = data;
            console.log("value===+++++++++++++++++++++===========================>", global.curruntUserData.data._id);
         }
      } catch (error) {
         if (Platform.OS === 'ios') {
            alert('User Data Not Found')
         } else {
            ToastAndroid.show('User Data Not Found', ToastAndroid.SHORT);
         }
      }
      this.getFollowers();
   }

   /** Get Followers of CurruntUser */
   getFollowers = () => {
      const userId = global.curruntUserData.data._id
      userService.getFollowers(userId)
         .then(response => {
            console.log('currunt user followers==============================>', response.data.data);
            this.setState({
               followers: response.data.data
            })
         })
         .catch(err => {
            console.log('er=====>', err);
            if (Platform.OS === 'ios') {
               alert('Internal Server Error')
            } else {
               ToastAndroid.show('Internal Server Error', ToastAndroid.SHORT);
            }
            // alert('Internal Server Error')
         })
   }

   render() {
      console.log('this.state,followers==============================>?>', this.state.followers.length);
      if (!this.state.followers.length) {
         return (
            <View style={styles.container}>
               <Text style={{ fontSize: 20 }}>No folowers</Text>
            </View>
         )
      } else {
         return (
            <View style={{ backgroundColor: '#fff', paddingBottom: 10 }} >
               <FlatList
                  data={this.state.followers}
                  renderItem={({ item }) =>
                     <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                           style={{ flex: 8 }}
                           onPress={() => this.props.navigation.navigate('UserProfile', { userId: item })}
                        >
                           <Text style={styles.text}>{item.userName}</Text>
                        </TouchableOpacity>
                     </View>
                  }
               />
            </View>
         )
      }
   }
}
const styles = StyleSheet.create({
   text: {
      fontSize: 18,
      flexDirection: 'column',
      flex: 8,
      marginLeft: 10,
      marginTop: 14,
      color: 'black'
   },
   container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
   },
   horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
   },
})
