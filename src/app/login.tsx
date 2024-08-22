import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient'; // Importa o LinearGradient

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push('/map')
        }, 2000);

    };

    const handleCreateAccount = () => {
        alert('Criar conta');
    };

    const handleForgotPassword = () => {
        alert('Esqueceu a senha');
    };

    return (
        <LinearGradient
            colors={['#01355C', '#014B82', '#0262A9', '#0264AC', '#0270C2', '#013860']} // Cores do gradiente
            style={styles.container} // Aplica o gradiente ao container
        >
            <StatusBar style="auto" />
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.innerContainer}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: 'https://static.vecteezy.com/ti/vetor-gratis/p3/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg' }}
                                style={styles.profileImage}
                            />
                        </View>
                        <Text style={styles.title}>Iniciar Sessão</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                                placeholder="Usuário"
                                autoCapitalize="none"
                            />
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    placeholder="Senha"
                                    autoCapitalize="none"
                                />
                                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    <Ionicons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={24}
                                        color="#01355C"
                                    />
                                </Pressable>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
                            <Text style={styles.forgotPasswordText}>Esqueceu a Senha?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>Iniciar Sessão</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.footerContainer}>
                    <Link href="/" asChild>
                        <TouchableOpacity style={styles.footerButton} onPress={handleCreateAccount}>
                            <Text style={styles.footerButtonText}>Ainda não possui uma conta? Cadastre-se</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </LinearGradient>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between', // Ensure space between top and bottom components
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        padding: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Center content inside scroll view
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        height: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FF0000',
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        padding: 10,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#CACACA',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    footerContainer: {
        padding: 16,
    },
    footerButton: {
        alignItems: 'center',
    },
    footerButtonText: {
        color: '#CACACA',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});
