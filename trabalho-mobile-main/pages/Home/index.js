import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Icon, Input} from 'react-native-elements';
import Header from './../../components/Header';
import SimpleCard from "../../components/SimpleCard";
import Api from '../../service/api'
import axios from 'axios';


export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    const [searchText, setSearchText] = useState(null)
    const [list, setList] = useState(null);
    const [user, setUser] = useState(route.params.user)

    function navigateToSkills(item) {
        navigation.navigate('Skills', { item });
    }

    function navigateToFavorites(user) {
        navigation.navigate('Favorites', { user });
    }

    function navigateToSharedWithMe() {
        navigation.navigate('SharedWithMe', { user });
    }

    function carregarDados(){
        setList([])
        axios
            .get(Api.getUrl(`/herois/buscar-por-nome-api/${searchText}`))
            .then((response)=>{
                let data = response.data
                let i=1
                data.forEach(element => {
                    element.id = i
                    i++
                });
                setList(data);
            })
            .catch((err)=>{
                // setMessage("Usuário e/ou senha inválidos!")
                console.log(err);
            })
    }

    return (
        <View style={{backgroundColor: '#EFEEF5'}}>
            <Header headerTitle='Home'/>
            <View style={{flexDirection: 'row', justifyContent:"center", marginHorizontal:30, marginTop: 20}}>
                <Input
                    containerStyle={{}}
                    disabledInputStyle={{ background: "#ddd" }}
                    inputContainerStyle={{ }}
                    errorStyle={{}}
                    errorProps={{}}
                    inputStyle={{}}
                    label=""
                    labelStyle={{color: '#2288DD'}}
                    labelProps={{}}
                    placeholder={"Digite o nome do herói"}
                    defaultValue={searchText}
                    onChangeText={(searchText)=>setSearchText(searchText)}
                />
                <Button
                    buttonStyle={{}}
                    icon={<Icon name="search" size={25} color="#EFEEF5" />}
                    onPress={()=> carregarDados()}
                >
                </Button>
            </View>
            <View style={{marginHorizontal: 15, marginVertical:8, flexDirection:'row', justifyContent:'space-between'}}>
                <Button
                    buttonStyle={{width:150}}
                    titleStyle={{}}
                    title={"  Favoritos"}
                    type={"outline"}
                    onPress={()=> navigateToFavorites(user)}
                    icon={<Icon name="star" size={25} color="#2288DD" />}
                />
                <Button
                    buttonStyle={{width:150}}
                    titleStyle={{}}
                    title={"  Recebidos"}
                    type={"outline"}
                    onPress={()=> navigateToSharedWithMe(user)}
                    icon={<Icon name="mail" size={25} color="#2288DD" />}
                />
            </View>
            <FlatList
                data = {list}
                keyExtractor={item => String(item.id)} //para que cada elemento tenha uma chave unica
                showsVerticalScrollIndicator={false} //para ocultar a barrinha
                contentContainerStyle={{ paddingBottom: 260 }}
                renderItem={({item}) => (
                    <SimpleCard props={{item, user}}></SimpleCard>
                )}
            />
        </View>
    )
}