/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity, TextInput } from 'react-native';
import InputComment from './InputComment';

const dimens = Dimensions.get('screen').width;

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto,
        }
    }


    sendComment(commentValue, commentInput){


        if(this.state.commentValue === ''){
            return;
        }

        const commentsList = [...this.state.foto.comentarios, {

            id: commentValue,
            login: 'meuUsuario',
            texto: commentValue

        }];

        const fotoAtualizada = {
            ...this.state.foto,
            comentarios: commentsList
        }
    
        this.setState({foto : fotoAtualizada})
        
    }

    setComments(comentarios) {
        return (
                comentarios.map(comentario =>
                    <View style={styles.subtitleView} key={comentario.id}>
                        <Text style={styles.subtitleName}>{comentario.login}</Text>
                        <Text style={styles.subtitle}>{comentario.texto}</Text>
                    </View>

                )
        )
    }
    

    carregaIcone(likeada) {
        return likeada ? require('../../resources/images/filled_heart.png') : require('../../resources/images/empty_heart.png')
    }

    like() {

        const { foto } = this.state
        let newList = []

        if (!foto.likeada) {
            newList = [
                ...foto.likers,
                { login: 'meuUsuario' }
            ]
        }
        else {

            newList = foto.likers.filter(liker => {
                return liker.login !== "meuUsuario"
            })

        }

        const fotoAtualizada = {
            ...foto,
            likeada: !foto.likeada,
            likers: newList
        }
        this.setState({ foto: fotoAtualizada })
    }

    showLikeCount(count) {
        if (count.length <= 0) {
            return
        }
        return (
            <Text style={styles.likeText}>
                {count.length} {count.length > 1 ? 'curtidas' : 'curtida'}
            </Text>
        )
    }

    setSubtitle(name, subtitle) {
        if (subtitle.length === '') {
            return;
        }

        return (
            <View style={styles.subtitleView}>
                <Text style={styles.subtitleName}>{name}:</Text>
                <Text style={styles.likeText}>{subtitle}</Text>
            </View>


        )
    }

    render() {
        const { foto } = this.state;

        return (
            <View>
                <View style={styles.header}>

                    <Image source={{ uri: foto.urlPerfil }}
                        style={styles.imageProfile} />
                    <Text>{foto.loginUsuario}</Text>

                </View>

                <Image source={{ uri: foto.urlFoto }}
                    style={styles.imageView} />

                <View style={styles.footer}>

                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image source={this.carregaIcone(foto.likeada)}
                            style={styles.likeButton} />
                    </TouchableOpacity>

                    {this.showLikeCount(foto.likers)}
                    {this.setSubtitle(foto.loginUsuario, foto.comentario)}
                    {this.setComments(foto.comentarios)}

                    <InputComment commentCallBack = {this.sendComment.bind(this)}/>

                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    imageView: {
        width: dimens,
        height: dimens
    },

    imageProfile: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    likeButton: {
        width: 30,
        height: 30,
    },

    footer: {
        margin: 10
    },

    likeText: {
        fontSize: 15
    },

    subtitleName: {
        fontWeight: 'bold',
        marginRight: 5,
        fontSize: 15
    },

    subtitleView: {
        flexDirection: 'row',
    },
});
