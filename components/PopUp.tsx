import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, DrawerLayoutAndroid, Button } from 'react-native';

export function BottomSheet() {

  return (



    <View style={styles.bottomSheet}>
      <View style={styles.tracinhoTwo}>
        <TouchableOpacity style={styles.options}>
          <Text>Mecânico?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}>
          <Text>Eletricista?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.options}>
          <Text>Borracheiro?</Text>
        </TouchableOpacity>
        <View style={styles.tracinho} >

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    alignSelf: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    width: '50%'
  },
  bottomSheet: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'blue',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  tracinho: {
    backgroundColor: 'white',
    width: 30,
    position: 'absolute',
    height: 5,
    borderRadius: 40,
  },
  tracinhoTwo: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
    height: '100%',
    width: '100%',
    paddingTop: 50,
  },
  
});
