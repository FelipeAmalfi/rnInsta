/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Dimensions, 
  FlatList } from 'react-native';
import Post from './src/components/Post'

const instructions = Platform.select({
  ios: 'Teste de mensagem',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Mensagem no android.',
});


export default class App extends Component {


  constructor(){
    super();
    this.state = {
      foto: []
    }
  }


  componentDidMount(){
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
    .then(resposta => resposta.json())
    .then(json => this.setState({fotos: json}))
  }


  render() {
    return (
      <FlatList style={styles.list}
        keyExtractor={item => item.id.toString()}
        data={this.state.fotos}
        renderItem={({ item }) =>
        <Post foto={item}/>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  
  list:{
    marginTop: 10 
  },

});
