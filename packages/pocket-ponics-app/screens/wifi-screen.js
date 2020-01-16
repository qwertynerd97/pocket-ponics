import React from 'react'
import { Text, FlatList, View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './setup-styles'

const wifiList = [
	{
		ssid: '10.0.0.1',
		name: 'TheHowards',
		hasPassword: true,
		strength: 'high'
	},
	{
		ssid: '10.0.0.2',
		name: 'TheHowards-Guest',
		hasPassword: true,
		strength: 'high'
	},
	{
		ssid: '10.0.0.3',
		name: 'MockWifi1',
		hasPassword: false,
		strength: 'med'
	},
	{
		ssid: '10.0.0.4',
		name: 'MockWifi2',
		hasPassword: true,
		strength: 'low'
	},
	{
		ssid: '10.0.0.5',
		name: 'MockWifi3',
		hasPassword: false,
		strength: 'med'
	},
	{
		ssid: '10.0.0.6',
		name: 'MockWifi4',
		hasPassword: true,
		strength: 'low'
	},
	{
		ssid: '10.0.0.7',
		name: 'MockWifi5',
		hasPassword: false,
		strength: 'med'
	},
	{
		ssid: '10.0.0.8',
		name: 'MockWifi6',
		hasPassword: true,
		strength: 'low'
	}
]

class WifiScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	goToNext() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'TierSelection'
			})],
		})
		this.props.navigation.dispatch(resetAction)
	}

	cancel() {
		return this.props.navigation.navigate('Auth')
	}

	setWifi() {
		this.goToNext()
	}

	renderWifi(wifiData) {
		return (
			<TouchableOpacity style={styles.wifi} onPress={this.setWifi.bind(this, wifiData.hasPassword)}>
				<Text style={styles.wifiText}>{wifiData.name}</Text>
				{wifiData.hasPassword ? <FontAwesome name="lock" size={20} color="white"/> : null }
				<FontAwesome name="wifi" size={20} color="white"/>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Select a WiFi network</Text>
					<FlatList
						data={wifiList}
						renderItem={({ item }) => this.renderWifi(item)}
						keyExtractor={item => item.ssid}
						style={styles.wifiList}/>
					<TouchableOpacity style={styles.cancelButton} onPress={this.cancel.bind(this)}>
						<Text style={styles.cancelButtonText}>Cancel Setup</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}


				

export default WifiScreen