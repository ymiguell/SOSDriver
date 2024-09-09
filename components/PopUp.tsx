import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, PanResponder, GestureResponderEvent, PanResponderGestureState, Modal, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export function BottomSheet() {
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [mechanicsList, setMechanicsList] = useState<{ name: string; rating: string; latitude: number; longitude: number }[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState<{ name: string; rating: string } | null>(null);
  const animatedHeight = useRef(new Animated.Value(height * 0.3)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        animatedHeight.setValue(height - gestureState.moveY);
      },
      onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        const newHeight = height - gestureState.moveY;
        Animated.spring(animatedHeight, {
          toValue: newHeight < height * 0.5 ? height * 0.3 : height * 0.7,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    setIsButtonsVisible(false);

    // Define a lista de mecânicos fictícios
    const mechanics = [
      { name: 'João', rating: '4.5 estrelas', latitude: -23.550520, longitude: -46.633308 },
      { name: 'Maria', rating: '4.7 estrelas', latitude: -22.906847, longitude: -43.172896 },
      { name: 'Pedro', rating: '4.3 estrelas', latitude: -19.916681, longitude: -43.934493 },
    ];

    setMechanicsList(mechanics);
  };

  const handleMechanicPress = (mechanic: { name: string; rating: string }) => {
    setSelectedMechanic(mechanic);
    setIsModalVisible(true);
  };

  const handleModalResponse = (response: 'accept' | 'reject' | 'call') => {
    setIsModalVisible(false);
    if (response === 'accept') {
      // Placeholder for accepted action
      console.log(`Aceitou ajuda do mecânico: ${selectedMechanic?.name}`);
    } else if (response === 'reject') {
      // Placeholder for rejected action
      console.log(`Rejeitou ajuda do mecânico: ${selectedMechanic?.name}`);
    } else if (response === 'call') {
      // Placeholder for calling action (e.g., initiate phone call)
      const phoneNumber = '199999999'; // Example phone number
      Linking.openURL(`tel:${phoneNumber}`);
    }
    setSelectedMechanic(null);
  };

  const handleBackPress = () => {
    setSelectedOption(null);
    setMechanicsList([]);
    setIsButtonsVisible(true);
  };

  const renderContent = () => {
    if (!isButtonsVisible) {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>
            Você escolheu {selectedOption}!
          </Text>
          <View style={styles.mechanicsList}>
            {mechanicsList.map((mechanic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.mechanicItem}
                onPress={() => handleMechanicPress(mechanic)}
              >
                <Text style={styles.mechanicName}>{mechanic.name}</Text>
                <Text style={styles.mechanicRating}>{mechanic.rating}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
        <TouchableOpacity
          style={styles.options}
          onPress={() => handleOptionPress('Mecânico')}
        >
          <Text style={styles.centralizarTextos}>Mecânico?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          onPress={() => handleOptionPress('Eletricista')}
        >
          <Text style={styles.centralizarTextos}>Eletricista?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.options}
          onPress={() => handleOptionPress('Borracheiro')}
        >
          <Text style={styles.centralizarTextos}>Borracheiro?</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bottomSheet, { height: animatedHeight }]}
        {...panResponder.panHandlers}
      >
        <LinearGradient
          colors={['#003B6F', '#005AA6', '#007BFF']}
          style={styles.gradient}
        >
          <View style={styles.handle} />
          <View style={styles.content}>
            {renderContent()}
          </View>
        </LinearGradient>
      </Animated.View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Você gostaria de aceitar a ajuda de {selectedMechanic?.name}?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.acceptButton]}
                onPress={() => handleModalResponse('accept')}
              >
                <MaterialCommunityIcons name="check" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.rejectButton]}
                onPress={() => handleModalResponse('reject')}
              >
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.callButton]}
                onPress={() => handleModalResponse('call')}
              >
                <MaterialIcons name="phone" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    zIndex: 2,
  },
  gradient: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handle: {
    width: 60,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  content: {
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    width: '90%',
    alignItems: 'center',
  },
  options: {
    alignSelf: 'center',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: '50%',
    borderRadius: 30, // Arredondamento dos botões
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralizarTextos: {
    textAlign: 'center',
    color: 'white',
  },
  contentText: {
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
    width: '100%',
  },
  mechanicsList: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  mechanicItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mechanicName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mechanicRating: {
    fontSize: 14,
    color: '#555',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#005AA6',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 15,
    borderRadius: 50, // Arredondamento dos botões do modal
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  callButton: {
    backgroundColor: '#2196F3',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
