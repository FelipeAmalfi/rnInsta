/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';

export default class InputComment extends Component {

    constructor() {
        super();
        this.state = {
            commentValue: ''
        }
    }

    render() {
        return (
            <View style={styles.newComment}>
                <TextInput
                    style={styles.commentView}
                    placeholder="Adicione um Comentário"
                    ref={input => this.inputComment = input}
                    onChangeText={text => this.setState({ commentValue: text })}
                >
                </TextInput>
                <TouchableOpacity onPress={() => {
                    this.props.commentCallBack(this.state.commentValue, this.inputComment)
                    this.inputComment.clear()
                    this.setState({ commentValue: '' })
                }}>


                    <Image style={styles.imageSend}
                        source={require('../../resources/images/send_button.png')} />

                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({

    commentView: {
        height: 40,
        marginTop: 5,
        fontSize: 15,
        flex: 1

    },

    imageSend: {
        width: 20,
        height: 20,
        marginTop: 5,

    },


    newComment: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },





});
