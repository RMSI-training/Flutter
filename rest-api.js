import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
export default function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      console.log(status);
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.LastName],
        });
        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();

    console.log('init');//only once
    getList();
  }, []);

  const getList = () => {
    const promise = axios({
      url: 'https://my-json-server.typicode.com/typicode/demo/posts'
    });
    promise.then((response) => {//100 to 399
      console.log(response.data);
      setList(response.data);
    });
    promise.catch((error) => {// 400 to 599
      console.log('server call failed. Please retry');
    });
  }
  return (<SafeAreaView>
    <ScrollView>
      {list.map((element) => {
        return <Text key={element.id} style={styles.txt}>{element.title}</Text>;
      })}
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    fontSize: 14,
    margin: 5,
    padding: 5,
    backgroundColor: 'yellow'
  }
});
