import React from 'react'
import { Text,View, Image, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'

import styles from './setup-styles'

const plugin = require('../assets/fill-water.png')

class FillWaterScreen extends React.Component {
	static navigationOptions = {
		title: 'Setup',
	}

	goToNext() {
		const resetAction = StackActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ 
				routeName: 'FillNutrients',
			})],
		})
		this.props.navigation.dispatch(resetAction)
	}

	cancel() {
		return this.props.navigation.navigate('Auth')
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.background}>
					<Text style={styles.heading}>Fill the water tank</Text>
					<Text style={styles.text}>Unscrew the cap on the front of the water tank and pour in two gallons of water.  The water should be at the full tank mark.</Text>
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


				

export default FillWaterScreen
