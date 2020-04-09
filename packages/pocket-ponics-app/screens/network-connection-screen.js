import React from 'react'
import { Text,View, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import APIUtil from '../util/api-util'

import styles from './setup-styles'

const plugin = require('../assets/settings-screen.png')

class NetworkConnectionScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	constructor(props) {
		super(props)

		this.state = {
			hasPermission: null,
			loading: false
		}
	}

	cancel() {
		return this.props.navigation.navigate('Greenhouse')
	}

	goToNext() {
		APIUtil.getGreenhouseRegistration()
			.then(response => {
				return Promise.all[
					AsyncStorage.setItem('serialNo', response.serial),
					AsyncStorage.setItem('password', response.password)
				]
			})
			.then(() => APIUtil.getGreenhouseWifi())
			.then(wifis => {
				const token = this.props.navigation.getParam('token', '')
				const resetAction = StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ 
						routeName: 'Wifi',
						params: { token, wifis } 
					})],
				})
				this.props.navigation.dispatch(resetAction)
			})
			.catch(error => {
				console.log('Network Error', error)

				// TODO - Remove after Demo
				const token = this.props.navigation.getParam('token', '')
				const resetAction = StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ 
						routeName: 'Wifi',
						params: { token, wifis: [
							{
								ssid: 'Mock Wifi 1',
								encrypted: false
							},
							{
								ssid: 'Mock Wifi 2',
								encrypted: true
							}
						]} 
					})],
				})
				this.props.navigation.dispatch(resetAction)

				// Alert.alert('You are not connected to a greenhouse, please connect to a greenhouse and try again')
			})
	}

	render(){
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Connect to the Greenhouse Network</Text>
					<Text style={styles.text}>Go to Settings > WIFI on your phone and connect to the PONICS network.</Text>
					<Image source={plugin} style={styles.image}/>
					<TouchableOpacity style={styles.button} onPress={this.goToNext.bind(this)}>
						<Text style={styles.buttonText}>Continue Setup</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}		

export default NetworkConnectionScreen
